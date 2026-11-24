#!/usr/bin/env python3
"""Builds the green-felt emails (save-the-date, reminder) as HTML + plain text.
Images live in ./assets and are referenced as {{ASSET_BASE_URL}}/<file> (send.mjs inlines them for tests).
Regenerate the hero images first with: node src-felt/render.cjs
"""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
A = '{{ASSET_BASE_URL}}'
ADDRESS = 'MARJCC &middot; 18900 NE 25th Avenue, North Miami Beach, FL 33180'
ADDRESS_TXT = 'MARJCC · 18900 NE 25th Avenue, North Miami Beach, FL 33180'
EVENT = '<span style="white-space:nowrap">Golf&nbsp;&amp;&nbsp;Games&nbsp;Classic</span>'
WHITE, GOLD, SILVER, FELT, OUTER, LINE = '#F4F3EE', '#DEC000', '#B4BAB4', '#454C42', '#2F352F', '#8F958B'


def row(inner, pad):
    return f'<tr><td align="center" style="padding:{pad}">{inner}</td></tr>\n'


def hero(name, alt):
    return (f'<tr><td><img src="{A}/{name}" width="600" height="834" alt="{alt}" '
            f'style="display:block;width:100%;height:auto;border:0"></td></tr>\n')


GOLF_MAHJONG = f'''<tr><td align="center" style="padding:22px 30px 4px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid {LINE};border-bottom:1px solid {LINE}"><tr>
    <td width="50%" align="center" style="padding:16px 8px;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:3px;color:{GOLD};font-weight:bold">GOLF<div style="font-family:Georgia,serif;font-size:18px;letter-spacing:0;color:{WHITE};font-weight:normal;line-height:1.35;padding-top:6px">May the best team win!</div></td>
    <td width="50%" align="center" style="padding:16px 8px;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:3px;color:{GOLD};font-weight:bold;border-left:1px solid {LINE}">MAHJONG<div style="font-family:Georgia,serif;font-size:18px;letter-spacing:0;color:{WHITE};font-weight:normal;line-height:1.35;padding-top:6px">Everyone plays together!</div></td>
  </tr></table>
</td></tr>
'''
COMING = row(f'<div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:3px;font-weight:bold;white-space:nowrap;color:{GOLD}">MORE DETAILS COMING SOON!</div>', '6px 30px 0')
CONTACT = row(f'<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.5;color:{WHITE};font-weight:bold">For more information, please contact<br><a href="mailto:RoxanaM@marjcc.org" style="color:{WHITE}">RoxanaM@marjcc.org</a></div>', '26px 30px 30px')
# Button placeholder for when there is a registration link (last year's white outlined pill).
# On mobile keep white-space:nowrap and letter-spacing:2px so it never wraps.
BUTTON_PLACEHOLDER = f'''<!-- BUTTON (add when there is a link):
<tr><td align="center" style="padding:8px 20px 18px"><a href="LINK" style="display:inline-block;border:2px solid {WHITE};border-radius:40px;padding:14px 64px;font-family:Arial,Helvetica,sans-serif;font-weight:bold;font-size:16px;letter-spacing:2px;white-space:nowrap;color:{WHITE};text-decoration:none">REGISTER</a></td></tr>
-->
'''


