# RaagBlog

A single-page website sharing a set of Navaratri kritis on Durga, Lakshmi and Saraswathi, played on the Saraswathi Veena. It is a static rebuild of the original Google Site at <https://sites.google.com/view/raagblog/home>, with the recordings embedded as local MP4 videos.

The site is plain HTML, CSS and a little JavaScript. There is no build step, framework or package manager.

## Project structure

```
raag-blog/
├── index.html                  Page markup: header, intro, one card per kriti
├── .gitignore
└── assets/
    ├── css/style.css           All styling (colours, background, garlands, layout)
    ├── js/main.js              Pauses other videos when one starts playing
    ├── images/
    │   ├── garland.svg         Vertical garland tile for the page edges
    │   └── garland-top.svg     Draped garland tile hung under the header
    └── videos/                 The kriti recordings (MP4)
```

## 1. Viewing the site locally

Open `index.html` in any browser by double-clicking it.

If a browser refuses to play the videos from a local file, serve the folder instead:

```
python -m http.server 8000
```

Then visit <http://localhost:8000>.

## 2. How the page is laid out

1. **Header**: the "RaagBlog" title on a green-to-violet gradient. Its text size scales with the screen width (CSS `clamp()`), so it suits both phones and desktops.
2. **Header garland**: `.garland-top` sits under the header and repeats `garland-top.svg` across the full width.
3. **Side garlands**: `.garland-left` and `.garland-right` are fixed strips that repeat `garland.svg` down both edges. The right one is mirrored. They narrow at the 1000px and 480px breakpoints, and the content padding (`--side`) grows so the garlands never cover the cards.
4. **Intro**: one paragraph describing the collection.
5. **Track cards**: each `<article class="track">` holds a `<video>` followed by the kriti title, a Ragam/Talam list and a "Composed by" line.
6. **Background**: several green radial glows and a faint diagonal crosshatch, layered over a light-to-mid green gradient. The background stays fixed while the page scrolls.

There are no animations on the page.

## 3. Adding a new kriti

1. Copy the MP4 into `assets/videos/`. Name it in lowercase with hyphens, for example `sri-chakra-raja.mp4`.
2. In `index.html`, copy an existing `<article class="track">` block and paste it inside `<section class="tracks">`.
3. Update the copy:
   - `src` on the `<video>` tag → `assets/videos/your-file.mp4`
   - the `<h2>` → the kriti name
   - the `<dd>` values after `Ragam:` and `Talam:`
   - the `Composed by …` line
4. Refresh the browser. No other changes are needed, because `main.js` picks up every video automatically.

## 4. Editing text

All visible text is in `index.html`:

- Site title: the `<h1>` in `<header>` and the `<title>` in `<head>`
- Intro: the `<p>` inside `<section class="about">`. Also update the `<meta name="description">` to match.
- Kriti details: inside each `<article class="track">`

## 5. Changing colours and the background

- The main colours are defined at the top of `assets/css/style.css` under `:root`: `--green` and `--violet` (used for the header gradient and card accents), plus `--text`, `--muted` and `--card`.
- The background is the `background-image` list on `body`. Each `radial-gradient` is one soft patch of green, the two `repeating-linear-gradient` lines draw the crosshatch, and the final `linear-gradient` is the base.

## 6. Changing the garlands

- To change the flowers, edit the SVG files in `assets/images/`. They are small hand-written SVGs (circles and paths), so colours can be changed directly in the `fill` attributes.
- To change their size, edit `background-size` on `.garland` and `.garland-top` in `style.css`, including the overrides in the two `@media` blocks.
- To remove them, delete the three `garland` `<div>` elements near the top of `index.html`.

## 7. Video playback

- Videos use `preload="metadata"`, so only the duration and first frame load until someone presses play. This keeps the page light even though the files are large.
- `playsinline` keeps videos inside the page on iPhones instead of forcing fullscreen.
- `assets/js/main.js` pauses any other playing video when a new one starts, so recordings never overlap.

## 8. Putting the site under version control

```
git init
git add .
git commit -m "Initial RaagBlog site"
```

`.gitignore` excludes OS files (`Thumbs.db`, `.DS_Store`, `desktop.ini`), editor folders (`.vscode/`, `.idea/`), logs, temp files and Claude Code's local settings. The videos are **not** ignored, because the page needs them.

**Video size note:** GitHub warns about files over 50 MB and rejects files over 100 MB. Two of the current videos are about 65 MB, so pushes will show a warning but succeed. To avoid the warning, or before adding anything over 100 MB, track the videos with Git LFS before your first commit:

```
git lfs install
git lfs track "*.mp4"
git add .gitattributes
```

Note that **GitHub Pages does not serve Git LFS files**: the page would receive small pointer files instead of the videos. If you plan to host on GitHub Pages, keep the videos as normal files (each must stay under 100 MB), or host the videos elsewhere and point each `src` at that URL.
