/*
 * This file is licensed under the MIT license.
 * See the "LICENSE" file for more details.
 */

import * as vscode from "vscode";
import { type PartialResultParams, ProtocolRequestType, RequestType } from "vscode-languageclient/node";

/**
 * Identifier of the C# extension.
 */
export const EXTENSION_ID = "ms-dotnettools.csharp";

/**
 * Represents possible language server states.
 */
export enum ServerState {
    /**
     * The server has been stopped
     */
    Stopped = 0,

    /**
     * The server has been started.
     */
    Started = 1,

    /**
     * Project initialization has started.
     */
    ProjectInitializationStarted = 2,

    /**
     * Project initialization has finished.
     */
    ProjectInitializationComplete = 3,
}

/**
 * Interface implemented by server state change events.
 */
export interface ServerStateChangeEvent {
    /**
     * The new server state.
     */
    state: ServerState;

    /**
     * The workspace label.
     */
    workspaceLabel: string;
}

/**
 * Contains language server events.
 */
export interface LanguageServerEvents {
    /**
     * Emitted when server state changes.
     */
    readonly onServerStateChange: vscode.Event<ServerStateChangeEvent>;
}

/**
 * Interface returned by C# extension when activated in limited mode (untrusted workspace).
 */
export interface LimitedExtensionExports {
    /**
     * Returns true, indicating the extension is in limited activation mode.
     */
    isLimitedActivation: true;
}

/**
 * Interface returned by C# extension when it's in omnisharp mode.
 * Note it's mostly a dummy interface that should not be used.
 */
export interface OmnisharpExtensionExports {
    /**
     * Returns false, indicating the extension is not in limited activation mode.
     */
    isLimitedActivation: false;

    /**
     * Returns a promise that resolves when server initialization is completed.
     * @returns The promise that resolves when initialization completes
     */
    initializationFinished: () => Promise<void>;

    /**
     * Returns the extension log directory.
     * @returns The extension log directory
     */
    logDirectory: string;
}

export interface CSharpExtensionExports {
    /**
     * Returns false, indicating the extension is not in limited activation mode.
     */
    isLimitedActivation: false;

    /**
     * Returns a promise that resolves when server initialization is completed.
     * @returns The promise that resolves when initialization completes
     */
    initializationFinished: () => Promise<void>;

    /**
     * Returns the extension log directory.
     * @returns The extension log directory
     */
    logDirectory: string;

    /**
     * Determines the browser type.
     * @returns The promise resolving to a browser type or @constant {undefined}
     */
    determineBrowserType: () => Promise<string | undefined>;

    /**
     * Returns the experimental api.
     * @returns The experimental api
     */
    experimental: CSharpExtensionExperimentalExports;

    /**
     * Gets the directory for specified component.
     * @param componentName - The name of component
     * @returns The component folder
     */
    getComponentFolder: (componentName: string) => string;
}

/**
 * Contains the C# extension's experimental api.
 */
export interface CSharpExtensionExperimentalExports {
    /**
     * Sends a LSP request and waits for response.
     * @param type - The request type
     * @param params - Request parameters
     * @param token - Cancellation token
     * @returns Promise resolving to the response
     */
    sendServerRequest: <Params, Response, Error>(
        type: RequestType<Params, Response, Error>,
        params: Params,
        token: vscode.CancellationToken,
    ) => Promise<Response>;

    /**
     * Sends a LSP request and waits for response.
     * @param type - The request type
     * @param params - Request parameters
     * @param onProgress - Function callback used for progress monitoring
     * @param token - Cancellation token
     * @returns Promise resolving to the response
     */
    sendServerRequestWithProgress<
        Params extends PartialResultParams,
        Response,
        PartialResult,
        Error,
        RegistrationOptions,
    >(
        type: ProtocolRequestType<Params, Response, PartialResult, Error, RegistrationOptions>,
        params: Params,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onProgress: (p: PartialResult) => Promise<any>,
        token?: vscode.CancellationToken,
    ): Promise<Response>;

    /**
     * Allows listening to ls events.
     */
    languageServerEvents: LanguageServerEvents;
}

/**
 * Represents possible API variants C# extension can return.
 */
export type CSharpExtensionApi = CSharpExtensionExports | OmnisharpExtensionExports | LimitedExtensionExports | null;

/**
 * Check if extension is running in LSP mode and if we can use it's API.
 * @param api - The API object returned by extension
 * @returns true if the object represents extension in LSP mode
 */
export function isLsp(api: CSharpExtensionApi): api is CSharpExtensionExports {
    return !!api && !api.isLimitedActivation && (api as CSharpExtensionExports).experimental !== undefined;
}
