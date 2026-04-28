# AGENTS.md

## Project Overview

A collection of vanilla JavaScript browser games hosted on GitHub Pages. No build tools, frameworks, or dependencies.

## How to Run

Open `index.html` in a browser, or:

```sh
npx serve .
```

## Key Files

| File | Purpose |
|---|---|
| `index.html` | Landing page linking to all games |
| `style.css` | Landing page styles |
| `memoryGame/memoryGame.html` | Memory game page |
| `memoryGame/style.css` | Memory game styles |
| `memoryGame/app.js` | Memory game logic (card shuffle, flip, match) |

## Coding Conventions

- Vanilla HTML/CSS/JS only — no frameworks or build tools
- `const`/`let` over `var`; no globals
- Semantic HTML elements (`main`, `nav`, `h1`) with proper heading hierarchy
- Accessibility: `alt` text on images, `aria-live` for dynamic content, `aria-label` on landmark regions
- CSS: `box-sizing: border-box` reset, `system-ui` font stack, CSS Grid/Flexbox for layout
- Each game lives in its own directory with its own HTML, CSS, and JS files
- Script tags placed at end of `<body>` (no `defer`/`async` needed for inline scripts)
