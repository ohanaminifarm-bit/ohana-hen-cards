/* ============================================================
   OHANA MINI FARM — CSA Page
   ============================================================ */

// ---- DARK MODE ----
(function(){
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', isDark ? 'dark' : 'light');
  const setIcon = (dark) => {
    if (!toggle) return;
    toggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
    toggle.innerHTML = dark
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  };
  setIcon(isDark);
  if (toggle) toggle.addEventListener('click', () => {
    isDark = !isDark;
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    setIcon(isDark);
  });
})();

// ---- SMOOTH SCROLL for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- CONTACT FORM (mailto fallback) ----
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('join-form');
  const successBox = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fname = form.fname.value.trim();
    const lname = form.lname.value.trim();
    const email = form.email.value.trim();
    const share = form.share.value;
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    // Basic validation
    if (!fname || !email) {
      const missing = !fname ? form.fname : form.email;
      missing.focus();
      missing.style.borderColor = '#E05A3A';
      setTimeout(() => missing.style.borderColor = '', 2000);
      return;
    }

    // Build mailto
    const shareLabels = {
      egg: 'The Layer Share (Eggs only)',
      combo: 'The Full Ohana Share (Eggs + Chicken)',
      meat: 'The Broiler Share (Chicken only)',
      unsure: 'Not sure yet — tell me more',
      '': 'Not specified'
    };

    const subject = `CSA Membership Inquiry — ${fname} ${lname}`;
    const body = [
      `Name: ${fname} ${lname}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : '',
      `Share Interest: ${shareLabels[share] || share}`,
      message ? `\nMessage:\n${message}` : '',
      '\n---\nSent from the Ohana Mini Farm CSA page.'
    ].filter(Boolean).join('\n');

    // Open mailto
    window.location.href = `mailto:info@ohanaminifarm.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Show success after short delay
    setTimeout(() => {
      form.hidden = true;
      successBox.hidden = false;
      successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 800);
  });

  // Clear red border on input
  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => el.style.borderColor = '');
  });
});
