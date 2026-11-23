"""Builds the email HTML files in the Instagram master look.

Run:  python3 build.py
Writes save-the-date/index.html and reminder/index.html.

Design: a deep navy email (#00141F) made of full-width image sections rendered by
src/gen.cjs (same helpers as the Instagram posts), with the essential text as live
HTML between them, so the email still reads with images off.
"""
from pathlib import Path

HERE = Path(__file__).parent
CTA_URL = "https://REPLACE-WITH-LANDING-PAGE-URL"

BG = "#00141F"        # email ground, matches the bottom of every image section
CREAM = "#F8F0E0"
GOLD = "#F0C078"
PINK = "#FF6B88"      # the posts' light red for the second headline line
AQUA = "#7FD6DA"
RED = "#E02850"
MUTED = "#9FB4BA"
FONT = "Arial, Helvetica, sans-serif"
DISPLAY = "Georgia, 'Times New Roman', serif"
ASSET = "{{ASSET_BASE_URL}}"


def image(name, height, alt, link=False):
    img = (f'<img src="{ASSET}/{name}" width="600" height="{height}" alt="{alt}" '
           f'style="display:block;border:0;outline:none;width:100%;max-width:600px;height:auto;'
           f'background:{BG};color:{GOLD};font-family:{DISPLAY};font-size:22px;line-height:28px;text-align:center;">')
    if link:
        img = f'<a href="{CTA_URL}" target="_blank" style="text-decoration:none;">{img}</a>'
    return f'  <tr><td style="padding:0;background:{BG};">{img}</td></tr>'


def text_row(html, pad="0 44px 16px", size=16, color=CREAM, family=FONT, extra=""):
    return (f'  <tr><td class="px" align="center" style="padding:{pad};font-family:{family};font-size:{size}px;'
            f'line-height:{round(size * 1.5)}px;color:{color};text-align:center;{extra}">{html}</td></tr>')


def eyebrow(t, pad="8px 44px 12px"):
    return text_row(t, pad=pad, size=13, color=GOLD, extra="font-weight:bold;letter-spacing:4px;text-transform:uppercase;")


def h1(line1, line2):
    return (f'  <tr><td class="px" align="center" style="padding:0 40px 18px;">'
            f'<h1 class="h1" style="margin:0;font-family:{DISPLAY};font-weight:normal;font-size:38px;line-height:44px;color:{CREAM};">'
            f'{line1}<br><span style="color:{PINK};">{line2}</span></h1></td></tr>')


def hairline(pad="6px 150px 22px"):
    return (f'  <tr><td style="padding:{pad};"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">'
            f'<tr><td style="border-top:1px solid {GOLD};height:1px;line-height:1px;font-size:1px;">&nbsp;</td></tr></table></td></tr>')


def matchup():
    return text_row(f'Team MARJCC <span style="color:{PINK};font-family:{DISPLAY};font-style:italic;text-transform:none;letter-spacing:0;">vs.</span> Team MBJCC',
                    pad="0 40px 20px", size=15, extra="font-weight:bold;letter-spacing:2px;text-transform:uppercase;")


def pair(left, right):
    def cell(k, v):
        return (f'<td class="col" width="49%" valign="top" align="center" style="padding:4px 10px;font-family:{FONT};text-align:center;">'
                f'<div style="font-size:12px;font-weight:bold;letter-spacing:4px;color:{GOLD};text-transform:uppercase;">{k}</div>'
                f'<div style="font-family:{DISPLAY};font-size:21px;line-height:27px;color:{CREAM};padding-top:6px;">{v}</div></td>')
    sep = (f'<td width="1" valign="middle" style="width:1px;padding:0;">'
           f'<div style="width:1px;height:62px;background:{GOLD};font-size:1px;line-height:1px;">&nbsp;</div></td>')
    return (f'  <tr><td class="px" style="padding:0 34px 26px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>'
            + cell(*left) + sep + cell(*right) + '</tr></table></td></tr>')


def button(label):
    return f'''  <tr><td align="center" style="padding:6px 40px 16px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
  <tr><td align="center" bgcolor="{RED}" style="background:{RED};">
    <!--[if mso]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{CTA_URL}" style="height:54px;v-text-anchor:middle;width:270px;" stroke="f" fillcolor="{RED}"><w:anchorlock/><center style="color:#FFFFFF;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;letter-spacing:2px;">{label.upper()}</center></v:rect><![endif]-->
    <!--[if !mso]><!--><a href="{CTA_URL}" target="_blank" style="display:inline-block;padding:18px 40px;font-family:{FONT};font-size:15px;font-weight:bold;letter-spacing:3px;color:#FFFFFF;text-decoration:none;text-transform:uppercase;background:{RED};">{label}</a><!--<![endif]-->
  </td></tr>
</table></td></tr>'''


