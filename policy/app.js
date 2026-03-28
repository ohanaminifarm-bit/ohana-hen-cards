// Dark mode toggle
(function () {
  const root = document.documentElement;
  const btn = document.querySelector('[data-theme-toggle]');
  const stored = localStorage.getItem('ohana-theme');
  if (stored) root.setAttribute('data-theme', stored);

  if (btn) {
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('ohana-theme', next);
    });
  }
})();
