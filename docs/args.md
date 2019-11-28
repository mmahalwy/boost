# Args Parsing

A type-safe and convention based argument parsing library, with strict validation checks.

## Installation

```
yarn add @boost/args
```

## Usage

This library is strict parser for command line arguments, primarily `process.argv` in Node.js, that
supports [commands](#commands), [options](#options), [flags](#flags), [params](#params), and
[much more](#advanced-features)! It is _not_ a command line interface or application but provides
the building blocks for such functionality.

Parsing arguments is accomplished with the `parse()` function, which requires a list of strings
(arguments also known as `argv`), and a settings object to control whats supported. It also utilizes
TypeScript generics to type options and params respectively.

```ts
import { parse } from '@boost/args';

// Remove node binary and script
const argv = process.argv.slice(2);

// Parse argv into a consumable object
const { command, errors, options, params, rest } = parse<{ help: boolean }, [string]>(argv, {
  options: {
    help: {
      description: 'Show the help menu',
      short: 'H',
      type: 'boolean',
    },
  },
  params: [
    {
      description: 'File path to source directory',
      label: 'Source',
      required: true,
      type: 'string',
    },
  ],
});
```

### Commands

Commands are a feature that allow for branching logic, full isolation, and distinct code paths. That
being said, the parser does not handle this functionality, as that's the CLIs job. The parser
however, will detect a command, and sub-commands, and validate them accordingly.

A command in Boost should be the first argument passed, before [options](#options), and definitely
before [params](#params). They support numbers, letters, and dashes, with sub-commands being
separated by a colon (`:`).

To detect and parse commands, pass a list of all command and sub-command names to the `commands`
setting, or use a custom function to manually do the checks. The detected command will be returned
as an array, split on `:`.

```ts
const args = parse<{}>(argv, {
  commands: ['build', 'build:esm', 'build:cjs', 'install'],
  // OR
  commands(arg) {
    return arg === 'build'; // etc
  },
});

// build:esm src/ --out lib/
args.command; // ['build', 'esm']
args.options; // { out: 'lib/' }
args.params; // ['src/']
```

If an argument is not found in the commands list or function, it will be treated as a parameter.

```ts
// build:umd src/ --out lib/
args.command; // []
args.options; // { out: 'lib/' }
args.params; // ['build:umd', 'src/']
```

### Options

An option is an optional argument that accepts a single value or multiple values. It has 2 forms,
the first being the default form, also known as a long option, which starts with `--` and is
followed by a word or phrase (either in camel or kebab case). For example, `--log`, `--log-level`,
or `--logLevel` (preferred).

The second form is known as the short form and is represented by a single alpha character (either
lower or uppercase) prefixed with `-`, for example, `-l` or `-L`. The short option can be enabled
with the `short` setting.

For options to parse correctly, they must be defined using a settings object. Each option supports
the following settings:

- `type` (`'boolean' | 'number' | 'string'`) - Expected type of the provided value. When a value is
  captured from the command line, it will be type casted. _(Required)_
- `description` (`string`) - A description of what the option does. Primarily used in interface
  output. _(Required)_
- `default` (`*`) - The default value if option not provided on the command line. The value's type
  is dependent on the `type` and `multiple` settings. Furthermore, this value defaults to the
  following if not defined.
  - A zero (`0`) when type is `number`.
  - An empty string (`''`) when type is `string`.
  - And `false` when type is `boolean`.
- `hidden` (`boolean`) - Hide the option from interface output. Defaults to `false`.
- `short` (`string`) - Single character used as a the short option alias.
- `usage` (`string`) - Example instructions on how to use the option.
- `validate` (`(value: T) => void`) - An optional function to validate the provided value.

```ts
const argv = ['--logLevel=2'];
const args = parse<{ logLevel: number }>(argv, {
  options: {
    logLevel: {
      description: 'Increase log output verbosity',
      type: 'number',
      short: 'L',
      validate(value) {
        if (value < 0 || value > 10) {
          throw new Error('Log level must be between 0 and 10.');
        }
      },
    },
  },
});

args.options.logLevel; // 2
```

The name of options used on the command line are derived from the `options` keys (above), which are
preferred to be camel case. Even though they are defined as camel case, kebab case variants are
supported on the command line.

> When using TypeScript, a mapping of option names to expected types is defined as the 1st generic
> slot of `parse()`. If not provided, it defaults to `object`. It's highly encouraged to type
> options correctly.

#### Single Value

A value can be passed as either an additional argument separated by a space, like `--option value`
(preferred), or with an equals sign and no space (also known as an inline value), like
`--option=value`.

If you are passing a string that contains spaces or special characters, you must wrap the value in
double quotes. For example, `--option "long value"` or `--option="long value"`.

#### Multiple Values

To pass multiple values for an option, the `multiple` setting must be enabled (numbers and strings
only), and if using TypeScript, the option type must be a typed array.

```ts
const args = parse<{ files: string[] }>(argv, {
  options: {
    files: {
      description: 'List of files to process',
      multiple: true,
      type: 'string',
    },
  },
});
```

Like single values, there are 2 patterns for passing multiple values, but the semantics are slightly
different. When using inlines values (the equals sign), the option must be repeated for each value,
like `--option=foo --option=bar --option=baz`.

Otherwise, each value can be passed as a standalone argument, like `--option foo bar baz`. When
using this approach, all values will be captured until another option is passed, or the end of the
list is met.

### Flags

A flag is a special type of [option](#options) that accepts no value, is always boolean, and
represents a binary on-off switch. When the flag is passed on the command line (without a value),
for example, `--color`, the value is assumed to be `true`. To negate a truthy value and pass a falsy
one, prefix the option with `no-`, for example, `--no-color`.

Each flag supports the `type` (required), `description` (required), `default` (is `false` if not
provided), `hidden`, `usage`, and `short` settings mentioned above.

```ts
const argv = ['--color'];
const args = parse<{ color: boolean }>(argv, {
  options: {
    color: {
      description: 'Enable colored output',
      type: 'boolean',
    },
  },
});

args.options.color; // true
```

### Params

Parameters (or positional arguments) are standalone arguments that are treated as values, and are
parsed in a strict order. They're an important mechanism that serve 2 purposes.

- They're a catch all bucket for arguments that _are not_ a command, option, or flag, nor do they
  appear after a rest `--` delimiter.
- They're tightly coupled to commands (when being used). Think of a command as a function, where the
  params are the arguments that are passed to the function.

Like [options](#options), params can be configured, but unlike options, the settings are not
required. When a setting is not defined, a param is treated as a string. Params support all the same
settings and types as options, with the addition of:

- `label` (`string`) - Informational label to display in interface output. _(Required)_
- `required` (`boolean`) - Whether the param is required or not. If required and not passed, the
  parser will throw an error. Defaults to `false`.

```ts
const argv = ['off', 'value', '123.45'];
const args = parse<{}, [boolean, string, number]>(argv, {
  params: [
    {
      description: 'First parameter',
      label: 'First',
      type: 'boolean',
      required: true,
    },
    { description: 'Second parameter', label: 'Second', type: 'string' },
    { description: 'Third parameter', label: 'Third', type: 'number' },
  ],
});

args.params; // [false, 'value', 123.45]
```

Since parameters are order based and not named based, the `params` setting is an array, with each
item configuring the corresponding position/index (hence the name positional arguments).

> When using TypeScript, the expected type of each param is defined as a tuple in the 2nd generic
> slot of `parse()`. If not provided, it defaults to `string[]`.

### Rest

Rest arguments are rather simple, as they're everything after a standalone `--` argument (also known
as [end of options delimiter][dash-dash]). They are _not_ parsed and are usually passed to
subsequent scripts or commands.

```ts
const args = parse(['foo', 'bar', '--', 'baz']);

args.params; // ['foo', 'bar']
args.rest; // ['baz']
```

## Advanced Features

### Short Option Groups

Short options support a shortcut known as a short option group, where multiple short option names
can be placed under a single leading `-`. For example, instead of passing `-a -b -c`, you can pass
`-abc`. This shortcut is only available for [flags](#flags) (boolean options) and
[counters](#counters) (numeric options with `count`), otherwise an error is thrown.

When passing flags within a group, it will mark the value as `true`. Flag negation is not supported
within a group.

### Counter Options

Counters are a `number` option only feature, where each occurence of the option in a short option
group will increment the option's value (starting from the `default` value). For example, passing
`-vvv` will increment the value 3 times, once for each "v", resulting in a sum of 3. If not using a
group, the numeric value will need to be explicitly passed, like `--verbose 3`.

To make use of this feature, enable the `count` setting on a numeric option.

```ts
const argv = ['-vvv'];
const args = parse<{ verbose: number }>(argv, {
  options: {
    verbose: {
      count: true,
      default: 0,
      description: 'Increase output verbosity',
      short: 'v',
      type: 'number',
    },
  },
});

args.options.verbose; // 3
```

### Choice Options

For scenarios where you want to only accept an option value from a pre-defined list of choices, the
`choices` setting can be used (single number/string values only). If an unsupported value is
provided, the parser will throw an error.

```ts
const argv = ['--modules', 'umd'];
const args = parse<{ modules: 'cjs' | 'esm' | 'umd' }>(argv, {
  options: {
    modules: {
      choices: ['cjs', 'esm', 'umd'] as 'esm'[],
      default: 'esm',
      description: 'Choose module output',
      type: 'string',
    },
  },
});

args.options.modules; // 'umd'
```

> TypeScript doesn't handle the mapping of unions very well, so we need to `as` the `choices`
> setting. This isn't necessary when using a non-union.

### Arity Requirements

Another scenario may require an exact number of [option values](#multiple-values), otherwise an
error is thrown. This feature is known as arity (like function argument arity), and can be enabled
with the `arity` + `multiple` settings.

```ts
const argv = ['--colors', 'red', 'blue', 'green'];
const args = parse<{ colors: string[] }>(argv, {
  options: {
    colors: {
      arity: 3,
      description: 'Pick 3 favorite colors',
      multiple: true,
      type: 'string',
    },
  },
});

args.options.colors; // ['red', 'blue', 'green']
```

> Arity will not error when 0 values are passed. To control this logic, use the `validate` setting.

### Type Casting

While option and param values are configured as `boolean`, `number`, or `string` types, arguments
passed on the command line are always strings. Because of this, the parser will type cast all
captured values before returning the final result, as a means for easier interoperability.

This type casting follows specific semantics (below) and may have side-effects depending on the
input provided.

- When a `boolean`, the following strings will be cast to `true`: true, on, yes, 1. The inverse will
  be cast to `false`: false, off, no, 0. Other unsupported strings will also be cast to `false`.
- When a `number`, the string will be cast using `Number()`. If a NaN occurs, the number will return
  a `0` (use the `validate` setting for more control).
- Strings are used as-is. Values with spaces or special characters should be wrapped in double
  quotes.

### Validation Checks

For improved interoperability and usability, the parser is strict, logging the following parse and
validation errors.

- `ParseError`s are logged for invalid syntax and formatting (uncommon). The failed argument and its
  index are stored as `arg` and `index` properties on the error instance, respectively.
- `ValidationError`s are logged for invalid values, types, settings, and more (common). The invalid
  option (when applicable), is stored as the `option` property.

Furthermore, errors are not thrown and instead are returned as an array in the `parse()` result,
under the `errors` property. It's designed this way so that command line interfaces and or
applications have full control, and can theoretically provide output like the following.

```
An error has occurred:

  foo_bar --progressive --interactive -Y
  └──┬──┘
     └─ Invalid "foo_bar" command format. Must be letters, numbers, and dashes.

```

### Formatting Args

If for some reason you need to format the args object from `parse()` back into an array of string
arguments, the `format()` function can be used. This function will use the values as is and does not
reference the settings object, so all formatted arguments will be in their long form, and will not
use inline values.

```ts
import { format } from '@boost/args';

// cmd --string abc --numbers 123 456 --bool foo bar baz -- qux --version
const argv = format({
  command: ['cmd'],
  options: { string: 'abc', numbers: [123, 456], bool: true },
  params: ['foo', 'bar', 'baz'],
  rest: ['qux', '--version'],
});
```

<!-- prettier-ignore -->
[dash-dash]: https://unix.stackexchange.com/questions/147143/when-and-how-was-the-double-dash-introduced-as-an-end-of-options-delimiter