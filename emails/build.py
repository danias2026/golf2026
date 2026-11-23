#!/usr/bin/env python3
"""Builds the Art Deco beige emails (save-the-date, reminder) as HTML + plain text.
Images live in ./assets and are referenced as {{ASSET_BASE_URL}}/<file> (send.mjs inlines them for tests).
Regenerate the images first with: node src-deco/render.cjs
"""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
A = '{{ASSET_BASE_URL}}'
ADDRESS = 'MARJCC &middot; 18900 NE 25th Avenue, North Miami Beach, FL 33180'
ADDRESS_TXT = 'MARJCC · 18900 NE 25th Avenue, North Miami Beach, FL 33180'
EVENT = '<span style="white-space:nowrap">Golf&nbsp;&amp;&nbsp;Games&nbsp;Classic</span>'

def img(name, w, h, alt=''):
    return f'<tr><td><img src="{A}/{name}" width="{w}" height="{h}" alt="{alt}" style="display:block;width:100%;height:auto;border:0"></td></tr>\n'

def txt(inner, pad):
    return f'<tr><td align="center" style="padding:{pad}">{inner}</td></tr>\n'

HEADLINE = txt('''<div class="h1" style="font-family:Limelight,Georgia,serif;font-size:34px;line-height:1.2;color:#006868">Two JCCs.<br>One Tournament.</div><div class="h1" style="font-family:Limelight,Georgia,serif;font-size:34px;line-height:1.2;color:#002838">One Friendly Rivalry!</div>''', '28px 24px 6px')
FAN = img('fan.png', 538, 55)
PLAQUE = img('plaque.png', 538, 75, 'Team MARJCC vs. Team MBJCC')
COMING = txt('''<div class="cs" style="font-family:'Josefin Sans',Arial,sans-serif;font-weight:700;font-size:14px;letter-spacing:4px;white-space:nowrap;color:#8A5F18">MORE DETAILS COMING SOON!</div>''', '14px 24px 26px')
# Button placeholder for when there is a link. On mobile keep white-space:nowrap and letter-spacing:2px so it never wraps.
BUTTON_PLACEHOLDER = '''<!-- BUTTON (add when there is a link):
<tr><td align="center" style="padding:6px 20px 10px"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="border:3px double #C9963E;padding:4px"><a href="LINK" style="display:block;background:#E02850;padding:14px 28px;font-family:'Josefin Sans',Arial,sans-serif;font-weight:700;font-size:15px;letter-spacing:2px;white-space:nowrap;color:#FFFFFF;text-decoration:none">SAVE THE DATE</a></td></tr></table></td></tr>
-->
'''

