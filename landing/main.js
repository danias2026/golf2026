// Golf & Games Classic landing (green-felt design): motion flag + signup placeholder.
(function () {
  document.documentElement.classList.add('js');

  // Signup placeholder: no backend yet (see the TODO comment in index.html)
  var form = document.getElementById('signup');
  if (!form) return;
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
})();
