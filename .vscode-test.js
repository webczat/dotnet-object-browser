/*
 * This file is licensed under the MIT license.
 * See the "LICENSE" file for more details.
 */

import { defineConfig } from "@vscode/test-cli";

export default defineConfig({
    files: ["out/tests/**/*.js"],
    platform: "desktop",
    version: "1.107.0",
    coverage: {
        output: "out/coverage",
    },
});
