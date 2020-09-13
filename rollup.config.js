import analyze from 'rollup-plugin-analyzer';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

// import babel from 'rollup-plugin-babel';
// import external from 'rollup-plugin-peer-deps-external';
// import { terser } from 'rollup-plugin-terser';

module.exports = [
  {
    input: 'src/index.js',
    output: {
      name: 'use-automaton',
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      analyze({
        hideDeps: true,
        summaryOnly: true,
        filter: module => /^\/src/.test(module.id),
      }),
    ],
  },
  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/index.js',
    external: ['react', 'react-dom'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
];
