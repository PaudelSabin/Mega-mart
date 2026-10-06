# MegaMart

A pixel-exact recreation of the MegaMart e-commerce homepage from a Figma design, built with **React**, **TypeScript** and **Vite**.

The page is a fixed 1440px-wide layout. All sizes and positions come straight from the Figma "Landing Page" frame.

## What's on the page

- Top bar, header with search, and category pills
- Hero banner with carousel arrows and dots
- Smartphone product cards
- Top categories (round cards)
- Top electronics brands (Apple, Realme, Xiaomi banners)
- Daily essentials tiles
- Footer

## Tech stack

- React 18
- TypeScript
- Vite
- Plain CSS
- Hanken Grotesk font (via `@fontsource`)

No backend, API, database or state library.

## Getting started

You need [Node.js](https://nodejs.org/) 18 or newer.

```bash
# 1. Install the dependencies
npm install

# 2. Start the development server
npm run dev
```

Then open the address Vite prints (usually http://localhost:5173).

### Other commands

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Starts the dev server                         |
| `npm run build`   | Type-checks and builds the app into `dist/`   |
| `npm run preview` | Serves the built app locally                  |

## Project structure

```
megamart/
├── src/
│   ├── assets/
│   │   └── images/      # all product, category, brand and footer images
│   ├── App.tsx          # every component (header, cards, banners, footer)
│   ├── main.tsx         # app entry point
│   └── style.css        # all styles, commented class by class
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

## How the code is organised

- **`App.tsx`** holds all components in reading order: icons, search bar, top bar, header, navigation, hero banner, section header, product / category / brand / essential cards, footer, and finally `App`. Content is passed to the components as typed props.
- **`style.css`** has a comment above every class that says which part of the page it edits. Each value in pixels is taken from Figma.

## Notes

- The layout is designed for a 1440px-wide screen. On a narrower window the page scrolls sideways.
- Figma uses the HK Grotesk font. This project uses Hanken Grotesk, a very close match, so letter widths can differ by a few pixels.