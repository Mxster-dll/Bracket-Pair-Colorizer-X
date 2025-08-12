# Bracket Pair Colorizer X

"BPC 正在死去，VSC 尚未到来。但世界不会再度灼烧，因为你将登上「神」之座。"

## 起因

由于 VS Code 发现用户对于更好的括号显示呼声很高，也出现了很多优秀的插件，VS Code 决定将 Bracket Pair Colorizer 2(BPC2) 的功能加入 VS Code 的核心功能。所以在 2023 年 11 月 4 日，Bracket Pair Colorizer 2 的作者 CoenraadS 将项目设为了 “achieved”，从此 Bracket Pair Colorizer 2 不再维护。

但是 VS Code 内置的括号对着色功能并不如 Bracket Pair Colorizer 2 全，比如一开始只支持括号对的着色，并不支持括号对 Scope line 。我在 VS Code 的仓库中搜索了一下，发现有关于括号对 Scope line 的 issue。我也发现很多人和我一样，都觉得 Bracket Pair Colorizer 2 的这个功能很好。随着我继续往后查看这个 issue，我惊喜地发现它已经获得了 20 个赞同，进入了 backlog。我迫不及待地打开 VS Code 体验了一下，但体验只能说是差强人意。

## 问题

- Scope line 对于括号的引导不足，具体来说是 Scope line 并没有延伸到括号的正下（上）方，而是把括号正下（上）方空了出来。这样在视觉方面会显得 Scope line 的包络感不强，观感也不好。
- 线的样式不支持自定义，1px 宽度的 Scope line 实在是效果不佳。
- VS Code 内置的括号对着色只支持六种颜色，这完全是可以避免的。
- 这六种颜色还是通过 “foreground1-6” 给出的，这导致在添加颜色或修改颜色顺序的时候操作会十分繁琐。
- 在 Gutter 中显示括号的功能目前也没实现。

当然，这是完全可以理解的，VS Code 是一个相当庞大的项目，不能总过分依赖常识。Bracket Pair Colorizer 2 功能的全实现一定是伴随着相当长的周期的。但是在 Bracket Pair Colorizer 2 不再维护、VS Code 没有完全支持的时间我们该如何度过？即使 Bracket Pair Colorizer 2 已经弃用，但也不是强制不能用，一开始我就是依赖于此。可是大概在 2025 年年初，似乎由于 VS Code 更改了 vscode-textmate 的位置，导致了 Bracket Pair Colorizer 2 不再可用。

## 致歉

由于本人实在不太会用 GitHub，同时英语也实在很烂，我不确定 GitHub 上到底有没有人让 Bracket Pair Colorizer 2 可以重新使用，反正我是没有找到。因此，我决定自己制作。不过本人没有过 TypeScript 的开发经历，同时又由于一些原因，时间上有点赶，学习 TypeScript 来不及。所以暂时本人只会也只能把包放到项目的文件夹下，这导致了此扩展有些笨重。

原则上本人甚至愿意放弃由本人编写部分的版权，（因为修改 Bracket Pair Colorizer 2 最根本的目的是方便自己），但是考虑到本人的 TypeScript 编程水平实在太差，仅冠以第二作者的名头，说明不是全部由 CoenraadS 开发，防止本人的抽象派代码抹黑 CoenraadS。给此项目取名 Bracket Pair Colorizer 2 也是为此，表明这不是 Bracket Pair Colorizer 2 的延伸，不是 CoenraadS 本人的续作，以此保证 CoenraadS 的名声不受污染。

我还调整了 Bracket Pair Colorizer 2 的基础设置，使之更美观，但美毕竟很主观，如果不符合您的审美，我很抱歉。

Bracket Pair Colorizer 2 的设置方式我应该几乎完全没动，完全可以沿用 Bracket Pair Colorizer 2 的设置，唯一的区别就是要把 “bracket-pair-colorizer-2” 改成 “bracket-pair-colorizer-x”。

本人的英语实在很烂，如果可以请一定要读中文版的 README_ZH.md。英文版的 README.md 几乎完全由中文版使用微软翻译而来，如果翻译的不太准，我很抱歉。

## 开源

MIT 协议要求保留作者信息我是知道的，但是我不知道怎样保留，只能凭感觉来：
本人在此声明，此项目几乎完全沿用 CoenraadS 基于 MIT 协议开源的 [Bracket Pair Colorizer 2](https://github.com/CoenraadS/Bracket-Pair-Colorizer-2) 项目的代码。如果可以，本项目继续基于 MIT 协议开源。

Mxster
2025.08.12