def page(title, preheader, inner):
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark only"><meta name="supported-color-schemes" content="dark"><title>{title}</title>
<style>@media (max-width:620px){{.wrap{{width:100%!important}}}}</style></head>
<body style="margin:0;padding:0;background:{OUTER}">
<div style="display:none;max-height:0;overflow:hidden">{preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:{OUTER}"><tr><td align="center" style="padding:24px 8px">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" style="width:600px;background:{FELT}">
{inner}<tr><td align="center" style="padding:18px 40px 6px;border-top:1px solid #5A6156;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:{SILVER}">{EVENT} &middot; Miami Beach Golf Club &middot; Friday, March 12, 2027<br>{ADDRESS}<br><a href="{{{{{{RESEND_UNSUBSCRIBE_URL}}}}}}" style="color:{SILVER}">Unsubscribe</a></td></tr>
<tr><td align="center" style="padding:16px 0 30px"><img src="{A}/gmjf-logo-white.png" width="110" height="52" alt="Greater Miami Jewish Federation" style="display:block;width:110px;height:auto;border:0"></td></tr>
</table></td></tr></table></body></html>
'''


# ---- save the date ----
std = hero('hero-save-the-date.jpg', 'MARJCC and MBJCC present the Golf &amp; Games Classic. Save the date: Friday, March 12, 2027, Miami Beach Golf Club. Team MARJCC vs. Team MBJCC.')
std += row(f'<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.65;color:{WHITE}">This spring, MARJCC and MBJCC go head-to-head at the <b>{EVENT}</b>. Grab your clubs or your mahjong tiles and pick your team.</div>', '30px 44px 6px')
std += GOLF_MAHJONG
std += row(f'<div style="font-family:Georgia,serif;font-size:24px;color:{WHITE}">Two communities. One unforgettable day!</div>', '26px 30px 4px')
std += BUTTON_PLACEHOLDER + COMING + CONTACT

# ---- reminder ----
rem = hero('hero-reminder.jpg', 'Reminder from MARJCC and MBJCC: save March 12 for the Golf &amp; Games Classic, Friday, March 12, 2027, Miami Beach Golf Club.')
rem += row(f'<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.65;color:{WHITE}">The <b>{EVENT}</b> is coming to the Miami Beach Golf Club on Friday, March 12, 2027. Team MARJCC vs. Team MBJCC.</div>', '30px 44px 6px')
rem += GOLF_MAHJONG
rem += BUTTON_PLACEHOLDER + row('', '14px 0 0') + COMING + CONTACT

pages = {
    'save-the-date': page('Save the date: Golf &amp; Games Classic, March 12', 'Friday, March 12, 2027 at the Miami Beach Golf Club. Two JCCs. One tournament. One friendly rivalry!', std),
    'reminder': page('Reminder: Save March 12 for the Golf &amp; Games Classic', 'Save March 12 for the Golf & Games Classic at the Miami Beach Golf Club.', rem),
}
FOOT = f'''--
Golf & Games Classic · Miami Beach Golf Club · Friday, March 12, 2027
{ADDRESS_TXT}
Unsubscribe: {{{{{{RESEND_UNSUBSCRIBE_URL}}}}}}
'''
texts = {
    'save-the-date': f'''TWO JCCs. ONE TOURNAMENT.
GOLF & GAMES CLASSIC
MARJCC vs. MBJCC · Golf • Mahjong

SAVE THE DATE
Friday | March 12, 2027
Team MARJCC vs. Team MBJCC
Miami Beach Golf Club

This spring, MARJCC and MBJCC go head-to-head at the Golf & Games Classic. Grab your clubs or your mahjong tiles and pick your team.

Golf: May the best team win!
Mahjong: Everyone plays together!

Two communities. One unforgettable day!
More details coming soon!

For more information, please contact RoxanaM@marjcc.org

''' + FOOT,
    'reminder': f'''REMINDER
GOLF & GAMES CLASSIC
SAVE MARCH 12

Friday | March 12, 2027
Team MARJCC vs. Team MBJCC
Miami Beach Golf Club

Golf: May the best team win!
Mahjong: Everyone plays together!

More details coming soon!

For more information, please contact RoxanaM@marjcc.org

''' + FOOT,
}
for t in pages:
    os.makedirs(os.path.join(HERE, t), exist_ok=True)
    open(os.path.join(HERE, t, 'index.html'), 'w').write(pages[t])
    open(os.path.join(HERE, t, 'index.txt'), 'w').write(texts[t])
    print('built', t)
