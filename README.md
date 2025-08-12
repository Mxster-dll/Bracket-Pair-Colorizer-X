# Bracket Pair Colorizer X

"BPC is dying, VSC is not yet coming. But the world will not burn again, for you will ascend to the throne of God."

## CauseSince

VS Code has found that users are clamouring for better parentheses and there are many great plugins, VS Code decided to add the functionality of Bracket Pair Colorizer 2 (BPC2) to the core functionality of VS Code. So on 4th November 2023, CoenraadS, the author of Bracket Pair Colorizer 2, set the project to "achieved", and Bracket Pair Colorizer 2 is no longer maintained.

However, VS Code's built-in bracket pair shading function is not as complete as Bracket Pair Colorizer 2, for example, it only supports bracket pair shading at the beginning, but does not support bracket pair scope line. I searched the VS Code repository and found an issue about parentheses on the scope line. I also found that many people, like me, found this feature of Bracket Pair Colorizer 2 to be good. As I continued to check this issue, I was pleasantly surprised to find that it had received 20 upvotes and made it to the backlog. I couldn't wait to open VS Code and experience it, but the experience was nothing short of satisfactory.

## Problem

- Scope line does not guide parentheses enough, specifically the scope line does not extend directly to the bottom (top) of the parentheses, but leaves the bottom (top) of the parentheses empty. In this way, the visual aspect of the scope line will not be strong in enveloping and not look good.
- The style of the line is not customisable, and the 1px wide scope line is really ineffective.
- VS Code's built-in parentheses only support six colours, which is completely avoidable.
- These six colours are still given by "foreground1-6", which makes it cumbersome to add colours or change the colour order.
- The ability to display parentheses in gutter is also not currently implemented.

Of course, this is completely understandable, VS Code is a fairly large project and cannot always rely too much on common sense. The full implementation of the Bracket Pair Colorizer 2 feature must have been accompanied by a fairly long cycle. But how do we spend the time when Bracket Pair Colorizer 2 is no longer maintained and VS Code is not fully supported? Even though Bracket Pair Colorizer 2 has been deprecated, it's not mandatory that it can't be used, I relied on it in the beginning. However, around the beginning of 2025, it seems that Bracket Pair Colorizer 2 will no longer be available due to VS Code changing the location of vscode-textmate.

## ApologiesAs

I am not particularly familiar with GitHub and my English is quite poor, I am unsure if anyone on GitHub can reuse Bracket Pair Colorizer 2, though I have not found it regardless. Consequently, I decided to create it myself. However, I have no experience with TypeScript development, and for various reasons, I am somewhat hurried and cannot learn TypeScript in time. Thus, for the moment, I can only place the package under the project folder, which makes this extension somewhat cumbersome.

In principle, I am even willing to relinquish the copyright of the portion written by me (as the primary aim of modifying Bracket Pair Colorizer 2 is to assist myself), but considering my poor TypeScript programming skills, I have only used the name of the second author, implying that not all of it was developed by CoenraadS to prevent my abstract code from discrediting CoenraadS. The name Bracket Pair Colorizer 2 has been assigned to this project, indicating that it is neither an extension of Bracket Pair Colorizer 2 nor a sequel to CoenraadS himself, as a means to ensure that CoenraadS's reputation remains untarnished.

I also modified the base settings of Bracket Pair Colorizer 2 to make it more visually appealing, but beauty is subjective after all, and I apologise if it does not align with your aesthetic.

I believe I have left the Bracket Pair Colorizer 2 settings almost completely untouched, and I can fully abide by the settings of Bracket Pair Colorizer 2, with the only exception being the change from "bracket-pair-colorizer-2" to "bracket-pair-colorizer-x".

My English is quite poor; if possible, please ensure you read the Chinese version of README_ZH.md. The English version of README.md is almost entirely translated by Microsoft from the Chinese version, and I apologise if the translation is not very accurate.

## Open Source

I understand that the MIT licence requires the retention of author information, yet I do not know how to maintain it; I can only rely on instinct:
I hereby declare that this project is almost entirely based on the code of the [Bracket Pair Colorizer 2](https://github.com/CoenraadS/Bracket-Pair-Colorizer-2) project which is open sourced by CoenraadS under the MIT licence. If feasible, this project will remain open sourced under the MIT licence.

Mxster
2025.08.12
