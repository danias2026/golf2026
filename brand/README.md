The brand for the **Golf & Games Classic**, a golf and mahjong tournament on **March 12, 2027** at the **Miami Beach Golf Club**, played between two JCCs: **Team MARJCC** (Michael-Ann Russell JCC) and **Team Miami Beach JCC** (The Galbut Family Miami Beach JCC on the Simkins Family Campus). Use this book for the landing page, emails, social media, print and signage. All event materials are in **English**.

![Golf & Games Classic key art](/_blob/9dbf5bdba5361f14ead58c09c810bc1e)

## The three-logo rule

**Every piece carries all three partner logos: MARJCC, MBJCC and the Greater Miami Jewish Federation (GMJF).** No exceptions: landing page, every email, every social post and story, flyers, banners, hole signs, name badges, slides.

- Use the `PartnerLogoStrip` component. Order, left to right: **MARJCC, MBJCC, GMJF**. On a vertical layout, the same order top to bottom.
- The strip sits on `partner-ground` (white) in both themes. Never place the full-color partner logos directly on the sunset art, on photos, or on navy.
- Give all three the same optical size: match the height of the MARJCC star to the MBJCC capitals and the GMJF snowflake star. In practice: MARJCC 72px tall, MBJCC 52px, GMJF 60px on web.
- Keep clear space around each logo equal to half its height. Thin `rule` dividers between the logos are optional.
- Never recolor, stretch, crop, outline or add effects to a partner logo. On a dark ground with no white strip, use the white versions (`mbjcc-logo-white.png`, `gmjf-logo-white.png`); MARJCC has no white version in this kit yet, so keep the white strip.
- The event key art already shows MARJCC and MBJCC. When you use the key art, the strip with all three still goes on the piece, because GMJF is not in the art.

## Name and copy

**Official name:** Golf & Games Classic. Write it with the ampersand. Short form: "the Classic".

**What it is:** Golf & Mahjong Tournament. Use this as the descriptor under the name.

**The matchup:** TEAM MARJCC vs. TEAM MIAMI BEACH JCC. In the logo art it reads `MARJCC vs MBJCC`; in written copy spell out Miami Beach JCC. `MARJCC` is always one word, all caps.

**Core lines** (use them as written):

- TWO JCCs. ONE TOURNAMENT. ONE FRIENDLY RIVALRY!
- Golf: May the best team win!
- Mahjong: Everyone plays together!
- Two communities. One unforgettable day!
- More details coming soon!

**Voice.** Warm, playful and competitive in a friendly way. Sports trash talk stays good-natured: the rivalry is on the golf course, and at the mahjong tables everyone is one team. Write for both communities at once: never favor one JCC in copy, and when you list them, alternate who goes first or keep the logo order (MARJCC first) consistently.

**Casing.** Headlines in the `display` face use Title Case. Labels, the matchup line, dates and buttons are ALL CAPS in the `deco` face. Body copy is sentence case.

**Dates and places.** `MARCH 12, 2027` in caps labels; "Friday, March 12, 2027" in sentences. Venue: `MIAMI BEACH GOLF CLUB`.

**Punctuation.** Exclamation marks are part of this event's voice, at most one per line. No emoji in headlines or subject lines; one emoji is fine inside a social caption (golf flag, mahjong tile).

## Color

The palette comes straight from the key art: a Miami Beach sunset framed in Art Deco gold.

- **Text and headlines:** `ink` on `surface`. Second headline line in `highlight` (teal), emphasis words and the "vs." in `accent` (red).
- **Backgrounds:** `surface` (cream) for Day; `deco-navy` for Night (an evening email, a story, the awards dinner).
- **Buttons:** the main call to action is `classic-red` with `on-red` text. Every other button uses `action` with `on-action`.
- **Gold:** `rule` for frames, double rules and plaque borders. Gold text only through `gold-text`.
- **Sunset colors** (`sky-blue`, `sunset-pink`, `sun-gold`, `ocean-teal`) are for illustration, photo overlays and background shapes. Never use them for text.
- **Team colors:** `team-marjcc` and `team-mbjcc` only when the two teams are being compared (leaderboard, team T-shirts, scoreboard, "Which team are you on?" posts). Do not use them as general brand colors.

