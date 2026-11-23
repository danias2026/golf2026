// Golf & Games Classic landing: reveals, gold-line drawing, parallax, signup placeholder.
(function () {
  document.documentElement.classList.add('js');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal sections and start their gold lines when they scroll into view
  var targets = document.querySelectorAll('.reveal, .seam, .teams');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('in-view'); });
  }

  // Slow parallax on the scene backgrounds
  if (!reduce) {
    var layers = document.querySelectorAll('[data-parallax]');
    var ticking = false;
    var update = function () {
      layers.forEach(function (el) {
        var r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        var k = parseFloat(el.getAttribute('data-parallax')) || 0.2;
        el.style.transform = 'translate3d(0,' + (-r.top * k).toFixed(1) + 'px,0)';
      });
      ticking = false;
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
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
