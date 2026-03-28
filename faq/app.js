/* ============================================================
   OHANA MINI FARM — FAQ Page
   ============================================================ */

// ---- DARK MODE TOGGLE ----
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

// ---- CATEGORY FILTER ----
document.addEventListener('DOMContentLoaded', () => {
  const catBtns = document.querySelectorAll('.cat-btn');
  const categories = document.querySelectorAll('.faq-category');

  function showCategory(cat) {
    categories.forEach(section => {
      if (cat === 'all' || section.dataset.cat === cat) {
        section.style.display = '';
        section.hidden = false;
      } else {
        section.style.display = 'none';
        section.hidden = true;
      }
    });

    catBtns.forEach(btn => {
      btn.classList.toggle('cat-btn--active', btn.dataset.cat === cat);
    });
  }

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showCategory(btn.dataset.cat);
      // Scroll to first visible category heading smoothly
      const firstVisible = document.querySelector('.faq-category:not([hidden]) .cat-heading');
      if (firstVisible) {
        setTimeout(() => {
          firstVisible.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
      }
    });
  });

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

  // ---- KEYBOARD SUPPORT for details elements ----
  // Allow Enter/Space to toggle details in addition to native click
  document.querySelectorAll('.faq-item summary').forEach(summary => {
    summary.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        summary.parentElement.toggleAttribute('open');
      }
    });
  });
});
