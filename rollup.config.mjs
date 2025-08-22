import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';

const externalNodeBuiltins = [
	'electron',
	'path',
	'url',
	'fs',
	'child_process',
	'os',
	'util',
	'events'
];

export default [
	// Main process bundle
	{
		input   : 'ts/main.ts',
		output  : {
			file     : 'js/main.js',
			format   : 'cjs',
			sourcemap: true
		},
		external: externalNodeBuiltins,
		plugins : [
			nodeResolve({preferBuiltins: true}),
			commonjs(),
			typescript({tsconfig: './tsconfig.json'})
		]
	},
	// Renderer bundle (editor and its dependencies)
	{
		input   : 'ts/editor.ts',
		output  : {
			file     : 'js/editor.js',
			format   : 'cjs',
			sourcemap: true
		},
		external: externalNodeBuiltins,
		plugins : [
			nodeResolve({browser: true, preferBuiltins: true}),
			commonjs(),
			typescript({tsconfig: './tsconfig.json'})
		]
	}
];