## Type

All fonts are free on Google Fonts.

- **Limelight** (`display`): the Art Deco display face. Headlines only, short, 3 to 6 words. Never for paragraphs or buttons.
- **Josefin Sans** (`deco`): geometric caps like CLASSIC and MARJCC vs MBJCC in the logo. Eyebrows, the matchup line, buttons, labels.
- **Mulish** (`body`): everything you read in sentences.
- **Email:** email programs often ignore web fonts. Put headlines with Limelight in images, or let them fall back; set body text in the `email` family (Arial).

Never retype the logo lettering. "GOLF & GAMES CLASSIC" as a logo always comes from the logo file.

## Shapes and ornament

Art Deco Miami Beach: stepped frames, a sunburst fan, gold double lines, and teal waves.

- **Gold double rule:** two 1px `rule` lines `space-1` apart. Use it to frame a panel or to sit above and below the matchup line.
- **Matchup plaque:** the pointed-end plaque from the logo, in `MatchupPlaque`.
- **Arch panel:** a panel with a fully rounded top (`radius-arch` on the top corners only), echoing the top of the logo badge. Use one per page at most.
- **Waves:** the teal wave band (`ocean-teal`, `lagoon-teal`) closes the bottom of the landing hero, emails and social posts.
- Corners are square (`radius-0`) everywhere else. No drop shadows, no glass, no gradients except the sunset sky in illustrations.

## Imagery

- The key art (`golf-games-key-art.jpg`) is the hero image of the campaign. Use the full art for flyers and the hero; use `golf-games-logo-badge.jpg` (the logo badge cropped from the art) for square social posts and email headers.
- Photos: real people from both communities on the course and at the mahjong tables, smiling, in sun. Golden-hour light fits the palette. Avoid stock photos of empty golf courses.
- The playing cards in the logo stand for "games". In copy, the games are mahjong.

## Channel specs

| Channel | Size | Notes |
|---|---|---|
| Landing page hero | full width, art up to 1400px | Key art, then name, date, venue, button, partner strip. See `LandingHero`. |
| Email | 600px wide | Badge header image, cream body, one red button, partner strip in the footer. See `EmailTemplate`. |
| Instagram / Facebook post | 1080 x 1080 | Badge or photo on top, headline, partner strip at the bottom. See `SocialPost`. |
| Instagram portrait post | 1080 x 1350 | Same as the square, with more room for the headline. |
| Story / Reel cover | 1080 x 1920 | Keep the top 250px and bottom 340px free of text (app buttons cover them). Partner strip just above the bottom safe zone. |
| Facebook event cover | 1920 x 1005 | Key art centered; strip on the right or bottom. |
| Hole sign / sponsor sign | 24 x 18 in | Navy or cream, sponsor logo in the center, partner strip at the bottom. |

## Iconography

The brand has no icon set of its own. Use the three game objects from the logo (golf ball on a tee, mahjong tile, playing cards) only as they appear in the key art. For interface icons on the landing page (calendar, map pin, clock), use a simple 2px line icon set such as Lucide, in `ink`.

## Still to confirm

These are not decided yet. Do not invent them in materials; write "More details coming soon!" instead.

- Start time and schedule of the day
- Registration link, prices and what the fee includes
- Sponsorship levels
- Who benefits from the funds raised, and any fundraising goal
- Contact person, phone and email
- Official hashtag
- GMJF's role on the event (presenting partner, sponsor or supporter), which decides any label above the logo strip
- A transparent-background version of the event logo (today it exists only inside the key art), and higher-resolution MARJCC logo files
