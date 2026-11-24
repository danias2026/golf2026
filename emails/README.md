# Golf & Games Classic emails (green-felt design)

Two templates, both from `info@marjcc.org` by default:

| Template | Subject |
|---|---|
| `save-the-date/` | Save the date: Golf & Games Classic, March 12 |
| `reminder/` | Reminder: Save March 12 for the Golf & Games Classic |

Each folder has `index.html`, `index.txt` and desktop/mobile previews (`preview.png`, `preview-mobile.png`).

## Design
The header image is the save-the-date flyer (felt, gold frame, gold title, photo, SAVE THE DATE / SAVE MARCH 12, date, venue) with MARJCC and MBJCC in white at the top. Below it, live text on felt green (so it still reads with images off), the contact line, the footer with the MARJCC address and unsubscribe link, and the GMJF logo last.

No button yet. When there is a registration link, uncomment the `BUTTON_PLACEHOLDER` in `build.py` (white outlined pill, `white-space:nowrap`, 2px letter-spacing so it never wraps on phones).

## Files
- `build.py` generates both `index.html` and `index.txt`: `python3 build.py`
- `src-felt/` hero sources (`hero.html`, `felt.css`, `felt.js`) and `render.cjs`: `node src-felt/render.cjs` writes `assets/hero-*.jpg`
- `assets/` holds exactly what the templates reference: `hero-save-the-date.jpg`, `hero-reminder.jpg`, `gmjf-logo-white.png`
- `preview.cjs` re-renders the previews: `node preview.cjs`

### Swapping the photo
The photo is a temporary placeholder. Replace `src-felt/assets/event-photo.jpg` with the licensed stock photo (same name), then run `node src-felt/render.cjs && python3 build.py && node preview.cjs`.

## Sending (Resend)
Rules: every send starts with a TEST to DaniaS@marjcc.org, and nothing real goes out until Dania approves that exact version (HTML, subject, sender and images). Any change needs a new test.

In the Claude cloud environment the API key is injected by the network proxy, so use the npm script (it turns on Node's proxy support):

```bash
npm run send -- --template save-the-date --test
```

After Dania approves:

```bash
npm run send -- --template save-the-date --to someone@example.org --approved
```

```bash
npm run send -- --template save-the-date --audience <AUDIENCE_ID> --approved --send
```

Options: `--sender info|roxana`, `--from "..."`, `--subject "..."`, `--dry-run`, `--inline-images`. Broadcasts need `ASSET_BASE_URL` (public URL of the `assets/` folder, no trailing slash). On your own computer, set `RESEND_API_KEY` and use `node send.mjs` with the same options.
