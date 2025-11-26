---
title: Pseudocode Blocks
date: 2025-11-25
publish: True
---

You can render LaTeX-style pseudocode by wrapping the content in a fenced code block tagged with `pseudo`.

```pseudo
\begin{algorithm}
\caption{Find in BST}
\begin{algorithmic}
    \Function{FIND}{$root, x$}
        \If{$root == Null$}
            \State \Return \textbf{Null}
        \EndIf
        \If{$root.key == x$}
            \State \Return $root$
        \EndIf
        \If{$root.key > x$}
            \State \Return \Call{FIND}{$root.left, x$}
        \EndIf
        \State \Return \Call{FIND}{$root.right, x$}
    \EndFunction
\end{algorithmic}
\end{algorithm}
```

- Uses [`pseudocode.js`](https://github.com/SaswatPadhi/pseudocode.js) under the hood with line numbers and captions enabled by default.
- Falls back to the original code block if the renderer encounters invalid syntax.
- Styling inherits the current theme colors; math notation is available via the existing KaTeX support.

## Function plots

Render interactive graphs with [`function-plot`](https://www.npmjs.com/package/function-plot) by placing JSON options inside a `functionplot` fence. The options map directly to the library API (`data.fn` strings are expressions).

```functionplot
{
  "title": "y = sin(x)",
  "grid": true,
  "xAxis": { "domain": [-6.28, 6.28] },
  "yAxis": { "domain": [-1.5, 1.5] },
  "data": [
    { "fn": "sin(x)" }
  ]
}
```

- If the JSON is invalid, the page shows an inline error instead of breaking the build.
- Width adapts to the container; set `height` in the JSON when you need a specific canvas size.
