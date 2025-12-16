/*
 * This file is licensed under the MIT license.
 * See the "LICENSE" file for more details.
 */

import { defineConfig } from "rollup";
import swc from "@rollup/plugin-swc";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

const isProduction = process.env["BUILD"] === "production";
export default defineConfig({
    external: "vscode",
    input: "src/main.ts",
    jsx: false,
    output: {
        file: "dist/extension.js",
        format: "esm",
        sourcemap: true,
        minifyInternalExports: isProduction,
        interop: "auto",
        generatedCode: "es2015",
    },
    plugins: [
        swc({
            swc: {
                envName: isProduction ? "production" : "development",
                jsc: {
                    target: "es2022",
                },
            },
        }),
        commonjs(),
        nodeResolve(),
        !isProduction
            ? false
            : terser({
                  ecma: 2020,
                  module: true,
              }),
    ],
});
