/* ============================================
   MESTRADO TD 2026 — Study Hub
   ============================================ */
'use strict';

const EVENTS = [
  { date: '2026-04-22T19:00', title: 'Teste TP1', weight: '20%', discipline: 'ggdsi', type: 'Teste' },
  { date: '2026-05-13T19:00', title: 'Teste TP2', weight: '40%', discipline: 'ggdsi', type: 'Teste' },
  { date: '2026-05-25T19:00', title: 'Teste M1 + Projeto', weight: '60%+25%', discipline: 'ba', type: 'Teste' },
  { date: '2026-05-29T19:15', title: 'Pitch + Projeto Final', weight: '60%', discipline: 'ihmr', type: 'Projeto' },
  { date: '2026-06-02T23:59', title: 'Apresentacao + Relatorio', weight: '15%', discipline: 'ba', type: 'Prazo' },
  { date: '2026-06-15T23:59', title: 'Entrega Projeto', weight: '40%', discipline: 'ggdsi', type: 'Prazo' },
  { date: '2026-06-29T18:15', title: 'Exame Normal', weight: '100%', discipline: 'ihmr', type: 'Exame' },
  { date: '2026-07-08T18:15', title: 'Exame de Recurso', weight: '100%', discipline: 'ihmr', type: 'Exame' },
];

const DISC = {
  ba: { name: 'Business Analytics', short: 'BA' },
  ggdsi: { name: 'Governanca de Dados', short: 'GGDSI' },
  ihmr: { name: 'Interface H-M e Robotica', short: 'IHMR' },
};

const MONTHS = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
const TOPIC_COUNTS = { ba: 4, ggdsi: 7, ihmr: 6 };
const MSG_KEY = 'mestrado-td-msgs';
const COLORS = ['#6C5CE7','#0984E3','#00B894','#E17055','#FDCB6E','#E84393','#00CEC9','#636E72'];

let adminMode = false;
let fontSize = parseInt(localStorage.getItem('fontSize')) || 16;

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  applyFontSize();
  initNav();
  initAccordion();
  initInteractive();
  initProgress();
  renderCountdowns();
  renderEvents();
  initMessages();
  initSearch();
  setInterval(renderCountdowns, 60000);
});

// ---- Theme ----
function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefer = window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', saved || prefer);
}

