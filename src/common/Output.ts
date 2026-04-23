"use strict";
import * as vscode from "vscode";

export class Output {

    private static outputChannel: vscode.OutputChannel;

    private static getChannel(): vscode.OutputChannel {
        if (!this.outputChannel) {
            this.outputChannel = vscode.window.createOutputChannel("Office");
        }
        return this.outputChannel;
    }

    public static debug(value: any) {
        this.getChannel().appendLine(`${value}`);
    }

    public static log(value: any, showLog = true) {
        const channel = this.getChannel();
        if (showLog) channel.show(true);
        channel.appendLine(`${value}`);
    }
}
