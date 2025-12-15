/*
 * This file is licensed under the MIT license.
 * See the "LICENSE" file for more details.
 */

import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import jsPlugin from "@eslint/js";
import tsPlugin from "typescript-eslint";
import simpleHeaderPlugin from "eslint-plugin-simple-header";
import mochaPlugin from "eslint-plugin-mocha";

export default defineConfig([
    globalIgnores(["dist/**/*", "out/**/*", ".vscode-test/**/*", "node_modules/**/*"]),
    {
        files: ["**/*.js", "**/*.ts"],
        languageOptions: {
            globals: globals.node,
            parserOptions: {
                projectService: true,
            },
        },
        plugins: {
            "simple-header": simpleHeaderPlugin,
        },
        extends: [jsPlugin.configs.recommended, tsPlugin.configs.recommendedTypeChecked],
        rules: {
            "simple-header/header": [
                "warn",
                {
                    text: ["This file is licensed under the MIT license.", 'See the "LICENSE" file for more details.'],
                },
            ],
        },
    },
    {
        files: ["tests/**/*.ts"],
        languageOptions: {
            globals: { ...globals.node, ...globals.mocha },
        },
        extends: [mochaPlugin.configs.recommended],
    },
]);
