/* ============================================================
   SmartClinity — Join Us page logic
   ============================================================ */
(function () {
  'use strict';

  // ─── Embedded phase data (fallback when opening file:// directly) ───
  // The same data also lives in /data/phases.json. If fetch() fails
  // because the page is opened directly from disk, we use this copy.
  const EMBEDDED = window.__SMARTCLINITY_PHASES__ || null;

  let DATA = null;

  // ─── Utility ───
  function $(s, root) { return (root || document).querySelector(s); }
  function $$(s, root) { return Array.from((root || document).querySelectorAll(s)); }
  function el(tag, cls, content) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (content !== undefined) n.textContent = content;
    return n;
  }

  // ─── Load data ───
  async function loadPhases() {
    try {
      const res = await fetch('data/phases.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error('Bad status ' + res.status);
      DATA = await res.json();
    } catch (err) {
      if (EMBEDDED) {
        DATA = EMBEDDED;
        console.warn('[Join Us] fetch() failed, using embedded data:', err);
      } else {
        console.error('[Join Us] Could not load phase data. Serve the site over HTTP.', err);
        return;
      }
    }
    function safe(name, fn) {
      try { fn(); }
      catch (e) { console.error('[Join Us] ' + name + ' failed:', e); }
    }
    safe('initPhaseBoard', initPhaseBoard);
    safe('initPertCustom', initPertCustom);
    safe('initGanttCustom',initGanttCustom);
    safe('initLightbox',   initLightbox);
  }

  // ─── Lightbox for campaign images ───
  function initLightbox() {
    const cards = $$('.campaign-card[data-lightbox]');
    if (!cards.length) return;
    const items = cards.map(function (c) {
      return {
        src: c.dataset.src || c.querySelector('img').src,
        seg: c.dataset.seg || '',
        tag: c.dataset.tag || (c.querySelector('.campaign-card__tag') || {}).textContent || ''
      };
    });
    const lb = $('#lightbox'), lbImg = $('#lightbox-img'),
          lbSeg = $('#lightbox-seg'), lbTag = $('#lightbox-tag');
    if (!lb || !lbImg) return;
    let idx = 0;
    function render() {
      const it = items[idx];
      lbImg.src = it.src; lbImg.alt = it.tag;
      lbSeg.textContent = it.seg; lbTag.textContent = it.tag;
    }
    function open(i) {
      idx = i; render();
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    function step(dir) { idx = (idx + dir + items.length) % items.length; render(); }
    cards.forEach(function (c, i) {
      c.addEventListener('click', function () { open(i); });
      c.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
      });
    });
    const cls = $('#lightbox-close'); if (cls) cls.addEventListener('click', close);
    const prv = $('#lightbox-prev');  if (prv) prv.addEventListener('click', function () { step(-1); });
    const nxt = $('#lightbox-next');  if (nxt) nxt.addEventListener('click', function () { step(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft')  step(-1);
      else if (e.key === 'ArrowRight') step(1);
    });
  }

  // ─── Phase panel (side drawer) ───
  const panel = $('#phase-panel');
  const panelBg = $('#phase-panel-bg');
  const panelClose = $('#phase-panel-close');

  function openPanel(phase, deptKey, statusKey) {
    if (!phase) return;
    const dept = DATA.meta.departments[deptKey];
    const statusLabel = {
      done: 'Done',
      inProgress: 'In progress',
      future: 'Planned'
    }[statusKey] || '';

    const statusClass = {
      done: 'phase-panel__status--done',
      inProgress: 'phase-panel__status--prog',
      future: 'phase-panel__status--futur'
    }[statusKey] || 'phase-panel__status--futur';

    $('#panel-id').textContent = phase.id + ' · ' + (dept ? dept.label : '');
    $('#panel-title').textContent = phase.title;
    const st = $('#panel-status');
    st.className = 'phase-panel__status ' + statusClass;
    st.textContent = statusLabel;

    const tasksList = $('#panel-tasks');
    tasksList.innerHTML = '';
    (phase.tasks || []).forEach(function (t) {
      tasksList.appendChild(el('li', null, t));
    });

    $('#panel-deps').textContent = phase.deps || '—';
    $('#panel-time').textContent = phase.time || '—';
    $('#panel-margin').textContent = phase.margin || '—';
    $('#panel-resources').textContent = phase.resources || '—';

    panelBg.classList.add('open');
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePanel() {
    panelBg.classList.remove('open');
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (panelClose) panelClose.addEventListener('click', closePanel);
  if (panelBg) panelBg.addEventListener('click', closePanel);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePanel();
  });

  // ─── Phase board (board view) ───
  function initPhaseBoard() {
    const board = $('#phase-board');
    if (!board) return;
    board.innerHTML = '';

    // Header row
    board.appendChild(el('div', 'phase-board__head', 'Department'));
    const dn = el('div', 'phase-board__head');
    dn.innerHTML = '<span class="phase-mini__dot phase-mini__dot--done"></span> Done';
    board.appendChild(dn);
    const ip = el('div', 'phase-board__head');
    ip.innerHTML = '<span class="phase-mini__dot phase-mini__dot--prog"></span> In progress';
    board.appendChild(ip);
    const fu = el('div', 'phase-board__head');
    fu.innerHTML = '<span class="phase-mini__dot phase-mini__dot--futur"></span> Planned';
    board.appendChild(fu);

    const order = ['technology', 'regulatory', 'marketing', 'finance', 'ops'];
    order.forEach(function (deptKey) {
      const dept = DATA.meta.departments[deptKey];
      const block = DATA[deptKey];
      if (!dept || !block) return;

      const cell = el('div', 'phase-board__cell phase-board__dept');
      const chip = el('div', 'phase-board__dept-chip');
      chip.style.background = dept.gradient || dept.color;
      cell.appendChild(chip);
      cell.appendChild(el('span', null, dept.label));
      board.appendChild(cell);

      ['done', 'inProgress', 'future'].forEach(function (sk) {
        const c = el('div', 'phase-board__cell');
        c.setAttribute('data-status-label',
          sk === 'done' ? 'Done' : sk === 'inProgress' ? 'In progress' : 'Planned');
        (block[sk] || []).forEach(function (phase) {
          const ch = document.createElement('button');
          ch.className = 'phase-chip';
          ch.type = 'button';
          ch.innerHTML =
            '<span class="phase-chip__id">' + phase.id + '</span>' +
            '<span>' + phase.title + '</span>';
          ch.addEventListener('click', function () { openPanel(phase, deptKey, sk); });
          c.appendChild(ch);
        });
        board.appendChild(c);
      });
    });
  }


  // ─── Helpers ─────────────────────────────────────────────────────
  function statusKeyOf(deptBlock, phaseId) {
    if (!deptBlock) return 'futur';
    if ((deptBlock.done       || []).some(function (p) { return p.id === phaseId; })) return 'done';
    if ((deptBlock.inProgress || []).some(function (p) { return p.id === phaseId; })) return 'prog';
    return 'futur';
  }

  function findPhaseById(phaseId) {
    const deps = ['technology', 'regulatory', 'marketing', 'finance', 'ops'];
    for (let i = 0; i < deps.length; i++) {
      const deptKey = deps[i];
      const block = DATA[deptKey];
      if (!block) continue;
      const buckets = ['done', 'inProgress', 'future'];
      for (let j = 0; j < buckets.length; j++) {
        const arr = block[buckets[j]] || [];
        for (let k = 0; k < arr.length; k++) {
          if (arr[k].id === phaseId) {
            return { phase: arr[k], deptKey: deptKey, statusKey: buckets[j] };
          }
        }
      }
    }
    return null;
  }

  function openByPhaseId(phaseId) {
    const r = findPhaseById(phaseId);
    if (r) openPanel(r.phase, r.deptKey, r.statusKey);
  }

  // ─── Custom PERT: 4 phase columns + arrow flow + goal node ────────
  const PERT_PHASES = [
    { id: 'p1', title: 'Phase 1 — Foundations',         date: 'Done · 2025 Q4',
      nodes: [
        { id: 'T-1.1', label: 'Analysis & requirements',         date: 'Sep 2025' },
        { id: 'R-1.1', label: 'Regulatory analysis',             date: 'Sep 2025' },
        { id: 'M-1.1', label: 'Brand & market',                  date: 'Sep 2025' },
        { id: 'F-1.1', label: 'Preliminary catalog',             date: 'Oct 2025' },
        { id: 'O-1.1', label: 'Master plan',                     date: 'Nov 2025' }
      ] },
    { id: 'p2', title: 'Phase 2 — Design & costs',      date: 'In progress · 2026 Q1',
      nodes: [
        { id: 'T-2.1', label: 'Components + assembly',           date: '→ Apr 2026' },
        { id: 'R-2.1', label: 'Documentation + risks',           date: '→ Apr 2026' },
        { id: 'M-2.1', label: 'Pitch + campaigns',               date: '→ Mar 2026' },
        { id: 'F-2.1', label: 'Costs + value · ARR',             date: '→ Apr 2026' },
        { id: 'O-2.1', label: 'Resource orchestration',          date: 'Ongoing' }
      ] },
    { id: 'p3', title: 'Phase 3 — Prototype',           date: 'Planned · 2026 Q2',
      nodes: [
        { id: 'T-2.8', label: 'AI training + calibration',       date: 'May–Jun 2026' },
        { id: 'R-2.3', label: 'Clinical protocols',              date: 'May–Jun 2026' },
        { id: 'M-2.3', label: 'Channels per segment',            date: '→ May 2026' },
        { id: 'F-2.1', label: 'Estimated pricing',               date: 'Jun 2026' }
      ] },
    { id: 'p4', title: 'Phase 4 — Market entry',        date: 'Planned · 2026 Q3 → 2027 Q1',
      nodes: [
        { id: 'T-3.7', label: 'Integration + pilot',             date: 'Jul–Sep 2026' },
        { id: 'R-3.2', label: 'CE + post-market',                date: 'Aug–Dec 2026' },
        { id: 'M-3.2', label: 'Hospital launch',                 date: 'Jul 2026' },
        { id: 'F-3.1', label: 'Seed closing',                    date: 'Aug 2026' },
        { id: 'O-3.1', label: 'Milestone control',               date: 'Ongoing' }
      ] }
  ];

  function initPertCustom() {
    const canvas = document.getElementById('pert-canvas');
    if (!canvas || !DATA) return;
    canvas.innerHTML = '';

    PERT_PHASES.forEach(function (ph, idx) {
      const col = document.createElement('div');
      col.className = 'pert-phase';
      col.dataset.phase = ph.id;

      const head = document.createElement('div');
      head.className = 'pert-phase__head';
      head.textContent = 'Phase ' + (idx + 1);
      col.appendChild(head);

      const t = document.createElement('div');
      t.className = 'pert-phase__title';
      t.textContent = ph.title.replace(/^Phase \d+ — /, '');
      col.appendChild(t);

      const d = document.createElement('div');
      d.className = 'pert-phase__date';
      d.textContent = ph.date;
      col.appendChild(d);

      ph.nodes.forEach(function (n) {
        const dept = n.id.charAt(0);
        const deptMap = { T: 'technology', R: 'regulatory', M: 'marketing', F: 'finance', O: 'ops' };
        const deptKey = deptMap[dept] || 'ops';
        const block = DATA[deptKey];
        const status = statusKeyOf(block, n.id);

        const node = document.createElement('button');
        node.type = 'button';
        node.className = 'pert-node pert-node--' + status;
        node.dataset.id = n.id;
        node.innerHTML =
          '<span class="pert-node__dot"></span>' +
          '<span class="pert-node__label">' +
            '<span class="pert-node__id">' + n.id + '</span>' +
            '<span class="pert-node__name">' + n.label + '</span>' +
            '<span class="pert-node__date">' + n.date + '</span>' +
          '</span>';
        node.addEventListener('click', function () { openByPhaseId(n.id); });
        col.appendChild(node);
      });

      canvas.appendChild(col);
    });

    // Goal column
    const goal = document.createElement('div');
    goal.className = 'pert-goal';
    goal.innerHTML =
      '<div class="pert-goal__icon">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/></svg>' +
      '</div>' +
      '<div class="pert-goal__title">Market launch</div>' +
      '<div class="pert-goal__when">Q1 2027</div>';
    canvas.appendChild(goal);

    // SVG arrows connecting columns
    drawPertArrows(canvas);
    window.addEventListener('resize', function () { drawPertArrows(canvas); });
  }

  function drawPertArrows(canvas) {
    // Remove old SVG layer
    const old = canvas.querySelector('.pert-arrows');
    if (old) old.remove();
    if (window.innerWidth < 900) return;

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'pert-arrows');
    const rect = canvas.getBoundingClientRect();
    svg.setAttribute('viewBox', '0 0 ' + rect.width + ' ' + rect.height);
    svg.setAttribute('preserveAspectRatio', 'none');

    const defs = document.createElementNS(svgNS, 'defs');
    defs.innerHTML =
      '<marker id="arrowH" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">' +
        '<path d="M0 0 L10 5 L0 10 z" fill="#a0a0a0"/></marker>';
    svg.appendChild(defs);

    const cols = canvas.querySelectorAll('.pert-phase, .pert-goal');
    for (let i = 0; i < cols.length - 1; i++) {
      const a = cols[i].getBoundingClientRect();
      const b = cols[i + 1].getBoundingClientRect();
      const x1 = a.right - rect.left;
      const x2 = b.left - rect.left;
      const y  = (a.top + a.height / 2) - rect.top;
      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', x1 + 2);
      line.setAttribute('y1', y);
      line.setAttribute('x2', x2 - 8);
      line.setAttribute('y2', y);
      line.setAttribute('stroke', '#c0c0c0');
      line.setAttribute('stroke-width', '1.5');
      line.setAttribute('marker-end', 'url(#arrowH)');
      svg.appendChild(line);
    }
    canvas.appendChild(svg);
  }

  // ─── Custom Gantt: CSS grid + colored bars ─────────────────────────
  // Timeline window: 2025-09-01 → 2027-03-31 (19 months)
  const GANTT_START = new Date('2025-09-01');
  const GANTT_END   = new Date('2027-03-31');
  const GANTT_MS    = GANTT_END - GANTT_START;
  const MONTHS = [
    'Sep 25','Oct 25','Nov 25','Dec 25',
    'Jan 26','Feb 26','Mar 26','Apr 26','May 26','Jun 26','Jul 26','Aug 26','Sep 26','Oct 26','Nov 26','Dec 26',
    'Jan 27','Feb 27','Mar 27'
  ];

  // Tasks: department -> array of bars
  // Each bar: { id, label, start, end, status: 'done'|'prog'|'futur'|'crit' }
  const GANTT_DATA = [
    { dept: 'technology', color: 'linear-gradient(135deg,#5170ff,#ffa3ff)', label: 'Technology', bars: [
      { id: 'T-1.1',  label: 'Analysis & requirements',          start: '2025-09-01', end: '2025-09-30', status: 'done' },
      { id: 'T-1.2',  label: 'Physical study',                   start: '2025-10-01', end: '2025-10-31', status: 'done' },
      { id: 'T-1.3',  label: 'Architecture',                     start: '2025-11-01', end: '2025-11-30', status: 'done' },
      { id: 'T-1.6',  label: 'Modular design',                   start: '2025-12-01', end: '2026-01-15', status: 'done' },
      { id: 'T-2.1',  label: 'Components + assembly',            start: '2026-02-01', end: '2026-03-15', status: 'prog' },
      { id: 'T-2.4',  label: 'Cloud + frontend',                 start: '2026-02-15', end: '2026-04-15', status: 'prog' },
      { id: 'T-2.8',  label: 'AI training + calibration',        start: '2026-04-01', end: '2026-06-15', status: 'prog' },
      { id: 'T-3.1',  label: 'Full integration',                 start: '2026-06-15', end: '2026-07-31', status: 'futur' },
      { id: 'T-3.7',  label: 'Pilot validation',                 start: '2026-09-01', end: '2026-12-15', status: 'crit' }
    ]},
    { dept: 'regulatory', color: 'linear-gradient(135deg,#89d957,#f6e658)', label: 'Regulatory', bars: [
      { id: 'R-1.1',  label: 'Initial reg + clinical',           start: '2025-09-15', end: '2025-10-15', status: 'done' },
      { id: 'R-1.2',  label: 'Compliance study',                 start: '2025-10-15', end: '2025-11-15', status: 'done' },
      { id: 'R-1.3',  label: 'Class IIa classification',         start: '2025-11-15', end: '2025-12-15', status: 'done' },
      { id: 'R-2.1',  label: 'Technical documentation',          start: '2026-02-15', end: '2026-04-15', status: 'prog' },
      { id: 'R-2.2',  label: 'Risk analysis ISO 14971',          start: '2026-03-01', end: '2026-04-30', status: 'prog' },
      { id: 'R-2.3',  label: 'Clinical protocols',               start: '2026-05-01', end: '2026-06-30', status: 'futur' },
      { id: 'R-3.2',  label: 'CE marking preparation',           start: '2026-08-01', end: '2026-12-31', status: 'crit' },
      { id: 'R-3.3',  label: 'Pilot supervision',                start: '2026-09-01', end: '2026-12-15', status: 'futur' }
    ]},
    { dept: 'marketing', color: 'linear-gradient(135deg,#a0a0a0,#d9d9d9)', label: 'Marketing', bars: [
      { id: 'M-1.1',  label: 'Market analysis',                  start: '2025-09-01', end: '2025-09-30', status: 'done' },
      { id: 'M-1.2',  label: 'Brand identity',                   start: '2025-10-01', end: '2025-10-30', status: 'done' },
      { id: 'M-1.5',  label: 'Three campaigns concept',          start: '2025-11-15', end: '2025-12-15', status: 'done' },
      { id: 'M-2.1',  label: 'Pitch + visuals',                  start: '2026-02-15', end: '2026-03-31', status: 'prog' },
      { id: 'M-2.3',  label: 'Channels per segment',             start: '2026-03-15', end: '2026-04-30', status: 'prog' },
      { id: 'M-3.2',  label: 'Hospital launch',                  start: '2026-07-01', end: '2026-08-15', status: 'futur' },
      { id: 'M-3.4',  label: 'Residencies campaign',             start: '2026-10-01', end: '2026-11-30', status: 'futur' },
      { id: 'M-3.x',  label: 'Go-to-market',                     start: '2027-01-01', end: '2027-02-15', status: 'crit' }
    ]},
    { dept: 'finance', color: 'linear-gradient(135deg,#3a3a3a,#6b6b6b)', label: 'Finance', bars: [
      { id: 'F-1.1',  label: 'Lean financial model',             start: '2025-12-01', end: '2026-01-15', status: 'done' },
      { id: 'F-2.1',  label: 'Investor narrative',               start: '2026-03-01', end: '2026-06-30', status: 'prog' },
      { id: 'F-3.1',  label: 'Pre-seed / seed closing',          start: '2026-08-01', end: '2026-09-30', status: 'futur' },
      { id: 'F-3.2',  label: 'SaaS revenue activation',          start: '2026-10-01', end: '2026-12-31', status: 'futur' }
    ]},
    { dept: 'ops', color: 'linear-gradient(135deg,#6b6b6b,#a0a0a0)', label: 'Operations', bars: [
      { id: 'O-1.1',  label: 'Master plan + alignment',          start: '2025-11-01', end: '2025-11-30', status: 'done' },
      { id: 'O-2.1',  label: 'Resource orchestration',           start: '2026-02-01', end: '2026-08-15', status: 'prog' },
      { id: 'O-3.1',  label: 'Milestone control',                start: '2026-09-01', end: '2027-02-28', status: 'futur' }
    ]}
  ];

  function ganttPercent(dateStr) {
    const d = new Date(dateStr);
    return ((d - GANTT_START) / GANTT_MS) * 100;
  }

  function initGanttCustom() {
    const canvas = document.getElementById('gantt-canvas');
    if (!canvas) return;
    canvas.innerHTML = '';

    // Axis (top row): empty label cell + columns
    const empty = document.createElement('div');
    canvas.appendChild(empty);
    const axis = document.createElement('div');
    axis.className = 'gantt-axis';
    axis.style.gridTemplateColumns = 'repeat(' + MONTHS.length + ', 1fr)';
    MONTHS.forEach(function (m, i) {
      const c = document.createElement('div');
      const isQuarter = (i === 0) || /^(Jan|Apr|Jul|Oct)/.test(m);
      c.className = 'gantt-axis-cell' + (isQuarter ? ' gantt-axis-cell--q' : '');
      c.textContent = m;
      axis.appendChild(c);
    });
    canvas.appendChild(axis);

    GANTT_DATA.forEach(function (dept) {
      // Section header
      const sec = document.createElement('div');
      sec.className = 'gantt-section';
      sec.innerHTML =
        '<div class="gantt-section__title">' +
          '<span class="gantt-section__chip" style="background:' + dept.color + '"></span>' +
          dept.label +
        '</div>' +
        '<div></div>';
      canvas.appendChild(sec);

      // Rows
      dept.bars.forEach(function (bar) {
        const row = document.createElement('div');
        row.className = 'gantt-row';
        const lbl = document.createElement('div');
        lbl.className = 'gantt-row__label';
        lbl.textContent = bar.id + ' · ' + bar.label;
        row.appendChild(lbl);

        const track = document.createElement('div');
        track.className = 'gantt-row__track';

        // Quarter lines for visual reference
        [3,6,9,12,15].forEach(function (q) {
          if (q < MONTHS.length) {
            const ql = document.createElement('div');
            ql.className = 'gantt-q-line';
            ql.style.left = ((q / MONTHS.length) * 100) + '%';
            track.appendChild(ql);
          }
        });

        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'gantt-bar gantt-bar--' + bar.status;
        b.dataset.id = bar.id;
        const left = ganttPercent(bar.start);
        const right = ganttPercent(bar.end);
        b.style.left = Math.max(0, left) + '%';
        b.style.width = Math.max(2, right - left) + '%';
        b.title = bar.id + ' · ' + bar.label + '  ·  ' + bar.start + ' → ' + bar.end;
        b.textContent = bar.label;
        b.addEventListener('click', function () { openByPhaseId(bar.id); });
        track.appendChild(b);
        row.appendChild(track);
        canvas.appendChild(row);
      });
    });

    // Today vertical line — placed inside the axis track grid
    const today = new Date();
    if (today >= GANTT_START && today <= GANTT_END) {
      const todayPct = ganttPercent(today.toISOString().slice(0,10));
      // Build a full-height overlay on the right column
      const overlay = document.createElement('div');
      overlay.style.gridColumn = '2';
      overlay.style.gridRow = '2 / 999';
      overlay.style.position = 'relative';
      overlay.style.pointerEvents = 'none';
      const line = document.createElement('div');
      line.className = 'gantt-today';
      line.style.left = todayPct + '%';
      const lab = document.createElement('div');
      lab.className = 'gantt-today__label';
      lab.textContent = 'Today';
      line.appendChild(lab);
      overlay.appendChild(line);
      // Append after axis so it stretches all rows below
      canvas.appendChild(overlay);
    }
  }

  // ─── Smooth scroll for in-page anchors ───
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const tgt = $(id);
      if (!tgt) return;
      e.preventDefault();
      window.scrollTo({
        top: tgt.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    });
  });

  // Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPhases);
  } else {
    loadPhases();
  }
})();
