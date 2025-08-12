import * as vscode from "vscode";
import ColorMode from "./colorMode";
import GutterIconManager from "./gutterIconManager";
import TextMateLoader from "./textMateLoader";
import { ThemeColor } from "vscode";

export default class Settings {
    public readonly TextMateLoader = new TextMateLoader();
    public readonly bracketDecorations: Map<string, vscode.TextEditorDecorationType>;
    public readonly colorMode: ColorMode;
    public readonly contextualParsing: boolean;
    public readonly forceIterationColorCycle: boolean;
    public readonly forceUniqueOpeningColor: boolean;
    public readonly regexNonExact: RegExp;
    public readonly timeOutLength: number;
    public readonly highlightActiveScope: boolean;
    public readonly showVerticalScopeLine: boolean;
    public readonly showHorizontalScopeLine: boolean;
    public readonly showBracketsInGutter: boolean;
    public readonly showBracketsInRuler: boolean;
    public readonly scopeLineRelativePosition: boolean;
    public readonly colors: string[];
    public readonly unmatchedScopeColor: string;
    public readonly excludedLanguages: Set<string>;
    public isDisposed = false;
    private readonly gutterIcons: GutterIconManager;
    private readonly activeBracketCSSElements: string[][];
    private readonly activeScopeLineCSSElements: string[][];
    private readonly activeScopeLineCSSBorder: string;
    private readonly rulerPosition: string;
    constructor(
    ) {
        const workspaceColors = vscode.workspace.getConfiguration("workbench.colorCustomizations", undefined);
        this.gutterIcons = new GutterIconManager();

        const configuration = vscode.workspace.getConfiguration("bracket-pair-colorizer-x", undefined);
        const activeScopeCSS = configuration.get("activeScopeCSS") as string[];

        if (!Array.isArray(activeScopeCSS)) {
            throw new Error("activeScopeCSS is not an array");
        }

        this.activeBracketCSSElements = activeScopeCSS.map((e) =>
            [e.substring(0, e.indexOf(":")).trim(),
            e.substring(e.indexOf(":") + 1).trim()]);

        const scopeLineCSS = configuration.get("scopeLineCSS") as string[];

        if (!Array.isArray(scopeLineCSS)) {
            throw new Error("scopeLineCSS is not an array");
        }

        this.activeScopeLineCSSElements = scopeLineCSS.map((e) =>
            [e.substring(0, e.indexOf(":")).trim(),
            e.substring(e.indexOf(":") + 1).trim()]);

        const borderStyle = this.activeScopeLineCSSElements.filter((e) => e[0] === "borderStyle");
        if (borderStyle && borderStyle[0].length === 2) {
            this.activeScopeLineCSSBorder = borderStyle[0][1];
        }
        else {
            this.activeScopeLineCSSBorder = "none";
        }

        let highlightActiveScope = configuration.get("highlightActiveScope");
        if (typeof highlightActiveScope !== "boolean") {
            vscode.window.showWarningMessage("[BracketPairColorizerX] 配置项 highlightActiveScope 非布尔值，已使用默认值 true。");
            highlightActiveScope = true;
        }
        this.highlightActiveScope = highlightActiveScope as boolean;

        let showVerticalScopeLine = configuration.get("showVerticalScopeLine");
        if (typeof showVerticalScopeLine !== "boolean") {
            vscode.window.showWarningMessage("[BracketPairColorizerX] 配置项 showVerticalScopeLine 非布尔值，已使用默认值 true。");
            showVerticalScopeLine = true;
        }
        this.showVerticalScopeLine = showVerticalScopeLine as boolean;

        let showHorizontalScopeLine = configuration.get("showHorizontalScopeLine");
        if (typeof showHorizontalScopeLine !== "boolean") {
            vscode.window.showWarningMessage("[BracketPairColorizerX] 配置项 showHorizontalScopeLine 非布尔值，已使用默认值 false。");
            showHorizontalScopeLine = false;
        }
        this.showHorizontalScopeLine = showHorizontalScopeLine as boolean;

        let scopeLineRelativePosition = configuration.get("scopeLineRelativePosition");
        if (typeof scopeLineRelativePosition !== "boolean") {
            vscode.window.showWarningMessage("[BracketPairColorizerX] 配置项 scopeLineRelativePosition 非布尔值，已使用默认值 false。");
            scopeLineRelativePosition = false;
        }
        this.scopeLineRelativePosition = scopeLineRelativePosition as boolean;

        let showBracketsInGutter = configuration.get("showBracketsInGutter");
        if (typeof showBracketsInGutter !== "boolean") {
            vscode.window.showWarningMessage("[BracketPairColorizerX] 配置项 showBracketsInGutter 非布尔值，已使用默认值 true。");
            showBracketsInGutter = true;
        }
        this.showBracketsInGutter = showBracketsInGutter as boolean;

        let showBracketsInRuler = configuration.get("showBracketsInRuler");
        if (typeof showBracketsInRuler !== "boolean") {
            vscode.window.showWarningMessage("[BracketPairColorizerX] 配置项 showBracketsInRuler 非布尔值，已使用默认值 false。");
            showBracketsInRuler = false;
        }
        this.showBracketsInRuler = showBracketsInRuler as boolean;

        let rulerPosition = configuration.get("rulerPosition");
        if (typeof rulerPosition !== "string") {
            vscode.window.showWarningMessage("[BracketPairColorizerX] 配置项 rulerPosition 非字符串，已使用默认值 'Full'。");
            rulerPosition = "Full";
        }
        this.rulerPosition = rulerPosition as string;

        let unmatchedScopeColor = configuration.get("unmatchedScopeColor");
        if (typeof unmatchedScopeColor !== "string") {
            vscode.window.showWarningMessage("[BracketPairColorizerX] 配置项 unmatchedScopeColor 非字符串，已使用默认值 '#ff0000'。");
            unmatchedScopeColor = "#ff0000";
        }
        this.unmatchedScopeColor = unmatchedScopeColor as string;

        let forceUniqueOpeningColor = configuration.get("forceUniqueOpeningColor");
        if (typeof forceUniqueOpeningColor !== "boolean") {
            vscode.window.showWarningMessage("[BracketPairColorizerX] 配置项 forceUniqueOpeningColor 非布尔值，已使用默认值 false。");
            forceUniqueOpeningColor = false;
        }
        this.forceUniqueOpeningColor = forceUniqueOpeningColor as boolean;

        let forceIterationColorCycle = configuration.get("forceIterationColorCycle");
        if (typeof forceIterationColorCycle !== "boolean") {
            vscode.window.showWarningMessage("[BracketPairColorizerX] 配置项 forceIterationColorCycle 非布尔值，已使用默认值 false。");
            forceIterationColorCycle = false;
        }
        this.forceIterationColorCycle = forceIterationColorCycle as boolean;

        let colorModeValue = configuration.get("colorMode");
        this.colorMode = (ColorMode as any)[colorModeValue as string];
        if (typeof this.colorMode !== "number") {
            vscode.window.showWarningMessage("[BracketPairColorizerX] 配置项 colorMode 无法解析，已使用默认值 0。");
            this.colorMode = 0;
        }

        let colors = configuration.get("colors") as string[];
        if (!Array.isArray(colors)) {
            vscode.window.showWarningMessage("[BracketPairColorizerX] 配置项 colors 非数组，已使用默认值 ['#ff0000','#00ff00','#0000ff']。");
            colors = ["#ff0000", "#00ff00", "#0000ff"];
        }
        this.colors = colors as string[];

        this.bracketDecorations = this.createBracketDecorations();

        let excludedLanguages = configuration.get("excludedLanguages") as string[];
        if (!Array.isArray(excludedLanguages)) {
            vscode.window.showWarningMessage("[BracketPairColorizerX] 配置项 excludedLanguages 非数组，已使用默认值 []。");
            excludedLanguages = [];
        }
        this.excludedLanguages = new Set(excludedLanguages);
    }

