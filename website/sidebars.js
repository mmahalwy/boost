/* eslint-disable sort-keys */

module.exports = {
  docs: [
    'index',
    {
      type: 'category',
      label: 'Packages',
      collapsed: false,
      items: [
        'args',
        'cli',
        {
          type: 'category',
          label: 'Common utilities',
          items: [
            'common',
            'common/contract',
            'common/path',
            'common/path-resolver',
            'common/project',
          ],
        },
        'crash',
        'debug',
        'decorators',
        'event',
        'log',
        'pipeline',
        'plugin',
        'terminal',
        'translate',
      ],
    },
    {
      type: 'link',
      label: 'Changelog',
      href: 'https://github.com/milesj/boost/blob/master/CHANGELOG.md',
    },
  ],
};