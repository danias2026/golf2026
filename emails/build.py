"""Builds the email HTML files from one shared template.

Run:  python3 build.py
Writes save-the-date/index.html and reminder/index.html.
"""
from pathlib import Path

HERE = Path(__file__).parent
CTA_URL = "https://REPLACE-WITH-LANDING-PAGE-URL"

NAVY, TEAL, RED, GOLD, CREAM, PAPER, MUTED, GOLDTEXT = (
    "#002838", "#006868", "#E02850", "#D9A653", "#F8F0E0", "#FFF9EE", "#3C5560", "#8A5F18")
FONT = "Arial, Helvetica, sans-serif"
DISPLAY = "Georgia, 'Times New Roman', serif"


def rule():
    return (f'<tr><td style="padding:0 40px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">'
            f'<tr><td style="border-top:1px solid {GOLD};border-bottom:1px solid {GOLD};height:3px;line-height:3px;font-size:3px;">&nbsp;</td></tr>'
            f'</table></td></tr>')


def button(label):
    return f'''<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
  <tr><td align="center" bgcolor="{RED}" style="background:{RED};">
    <!--[if mso]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{CTA_URL}" style="height:52px;v-text-anchor:middle;width:260px;" stroke="f" fillcolor="{RED}"><w:anchorlock/><center style="color:#FFFFFF;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;letter-spacing:2px;">{label}</center></v:rect><![endif]-->
    <!--[if !mso]><!--><a href="{CTA_URL}" target="_blank" style="display:inline-block;padding:17px 36px;font-family:{FONT};font-size:15px;font-weight:bold;letter-spacing:2px;color:#FFFFFF;text-decoration:none;text-transform:uppercase;background:{RED};">{label}</a><!--<![endif]-->
  </td></tr>
</table>'''


def page(title, preheader, body_rows):
    return f'''<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>{title}</title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
<style>
  :root {{ color-scheme: light only; supported-color-schemes: light only; }}
  body {{ margin:0 !important; padding:0 !important; width:100% !important; }}
  a {{ color:{TEAL}; }}
  @media only screen and (max-width:620px) {{
    .container {{ width:100% !important; }}
    .px {{ padding-left:24px !important; padding-right:24px !important; }}
    .h1 {{ font-size:28px !important; line-height:34px !important; }}
    .col {{ display:block !important; width:100% !important; padding:0 0 12px 0 !important; }}
    .host {{ padding:0 10px !important; }}
  }}
</style>
</head>
<body style="margin:0;padding:0;background:{CREAM};">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:{CREAM};opacity:0;">{preheader}&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="{CREAM}" style="background:{CREAM};">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="{PAPER}" style="width:600px;max-width:600px;background:{PAPER};border:1px solid {GOLD};">

  <!-- Hosts: MARJCC and MBJCC, one color (teal), no white box -->
  <tr><td align="center" style="padding:22px 24px 18px;background:{PAPER};">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>
      <td class="host" valign="middle" style="padding:0 18px;"><img src="{{{{ASSET_BASE_URL}}}}/marjcc-teal.png" width="90" height="56" alt="Michael-Ann Russell JCC" style="display:block;border:0;outline:none;width:90px;height:56px;"></td>
      <td valign="middle" style="width:1px;padding:0;"><div style="width:1px;height:44px;background:{TEAL};opacity:0.6;font-size:1px;line-height:1px;">&nbsp;</div></td>
      <td class="host" valign="middle" style="padding:0 18px;"><img src="{{{{ASSET_BASE_URL}}}}/mbjcc-teal.png" width="134" height="46" alt="MBJCC" style="display:block;border:0;outline:none;width:134px;height:46px;"></td>
    </tr></table>
  </td></tr>

  <!-- Header art -->
  <tr><td style="padding:0;">
    <a href="{CTA_URL}" target="_blank"><img src="{{{{ASSET_BASE_URL}}}}/save-the-date-email-header.png" width="600" height="300" alt="Save the date: Golf &amp; Games Classic, MARJCC vs MBJCC, Friday, March 12, 2027" style="display:block;border:0;outline:none;width:100%;max-width:600px;height:auto;background:{CREAM};color:{NAVY};font-family:{FONT};font-size:18px;"></a>
  </td></tr>

{body_rows}

  <!-- Waves band -->
  <tr><td style="height:10px;line-height:10px;font-size:10px;background:{TEAL};">&nbsp;</td></tr>
  <tr><td style="height:6px;line-height:6px;font-size:6px;background:#009098;">&nbsp;</td></tr>

  <!-- Footer -->
  <tr><td class="px" align="center" style="padding:24px 40px 8px;font-family:{FONT};font-size:12px;line-height:18px;color:{MUTED};">
    Golf &amp; Games Classic &middot; Miami Beach Golf Club &middot; Friday, March 12, 2027<br>
    [SENDER NAME AND MAILING ADDRESS]<br>
    <a href="{{{{{{RESEND_UNSUBSCRIBE_URL}}}}}}" target="_blank" style="color:{MUTED};text-decoration:underline;">Unsubscribe</a>
  </td></tr>

  <!-- GMJF: always last -->
  <tr><td align="center" style="padding:16px 24px 24px;background:#FFFFFF;">
    <img src="{{{{ASSET_BASE_URL}}}}/gmjf-logo-black.png" width="101" height="48" alt="Greater Miami Jewish Federation" style="display:block;border:0;outline:none;width:101px;height:48px;margin:0 auto;">
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>
'''


