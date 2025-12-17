/*
 * This file is licensed under the MIT license.
 * See the "LICENSE" file for more details.
 */

import type { Extension } from "vscode";
import { type BaseExtensionExports, EXTENSION_ID } from "../csharpExtensionApi";

declare module "vscode" {
    namespace extensions {
        function getExtension(extensionId: typeof EXTENSION_ID): Extension<BaseExtensionExports | null>;
    }
}
