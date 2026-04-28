# JavaScript Games

A collection of browser-based JavaScript games built as a learning exercise.

**[Play online](https://talvarez2.github.io/JavaScriptGames/)**

## Games

### Memory Game

A card-matching game where you flip cards to find pairs of matching tech logos (Python, React, C++, GitHub, Vim, Arch Linux). Cards are shuffled each round. Match all 6 pairs to win. Includes keyboard navigation and screen reader support.

## Running Locally

No build tools required. Open `index.html` in a browser, or use a local server:

```sh
npx serve .
```

## Project Structure

```
index.html          - Landing page with links to games
style.css           - Landing page styles
memoryGame/
  memoryGame.html   - Memory game page
  style.css         - Memory game styles
  app.js            - Memory game logic
```

## Technologies

- HTML, CSS, JavaScript (vanilla, no frameworks)
- Hosted on GitHub Pages

## Accessibility

- Cards are focusable buttons with descriptive `aria-label` attributes
- Score updates use `aria-live="polite"` for screen reader announcements
- Card flips and match results are announced via an `aria-live="assertive"` region
- Focus-visible outlines on all interactive elements
- Responsive grid layout for smaller screens
