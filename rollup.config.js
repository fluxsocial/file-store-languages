import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { string } from 'rollup-plugin-string';
import json from '@rollup/plugin-json';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'index.js',
	output: {
		sourcemap: true,
		format: 'cjs',
		file: 'build/bundle.js'
	},
	plugins: [
		string({
			include: 'build/*.js'
		}),
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: false,
			dedupe: ['svelte']
		}),
		commonjs(),
		json()
	],
	watch: {
		clearScreen: false
	}
}