    public dispose() {
        if (!this.isDisposed) {
            this.bracketDecorations.forEach((decoration) => {
                decoration.dispose();
            });
            this.bracketDecorations.clear();
            this.gutterIcons.Dispose();
            this.isDisposed = true;
        }
    }

    public createGutterBracketDecorations(color: string, bracket: string) {
        const gutterIcon = this.gutterIcons.GetIconUri(bracket, color);
        const decorationSettings: vscode.DecorationRenderOptions = {
            gutterIconPath: gutterIcon,
        };
        const decoration = vscode.window.createTextEditorDecorationType(decorationSettings);
        return decoration;
    }

    public createRulerBracketDecorations(color: string) {
        const decorationSettings: vscode.DecorationRenderOptions = {
            overviewRulerColor: color.includes(".") ? new ThemeColor(color) : color,
            overviewRulerLane: vscode.OverviewRulerLane[this.rulerPosition as keyof typeof vscode.OverviewRulerLane],
        };
        const decoration = vscode.window.createTextEditorDecorationType(decorationSettings);
        return decoration;
    }

    public createScopeBracketDecorations(color: string) {
        const decorationSettings: vscode.DecorationRenderOptions = {
            rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
        };

        let opacity = "1";
        for (const element of this.activeBracketCSSElements) {
            const key = element[0];
            const value = element[1];
            if (key.includes("Color")) {
                const cssColor = value.replace("{color}", color);
                (decorationSettings as any)[key] = cssColor.includes(".") ? new ThemeColor(cssColor) : cssColor;
                continue;
            }

            if (key === "opacity") {
                opacity = value;
            }
            else {
                (decorationSettings as any)[key] = value;
            }
        };

        let borderColorType = typeof (decorationSettings["backgroundColor"]);
        if (borderColorType === "undefined") {
            decorationSettings["backgroundColor"] = "; opacity: " + opacity;
        }
        else if (borderColorType === "string") {
            decorationSettings["backgroundColor"] += "; opacity: " + opacity;
        }

        const decoration = vscode.window.createTextEditorDecorationType(decorationSettings);
        return decoration;
    }

