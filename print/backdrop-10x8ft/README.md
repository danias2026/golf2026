# Entrance banner 10 × 8 ft (horizontal) — Save the Date

One banner for the JCC entrance, in the official green-felt design.

- `golf-games-classic-banner-10x8ft.pdf`: print file. 122 × 98 in = 120 × 96 in (10 × 8 ft) trim + 1 in bleed on every side. Vector: wordmark (outlined paths), frame, rules and text (Playfair Display and Bebas Neue embedded).
- `preview.png`: preview.
- `assets/`: the photo and logos the PDF uses. `src/`: `banner.html` + `render.js` (`node src/render.js` re-renders PDF and preview).

## Before printing (required)
1. **Replace the photo.** `assets/photo.jpg` is a TEMPORARY low-resolution placeholder (1068 px wide, mirrored from last year's flyer). Replace it with the licensed high-resolution stock photo, at least 6000 px wide (crossed golf clubs, golf ball, mahjong tiles on green felt; no cards, chips or dice), keep the same file name, and run `node src/render.js`.
2. **Get vector logos.** MARJCC, MBJCC and GMJF are placed as PNG images. Ask each organization for vector files (AI, EPS, SVG or PDF) and swap them in `assets/` for a sharp print.

## Print notes
- Keep everything important inside the 3 in safe margin; the layout already does.
- Colors: felt green (#555C4F → #343A34), gold #DEC000 / frame #D8C012, off-white #F4F3EE. Ask the printer for a hard proof: the gold is a bright yellow-gold, not metallic.
