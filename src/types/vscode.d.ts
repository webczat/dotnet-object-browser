/*
 * This file is licensed under the MIT license.
 * See the "LICENSE" file for more details.
 */

import type {Extension} from "vscode";
import type {CSharpExtensionApi} from "../csharpExtensionApi";

declare module "vscode" {
    namespace extensions {
function getExtension(extensionId: "ms-dotnettools.csharp"): Extension<CSharpExtensionApi>;
    }
}