def text_row(html, pad="0 40px 16px", size=16, color=NAVY, align="center", extra=""):
    return (f'  <tr><td class="px" align="{align}" style="padding:{pad};font-family:{FONT};font-size:{size}px;'
            f'line-height:{round(size*1.55)}px;color:{color};{extra}">{html}</td></tr>')


def eyebrow(t):
    return text_row(t, pad="32px 40px 10px", size=13, color=GOLDTEXT, extra="font-weight:bold;letter-spacing:3px;text-transform:uppercase;")


def h1(line1, line2):
    return (f'  <tr><td class="px" align="center" style="padding:0 40px 18px;">'
            f'<h1 class="h1" style="margin:0;font-family:{DISPLAY};font-weight:normal;font-size:34px;line-height:40px;color:{NAVY};">'
            f'{line1}<br><span style="color:{TEAL};">{line2}</span></h1></td></tr>')


def matchup():
    return (f'  <tr><td class="px" align="center" style="padding:4px 40px 22px;">'
            f'<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>'
            f'<td style="border:2px solid {GOLD};padding:10px 18px;font-family:{FONT};font-size:15px;font-weight:bold;letter-spacing:1.5px;color:{NAVY};text-transform:uppercase;text-align:center;">'
            f'Team MARJCC <span style="color:{RED};font-family:{DISPLAY};font-style:italic;text-transform:none;letter-spacing:0;">vs.</span> Team MBJCC</td>'
            f'</tr></table></td></tr>')


def duo():
    cell = (f'<td class="col" width="50%" valign="top" style="padding:0 6px;">'
            f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>'
            f'<td style="border:1px solid {GOLD};background:{CREAM};padding:16px 12px;text-align:center;font-family:{FONT};">'
            f'<div style="font-size:13px;font-weight:bold;letter-spacing:3px;color:{GOLDTEXT};text-transform:uppercase;">{{k}}</div>'
            f'<div style="font-size:17px;line-height:24px;color:{NAVY};padding-top:6px;">{{v}}</div></td></tr></table></td>')
    return (f'  <tr><td class="px" style="padding:0 34px 22px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>'
            + cell.format(k="Golf", v="May the best team win!")
            + cell.format(k="Mahjong", v="Everyone plays together!")
            + '</tr></table></td></tr>')


def facts():
    cell = (f'<td class="col" width="50%" valign="top" align="center" style="padding:14px 6px;font-family:{FONT};">'
            f'<div style="font-size:12px;font-weight:bold;letter-spacing:3px;color:{GOLDTEXT};text-transform:uppercase;">{{k}}</div>'
            f'<div style="font-size:18px;font-weight:bold;letter-spacing:1px;color:{NAVY};text-transform:uppercase;padding-top:4px;">{{v}}</div></td>')
    return (f'  <tr><td class="px" style="padding:0 40px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>'
            + cell.format(k="When", v="Friday, March 12, 2027")
            + cell.format(k="Where", v="Miami Beach Golf Club")
            + '</tr></table></td></tr>')


def spacer(h):
    return f'  <tr><td style="height:{h}px;line-height:{h}px;font-size:{h}px;">&nbsp;</td></tr>'


save_the_date = "\n".join([
    eyebrow("Save the date &middot; Golf &amp; Mahjong Tournament"),
    h1("Two JCCs. One Tournament.", "One Friendly Rivalry!"),
    matchup(),
    text_row("This spring, MARJCC and MBJCC go head-to-head at the "
             "<strong>Golf &amp; Games Classic</strong>. Grab your clubs or your mahjong tiles and pick your team."),
    spacer(6),
    duo(),
    rule(),
    facts(),
    rule(),
    spacer(26),
    text_row("<strong>Two communities. One unforgettable day!</strong>", size=18),
    spacer(4),
    f'  <tr><td align="center" style="padding:0 40px 18px;">{button("Save the date")}</td></tr>',
    text_row("More details coming soon!", size=14, color=MUTED, pad="0 40px 30px"),
])

reminder = "\n".join([
    eyebrow("Reminder &middot; Friday, March 12, 2027"),
    h1("Mark Your Calendar.", "Pick Your Team!"),
    matchup(),
    text_row("The <strong>Golf &amp; Games Classic</strong> is coming to the Miami Beach Golf Club. "
             "Golf: May the best team win! Mahjong: Everyone plays together!"),
    spacer(4),
    rule(),
    facts(),
    rule(),
    spacer(26),
    f'  <tr><td align="center" style="padding:0 40px 18px;">{button("Save the date")}</td></tr>',
    text_row("More details coming soon!", size=14, color=MUTED, pad="0 40px 30px"),
])

(HERE / "save-the-date/index.html").write_text(page(
    "Save the date: Golf & Games Classic",
    "Friday, March 12, 2027 at the Miami Beach Golf Club. Team MARJCC vs. Team MBJCC.",
    save_the_date))
(HERE / "reminder/index.html").write_text(page(
    "Reminder: Golf & Games Classic, March 12",
    "Save Friday, March 12, 2027. Golf & Mahjong at the Miami Beach Golf Club.",
    reminder))
print("built")
