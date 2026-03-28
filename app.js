/* ============================================================
   OHANA MINI FARM — Hen Cards App
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

// ---- HEN ILLUSTRATION BUILDER ----
// Generates a unique illustrated hen SVG for each card
// Feather color and pose vary by hen ID

function buildHenSVG(hen) {
  const feather = hen.feather || '#8B4513';
  const bodyColor = feather;
  const wingColor = shadeColor(feather, -15);
  const tailColor = shadeColor(feather, -25);
  const eggColor = hen.eggShade || '#A0522D';
  const combColors = ['#E05A3A', '#D43A2A', '#C83020', '#F06040'];
  const combColor = combColors[hen.id % combColors.length];

  // Vary pose slightly by id
  const poses = ['standing', 'pecking', 'proud', 'fluffy'];
  const pose = poses[hen.id % poses.length];

  // Vary wattle/comb style
  const combs = [
    // Single comb
    `<path d="M54 22 Q55 18 57 21 Q59 16 61 20 Q63 18 64 22" stroke="${combColor}" stroke-width="2.5" fill="${combColor}" fill-opacity="0.8" stroke-linecap="round" stroke-linejoin="round"/>`,
    // Rose comb
    `<ellipse cx="59" cy="20" rx="6" ry="3" fill="${combColor}"/><circle cx="55" cy="21" r="1.5" fill="${shadeColor(combColor, -10)}"/><circle cx="59" cy="19" r="1.5" fill="${shadeColor(combColor, -10)}"/><circle cx="63" cy="21" r="1.5" fill="${shadeColor(combColor, -10)}"/>`,
    // Pea comb
    `<path d="M53 22 Q56 17 59 21 Q62 17 65 22" fill="${combColor}" stroke="${combColor}" stroke-width="1.5" stroke-linecap="round"/>`,
    // V-shaped
    `<path d="M55 22 L58 16 L61 22" fill="${combColor}" stroke="${combColor}" stroke-width="1.5" stroke-linejoin="round"/><path d="M60 22 L63 17 L66 22" fill="${combColor}" stroke="${combColor}" stroke-width="1.5" stroke-linejoin="round"/>`,
  ];
  const combSVG = combs[hen.id % combs.length];

  // Background gradient per egg color type
  const bgGradients = {
    brown:     ['#FFF4E6', '#FFE8CC', '#FEF5E4'],
    white:     ['#F0F8FF', '#E8F4FF', '#F5FAFF'],
    cream:     ['#FFF8EC', '#FFF2D8', '#FFFBF0'],
    blue:      ['#EBF6FF', '#DCF0FF', '#F0F9FF'],
    green:     ['#EDFBEE', '#DDF5DE', '#F2FBF2'],
    chocolate: ['#FFF0E8', '#FFE4D8', '#FFF4EE'],
    speckled:  ['#FFF6E0', '#FFEEC8', '#FFFAEE'],
  };
  const bgSet = bgGradients[hen.eggColor] || bgGradients.brown;
  const bgTop = bgSet[hen.id % bgSet.length];

  // Wattle
  const wattleColor = '#E03020';

  // Tail feather variants
  const tails = [
    `<path d="M24 56 Q14 44 11 52 Q8 42 14 48 Q10 38 18 46" stroke="${tailColor}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    `<path d="M24 56 Q12 42 9 50 Q6 40 12 46 Q8 35 16 44 Q5 38 11 48" stroke="${tailColor}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
    `<path d="M24 58 Q14 46 12 54 Q10 44 16 50 Q12 40 20 48" stroke="${tailColor}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    `<path d="M22 56 Q10 40 8 50 Q6 38 14 48" stroke="${tailColor}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  ];
  const tailSVG = tails[hen.id % tails.length];

  // Speckle patterns on body for certain breeds
  let speckles = '';
  if (['Speckled Sussex', 'Welsummer', 'Easter Egger'].includes(hen.breed)) {
    const speckleColor = shadeColor(feather, 20);
    speckles = `
      <circle cx="52" cy="60" r="2" fill="${speckleColor}" opacity="0.5"/>
      <circle cx="46" cy="68" r="1.5" fill="${speckleColor}" opacity="0.45"/>
      <circle cx="58" cy="72" r="1.5" fill="${speckleColor}" opacity="0.4"/>
      <circle cx="42" cy="62" r="1" fill="${speckleColor}" opacity="0.5"/>
      <circle cx="55" cy="80" r="1.5" fill="${speckleColor}" opacity="0.45"/>
    `;
  }

  // Extra fluffy for Silkies
  let fluffExtra = '';
  if (hen.breed.includes('Silkie') || hen.breed.includes('Frizzle')) {
    fluffExtra = `
      <ellipse cx="48" cy="52" rx="18" ry="16" fill="${bodyColor}" opacity="0.3"/>
      <ellipse cx="48" cy="68" rx="20" ry="18" fill="${bodyColor}" opacity="0.25"/>
    `;
  }

  return `<svg width="120" height="140" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="${hen.name} illustration">
  <!-- Background -->
  <defs>
    <radialGradient id="bg${hen.id}" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="${bgTop}"/>
      <stop offset="100%" stop-color="${bgTop}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="body${hen.id}" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="${lightenColor(bodyColor, 30)}"/>
      <stop offset="100%" stop-color="${bodyColor}"/>
    </radialGradient>
    <radialGradient id="wing${hen.id}" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="${lightenColor(wingColor, 20)}"/>
      <stop offset="100%" stop-color="${wingColor}"/>
    </radialGradient>
    <radialGradient id="egg${hen.id}" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="${lightenColor(eggColor, 40)}"/>
      <stop offset="100%" stop-color="${eggColor}"/>
    </radialGradient>
  </defs>

  <ellipse cx="60" cy="70" rx="55" ry="55" fill="url(#bg${hen.id})"/>

  <!-- Ground line -->
  <path d="M10 110 Q60 106 110 110" stroke="${shadeColor(bgTop, -15)}" stroke-width="1.5" fill="none" stroke-dasharray="3 4" opacity="0.6"/>

  <!-- TAIL (behind body) -->
  ${tailSVG}

  <!-- Extra fluff (Silkies etc) -->
  ${fluffExtra}

  <!-- BODY -->
  <ellipse cx="52" cy="72" rx="22" ry="26" fill="url(#body${hen.id})"/>

  <!-- WING -->
  <ellipse cx="44" cy="70" rx="15" ry="11" fill="url(#wing${hen.id})" transform="rotate(-12 44 70)"/>
  <!-- Wing feather lines -->
  <path d="M35 70 Q44 65 54 70" stroke="${shadeColor(wingColor, -20)}" stroke-width="1" fill="none" opacity="0.6"/>
  <path d="M34 73 Q44 68 55 73" stroke="${shadeColor(wingColor, -20)}" stroke-width="1" fill="none" opacity="0.5"/>

  <!-- Speckles -->
  ${speckles}

  <!-- NECK -->
  <path d="M52 48 Q55 42 60 40 Q64 42 64 48 Q62 52 57 52 Q52 52 52 48Z" fill="url(#body${hen.id})"/>

  <!-- HEAD -->
  <circle cx="60" cy="34" r="14" fill="url(#body${hen.id})"/>

  <!-- COMB -->
  ${combSVG}

  <!-- WATTLE -->
  <ellipse cx="57" cy="46" rx="3.5" ry="5" fill="${wattleColor}" opacity="0.9"/>
  <ellipse cx="61" cy="47" rx="2.5" ry="4" fill="${wattleColor}" opacity="0.8"/>

  <!-- EYE -->
  <circle cx="65" cy="32" r="4" fill="white"/>
  <circle cx="65" cy="32" r="2.5" fill="#2A1800"/>
  <circle cx="66.2" cy="30.8" r="0.8" fill="white"/>

  <!-- BEAK -->
  <path d="M71 36 L78 36.5 L71 38Z" fill="#F0A030" stroke="#C07820" stroke-width="0.5" stroke-linejoin="round"/>

  <!-- FEET -->
  <line x1="47" y1="96" x2="45" y2="108" stroke="#D4880A" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="53" y1="96" x2="55" y2="108" stroke="#D4880A" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Toes -->
  <path d="M45 108 L40 112 M45 108 L46 112 M45 108 L48 111" stroke="#D4880A" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M55 108 L52 112 M55 108 L56 112 M55 108 L59 111" stroke="#D4880A" stroke-width="1.5" stroke-linecap="round"/>

  <!-- EGG (small, at side) -->
  <ellipse cx="75" cy="98" rx="8" ry="10" fill="url(#egg${hen.id})" opacity="0.9"/>
  <ellipse cx="73" cy="94" rx="2.5" ry="2" fill="white" opacity="0.3"/>
</svg>`;
}

function shadeColor(hex, percent) {
  try {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + percent * 2.55));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + percent * 2.55));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + percent * 2.55));
    return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
  } catch(e) { return hex; }
}

function lightenColor(hex, amount) {
  return shadeColor(hex, amount);
}

function getEggColorLabel(eggColor) {
  const labels = {
    brown: 'Brown', white: 'White', cream: 'Cream',
    blue: 'Blue', green: 'Green', chocolate: 'Chocolate', speckled: 'Speckled'
  };
  return labels[eggColor] || eggColor;
}

function getEggDotStyle(hen) {
  const styles = {
    brown:     'background: radial-gradient(circle at 35% 35%, #C87050, #8B4513)',
    white:     'background: radial-gradient(circle at 35% 35%, #FFFFFF, #E8E8E0); border: 1px solid #ddd',
    cream:     'background: radial-gradient(circle at 35% 35%, #FFF0D0, #E8C880)',
    blue:      'background: radial-gradient(circle at 35% 35%, #B0D8F0, #6BA8D8)',
    green:     'background: radial-gradient(circle at 35% 35%, #A8D8A0, #5A8E50)',
    chocolate: 'background: radial-gradient(circle at 35% 35%, #6B3010, #2A0E02)',
    speckled:  'background: radial-gradient(circle at 35% 35%, #D4AA70, #A07840)',
  };
  return styles[hen.eggColor] || styles.brown;
}

// ---- CARD BUILDER ----
function buildCard(hen) {
  const article = document.createElement('article');
  article.className = 'hen-card';
  article.setAttribute('role', 'listitem');
  article.setAttribute('tabindex', '0');
  article.dataset.eggColor = hen.eggColor;
  article.dataset.id = hen.id;

  const bgMap = {
    brown:     'linear-gradient(145deg, #FFF4E4, #FFE8CC)',
    white:     'linear-gradient(145deg, #F0F8FF, #E8F4FF)',
    cream:     'linear-gradient(145deg, #FFF8EC, #FFF2D8)',
    blue:      'linear-gradient(145deg, #EBF6FF, #D8EEFF)',
    green:     'linear-gradient(145deg, #EDFBEE, #DDF5DE)',
    chocolate: 'linear-gradient(145deg, #FFF0E8, #FFE4D8)',
    speckled:  'linear-gradient(145deg, #FFF6E0, #FFEEC8)',
  };

  article.innerHTML = `
    <div class="card-illustration" style="background: ${bgMap[hen.eggColor] || bgMap.brown}">
      <span class="card-number">${hen.id}</span>
      ${buildHenSVG(hen)}
      <div class="egg-badge">
        <span class="egg-badge-dot" style="${getEggDotStyle(hen)}"></span>
        ${getEggColorLabel(hen.eggColor)}
      </div>
    </div>
    <div class="card-body">
      <h2 class="card-name">${hen.name}</h2>
      <p class="card-breed">${hen.breed}</p>
      <p class="card-pun">${hen.pun}</p>
      <div class="card-footer">
        <div class="card-stat">
          <span class="card-stat-label">Eggs/year</span>
          <span class="card-stat-value">~${hen.eggsPerYear}</span>
        </div>
        <div class="card-stat">
          <span class="card-stat-label">Egg color</span>
          <span class="card-stat-value">${getEggColorLabel(hen.eggColor)}</span>
        </div>
        <span class="card-trait">${hen.trait}</span>
      </div>
    </div>
    <div class="card-tagline">${hen.tagline}</div>
    <div class="card-hover-reveal">
      <p class="card-personality-text">${hen.personality}</p>
    </div>
  `;

  return article;
}

// ---- FILTER + RENDER ENGINE ----
let currentFilter = 'all';
let currentSearch = '';
let currentSort = 'id';

function getFilteredHens() {
  let hens = [...HENS];

  if (currentFilter !== 'all') {
    hens = hens.filter(h => h.eggColor === currentFilter);
  }

  if (currentSearch.trim()) {
    const q = currentSearch.toLowerCase().trim();
    hens = hens.filter(h =>
      h.name.toLowerCase().includes(q) ||
      h.breed.toLowerCase().includes(q) ||
      h.personality.toLowerCase().includes(q) ||
      h.pun.toLowerCase().includes(q) ||
      h.trait.toLowerCase().includes(q) ||
      h.eggColor.toLowerCase().includes(q)
    );
  }

  switch (currentSort) {
    case 'name':     hens.sort((a,b) => a.name.localeCompare(b.name)); break;
    case 'eggs':     hens.sort((a,b) => b.eggsPerYear - a.eggsPerYear); break;
    case 'eggs-asc': hens.sort((a,b) => a.eggsPerYear - b.eggsPerYear); break;
    default:         hens.sort((a,b) => a.id - b.id);
  }

  return hens;
}

function render() {
  const grid = document.getElementById('hen-grid');
  const emptyState = document.getElementById('empty-state');
  const countBadge = document.getElementById('visible-count');

  const hens = getFilteredHens();

  grid.innerHTML = '';
  emptyState.hidden = hens.length > 0;
  grid.style.display = hens.length === 0 ? 'none' : '';

  countBadge.textContent = hens.length;

  const fragment = document.createDocumentFragment();
  hens.forEach(hen => fragment.appendChild(buildCard(hen)));
  grid.appendChild(fragment);
}

// ---- EVENT LISTENERS ----
document.addEventListener('DOMContentLoaded', () => {
  render();

  // Filter chips
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('chip--active'));
      chip.classList.add('chip--active');
      currentFilter = chip.dataset.filter;
      render();
    });
  });

  // Search
  const searchEl = document.getElementById('search');
  let searchTimer;
  searchEl.addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      currentSearch = e.target.value;
      render();
    }, 180);
  });

  // Sort
  document.getElementById('sort-select').addEventListener('change', (e) => {
    currentSort = e.target.value;
    render();
  });

  // Reset
  document.getElementById('reset-btn').addEventListener('click', () => {
    currentFilter = 'all';
    currentSearch = '';
    currentSort = 'id';
    document.getElementById('search').value = '';
    document.getElementById('sort-select').value = 'id';
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('chip--active'));
    document.querySelector('.chip[data-filter="all"]').classList.add('chip--active');
    render();
  });
});