function toggleTheme() {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

// ---- Font ----
function applyFontSize() {
  document.documentElement.style.setProperty('--font-size-base', fontSize + 'px');
}

function changeFontSize(d) {
  fontSize = Math.min(24, Math.max(12, fontSize + d));
  localStorage.setItem('fontSize', fontSize);
  applyFontSize();
}

// ---- Nav ----
function initNav() {
  const page = document.body.dataset.page || 'home';
  document.querySelectorAll('.nav-link').forEach(l => {
    const href = l.getAttribute('href') || '';
    const p = href === 'index.html' ? 'home' : href.replace('.html', '');
    if (p === page) l.classList.add('active');
  });
}

function toggleMobile() {
  document.getElementById('mobileOverlay')?.classList.toggle('open');
}

// ---- Accordion ----
function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(h => {
    h.addEventListener('click', () => {
      const item = h.parentElement;
      const wasActive = item.classList.contains('active');
      item.closest('.accordion')?.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });
}

// ---- Flashcards + Quiz ----
function initInteractive() {
  document.addEventListener('click', e => {
    const fc = e.target.closest('.flashcard');
    if (fc) { fc.classList.toggle('flipped'); return; }

    const opt = e.target.closest('.quiz-option');
    if (opt && !opt.classList.contains('answered')) {
      const block = opt.closest('.quiz-block');
      block.querySelectorAll('.quiz-option').forEach(o => {
        o.classList.add('answered');
        if (o.dataset.correct === 'true') o.classList.add('correct');
      });
      if (opt.dataset.correct !== 'true') opt.classList.add('incorrect');
      updateQuizScore(block.closest('.content-block'));
    }
  });
}

function updateQuizScore(section) {
  if (!section) return;
  const blocks = section.querySelectorAll('.quiz-block');
  const total = blocks.length;
  let correct = 0, done = 0;
  blocks.forEach(b => {
    const opts = b.querySelectorAll('.quiz-option');
    if ([...opts].some(o => o.classList.contains('answered'))) {
      done++;
      if (!b.querySelector('.quiz-option.incorrect')) correct++;
    }
  });
  const el = section.querySelector('.quiz-score-display');
  if (el && done === total) {
    el.textContent = correct + '/' + total + ' corretas';
    el.classList.remove('hidden');
  }
}

function resetQuiz(btn) {
  const section = btn.closest('.content-block');
  if (!section) return;
  section.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('answered','correct','incorrect'));
  const s = section.querySelector('.quiz-score-display');
  if (s) { s.classList.add('hidden'); s.textContent = ''; }
}

// ---- Progress ----
function initProgress() {
  document.querySelectorAll('.accordion-item[data-topic]').forEach(item => {
    if (localStorage.getItem('studied-' + item.dataset.topic)) markStudiedUI(item, true);
  });
  updateProgressBar();
  updateHomeProgress();
}

function toggleStudied(topicId) {
  const key = 'studied-' + topicId;
  const was = !!localStorage.getItem(key);
  was ? localStorage.removeItem(key) : localStorage.setItem(key, '1');
  const item = document.querySelector('[data-topic="' + topicId + '"]');
  if (item) markStudiedUI(item, !was);
  updateProgressBar();
  updateHomeProgress();
}

function markStudiedUI(item, studied) {
  const st = item.querySelector('.topic-status');
  const btn = item.querySelector('.mark-studied');
  if (st) { st.textContent = studied ? 'Estudado' : 'Pendente'; st.classList.toggle('studied', studied); }
  if (btn) {
    btn.textContent = studied ? 'Estudado (clique para desmarcar)' : 'Marcar como estudado';
    btn.classList.toggle('btn-outline', studied);
    btn.classList.toggle('btn-success', !studied);
  }
}

function updateProgressBar() {
  const page = document.body.dataset.page;
  if (!page || page === 'home') return;
  const items = document.querySelectorAll('.accordion-item[data-topic]');
  if (!items.length) return;
  let studied = 0;
  items.forEach(i => { if (localStorage.getItem('studied-' + i.dataset.topic)) studied++; });
  const pct = Math.round((studied / items.length) * 100);
  const bar = document.getElementById('progressBar');
  const label = document.getElementById('progressLabel');
  if (bar) bar.style.width = pct + '%';
  if (label) label.textContent = studied + '/' + items.length + ' (' + pct + '%)';
}

function updateHomeProgress() {
  Object.entries(TOPIC_COUNTS).forEach(([d, total]) => {
    const bar = document.getElementById(d + '-progress');
    if (!bar) return;
    let s = 0;
    for (let i = 1; i <= total; i++) if (localStorage.getItem('studied-' + d + '-t' + i)) s++;
    bar.style.width = (total > 0 ? Math.round((s / total) * 100) : 0) + '%';
  });
}

// ---- Countdowns ----
function getRemaining(dateStr) {
  const diff = new Date(dateStr) - new Date();
  if (diff <= 0) return null;
  return { days: Math.floor(diff / 864e5), hours: Math.floor((diff % 864e5) / 36e5), minutes: Math.floor((diff % 36e5) / 6e4) };
}

function renderCountdowns() {
  const el = document.getElementById('countdownGrid');
  if (!el) return;
  const page = document.body.dataset.page || 'home';
  let evts = EVENTS.filter(e => new Date(e.date) > new Date()).sort((a, b) => new Date(a.date) - new Date(b.date));
  if (page !== 'home') evts = evts.filter(e => e.discipline === page);
  evts = evts.slice(0, 3);
  if (!evts.length) { el.innerHTML = '<p class="text-muted text-center">Sem eventos pendentes</p>'; return; }
  el.innerHTML = evts.map(ev => {
    const r = getRemaining(ev.date);
    if (!r) return '';
    return '<div class="countdown-card ' + ev.discipline + (r.days < 7 ? ' urgent' : '') + '">' +
      '<div class="countdown-label">' + DISC[ev.discipline].short + '</div>' +
      '<div class="countdown-event">' + ev.title + ' (' + ev.weight + ')</div>' +
      '<div class="countdown-values">' +
        '<div class="countdown-unit"><div class="countdown-value">' + r.days + '</div><div class="countdown-unit-label">dias</div></div>' +
        '<div class="countdown-unit"><div class="countdown-value">' + r.hours + '</div><div class="countdown-unit-label">horas</div></div>' +
        '<div class="countdown-unit"><div class="countdown-value">' + r.minutes + '</div><div class="countdown-unit-label">min</div></div>' +
      '</div></div>';
  }).join('');
}

// ---- Events ----
function renderEvents() {
  const el = document.getElementById('eventList');
  if (!el) return;
  el.innerHTML = [...EVENTS].sort((a, b) => new Date(a.date) - new Date(b.date)).map(ev => {
    const d = new Date(ev.date);
    const past = d < new Date();
    return '<div class="event-item" style="' + (past ? 'opacity:.4' : '') + '">' +
      '<div class="event-date-box"><div class="day">' + d.getDate() + '</div><div class="month">' + MONTHS[d.getMonth()] + '</div></div>' +
      '<div class="event-info"><div class="event-title">' + ev.title + '</div><div class="event-desc">' + ev.type + ' — ' + ev.weight + '</div></div>' +
      '<span class="event-tag ' + ev.discipline + '">' + DISC[ev.discipline].short + '</span></div>';
  }).join('');
}

// ---- Messages ----
function initMessages() {
  const n = document.getElementById('msgName');
  if (n) { const s = localStorage.getItem('userName'); if (s) n.value = s; }
  const t = document.getElementById('msgText');
  if (t) t.addEventListener('keydown', e => { if (e.key === 'Enter') submitMessage(); });
  renderMessages();
}

function getMessages() { try { return JSON.parse(localStorage.getItem(MSG_KEY)) || []; } catch { return []; } }

function submitMessage() {
  const ni = document.getElementById('msgName'), ti = document.getElementById('msgText');
  if (!ni || !ti) return;
  const name = ni.value.trim(), text = ti.value.trim();
  if (!name) return alert('Identifique-se com seu nome.');
  if (!text) return alert('Escreva uma mensagem.');
  localStorage.setItem('userName', name);
  const msgs = getMessages();
  msgs.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2,6), name, text, ts: Date.now() });
  localStorage.setItem(MSG_KEY, JSON.stringify(msgs));
  ti.value = '';
  renderMessages();
}

