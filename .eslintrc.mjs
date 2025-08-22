/***********************************************************
 ESLint config for Standard Otter (TypeScript + Electron)
 Converted to ESM (.mjs)
 ***********************************************************/
export default {
	root          : true,
	env           : {
		browser: true,
		node   : true,
		es2021 : true,
	},
	parser        : '@typescript-eslint/parser',
	parserOptions : {
		ecmaVersion: 'latest',
		sourceType : 'module',
	},
	plugins       : ['@typescript-eslint'],
	extends       : [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	],
	globals       : {
		monaco: 'readonly',
	},
	ignorePatterns: [
		'node_modules/',
		'release/',
		'css/',
		'js/', // built outputs
	],
	overrides     : [
		{
			files        : ['*.cjs', 'rollup.config.mjs'],
			env          : {node: true},
			parserOptions: {sourceType: 'script'},
			rules        : {
				// Allow CommonJS style in build scripts
				'@typescript-eslint/no-var-requires': 'off',
			},
		},
		{
			files: ['ts/**/*.ts'],
			rules: {
				// Project preferences and safe defaults
				'@typescript-eslint/no-explicit-any'              : 'off',
				'@typescript-eslint/explicit-function-return-type': 'off',
				'@typescript-eslint/no-unused-vars'               : [
					'warn',
					{argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true},
				],
				// Keep existing code style; avoid noisy const refactors
				'prefer-const': 'off',
			},
		},
	],
};