def page(title, preheader, rows):
    body = "\n".join(rows)
    return f'''<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>{title}</title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
<style>
  :root {{ color-scheme: dark; supported-color-schemes: dark; }}
  body {{ margin:0 !important; padding:0 !important; width:100% !important; background:{BG}; }}
  a {{ color:{GOLD}; }}
  @media only screen and (max-width:620px) {{
    .container {{ width:100% !important; }}
    .px {{ padding-left:24px !important; padding-right:24px !important; }}
    .h1 {{ font-size:30px !important; line-height:36px !important; }}
  }}
</style>
</head>
<body style="margin:0;padding:0;background:{BG};">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:{BG};opacity:0;">{preheader}&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="{BG}" style="background:{BG};">
<tr><td align="center" style="padding:0;">
<table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="{BG}" style="width:600px;max-width:600px;background:{BG};">

{body}

  <!-- Footer -->
  <tr><td class="px" align="center" style="padding:6px 40px 8px;font-family:{FONT};font-size:12px;line-height:18px;color:{MUTED};">
    Golf &amp; Games Classic &middot; Miami Beach Golf Club &middot; Friday, March 12, 2027<br>
    [SENDER NAME AND MAILING ADDRESS]<br>
    <a href="{{{{{{RESEND_UNSUBSCRIBE_URL}}}}}}" target="_blank" style="color:{MUTED};text-decoration:underline;">Unsubscribe</a>
  </td></tr>

  <!-- GMJF: always last, alone -->
  <tr><td align="center" style="padding:18px 24px 36px;background:{BG};">
    <img src="{ASSET}/gmjf-logo-white.png" width="101" height="48" alt="Greater Miami Jewish Federation" style="display:block;border:0;outline:none;width:101px;height:48px;margin:0 auto;">
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>
'''


GAMES = image("games.jpg", 380, "Golf and Mahjong: a golf ball glowing like the sun and floating mahjong tiles")
CLOSING = image("closing.jpg", 180, "")

save_the_date = [
    image("hero-save-the-date.jpg", 620,
          "MARJCC and MBJCC: Save the Date. Golf &amp; Games Classic, MARJCC vs MBJCC. March 12, 2027", link=True),
    eyebrow("Golf &amp; Mahjong Tournament"),
    h1("Two JCCs. One Tournament.", "One Friendly Rivalry!"),
    matchup(),
    text_row("This spring, MARJCC and MBJCC go head-to-head at the "
             f'<strong style="color:{GOLD};">Golf &amp; Games Classic</strong>. Grab your clubs or your mahjong tiles and pick your team.',
             pad="0 48px 22px"),
    hairline("0 150px 22px"),
    pair(("When", "Friday, March 12, 2027"), ("Where", "Miami Beach Golf Club")),
    GAMES,
    pair(("Golf", "May the best team win!"), ("Mahjong", "Everyone plays together!")),
    text_row("Two communities. One unforgettable day!", pad="8px 40px 20px", size=22, family=DISPLAY, color=GOLD),
    button("Save the date"),
    text_row("More details coming soon!", pad="0 40px 6px", size=14, color=MUTED),
    CLOSING,
]

reminder = [
    image("hero-reminder.jpg", 620,
          "MARJCC and MBJCC: Mark Your Calendar. Golf &amp; Games Classic, MARJCC vs MBJCC. March 12, 2027", link=True),
    eyebrow("Reminder &middot; Friday, March 12, 2027"),
    h1("Mark Your Calendar.", "Pick Your Team!"),
    matchup(),
    text_row(f'The <strong style="color:{GOLD};">Golf &amp; Games Classic</strong> is coming to the Miami Beach Golf Club.',
             pad="0 48px 22px"),
    GAMES,
    pair(("Golf", "May the best team win!"), ("Mahjong", "Everyone plays together!")),
    button("Save the date"),
    text_row("More details coming soon!", pad="0 40px 6px", size=14, color=MUTED),
    CLOSING,
]

(HERE / "save-the-date/index.html").write_text(page(
    "Save the date: Golf & Games Classic",
    "Friday, March 12, 2027 at the Miami Beach Golf Club. Team MARJCC vs. Team MBJCC.",
    save_the_date))
(HERE / "reminder/index.html").write_text(page(
    "Reminder: Golf & Games Classic, March 12",
    "Save Friday, March 12, 2027. Golf & Mahjong at the Miami Beach Golf Club.",
    reminder))
print("built")