function deleteMessage(id) {
  if (!adminMode || !confirm('Apagar este recado?')) return;
  localStorage.setItem(MSG_KEY, JSON.stringify(getMessages().filter(m => m.id !== id)));
  renderMessages();
}

function enableAdmin() {
  const p = prompt('Password de admin:');
  if (p === 'mestrado2026') { adminMode = true; renderMessages(); alert('Modo admin ativado.'); }
}

function renderMessages() {
  const el = document.getElementById('messageList');
  if (!el) return;
  const msgs = getMessages();
  if (!msgs.length) { el.innerHTML = '<div class="message-empty">Nenhum recado ainda. Seja o primeiro!</div>'; return; }
  el.innerHTML = [...msgs].reverse().map(m => {
    const ci = m.name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length;
    return '<div class="message-item">' +
      '<div class="message-avatar" style="background:' + COLORS[ci] + '">' + esc(m.name.charAt(0).toUpperCase()) + '</div>' +
      '<div class="message-body"><span class="message-author">' + esc(m.name) + '</span>' +
      '<span class="message-time">' + timeAgo(m.ts) + '</span>' +
      '<p class="message-text">' + esc(m.text) + '</p></div>' +
      (adminMode ? '<button class="message-delete" onclick="deleteMessage(\'' + m.id + '\')" title="Apagar">&#10005;</button>' : '') +
      '</div>';
  }).join('');
}

function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return 'agora';
  const m = Math.floor(s / 60); if (m < 60) return 'ha ' + m + ' min';
  const h = Math.floor(m / 60); if (h < 24) return 'ha ' + h + 'h';
  const d = Math.floor(h / 24); if (d < 7) return 'ha ' + d + 'd';
  const dt = new Date(ts); return dt.getDate() + ' ' + MONTHS[dt.getMonth()];
}

function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

// ---- Search ----
function initSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    document.querySelectorAll('.accordion-item').forEach(item => {
      item.style.display = !q || item.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

// ---- Expose globals for HTML onclick ----
window.toggleTheme = toggleTheme;
window.changeFontSize = changeFontSize;
window.toggleMobile = toggleMobile;
window.toggleStudied = toggleStudied;
window.resetQuiz = resetQuiz;
window.submitMessage = submitMessage;
window.deleteMessage = deleteMessage;
window.enableAdmin = enableAdmin;
