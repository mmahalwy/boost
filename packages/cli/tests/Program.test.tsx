/* eslint-disable babel/no-invalid-this */

import React, { useContext } from 'react';
import { Box } from 'ink';
import { ExitError, env } from '@boost/internal';
import {
  Program,
  Command,
  Arg,
  OptionConfigMap,
  ProgramContext,
  ProgramContextType,
  INTERNAL_OPTIONS,
  TaskContext,
  GlobalOptions,
  Options,
} from '../src';
import { MockWriteStream, MockReadStream, runProgram } from '../src/testing';
import { options, params } from './__mocks__/args';
import { Parent, Child, GrandChild } from './__mocks__/commands';
import BuildCommand from './__mocks__/BuildCommand';
import InstallCommand from './__mocks__/InstallCommand';
import ClientCommand from './__mocks__/ClientCommand';
import AllClassicCommand from './__mocks__/AllClassicCommand';
import BuildClassicCommand from './__mocks__/BuildClassicCommand';
import InstallClassicCommand from './__mocks__/InstallClassicCommand';

jest.mock('term-size');

class BoostCommand extends Command {
  static description = 'Description';

  static path = 'boost';

  static allowUnknownOptions = true;

  static allowVariadicParams = true;

  run() {
    return Promise.resolve();
  }
}

class ErrorCommand extends Command {
  static description = 'Description';

  static path = 'boost';

  static allowVariadicParams = true;

  run(): Promise<void> {
    throw new Error('Broken!');
  }
}

class StringCommand extends Command {
  static description = 'Description';

  static path = 'string';

  run() {
    return 'Hello!';
  }
}

class ComponentCommand extends Command {
  static description = 'Description';

  static path = 'comp';

  run() {
    return <Box>Hello!</Box>;
  }
}

