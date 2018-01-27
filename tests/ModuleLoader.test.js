import Plugin from '../src/Plugin';
import ModuleLoader from '../src/ModuleLoader';
import Tool from '../src/Tool';
import Console from '../src/Console';
import { getTestRoot, copyFixtureToMock } from './helpers';

function createPlugin(name) {
  const plugin = new Plugin();
  plugin.name = name;
  plugin.moduleName = `boost-plugin-${name}`;

  return plugin;
}

describe('ModuleLoader', () => {
  let loader;
  let fixtures = [];

  beforeEach(() => {
    const tool = new Tool({
      appName: 'boost',
      pluginAlias: 'plugin',
      root: getTestRoot(),
    });
    tool.console = new Console();

    loader = new ModuleLoader(tool, 'plugin', Plugin);

    fixtures = [];
  });

  afterEach(() => {
    fixtures.forEach(remove => remove());
  });

  describe('importModule()', () => {
    it('errors for missing node module', () => {
      expect(() => {
        loader.importModule('missing');
      }).toThrowError('Missing plugin. Attempted import in order: boost-plugin-missing');
    });

    it('errors for missing node module (with scope)', () => {
      expect(() => {
        loader.tool.options.scoped = true;
        loader.importModule('missing');
      }).toThrowError('Missing plugin. Attempted import in order: @boost/plugin-missing, boost-plugin-missing');
    });

    it('errors if a non-function is exported', () => {
      fixtures.push(copyFixtureToMock('plugin-exported-nonfunc', 'boost-plugin-nonfunc'));

      expect(() => {
        loader.importModule('nonfunc');
      }).toThrowError('Invalid plugin class definition exported from "boost-plugin-nonfunc".');
    });

    it('errors if a non-plugin is exported', () => {
      fixtures.push(copyFixtureToMock('plugin-exported-func', 'boost-plugin-func'));

      expect(() => {
        loader.importModule('func');
      }).toThrowError('Plugin exported from "boost-plugin-func" is invalid.');
    });

    it('errors if a plugin instance is exported', () => {
      fixtures.push(copyFixtureToMock('plugin-exported-instance', 'boost-plugin-instance'));

      expect(() => {
        loader.importModule('instance');
      }).toThrowError('A plugin class instance was exported from "boost-plugin-instance". Boost requires a plugin class definition to be exported.');
    });

    it('errors if a non-plugin instance is exported', () => {
      fixtures.push(copyFixtureToMock('plugin-exported-nonplugin-instance', 'boost-plugin-nonplugin'));

      expect(() => {
        loader.importModule('nonplugin');
      }).toThrowError('Invalid plugin class definition exported from "boost-plugin-nonplugin".');
    });

    it('imports and instantiates a plugin', () => {
      fixtures.push(copyFixtureToMock('plugin-exported-definition', 'boost-plugin-definition'));

      const plugin = loader.importModule('definition');

      expect(plugin).toBeInstanceOf(Plugin);
      expect(plugin.name).toBe('definition');
      expect(plugin.moduleName).toBe('boost-plugin-definition');
    });

    it('can customize type name', () => {
      fixtures.push(copyFixtureToMock('plugin-exported-definition', 'boost-addon-definition'));

      loader.typeName = 'addon';

      const plugin = loader.importModule('definition');

      expect(plugin.name).toBe('definition');
      expect(plugin.moduleName).toBe('boost-addon-definition');
    });

    it('supports scopeds', () => {
      fixtures.push(copyFixtureToMock('plugin-exported-definition', '@boost/plugin-scoped'));
      loader.tool.options.scoped = true;

      const plugin = loader.importModule('scoped');

      expect(plugin.name).toBe('scoped');
      expect(plugin.moduleName).toBe('@boost/plugin-scoped');
    });
  });

  describe('importModuleFromOptions()', () => {
    it('errors if key doesnt exist', () => {
      expect(() => {
        loader.importModuleFromOptions({});
      }).toThrowError('A "plugin" property must exist when loading through an options object.');
    });

    it('errors if key is not a string', () => {
      expect(() => {
        loader.importModuleFromOptions({ plugin: [] });
      }).toThrowError('A "plugin" property must exist when loading through an options object.');
    });

    it('imports and instantiates a plugin with options', () => {
      fixtures.push(copyFixtureToMock('plugin-exported-definition', 'boost-plugin-definition-with-opts'));

      const plugin = loader.importModuleFromOptions({
        foo: 'bar',
        plugin: 'definition-with-opts',
      });

      expect(plugin.options).toEqual({ foo: 'bar' });
      expect(plugin.name).toBe('definition-with-opts');
      expect(plugin.moduleName).toBe('boost-plugin-definition-with-opts');
    });
  });

  describe('loadModules()', () => {
    it('errors if an unsupported value is passed', () => {
      expect(() => {
        loader.loadModules([123]);
      }).toThrowError('Invalid plugin. Must be a class instance or a module that exports a class definition.');
    });

    it('returns an empty array if no values', () => {
      expect(loader.loadModules()).toEqual([]);
      expect(loader.loadModules([])).toEqual([]);
    });

    it('supports class instances', () => {
      const plugins = [
        createPlugin('foo'),
        createPlugin('bar'),
        createPlugin('baz'),
      ];

      expect(loader.loadModules(plugins)).toEqual(plugins);
    });

    it('supports string names', () => {
      fixtures.push(copyFixtureToMock('plugin-exported-definition', 'boost-plugin-foo'));
      fixtures.push(copyFixtureToMock('plugin-exported-definition', 'boost-plugin-bar'));
      fixtures.push(copyFixtureToMock('plugin-exported-definition', 'boost-plugin-baz'));

      expect(loader.loadModules([
        'foo',
        'bar',
        'baz',
      ])).toEqual([
        createPlugin('foo'),
        createPlugin('bar'),
        createPlugin('baz'),
      ]);
    });

    it('supports options objects', () => {
      fixtures.push(copyFixtureToMock('plugin-exported-definition', 'boost-plugin-foo'));
      fixtures.push(copyFixtureToMock('plugin-exported-definition', 'boost-plugin-bar'));
      fixtures.push(copyFixtureToMock('plugin-exported-definition', 'boost-plugin-baz'));

      expect(loader.loadModules([
        { plugin: 'foo' },
        { plugin: 'bar' },
        { plugin: 'baz' },
      ])).toEqual([
        createPlugin('foo'),
        createPlugin('bar'),
        createPlugin('baz'),
      ]);
    });

    it('supports all 3 at once', () => {
      fixtures.push(copyFixtureToMock('plugin-exported-definition', 'boost-plugin-bar'));
      fixtures.push(copyFixtureToMock('plugin-exported-definition', 'boost-plugin-baz'));

      expect(loader.loadModules([
        createPlugin('foo'),
        'bar',
        { plugin: 'baz' },
      ])).toEqual([
        createPlugin('foo'),
        createPlugin('bar'),
        createPlugin('baz'),
      ]);
    });
  });
});