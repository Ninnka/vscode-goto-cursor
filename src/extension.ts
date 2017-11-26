'use strict';

import * as vscode from 'vscode';
import { Selection } from 'vscode';

// * 准备变量
let editor: vscode.TextEditor;
let selection: vscode.Selection;

// * 更新所在行和列
const revealLine = (line: number = 0, col: number = 0) => {
    let reviewType: vscode.TextEditorRevealType = vscode.TextEditorRevealType.InCenter;
    if (line === vscode.window.activeTextEditor.selection.active.line) {
        reviewType = vscode.TextEditorRevealType.InCenterIfOutsideViewport;
    }
    let newSe = new vscode.Selection(line, col, line, col);
    vscode.window.activeTextEditor.selection = newSe;
    vscode.window.activeTextEditor.revealRange(newSe, reviewType);
}

// * this method is called when your extension is activated
// * your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    

    let useGotoCursor: vscode.Disposable = vscode.commands.registerCommand('extension.gotoCursor', () => {
        editor = vscode.window.activeTextEditor;
        if (editor) {
            selection = editor.selection;
        }
        if (!selection) {
            return;
        }
        let lineSaved: number = selection && selection.active ? selection.active.line : 0;
        let colSaved: number = selection && selection.active ? selection.active.character + 1 : 0;
        revealLine(lineSaved, colSaved);
    });

    context.subscriptions.push(useGotoCursor);
}

// * this method is called when your extension is deactivated
export function deactivate() {}
