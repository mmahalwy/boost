export default {
	module: '@beemo/dev',
	execute: {
		output: 'stream',
	},
	drivers: [
		'babel',
		'eslint',
		[
			'jest',
			{
				env: {
					NODE_ENV: 'test',
					BOOSTJS_ENV: 'test',
				},
			},
		],
		'prettier',
		[
			'typescript',
			{
				buildFolder: 'dts',
				declarationOnly: true,
			},
		],
	],
	settings: {
		decorators: true,
		node: true,
		react: true,
	},
};
