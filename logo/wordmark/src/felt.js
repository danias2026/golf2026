// Shared felt background (matches proposal-felt/src/flyer.html)
module.exports = (w,h,seed=7) => `<svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
<filter id="n${seed}"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="${seed}"/><feColorMatrix values="0 0 0 0 .30  0 0 0 0 .34  0 0 0 0 .29  0 0 0 .55 0"/></filter>
<radialGradient id="v${seed}" cx="50%" cy="45%" r="72%"><stop offset="0" stop-color="#555C4F"/><stop offset=".55" stop-color="#4B5247"/><stop offset="1" stop-color="#343A34"/></radialGradient>
<rect width="${w}" height="${h}" fill="url(#v${seed})"/><rect width="${w}" height="${h}" filter="url(#n${seed})" opacity=".45"/></svg>`;