describe('<Program />', () => {
  let program: Program;
  let stderr: MockWriteStream;
  let stdout: MockWriteStream;
  let stdin: MockReadStream;

  beforeEach(() => {
    stderr = new MockWriteStream();
    stdout = new MockWriteStream();
    stdin = new MockReadStream();
    program = new Program(
      {
        bin: 'boost',
        name: 'Boost',
        version: '1.2.3',
      },
      {
        stderr: (stderr as unknown) as NodeJS.WriteStream,
        stdout: (stdout as unknown) as NodeJS.WriteStream,
        stdin: (stdin as unknown) as NodeJS.ReadStream,
      },
    );
  });

  it('errors if bin is not kebab case', () => {
    expect(
      () =>
        new Program({
          bin: 'boostRocketGo_go',
          name: 'Boost',
          version: '1.2.3',
        }),
    ).toThrowErrorMatchingSnapshot();
  });

  it('errors for invalid version format', () => {
    expect(
      () =>
        new Program({
          bin: 'boost',
          name: 'Boost',
          version: 'a.b12.323',
        }),
    ).toThrowErrorMatchingSnapshot();
  });

  describe('exit', () => {
    it('can exit', () => {
      expect(() => {
        program.exit('Oops');
      }).toThrow(new ExitError('Oops', 1));
    });

    it('can exit with a custom code', () => {
      expect(() => {
        program.exit('Oops', 10);
      }).toThrow(new ExitError('Oops', 10));
    });

    it('emits `onExit` event', () => {
      const spy = jest.fn();

      program.onExit.listen(spy);

      try {
        program.exit('Oops', 10);
      } catch {
        // Ignore
      }

      expect(spy).toHaveBeenCalledWith('Oops', 10);
    });
  });

  describe('commands', () => {
    it('registers and returns a command with path', () => {
      const command = new BuildCommand();

      program.register(command);

      expect(program.getCommand('build')).toBe(command);
    });

    it('returns an aliased command', () => {
      const command = new BuildCommand();

      program.register(command);

      expect(program.getCommand('compile')).toBe(command);
    });

    it('errors if command with same path is registered', () => {
      const command = new BuildCommand();

      expect(() => {
        program.register(command);
        program.register(command);
      }).toThrow('A command already exists with the canonical path "build".');
    });

    it('errors for invalid type', () => {
      expect(() => {
        // @ts-ignore Allow
        program.register(123);
      }).toThrow('Invalid command type being registered.');
    });

    it('returns null if command does not exist', () => {
      expect(program.getCommand('unknown')).toBeNull();
    });

    it('returns null if nested command does not exist', () => {
      const parent = new Parent();
      const child = new Child();

      parent.register(child);
      program.register(parent);

      expect(program.getCommand('parent:child:grandchild')).toBeNull();
    });

    it('returns nested commands by drilling down paths', () => {
      const parent = new Parent();
      const child = new Child();
      const grand = new GrandChild();

      child.register(grand);
      parent.register(child);
      program.register(parent);

      expect(program.getCommand('parent:child:grandchild')).toBe(grand);
    });

    it('returns nested alias commands', () => {
      const command = new ClientCommand();

      program.register(command);

      expect(program.getCommand('client:compile')).not.toBeNull();
    });

    it('registers a default command', () => {
      const command = new BuildCommand();

      program.default(command);

      // @ts-ignore Allow access
      expect(program.standAlone).toBe('build');
    });

    it('errors if adding a command and a default is registered', () => {
      expect(() => {
        program.default(new Parent());
        program.register(new Child());
      }).toThrow(
        'A default command has been registered. Cannot mix default and non-default commands.',
      );
    });

    it('errors if adding a default and commands have been registered', () => {
      expect(() => {
        program.register(new Child());
        program.default(new Parent());
      }).toThrow(
        'Other commands have been registered. Cannot mix default and non-default commands.',
      );
    });

    it('returns all command paths', () => {
      program.register(new BuildCommand());
      program.register(new InstallCommand());

      expect(program.getCommandPaths()).toEqual(['build', 'install', 'compile']);
    });

    it('returns all command paths, including nested', () => {
      program.register(new ClientCommand());

      expect(program.getCommandPaths()).toEqual([
        'client',
        'client:build',
        'client:install',
        'client:uninstall',
        'client:compile',
      ]);
    });

    it('emits `onBeforeRegister` and `onAfterRegister` events', () => {
      const cmd = new ClientCommand();
      const beforeSpy = jest.fn();
      const afterSpy = jest.fn();

      program.onBeforeRegister.listen(beforeSpy);
      program.onAfterRegister.listen(afterSpy);
      program.register(cmd);

      expect(beforeSpy).toHaveBeenCalledWith('client', cmd);
      expect(afterSpy).toHaveBeenCalledWith('client', cmd);
    });

    it('emits `onBeforeRegister` and `onAfterRegister` events for default command', () => {
      const cmd = new ClientCommand();
      const beforeSpy = jest.fn();
      const afterSpy = jest.fn();

      program.onBeforeRegister.listen(beforeSpy);
      program.onAfterRegister.listen(afterSpy);
      program.default(cmd);

      expect(beforeSpy).toHaveBeenCalledWith('client', cmd);
      expect(afterSpy).toHaveBeenCalledWith('client', cmd);
    });
  });

  describe('proxy commands', () => {
    let result: object;

    beforeEach(() => {
      program.register<{}, [string, ...string[]]>(
        'build',
        {
          aliases: ['compile'],
          allowVariadicParams: true,
          description: 'Build something',
          options: BuildClassicCommand.options,
          params: InstallClassicCommand.params,
        },
        function build(this: TaskContext, opts, pms, rest) {
          result = { opts, pms, rest };

          this.log('Testing class logger');
        },
      );
    });

    it('registers and returns a command with path', () => {
      const command = program.getCommand('build')!;

      expect(command).toBeInstanceOf(Command);
      expect(command.getMetadata()).toEqual({
        aliases: ['compile'],
        allowUnknownOptions: false,
        allowVariadicParams: true,
        categories: {},
        category: '',
        commands: {},
        description: 'Build something',
        deprecated: false,
        hidden: false,
        options: {
          ...BuildCommand.options,
          ...Command.options,
        },
        params: InstallClassicCommand.params,
        path: 'build',
        usage: '',
      });
    });

    it('outputs help when `--help` is passed', async () => {
      const { code, output } = await runProgram(program, ['build', '--help']);

      expect(output).toMatchSnapshot();
      expect(code).toBe(0);
    });

    it('renders failure when args parsing fails', async () => {
      const { code, output } = await runProgram(program, ['build', '--foo']);

      expect(output).toContain('Unknown option "--foo" found.');
      expect(code).toBe(1);
    });

    it('passes correct args to run method', async () => {
      await runProgram(program, [
        'build',
        '--src',
        './src',
        '@boost/cli',
        '@boost/terminal',
        '--',
        'foo',
        'bar',
      ]);

      expect(result).toEqual({
        opts: {
          dst: '',
          help: false,
          locale: 'en',
          src: './src',
          version: false,
        },
        pms: ['@boost/cli', '@boost/terminal'],
        rest: ['foo', 'bar'],
      });
    });

    it('supports logger and aliased paths', async () => {
      const { code } = await runProgram(program, ['compile', 'foo/bar']);

      expect(code).toBe(0);
    });
  });

  describe('version', () => {
    it('outputs version when `--version` is passed', async () => {
      program.default(new BoostCommand());

      const { code, output } = await runProgram(program, ['--version']);

      expect(output).toMatchSnapshot();
      expect(code).toBe(0);
    });

    it('outputs version when `-v` is passed', async () => {
      program.default(new BoostCommand());

      const { code, output } = await runProgram(program, ['-v']);

      expect(output).toMatchSnapshot();
      expect(code).toBe(0);
    });
  });

  describe('locale', () => {
    it('errors for invalid `--locale`', async () => {
      program.default(new BuildCommand());

      const { code, output } = await runProgram(program, ['--locale', 'wtf']);

      expect(output).toMatchSnapshot();
      expect(code).toBe(1);
    });
  });

  describe('help', () => {
    class HelpCommand extends Command {
      static description = 'Description';

      static path = 'boost';

      static options = { ...options };

      static params = [...params];

      run() {
        return Promise.resolve();
      }
    }

    it('outputs help when `--help` is passed', async () => {
      program.default(new HelpCommand());

      const { code, output } = await runProgram(program, ['--help']);

      expect(output).toMatchSnapshot();
      expect(code).toBe(0);
    });

    it('outputs help when `-h` is passed', async () => {
      program.default(new HelpCommand());

      const { code, output } = await runProgram(program, ['-h']);

      expect(output).toMatchSnapshot();
      expect(code).toBe(0);
    });

    it('outputs help for a specific command', async () => {
      program.register(new BuildCommand());
      program.register(new InstallCommand());

      const { output: o1 } = await runProgram(program, ['build', '-h']);

      expect(o1).toMatchSnapshot();

      const { output: o2 } = await runProgram(program, ['install', '--help']);

      expect(o2).toMatchSnapshot();
    });

    it('outputs help for a nested sub-command', async () => {
      program.register(new ClientCommand());

      const { output: o1 } = await runProgram(program, ['client:build', '-h']);

      expect(o1).toMatchSnapshot();

      const { output: o2 } = await runProgram(program, ['client:install', '--help']);

      expect(o2).toMatchSnapshot();

      const { output: o3 } = await runProgram(program, ['client', '--help']);

      expect(o3).toMatchSnapshot();
    });

    it('outputs help for an aliased command', async () => {
      program.register(new BuildCommand());

      const { output: o1 } = await runProgram(program, ['build', '-h']);

      expect(o1).toMatchSnapshot();

      const { output: o2 } = await runProgram(program, ['compile', '--help']);

      expect(o2).toMatchSnapshot();
    });

    it('emits `onHelp` event', async () => {
      const spy = jest.fn();

      program.onHelp.listen(spy);
      program.register(new HelpCommand());

      await runProgram(program, ['boost', '--help']);

      expect(spy).toHaveBeenCalled();
    });

    it('emits `onHelp` event for default', async () => {
      const spy = jest.fn();

      program.onHelp.listen(spy);
      program.default(new HelpCommand());

      await runProgram(program, ['--help']);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('default command', () => {
    it('executes default when no args passed', async () => {
      program.default(new BuildCommand());

      const { code, output } = await runProgram(program, []);

      expect(output).toMatchSnapshot();
      expect(code).toBe(0);
    });

    it('renders commands when no args passed', async () => {
      program.register(new BuildCommand());
      program.register(new InstallCommand());

      const { code, output } = await runProgram(program, []);

      expect(output).toMatchSnapshot();
      expect(code).toBe(0);
    });
  });

  describe('failure', () => {
    it('renders when no commands have been registered', async () => {
      const { code, output } = await runProgram(program, ['build']);

      expect(output).toMatchSnapshot();
      expect(code).toBe(1);
    });

    it('renders when invalid command name passed', async () => {
      program.register(new BuildCommand());
      program.register(new InstallCommand());

      const { code, output } = await runProgram(program, ['prune']);

      expect(output).toMatchSnapshot();
      expect(code).toBe(1);
    });

    it('renders when misspelt command name passed', async () => {
      program.register(new BuildCommand());
      program.register(new InstallCommand());

      const { code, output } = await runProgram(program, ['buld']);

      expect(output).toMatchSnapshot();
      expect(code).toBe(1);
    });

    it('renders when no commands could be found', async () => {
      program.register(new BuildCommand());
      program.register(new InstallCommand());

      const { code, output } = await runProgram(program, ['--locale=en']);

      expect(output).toMatchSnapshot();
      expect(code).toBe(1);
    });

    it('renders when args parsing fails', async () => {
      program.default(new ComponentCommand());

      const { code, output } = await runProgram(program, ['--foo']);

      expect(output).toMatchSnapshot();
      expect(code).toBe(1);
    });

    it('renders if an error is thrown', async () => {
      program.register(new ErrorCommand());

      const { code, output } = await runProgram(program, ['boost']);

      expect(output).toMatchSnapshot();
      expect(code).toBe(1);
    });

    it('renders with custom exit error', async () => {
      class ExitCommand extends Command {
        static description = 'Description';

        static path = 'boost';

        run() {
          this.exit('Oops', 123);

          return Promise.resolve();
        }
      }

      program.register(new ExitCommand());

      const { code, output } = await runProgram(program, ['boost']);

      expect(output).toMatchSnapshot();
      expect(code).toBe(123);
    });

    it('emits `onBeforeRun` and `onAfterRun` events', async () => {
      const beforeSpy = jest.fn();
      const afterSpy = jest.fn();

      program.onBeforeRun.listen(beforeSpy);
      program.onAfterRun.listen(afterSpy);

      program.register(new ErrorCommand());

      await runProgram(program, ['boost']);

      expect(beforeSpy).toHaveBeenCalledWith(['boost']);
      expect(afterSpy).toHaveBeenCalledWith(new Error('Broken!'));
    });

    it('emits `onCommandNotFound` event', async () => {
      const spy = jest.fn();

      program.onCommandNotFound.listen(spy);
      program.register(new BuildCommand());

      await runProgram(program, ['install', 'foo', 'bar']);

      expect(spy).toHaveBeenCalledWith(['install', 'foo', 'bar'], 'install');
    });
  });

  describe('success', () => {
    beforeEach(() => {
      env('CLI_TEST_FAIL_HARD', 'true');
    });

    afterEach(() => {
      env('CLI_TEST_FAIL_HARD', null);
    });

    it('sets rest args to the rest command property', async () => {
      const command = new BuildCommand();

      program.register(command);

      await runProgram(program, ['build', '-S', './src', '--', 'foo', 'bar', '--baz', '-f']);

      expect(command.rest).toEqual(['foo', 'bar', '--baz', '-f']);
    });

    it('sets options as command properties (declarative)', async () => {
      const command = new BuildCommand();

      program.register(command);

      await runProgram(program, ['build', '-S', './source', '-D', './library']);

      expect(command.dst).toBe('./library');
      expect(command.help).toBe(false);
      expect(command.locale).toBe('en');
      expect(command.src).toBe('./source');
      expect(command.version).toBe(false);
    });

    it('sets options as command properties (imperative)', async () => {
      const command = new BuildClassicCommand();

      program.register(command);

      await runProgram(program, ['build', '-S', './source']);

      expect(command.dst).toBe('');
      expect(command.help).toBe(false);
      expect(command.locale).toBe('en');
      expect(command.src).toBe('./source');
      expect(command.version).toBe(false);
    });

    it('passes params to run method', async () => {
      const command = new AllClassicCommand();
      const spy = jest.spyOn(command, 'run');

      program.default(command);

      await runProgram(program, ['-F', 'foo', 'true', '123']);

      expect(spy).toHaveBeenCalledWith('foo', true, 123);
    });

    it('can return nothing', async () => {
      class NoneCommand extends Command {
        static description = 'Description';

        static path = 'none';

        run() {}
      }

      program.register(new NoneCommand());

      const { output } = await runProgram(program, ['none']);

      expect(output).toBe('');
    });

    it('can return a string that writes directly to stream', async () => {
      program.register(new StringCommand());

      const { output } = await runProgram(program, ['string']);

      expect(output).toBe('Hello!\n');
    });

    it('can return an element that writes with ink', async () => {
      program.register(new ComponentCommand());

      const { output } = await runProgram(program, ['comp']);

      expect(output).toMatchSnapshot();
    });

    it('can run command using aliased path', async () => {
      const command = new BuildCommand();
      const spy = jest.fn();

      program.onCommandFound.listen(spy);
      program.register(command);

      const { code } = await runProgram(program, ['compile', '-S', './src']);

      expect(code).toBe(0);
      expect(spy).toHaveBeenCalledWith(['compile', '-S', './src'], 'compile', command);
    });

    it('emits `onBeforeRun` and `onAfterRun` events', async () => {
      const beforeSpy = jest.fn();
      const afterSpy = jest.fn();

      program.onBeforeRun.listen(beforeSpy);
      program.onAfterRun.listen(afterSpy);
      program.register(new BoostCommand());

      await runProgram(program, ['boost', 'foo', 'bar']);

      expect(beforeSpy).toHaveBeenCalledWith(['boost', 'foo', 'bar']);
      expect(afterSpy).toHaveBeenCalled();
    });

    it('emits `onCommandFound` event', async () => {
      const spy = jest.fn();
      const cmd = new BoostCommand();

      program.onCommandFound.listen(spy);
      program.register(cmd);

      await runProgram(program, ['boost', 'foo', 'bar']);

      expect(spy).toHaveBeenCalledWith(['boost', 'foo', 'bar'], 'boost', cmd);
    });

    it('emits `onBeforeRender` and `onAfterRender` events for components', async () => {
      const beforeSpy = jest.fn();
      const afterSpy = jest.fn();

      program.onBeforeRender.listen(beforeSpy);
      program.onAfterRender.listen(afterSpy);
      program.default(new ComponentCommand());

      await runProgram(program, []);

      expect(beforeSpy).toHaveBeenCalledWith(<Box>Hello!</Box>);
      expect(afterSpy).toHaveBeenCalled();
    });
  });

  describe('option defaults', () => {
    class DeclCommand extends Command {
      static description = 'Description';

      static path = 'cmd';

      @Arg.Number('Number')
      numNoDefault: number = 0;

      @Arg.Number('Number (default)')
      numWithDefault: number = 123;

      @Arg.Flag('Flag (false)')
      flagFalse: boolean = false;

      @Arg.Flag('Flag (true)')
      flagTrue: boolean = true;

      @Arg.String('String')
      strNoDefault: string = '';

      @Arg.String('String (default)')
      strWithDefault: string = 'foo';

      @Arg.Numbers('Numbers')
      numsNoDefault: number[] = [];

      @Arg.Numbers('Numbers (default)')
      numsWithDefault: number[] = [1, 2, 3];

      @Arg.Strings('Strings')
      strsNoDefault: string[] = [];

      @Arg.Strings('Strings (default)')
      strsWithDefault: string[] = ['a', 'b', 'c'];

      run() {}
    }

    class ImpCommand extends Command {
      static description = 'Description';

      static path = 'cmd';

      static options: OptionConfigMap = {
        numNoDefault: {
          description: 'Number',
          type: 'number',
        },
        numWithDefault: {
          default: 123,
          description: 'Number (default)',
          type: 'number',
        },
        flagFalse: {
          description: 'Flag (false)',
          type: 'boolean',
        },
        flagTrue: {
          // Use property
          // default: true,
          description: 'Flag (true)',
          type: 'boolean',
        },
        strNoDefault: {
          description: 'String',
          type: 'string',
        },
        strWithDefault: {
          // Also with property
          default: 'bar',
          description: 'String (default)',
          type: 'string',
        },
        numsNoDefault: {
          description: 'Numbers',
          multiple: true,
          type: 'number',
        },
        numsWithDefault: {
          default: [1, 2, 3],
          description: 'Numbers (default)',
          multiple: true,
          type: 'number',
        },
        strsNoDefault: {
          description: 'Strings',
          multiple: true,
          type: 'string',
        },
        strsWithDefault: {
          description: 'Strings (default)',
          multiple: true,
          type: 'string',
        },
      };

      numNoDefault!: number;

      numWithDefault!: number;

      flagFalse: boolean = false;

      flagTrue: boolean = true;

      strNoDefault: string = '';

      strWithDefault: string = 'foo';

      numsNoDefault: number[] = [];

      numsWithDefault!: number[]; // Use config default

      strsNoDefault!: string[]; // None set in either place

      strsWithDefault: string[] = ['a', 'b', 'c'];

      run() {}
    }

    const runners = {
      declarative: () => new DeclCommand(),
      imperative: () => new ImpCommand(),
    };

    Object.entries(runners).forEach(([type, factory]) => {
      describe(`${type}`, () => {
        let command: ImpCommand;

        beforeEach(() => {
          command = factory();

          env('CLI_TEST_FAIL_HARD', 'true');
        });

        afterEach(() => {
          env('CLI_TEST_FAIL_HARD', null);
        });

        it('returns number option if defined', async () => {
          program.register(command);

          await runProgram(program, ['cmd', '--numNoDefault', '456', '--numWithDefault=789']);

          expect(command.numNoDefault).toBe(456);
          expect(command.numWithDefault).toBe(789);
        });

        it('returns default number option if not defined', async () => {
          program.register(command);

          await runProgram(program, ['cmd']);

          expect(command.numNoDefault).toBe(0);
          expect(command.numWithDefault).toBe(123);
        });

        it('returns boolean option if defined', async () => {
          program.register(command);

          await runProgram(program, ['cmd', '--flagFalse', '--no-flagTrue']);

          expect(command.flagFalse).toBe(true);
          expect(command.flagTrue).toBe(false);
        });

        it('returns default boolean option if not defined', async () => {
          program.register(command);

          await runProgram(program, ['cmd']);

          expect(command.flagFalse).toBe(false);
          expect(command.flagTrue).toBe(true);
        });

        it('returns string option if defined', async () => {
          program.register(command);

          await runProgram(program, ['cmd', '--strNoDefault', 'bar', '--strWithDefault=baz']);

          expect(command.strNoDefault).toBe('bar');
          expect(command.strWithDefault).toBe('baz');
        });

        it('returns default string option if not defined', async () => {
          program.register(command);

          await runProgram(program, ['cmd']);

          expect(command.strNoDefault).toBe('');
          expect(command.strWithDefault).toBe('foo');
        });

        it('returns numbers option if defined', async () => {
          program.register(command);

          await runProgram(program, [
            'cmd',
            '--numsNoDefault',
            '4',
            '5',
            '6',
            '--numsWithDefault',
            '7',
            '8',
            '9',
          ]);

          expect(command.numsNoDefault).toEqual([4, 5, 6]);
          expect(command.numsWithDefault).toEqual([7, 8, 9]);
        });

        it('returns default numbers option if not defined', async () => {
          program.register(command);

          await runProgram(program, ['cmd']);

          expect(command.numsNoDefault).toEqual([]);
          expect(command.numsWithDefault).toEqual([1, 2, 3]);
        });

        it('returns strings option if defined', async () => {
          program.register(command);

          await runProgram(program, [
            'cmd',
            '--strsNoDefault',
            '4',
            '5',
            '6',
            '--strsWithDefault',
            'foo',
            'bar',
          ]);

          expect(command.strsNoDefault).toEqual(['4', '5', '6']);
          expect(command.strsWithDefault).toEqual(['foo', 'bar']);
        });

        it('returns strings numbers option if not defined', async () => {
          program.register(command);

          await runProgram(program, ['cmd']);

          expect(command.strsNoDefault).toEqual([]);
          expect(command.strsWithDefault).toEqual(['a', 'b', 'c']);
        });
      });
    });
  });

  describe('logging', () => {
    function Log() {
      const ctx = useContext(ProgramContext) as ProgramContextType;

      ctx.log('Component log');
      ctx.log.error('Component error');

      return <Box>Returned from component!</Box>;
    }

    class LogCommand extends Command {
      static description = 'Description';

      static path = 'log';

      static options: OptionConfigMap = {
        component: {
          description: 'With component',
          type: 'boolean',
        },
      };

      component = false;

      run() {
        this.log('Log');
        this.log.debug('Debug');
        this.log.warn('Warn');
        this.log.error('Error');
        this.log.trace('Trace');
        this.log.info('Info');

        if (this.component) {
          return <Log />;
        }

        return 'Returned from command!';
      }
    }

    it('handles logging when rendering a component', async () => {
      const logSpy = jest.spyOn(stdout, 'write');
      const errSpy = jest.spyOn(stderr, 'write');

      program.register(new LogCommand());

      const { code, output } = await runProgram(program, ['log', '--component']);

      expect(logSpy).toHaveBeenCalled();
      expect(errSpy).not.toHaveBeenCalled(); // Until ink supports stderr
      expect(output).toMatchSnapshot();
      expect(code).toBe(0);

      logSpy.mockRestore();
      errSpy.mockRestore();
    });

    it('handles logging when returning a string', async () => {
      const logSpy = jest.spyOn(stdout, 'write');
      const errSpy = jest.spyOn(stderr, 'write');

      program.register(new LogCommand());

      const { code, output } = await runProgram(program, ['log']);

      expect(logSpy).toHaveBeenCalled();
      expect(errSpy).not.toHaveBeenCalled(); // Until ink supports stderr
      expect(output).toMatchSnapshot();
      expect(code).toBe(0);

      logSpy.mockRestore();
      errSpy.mockRestore();
    });
  });

  describe('middleware', () => {
    /* eslint-disable promise/no-callback-in-promise */

    it('errors if not a function', () => {
      expect(() => {
        // @ts-ignore Allow this
        program.middleware(123);
      }).toThrow('Middleware must be a function.');
    });

    it('removes node and binary from `process.argv`', async () => {
      const command = new BuildCommand();

      program.register(command);

      const { code } = await runProgram(program, [
        '/nvm/12.16.1/bin/node',
        '/boost/bin.js',
        'build',
        '-S',
        './src',
      ]);

      expect(code).toBe(0);
    });

    it('can modify argv before parsing', async () => {
      const command = new BoostCommand();

      program.default(command);
      program.middleware((argv, next) => {
        argv.push('--', 'foo', 'bar');

        return next(argv);
      });

      await runProgram(program, ['--opt', 'value']);

      expect(command.unknown).toEqual({ opt: 'value' });
      expect(command.rest).toEqual(['foo', 'bar']);
    });

    it('can modify argv before parsing using promises', async () => {
      const command = new BoostCommand();

      program.default(command);
      program.middleware((argv, next) =>
        Promise.resolve()
          .then(() => [...argv, '--opt', 'new value'])
          .then(next),
      );

      await runProgram(program, ['--opt', 'value']);

      expect(command.unknown).toEqual({ opt: 'new value' });
    });

    it('can modify args after parsing', async () => {
      const command = new BoostCommand();

      program.default(command);
      program.middleware(async (argv, next) => {
        const args = await next(argv);

        args.options.locale = 'fr';
        args.unknown.key = 'value';

        return args;
      });

      await runProgram(program, ['--opt', 'value']);

      expect(command.unknown).toEqual({ opt: 'value', key: 'value' });
      expect(command[INTERNAL_OPTIONS]).toEqual({
        help: false,
        locale: 'fr',
        version: false,
      });
    });
  });

  describe('categories', () => {
    it('applies categories to index help', async () => {
      program.categories({
        top: { name: 'Top', weight: 50 },
        bottom: 'Bottom',
      });

      program.register('foo', { category: 'bottom', description: 'Description' }, () => {});
      program.register('bar', { category: 'top', description: 'Description' }, () => {});
      program.register('baz', { category: 'global', description: 'Description' }, () => {});
      program.register('qux', { description: 'Description' }, () => {});

      const { output } = await runProgram(program, ['--help']);

      expect(output).toMatchSnapshot();
    });
  });

  describe('nested programs', () => {
    class NestedProgramCommand extends Command {
      static description = 'Description';

      static path = 'prog';

      async run() {
        this.log('Before run');

        await this.runProgram(['client:install', 'foo', '--save']);

        this.log('After run');

        return 'Return';
      }
    }

    class NestedErrorCommand extends Command {
      static description = 'Description';

      static path = 'prog-error';

      async run() {
        await this.runProgram(['prog-error-inner']);
      }
    }

    class NestedErrorInnerCommand extends Command {
      static description = 'Description';

      static path = 'prog-error-inner';

      run() {
        throw new Error('Bubbles');
      }
    }

    it('can run a program within a command', async () => {
      stdout.append = true;

      program.register(new NestedProgramCommand()).register(new ClientCommand());

      const { output } = await runProgram(program, ['prog']);

      expect(output).toMatchSnapshot();
    });

    it('errors if no program instance', () => {
      const command = new NestedProgramCommand();

      expect(() => command.runProgram(['foo'])).toThrow(
        'No program found. Must be ran within the context of a parent program.',
      );
    });

    it('bubbles up errors', async () => {
      program.register(new NestedErrorCommand()).register(new NestedErrorInnerCommand());

      const { output } = await runProgram(program, ['prog-error']);

      expect(output).toMatchSnapshot();
    });
  });

  describe('tasks', () => {
    // Test logging and options
    function syncTask(this: TaskContext, a: number, b: number) {
      this.log('Hi');
      this.log.error('Bye');

      return a + b;
    }

    // Test misc args
    interface AsyncOptions extends GlobalOptions {
      value: string;
    }

    async function asyncTask(this: TaskContext<AsyncOptions>, a: string, b: string) {
      this.unknown.foo = 'true';

      const c = await Promise.resolve(this.value);

      this.rest.push('foo');

      return c + a + b.toUpperCase();
    }

    beforeEach(() => {
      stdout.append = true;
    });

    it('runs a sync task correctly', async () => {
      class SyncTaskCommand extends Command {
        static description = 'Description';

        static path = 'task';

        run() {
          return String(this.runTask(syncTask, 10, 5));
        }
      }

      program.register(new SyncTaskCommand());

      const { output } = await runProgram(program, ['task']);

      expect(output).toMatchSnapshot();
    });

    it('runs an async task correctly', async () => {
      class AsyncTaskCommand extends Command<AsyncOptions> {
        static description = 'Description';

        static path = 'task';

        static options: Options<AsyncOptions> = {
          value: {
            description: 'Description',
            type: 'string',
          },
        };

        async run() {
          const value = await this.runTask(asyncTask, 'foo', 'bar');

          return value;
        }
      }

      const command = new AsyncTaskCommand();

      program.register(command);

      const { output } = await runProgram(program, ['task', '--value', 'baz']);

      expect(output).toMatchSnapshot();
      expect(command.unknown.foo).toBe('true');
      expect(command.rest).toEqual(['foo']);
    });
  });
});