    public createScopeLineDecorations(
        color: string, top = true, right = true, bottom = true, left = true, yOffset?: number) {
        const decorationSettings: vscode.DecorationRenderOptions = {
            rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
        };

        const none = "none";
        const topBorder = top ? this.activeScopeLineCSSBorder : none;
        const rightBorder = right ? this.activeScopeLineCSSBorder : none;
        const botBorder = bottom ? this.activeScopeLineCSSBorder : none;
        const leftBorder = left ? this.activeScopeLineCSSBorder : none;

        let opacity = "1";
        for (const element of this.activeScopeLineCSSElements) {
            const key = element[0];
            const value = element[1];
            if (key.includes("Color")) {
                const cssColor = value.replace("{color}", color);
                (decorationSettings as any)[key] = cssColor.includes(".") ? new ThemeColor(cssColor) : cssColor;
                continue;
            }

            if (key === "opacity") {
                opacity = value;
            }
            else {
                (decorationSettings as any)[key] = value;
            }
        }

        let borderColorType = typeof (decorationSettings["borderColor"]);
        if (borderColorType === "undefined") {
            decorationSettings["borderColor"] = "; opacity: " + opacity;
        }
        else if (borderColorType === "string") {
            decorationSettings["borderColor"] += "; opacity: " + opacity;
        }

        let borderStyle = `${topBorder} ${rightBorder} ${botBorder} ${leftBorder}`;

        if (yOffset !== undefined && yOffset !== 0) {
            borderStyle += "; transform: translateY(" + yOffset * 100 + "%); z-index: 1;";
        }

        // tslint:disable-next-line:no-string-literal
        decorationSettings["borderStyle"] = borderStyle;

        const decoration = vscode.window.createTextEditorDecorationType(decorationSettings);
        return decoration;
    }

    private createBracketDecorations(): Map<string, vscode.TextEditorDecorationType> {
        const decorations = new Map<string, vscode.TextEditorDecorationType>();

        for (const color of this.colors) {
            const decoration = vscode.window.createTextEditorDecorationType({
                color: color.includes(".") ? new ThemeColor(color) : color,
                rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
            });
            decorations.set(color, decoration);
        }

        const unmatchedDecoration = vscode.window.createTextEditorDecorationType({
            color: this.unmatchedScopeColor, rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
        });
        decorations.set(this.unmatchedScopeColor, unmatchedDecoration);

        return decorations;
    }
}
