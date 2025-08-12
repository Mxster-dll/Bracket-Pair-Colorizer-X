import { commands, ExtensionContext, window, workspace, extensions, env, Uri, ConfigurationTarget, MessageItem } from "vscode";
import DocumentDecorationManager from "./documentDecorationManager";

export function activate(context: ExtensionContext) {

    let documentDecorationManager = new DocumentDecorationManager();

    context.subscriptions.push(
        extensions.onDidChange(() => restart()),
        commands.registerCommand("bracket-pair-colorizer-x.expandBracketSelection", () => {
            const editor = window.activeTextEditor;
            if (!editor) { return; }
            documentDecorationManager.expandBracketSelection(editor);
        }),

        commands.registerCommand("bracket-pair-colorizer-x.undoBracketSelection", () => {
            const editor = window.activeTextEditor;
            if (!editor) { return; }
            documentDecorationManager.undoBracketSelection(editor);
        }),

        workspace.onDidChangeConfiguration((event) => {
            if (event.affectsConfiguration("bracket-pair-colorizer-x") ||
                event.affectsConfiguration("editor.lineHeight") ||
                event.affectsConfiguration("editor.fontSize")

            ) {
                restart();
            }
        }),

        window.onDidChangeVisibleTextEditors(() => {
            documentDecorationManager.updateAllDocuments();
        }),
        workspace.onDidChangeTextDocument((event) => {
            if (event.contentChanges.length > 0) {
                documentDecorationManager.onDidChangeTextDocument(event);
            }
        }),
        workspace.onDidCloseTextDocument((event) => {
            documentDecorationManager.onDidCloseTextDocument(event);
        }),
        workspace.onDidOpenTextDocument((event) => {
            documentDecorationManager.onDidOpenTextDocument(event);
        }),
        window.onDidChangeTextEditorSelection((event) => {
            documentDecorationManager.onDidChangeSelection(event);
        }),
    );

    documentDecorationManager.updateAllDocuments();

    function restart() {
        documentDecorationManager.Dispose();
        documentDecorationManager = new DocumentDecorationManager();
        documentDecorationManager.updateAllDocuments();
    }
}

// tslint:disable-next-line:no-empty
export function deactivate() {
}
