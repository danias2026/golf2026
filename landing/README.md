# Golf & Games Classic landing page (green-felt design)

A single static page (no build step): `index.html`, `styles.css`, `main.js`, `assets/`.

- Hero: last year's flyer layout on green felt with the gold frame (it draws itself on load), MARJCC and MBJCC in white at the top, the gold title with the silver ampersand (with a slow gold sheen), the photo, SAVE THE DATE, date, Team MARJCC vs. Team MBJCC, venue, and two white pill buttons: Add to Calendar (`assets/golf-games-classic-2027.ics`) and Google Calendar.
- Sections: Two JCCs / One Tournament / One Friendly Rivalry!, the team matchup, Golf and Mahjong, The Details (Schedule, Registration, Sponsorship: "More details coming soon!"), the closing line and the contact line (RoxanaM@marjcc.org).
- Footer: event line, then the GMJF logo last.
- Motion respects "reduce motion". Responsive down to 360 px wide.

## Preview locally
Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
```

Then visit http://localhost:8080. To re-render `preview-desktop.png`, `preview-mobile.png`, `og-image.png` and `assets/favicon.png`:

```bash
node render.js
```

## Swap the photo
The photo is a temporary placeholder. Replace `assets/event-photo.jpg` with the licensed stock photo (same file name) and run `node render.js`.

## Before launch
- Once there is a domain, set `og:image` in `index.html` to the full URL (for example `https://example.org/og-image.png`).
- Add the Register button when registration opens (white outlined pill, same `.pill` class).

## Hosting options
1. Netlify Drop: drag the `landing/` folder onto https://app.netlify.com/drop.
2. Vercel: import the repository and set the root directory to `landing/` (no build command).
3. GitHub Pages: publish the `landing/` folder from the repository settings (Pages, deploy from a branch).
