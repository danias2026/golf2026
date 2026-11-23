// Golf & Games Classic landing (Art Deco): fan dividers, reveals, gold-line drawing, signup placeholder.
(function () {
  document.documentElement.classList.add('js');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Fan rays for the deco dividers
  document.querySelectorAll('.divider .fan').forEach(function (g) {
    var n = 7, r = 26, html = '';
    for (var i = 0; i < n; i++) {
      if (i % 2) continue;
      var a0 = (-180 + i * 180 / n) * Math.PI / 180, a1 = (-180 + (i + 1) * 180 / n) * Math.PI / 180;
      html += '<path fill="#C9963E" d="M0 0 L' + (Math.cos(a0) * r).toFixed(1) + ' ' + (Math.sin(a0) * r).toFixed(1) +
        ' A' + r + ' ' + r + ' 0 0 1 ' + (Math.cos(a1) * r).toFixed(1) + ' ' + (Math.sin(a1) * r).toFixed(1) + ' Z"/>';
    }
    g.innerHTML = html;
  });

  // Reveal sections and draw the gold lines when they scroll into view
  var targets = document.querySelectorAll('.reveal, .divider');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('in-view'); });
  }

  // Signup placeholder: no backend yet (see the TODO comment in index.html)
  var form = document.getElementById('signup');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var input = document.getElementById('email');
      var msg = document.getElementById('signup-msg');
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      if (!ok) {
        msg.textContent = 'Please enter a valid email address.';
        input.setAttribute('aria-invalid', 'true');
        input.focus();
        return;
      }
      input.removeAttribute('aria-invalid');
      // TODO (Resend): replace this block with fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email: input.value }) })
      msg.textContent = 'Thank you! We will let you know as soon as registration opens.';
      form.reset();
    });
  }
})();
