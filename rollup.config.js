import { terser } from "rollup-plugin-terser";
import analyze from "rollup-plugin-analyzer";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import del from "rollup-plugin-delete";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import pkg from "./package.json";
import resolve from "@rollup/plugin-node-resolve";
import ts from "@rollup/plugin-typescript";
import typescript from "typescript";

module.exports = {
  input: "src/index.ts",
  output: [
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "esm" },
  ],
  plugins: [
    peerDepsExternal(),
    del({ targets: [`dist/`] }),
    ts({ typescript, tsconfig: './tsconfig.json', sourceMap: false }),
    babel({
      exclude: "node_modules/**", // only transpile our source code
      babelHelpers: "bundled",
    }),
    resolve({
      // Source: https://rollupjs.org/guide/en/#peer-dependencies
      moduleDirectory: ['node_modules'],
    }), // so Rollup can find `ms`
    commonjs(), // so Rollup can convert `ms` to an ES module
    terser(),
    analyze({
      hideDeps: true,
      summaryOnly: true,
      filter: (module) => /^\/src/.test(module.id),
    }),
  ],
};
