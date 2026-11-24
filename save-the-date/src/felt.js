// Felt background with vignette + fractal noise, sized to its container.
function felt(el,w,h,seed){el.insertAdjacentHTML('afterbegin',`<svg class="felt" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
<filter id="n${seed}"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="${seed}"/><feColorMatrix values="0 0 0 0 .30  0 0 0 0 .34  0 0 0 0 .29  0 0 0 .55 0"/></filter>
<radialGradient id="v${seed}" cx="50%" cy="42%" r="70%"><stop offset="0" stop-color="#555C4F"/><stop offset=".55" stop-color="#4B5247"/><stop offset="1" stop-color="#343A34"/></radialGradient>
<rect width="${w}" height="${h}" fill="url(#v${seed})"/><rect width="${w}" height="${h}" filter="url(#n${seed})" opacity=".45"/></svg>`);}
document.querySelectorAll('[data-felt]').forEach((el,i)=>felt(el,el.offsetWidth,el.offsetHeight,7+i));
document.fonts.ready.then(()=>window.__ready=true);