def page(title, preheader, inner):
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light"><title>{title}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Limelight&family=Josefin+Sans:wght@600;700&display=swap">
<style>@media (max-width:620px){{.wrap{{width:100%!important}}.h1{{font-size:28px!important}}.side{{padding:0 10px!important}}.cs{{letter-spacing:1.5px!important;font-size:13px!important}}}}</style></head>
<body style="margin:0;padding:0;background:#E9DCC0">
<div style="display:none;max-height:0;overflow:hidden">{preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#E9DCC0"><tr><td align="center" style="padding:24px 8px">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" style="width:600px;background:#F3E7CF">
<tr><td><img src="{A}/band.png" width="600" height="107" alt="" style="display:block;width:100%;height:auto;border:0"></td></tr>
<tr><td class="side" style="padding:0 24px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F3E7CF"><tr><td style="border-left:7px double #C9963E;border-right:7px double #C9963E">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
{inner}    </table>
  </td></tr></table>
</td></tr>
<tr><td><img src="{A}/waves.png" width="600" height="85" alt="" style="display:block;width:100%;height:auto;border:0"></td></tr>
<tr><td align="center" style="padding:22px 40px 6px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#3C5560">{EVENT} &middot; Miami Beach Golf Club &middot; Friday, March 12, 2027<br>{ADDRESS}<br><a href="{{{{{{RESEND_UNSUBSCRIBE_URL}}}}}}" style="color:#3C5560">Unsubscribe</a></td></tr>
<tr><td align="center" style="padding:14px 0 30px"><img src="{A}/gmjf-logo-black.png" width="110" height="52" alt="Greater Miami Jewish Federation" style="display:block;width:110px;height:auto;border:0"></td></tr>
</table></td></tr></table></body></html>
'''

# ---- save the date ----
std = ''
std += img('hero-save-the-date.png', 538, 543, 'MARJCC and MBJCC present the Golf &amp; Games Classic. Save the date: March 12, 2027, Miami Beach Golf Club')
std += HEADLINE + FAN + PLAQUE
std += txt(f'''<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.65;color:#3C5560">This spring, MARJCC and MBJCC go head-to-head at the <b style="color:#002838">{EVENT}</b>. Grab your clubs or your mahjong tiles and pick your team.</div>''', '12px 34px 18px')
std += img('cards.png', 538, 380, 'Golf: May the best team win! Mahjong: Everyone plays together!')
std += BUTTON_PLACEHOLDER + COMING
std += img('closing.png', 538, 210, 'Two communities. One unforgettable day!')

# ---- reminder ----
rem = ''
rem += img('hero-reminder.png', 538, 503, 'Reminder from MARJCC and MBJCC: Golf &amp; Games Classic, March 12, 2027, Miami Beach Golf Club')
rem += txt('''<div class="h1" style="font-family:Limelight,Georgia,serif;font-size:34px;line-height:1.2;color:#006868">Reminder:</div><div class="h1" style="font-family:Limelight,Georgia,serif;font-size:34px;line-height:1.2;color:#002838">Save March 12</div>''', '28px 24px 6px')
rem += FAN + PLAQUE
rem += txt(f'''<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.65;color:#3C5560">The <b style="color:#002838">{EVENT}</b> is coming to the Miami Beach Golf Club on Friday, March 12, 2027. Golf: May the best team win! Mahjong: Everyone plays together!</div>''', '12px 34px 6px')
rem += BUTTON_PLACEHOLDER + COMING

pages = {
  'save-the-date': page('Save the Date: Golf &amp; Games Classic', 'Friday, March 12, 2027 at the Miami Beach Golf Club. Two JCCs. One tournament. One friendly rivalry!', std),
  'reminder': page('Reminder: Golf &amp; Games Classic', 'Save March 12 for the Golf & Games Classic at the Miami Beach Golf Club.', rem),
}
texts = {
  'save-the-date': f'''SAVE THE DATE
Golf & Games Classic · Golf & Mahjong Tournament
Friday, March 12, 2027 · Miami Beach Golf Club

Two JCCs. One Tournament. One Friendly Rivalry!
TEAM MARJCC vs. TEAM MBJCC

This spring, MARJCC and MBJCC go head-to-head at the Golf & Games Classic. Grab your clubs or your mahjong tiles and pick your team.

Golf: May the best team win!
Mahjong: Everyone plays together!

More details coming soon!
Two communities. One unforgettable day!

--
Golf & Games Classic · Miami Beach Golf Club · Friday, March 12, 2027
{ADDRESS_TXT}
Unsubscribe: {{{{{{RESEND_UNSUBSCRIBE_URL}}}}}}
''',
  'reminder': f'''REMINDER: SAVE MARCH 12
Golf & Games Classic · Golf & Mahjong Tournament
Friday, March 12, 2027 · Miami Beach Golf Club

TEAM MARJCC vs. TEAM MBJCC
Golf: May the best team win!
Mahjong: Everyone plays together!

More details coming soon!

--
Golf & Games Classic · Miami Beach Golf Club · Friday, March 12, 2027
{ADDRESS_TXT}
Unsubscribe: {{{{{{RESEND_UNSUBSCRIBE_URL}}}}}}
''',
}
for t in pages:
    os.makedirs(os.path.join(HERE, t), exist_ok=True)
    open(os.path.join(HERE, t, 'index.html'), 'w').write(pages[t])
    open(os.path.join(HERE, t, 'index.txt'), 'w').write(texts[t])
    print('built', t)
