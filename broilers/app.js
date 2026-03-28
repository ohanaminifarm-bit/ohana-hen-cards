/* ============================================================
   OHANA MINI FARM — Broiler Cards App
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

// ---- COLOR UTILITIES ----
function shadeColor(hex, percent) {
  try {
    const num = parseInt(hex.replace('#',''), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + percent * 2.55));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + percent * 2.55));
    const b = Math.min(255, Math.max(0, (num & 0xff) + percent * 2.55));
    return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
  } catch(e) { return hex; }
}

// ---- BROILER ILLUSTRATION ----
// Chunky, round Cornish Cross — distinct from the hen illustrations
function buildBroilerSVG(broiler) {
  const feather = broiler.feather || '#F5E6C8';
  const bodyColor = feather;
  const shadowColor = shadeColor(feather, -20);
  const wingColor = shadeColor(feather, -12);

  // Batch-based bg tones
  const batchBg = [
    'linear-gradient(145deg, #FFF4E4, #FFEACC)',
    'linear-gradient(145deg, #FFF0E0, #FFE5C8)',
    'linear-gradient(145deg, #FFEEDD, #FFE2C0)',
    'linear-gradient(145deg, #FFECDA, #FFE0BC)',
    'linear-gradient(145deg, #FFEBD8, #FFDDB8)',
  ];
  broiler._bgGradient = batchBg[(broiler.batch - 1) % batchBg.length];

  // Comb variants
  const combs = [
    `<path d="M54 24 Q55 20 57 23 Q59 18 61 22 Q63 20 64 24" stroke="#E05A3A" stroke-width="2.5" fill="#E05A3A" fill-opacity="0.8" stroke-linecap="round"/>`,
    `<ellipse cx="59" cy="22" rx="5.5" ry="2.5" fill="#E05A3A"/>`,
    `<path d="M54 24 Q57 18 60 23 Q63 18 66 24" fill="#D43A2A" stroke="#D43A2A" stroke-width="1.5" stroke-linecap="round"/>`,
  ];
  const combSVG = combs[broiler.id % combs.length];

  return `<svg width="130" height="140" viewBox="0 0 130 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="${broiler.name} illustration">
  <defs>
    <radialGradient id="bbody${broiler.id}" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="${shadeColor(bodyColor, 25)}"/>
      <stop offset="100%" stop-color="${bodyColor}"/>
    </radialGradient>
    <radialGradient id="bwing${broiler.id}" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="${shadeColor(wingColor, 15)}"/>
      <stop offset="100%" stop-color="${wingColor}"/>
    </radialGradient>
  </defs>

  <!-- Background glow -->
  <ellipse cx="65" cy="75" rx="55" ry="48" fill="${feather}" opacity="0.15"/>

  <!-- Ground line -->
  <path d="M15 112 Q65 108 115 112" stroke="${shadeColor(feather, -10)}" stroke-width="1.5" fill="none" stroke-dasharray="3 4" opacity="0.5"/>

  <!-- TAIL (small — Cornish Cross have minimal tails) -->
  <path d="M30 72 Q20 62 18 68 Q15 60 22 65" stroke="${shadowColor}" stroke-width="2.5" fill="none" stroke-linecap="round"/>

  <!-- BODY — large and round, classic Cornish Cross shape -->
  <ellipse cx="62" cy="78" rx="30" ry="28" fill="url(#bbody${broiler.id})"/>

  <!-- WING -->
  <ellipse cx="52" cy="76" rx="19" ry="12" fill="url(#bwing${broiler.id})" transform="rotate(-8 52 76)"/>
  <path d="M38 78 Q52 72 68 78" stroke="${shadowColor}" stroke-width="0.8" fill="none" opacity="0.5"/>
  <path d="M37 82 Q52 76 68 82" stroke="${shadowColor}" stroke-width="0.8" fill="none" opacity="0.4"/>

  <!-- NECK -->
  <path d="M60 52 Q63 46 68 44 Q73 46 74 52 Q72 57 67 57 Q61 57 60 52Z" fill="url(#bbody${broiler.id})"/>

  <!-- HEAD — round and plump -->
  <circle cx="68" cy="36" r="15" fill="url(#bbody${broiler.id})"/>

  <!-- COMB -->
  ${combSVG}

  <!-- WATTLE -->
  <ellipse cx="65" cy="48" rx="3.5" ry="5" fill="#E03020" opacity="0.9"/>
  <ellipse cx="69" cy="49" rx="2.5" ry="3.5" fill="#E03020" opacity="0.8"/>

  <!-- EYE -->
  <circle cx="74" cy="33" r="4.5" fill="white"/>
  <circle cx="74.5" cy="33" r="2.8" fill="#2A1800"/>
  <circle cx="75.8" cy="31.5" r="0.9" fill="white"/>

  <!-- BEAK -->
  <path d="M81 37 L89 37.5 L81 39.5Z" fill="#F0A030" stroke="#C07820" stroke-width="0.5" stroke-linejoin="round"/>

  <!-- FEET — sturdy, planted -->
  <line x1="55" y1="104" x2="52" y2="114" stroke="#D4880A" stroke-width="3" stroke-linecap="round"/>
  <line x1="63" y1="104" x2="66" y2="114" stroke="#D4880A" stroke-width="3" stroke-linecap="round"/>
  <path d="M52 114 L46 118 M52 114 L53 118 M52 114 L56 117" stroke="#D4880A" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M66 114 L62 118 M66 114 L67 118 M66 114 L70 117" stroke="#D4880A" stroke-width="1.5" stroke-linecap="round"/>

  <!-- Weight indicator (small scale icon) -->
  <path d="M90 100 Q95 96 100 100 L102 108 L88 108Z" fill="${shadeColor(feather, -15)}" opacity="0.7"/>
  <rect x="93" y="108" width="10" height="2" rx="1" fill="${shadeColor(feather, -20)}" opacity="0.6"/>
</svg>`;
}

// ---- BATCH LABEL ----
function getBatchLabel(batch) {
  const labels = { 1:'Founding Flock', 2:'Sophomore Surge', 3:'Heavy Hitters', 4:'Steady Growers', 5:'Final Fifty' };
  return labels[batch] || `Batch ${batch}`;
}

// ---- CARD BUILDER ----
function buildCard(broiler) {
  const article = document.createElement('article');
  article.className = 'hen-card broiler-card';
  article.setAttribute('role', 'listitem');
  article.setAttribute('tabindex', '0');
  article.dataset.batch = broiler.batch;
  article.dataset.id = broiler.id;

  article.innerHTML = `
    <div class="card-illustration" style="background: ${broiler._bgGradient || 'linear-gradient(145deg, #FFF4E4, #FFEACC)'}">
      <span class="card-number">${broiler.id}</span>
      ${buildBroilerSVG(broiler)}
      <div class="egg-badge">
        <span class="batch-pill">Batch ${broiler.batch}</span>
      </div>
    </div>
    <div class="card-body">
      <h2 class="card-name">${broiler.name}</h2>
      <p class="card-breed">Cornish Cross · ${getBatchLabel(broiler.batch)}</p>
      <p class="card-pun">${broiler.pun}</p>
      <div class="card-footer">
        <div class="card-stat">
          <span class="card-stat-label">Harvest weight</span>
          <span class="card-stat-value weight-highlight">${broiler.harvestWeight}</span>
        </div>
        <div class="card-stat">
          <span class="card-stat-label">Days to harvest</span>
          <span class="card-stat-value">~${broiler.daysToHarvest}</span>
        </div>
        <span class="card-trait">${broiler.trait}</span>
      </div>
      <div class="feed-row">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <span>${broiler.feedType}</span>
      </div>
    </div>
    <div class="card-tagline">${broiler.tagline}</div>
    <div class="card-hover-reveal">
      <p class="card-personality-text">${broiler.personality}</p>
    </div>
  `;
  return article;
}

// ---- FILTER ENGINE ----
let currentFilter = 'all';
let currentSearch = '';
let currentSort = 'id';

function getFiltered() {
  let birds = [...BROILERS];
  if (currentFilter !== 'all') birds = birds.filter(b => b.batch == currentFilter);
  if (currentSearch.trim()) {
    const q = currentSearch.toLowerCase().trim();
    birds = birds.filter(b =>
      b.name.toLowerCase().includes(q) ||
      b.personality.toLowerCase().includes(q) ||
      b.pun.toLowerCase().includes(q) ||
      b.trait.toLowerCase().includes(q) ||
      getBatchLabel(b.batch).toLowerCase().includes(q)
    );
  }
  switch (currentSort) {
    case 'name':   birds.sort((a,b) => a.name.localeCompare(b.name)); break;
    case 'weight': birds.sort((a,b) => parseFloat(b.harvestWeight) - parseFloat(a.harvestWeight)); break;
    case 'days':   birds.sort((a,b) => a.daysToHarvest - b.daysToHarvest); break;
    default:       birds.sort((a,b) => a.id - b.id);
  }
  return birds;
}

function render() {
  const grid = document.getElementById('broiler-grid');
  const emptyState = document.getElementById('empty-state');
  const countBadge = document.getElementById('visible-count');
  const birds = getFiltered();

  grid.innerHTML = '';
  emptyState.hidden = birds.length > 0;
  grid.style.display = birds.length === 0 ? 'none' : '';
  countBadge.textContent = birds.length;

  const frag = document.createDocumentFragment();
  birds.forEach(b => frag.appendChild(buildCard(b)));
  grid.appendChild(frag);
}

// ---- EVENTS ----
document.addEventListener('DOMContentLoaded', () => {
  render();

  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('chip--active'));
      chip.classList.add('chip--active');
      currentFilter = chip.dataset.filter;
      render();
    });
  });

  let timer;
  document.getElementById('search').addEventListener('input', e => {
    clearTimeout(timer);
    timer = setTimeout(() => { currentSearch = e.target.value; render(); }, 180);
  });

  document.getElementById('sort-select').addEventListener('change', e => {
    currentSort = e.target.value; render();
  });

  document.getElementById('reset-btn').addEventListener('click', () => {
    currentFilter = 'all'; currentSearch = ''; currentSort = 'id';
    document.getElementById('search').value = '';
    document.getElementById('sort-select').value = 'id';
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('chip--active'));
    document.querySelector('.chip[data-filter="all"]').classList.add('chip--active');
    render();
  });
});

// Feed row style (injected once)
const feedStyle = document.createElement('style');
feedStyle.textContent = `.feed-row { display:flex; align-items:center; gap:var(--space-2); margin-top:var(--space-3); font-size:var(--text-xs); color:var(--color-primary); font-weight:600; } .feed-row svg { flex-shrink:0; color:var(--color-primary); }`;
document.head.appendChild(feedStyle);
