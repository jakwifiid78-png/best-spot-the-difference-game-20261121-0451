// Pasar Malam Kembar — a spot-the-difference game.
// Original art: one night-market street drawn twice on canvas.
// The right picture hides 8 changes; find them all before the timer stops you.
// No assets, no network: every pixel is drawn by the code in this file.

'use strict';

const W = 640;
const H = 420;

// The 8 differences. x/y are scene coordinates (same on both panels).
// kind tells drawScene how the RIGHT panel differs from the left one.
const DIFFERENCES = [
  { id: 'bulan',   name: 'Bulan berubah warna',      x: 565, y: 58,  kind: 'moon' },
  { id: 'lentera', name: 'Lentera tengah hilang',    x: 540, y: 186, kind: 'lantern' },
  { id: 'kucing',  name: 'Kucing hitam hilang',      x: 300, y: 362, kind: 'cat' },
  { id: 'balon',   name: 'Balon kuning hilang',      x: 265, y: 100, kind: 'balloon' },
  { id: 'atap',    name: 'Atap kios berubah warna',  x: 135, y: 150, kind: 'awning' },
  { id: 'apel',    name: 'Satu apel berkurang',      x: 352, y: 298, kind: 'apple' },
  { id: 'bintang', name: 'Bintang terang hilang',    x: 180, y: 45,  kind: 'star' },
  { id: 'tulisan', name: 'Tulisan SATE jadi SOTO',   x: 110, y: 102, kind: 'sign' },
];

const STARS = [
  [40, 30], [90, 70], [140, 28], [180, 45], [230, 60], [270, 26], [320, 55],
  [370, 32], [420, 68], [460, 30], [500, 55], [610, 40], [60, 110], [200, 90],
  [350, 95], [430, 100], [600, 95], [30, 160], [250, 120], [480, 120],
];

// ---------------------------------------------------------------------------
// Scene drawing. `right` = true draws the twin picture with the 8 changes.
// ---------------------------------------------------------------------------

function drawScene(ctx, right) {
  // Night sky.
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#141a38');
  sky.addColorStop(0.55, '#3a2a5e');
  sky.addColorStop(1, '#7a3b5e');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // Stars (one bright star vanishes on the right).
  for (const [sx, sy] of STARS) {
    if (right && sx === 180 && sy === 45) continue;
    const big = sx === 180 && sy === 45;
    ctx.fillStyle = big ? '#fff7c0' : 'rgba(255,255,255,0.85)';
    ctx.beginPath();
    ctx.arc(sx, sy, big ? 3.4 : 1.8, 0, Math.PI * 2);
    ctx.fill();
    if (big) {
      ctx.strokeStyle = 'rgba(255,247,192,0.7)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(sx - 8, sy); ctx.lineTo(sx + 8, sy);
      ctx.moveTo(sx, sy - 8); ctx.lineTo(sx, sy + 8);
      ctx.stroke();
    }
  }

  // Moon: pale yellow on the left, ember orange on the right.
  ctx.fillStyle = right ? '#ff8c42' : '#ffe9a8';
  ctx.beginPath(); ctx.arc(565, 58, 30, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = right ? 'rgba(200,80,20,0.55)' : 'rgba(220,190,110,0.6)';
  ctx.beginPath(); ctx.arc(556, 50, 6, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(574, 66, 4, 0, Math.PI * 2); ctx.fill();

  // Distant rooftops.
  ctx.fillStyle = '#241a3d';
  ctx.beginPath();
  ctx.moveTo(0, 300); ctx.lineTo(0, 262); ctx.lineTo(70, 262); ctx.lineTo(70, 240);
  ctx.lineTo(120, 240); ctx.lineTo(120, 268); ctx.lineTo(210, 268); ctx.lineTo(210, 248);
  ctx.lineTo(300, 248); ctx.lineTo(300, 272); ctx.lineTo(400, 272); ctx.lineTo(400, 244);
  ctx.lineTo(470, 244); ctx.lineTo(470, 266); ctx.lineTo(560, 266); ctx.lineTo(560, 250);
  ctx.lineTo(640, 250); ctx.lineTo(640, 300); ctx.closePath(); ctx.fill();
  // Lit windows on the rooftops.
  ctx.fillStyle = '#ffd76a';
  for (const [wx, wy] of [[88, 250], [240, 256], [420, 254], [585, 258], [330, 258]]) {
    ctx.fillRect(wx, wy, 10, 12);
  }

  // String lights across the top.
  ctx.strokeStyle = '#2a1f3d';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 18); ctx.quadraticCurveTo(320, 58, 640, 14); ctx.stroke();
  const bulbColors = ['#ff5d73', '#ffd23e', '#4dd7ff', '#7dff6a', '#ff9de2'];
  for (let i = 0; i < 17; i++) {
    const t = i / 16;
    const bx = t * 640;
    const by = 18 + Math.sin(t * Math.PI) * 34 - t * 4;
    ctx.fillStyle = bulbColors[i % bulbColors.length];
    ctx.beginPath(); ctx.arc(bx, by + 8, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.beginPath(); ctx.arc(bx - 1.5, by + 6, 1.6, 0, Math.PI * 2); ctx.fill();
  }

  // Cobblestone ground.
  ctx.fillStyle = '#2c2140';
  ctx.fillRect(0, 300, W, 120);
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  for (let gy = 312; gy < 415; gy += 22) {
    for (let gx = (gy % 44 === 0 ? 0 : 18); gx < W; gx += 36) {
      ctx.fillRect(gx, gy, 28, 14);
    }
  }
  // Moonlit puddle.
  ctx.fillStyle = 'rgba(150,180,255,0.25)';
  ctx.beginPath(); ctx.ellipse(480, 392, 62, 10, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(255,233,168,0.35)';
  ctx.beginPath(); ctx.ellipse(480, 392, 30, 5, 0, 0, Math.PI * 2); ctx.fill();

  drawSatayStall(ctx, right);
  drawFruitCart(ctx, right);
  drawLanternStall(ctx, right);
  drawBalloons(ctx, right);
  if (!right) drawCat(ctx); // the black cat only sits on the left picture
  drawFireflies(ctx);
}

function drawSatayStall(ctx, right) {
  // Stall posts + counter.
  ctx.fillStyle = '#5a3a22';
  ctx.fillRect(44, 168, 10, 140);
  ctx.fillRect(216, 168, 10, 140);
  ctx.fillStyle = '#7a4a28';
  ctx.fillRect(36, 296, 198, 14);
  ctx.fillStyle = '#8a5a32';
  ctx.fillRect(40, 310, 190, 56);

  // Awning: red/white on the left, teal/white on the right.
  const stripeA = right ? '#2ec4b6' : '#e63946';
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = i % 2 === 0 ? stripeA : '#fff3e0';
    ctx.fillRect(36 + i * 33, 132, 33, 36);
  }
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(36, 164, 198, 5);

  // Sign board: SATE on the left, SOTO on the right.
  ctx.fillStyle = '#1d3557';
  ctx.fillRect(62, 84, 96, 36);
  ctx.strokeStyle = '#ffd23e'; ctx.lineWidth = 3;
  ctx.strokeRect(62, 84, 96, 36);
  ctx.fillStyle = '#ffd23e';
  ctx.font = 'bold 24px Georgia, serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(right ? 'SOTO' : 'SATE', 110, 103);

  // Vendor: head, hat, body, smile.
  ctx.fillStyle = '#f2c094';
  ctx.beginPath(); ctx.arc(135, 232, 22, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#e63946';
  ctx.beginPath(); ctx.arc(135, 218, 22, Math.PI, 0); ctx.fill();
  ctx.fillRect(113, 214, 44, 6);
  ctx.fillStyle = '#457b9d';
  ctx.fillRect(108, 254, 54, 46);
  ctx.fillStyle = '#1d3557';
  ctx.beginPath(); ctx.arc(128, 232, 2.5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(143, 232, 2.5, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#1d3557'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(135, 240, 7, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();

  // Satay skewers on the counter.
  ctx.strokeStyle = '#d9a066'; ctx.lineWidth = 3;
  for (let i = 0; i < 4; i++) {
    const sx = 60 + i * 16;
    ctx.beginPath(); ctx.moveTo(sx, 296); ctx.lineTo(sx + 8, 278); ctx.stroke();
  }
  ctx.fillStyle = '#b5651d';
  for (let i = 0; i < 4; i++) {
    const sx = 68 + i * 16;
    ctx.beginPath(); ctx.arc(sx, 282, 5, 0, Math.PI * 2); ctx.fill();
  }
  // Grill smoke.
  ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(180, 292); ctx.quadraticCurveTo(186, 276, 180, 264); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(196, 292); ctx.quadraticCurveTo(202, 278, 196, 268); ctx.stroke();
}

function drawFruitCart(ctx, right) {
  // Cart body + wheels.
  ctx.fillStyle = '#6d4c2f';
  ctx.fillRect(252, 300, 168, 16);
  ctx.fillStyle = '#8a5a32';
  ctx.fillRect(258, 316, 156, 44);
  ctx.fillStyle = '#3d2b1f';
  ctx.beginPath(); ctx.arc(288, 366, 16, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(388, 366, 16, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffd23e';
  ctx.beginPath(); ctx.arc(288, 366, 6, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(388, 366, 6, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#6d4c2f'; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(420, 306); ctx.lineTo(436, 286); ctx.stroke();

  // Sign board.
  ctx.fillStyle = '#2a9d8f';
  ctx.fillRect(296, 196, 84, 30);
  ctx.strokeStyle = '#fff3e0'; ctx.lineWidth = 2;
  ctx.strokeRect(296, 196, 84, 30);
  ctx.fillStyle = '#fff3e0';
  ctx.font = 'bold 19px Georgia, serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('BUAH', 338, 212);

  // Apple pile: five apples on the left, four on the right.
  const apples = [[318, 292], [338, 284], [358, 292], [328, 300], [352, 298]];
  ctx.fillStyle = '#e63946';
  for (const [ax, ay] of apples) {
    if (right && ax === 352 && ay === 298) continue;
    ctx.beginPath(); ctx.arc(ax, ay, 10, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#7dff6a';
    ctx.fillRect(ax + 2, ay - 14, 3, 6);
    ctx.fillStyle = '#e63946';
  }
  // Orange pile.
  ctx.fillStyle = '#ff9f1c';
  for (const [ox, oy] of [[392, 292], [408, 286], [398, 300]]) {
    ctx.beginPath(); ctx.arc(ox, oy, 9, 0, Math.PI * 2); ctx.fill();
  }
  // Banana bunch.
  ctx.strokeStyle = '#ffd23e'; ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(272, 292); ctx.quadraticCurveTo(282, 302, 292, 294); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(274, 298); ctx.quadraticCurveTo(284, 308, 294, 300); ctx.stroke();
}

function drawLanternStall(ctx, right) {
  // Stall frame.
  ctx.fillStyle = '#5a3a22';
  ctx.fillRect(452, 168, 10, 140);
  ctx.fillRect(624, 168, 10, 140);
  ctx.fillStyle = '#7a4a28';
  ctx.fillRect(448, 296, 188, 14);
  ctx.fillStyle = '#8a5a32';
  ctx.fillRect(452, 310, 180, 56);
  // Awning, purple/gold.
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = i % 2 === 0 ? '#8338ec' : '#ffd23e';
    ctx.fillRect(448 + i * 31, 132, 31, 36);
  }
  // Sign board.
  ctx.fillStyle = '#8338ec';
  ctx.fillRect(500, 84, 116, 36);
  ctx.strokeStyle = '#ffd23e'; ctx.lineWidth = 3;
  ctx.strokeRect(500, 84, 116, 36);
  ctx.fillStyle = '#fff3e0';
  ctx.font = 'bold 20px Georgia, serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('LENTERA', 558, 103);

  // Three hanging paper lanterns; the middle one is missing on the right.
  const lanterns = [
    { x: 490, c: '#ff5d73' },
    { x: 540, c: '#ffd23e' },
    { x: 590, c: '#4dd7ff' },
  ];
  for (const L of lanterns) {
    if (right && L.x === 540) continue;
    ctx.strokeStyle = '#2a1f3d'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(L.x, 168); ctx.lineTo(L.x, 172); ctx.stroke();
    ctx.fillStyle = L.c;
    ctx.beginPath(); ctx.ellipse(L.x, 190, 20, 24, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.beginPath(); ctx.ellipse(L.x - 6, 182, 5, 9, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#2a1f3d';
    ctx.fillRect(L.x - 8, 164, 16, 5);
    ctx.fillRect(L.x - 8, 212, 16, 5);
  }
  // Lanterns for sale on the counter.
  ctx.fillStyle = '#ff5d73';
  ctx.beginPath(); ctx.ellipse(480, 288, 12, 14, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#4dd7ff';
  ctx.beginPath(); ctx.ellipse(600, 288, 12, 14, 0, 0, Math.PI * 2); ctx.fill();
}

function drawBalloons(ctx, right) {
  // Three balloons tied to the fruit-cart post; the yellow one is gone on the right.
  const balloons = [
    { x: 222, y: 96, c: '#ff5d73' },
    { x: 244, y: 82, c: '#4dd7ff' },
    { x: 265, y: 100, c: '#ffd23e' },
  ];
  ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 1.5;
  for (const b of balloons) {
    if (right && b.c === '#ffd23e') continue;
    ctx.beginPath(); ctx.moveTo(b.x, b.y + 16); ctx.quadraticCurveTo(b.x + 4, 150, 244, 196); ctx.stroke();
    ctx.fillStyle = b.c;
    ctx.beginPath(); ctx.ellipse(b.x, b.y, 13, 16, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.beginPath(); ctx.ellipse(b.x - 4, b.y - 5, 3, 5, 0, 0, Math.PI * 2); ctx.fill();
  }
}

function drawCat(ctx) {
  ctx.fillStyle = '#14101f';
  // Sitting cat: body, head, ears, tail.
  ctx.beginPath(); ctx.ellipse(300, 368, 20, 24, 0, Math.PI, 0); ctx.fill();
  ctx.fillRect(280, 366, 40, 22);
  ctx.beginPath(); ctx.arc(300, 340, 14, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.moveTo(290, 330); ctx.lineTo(293, 316); ctx.lineTo(300, 328); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(310, 330); ctx.lineTo(307, 316); ctx.lineTo(300, 328); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#14101f'; ctx.lineWidth = 6; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(318, 384); ctx.quadraticCurveTo(340, 380, 336, 360); ctx.stroke();
  ctx.fillStyle = '#ffd23e';
  ctx.beginPath(); ctx.arc(295, 338, 2.2, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(305, 338, 2.2, 0, Math.PI * 2); ctx.fill();
}

function drawFireflies(ctx) {
  ctx.fillStyle = 'rgba(255,255,150,0.8)';
  for (const [fx, fy] of [[150, 330], [420, 340], [520, 330], [80, 350], [610, 350]]) {
    ctx.beginPath(); ctx.arc(fx, fy, 2, 0, Math.PI * 2); ctx.fill();
  }
}

// ---------------------------------------------------------------------------
// Game state + interaction.
// ---------------------------------------------------------------------------

const params = new URLSearchParams(location.search);
const SHOT = params.get('shot') || '';
const SHOT_FOUND = { start: 0, play: 3, play2: 5, end: 8 }[SHOT] ?? -1;

const state = {
  found: new Set(),
  wrong: [],
  score: 0,
  mistakes: 0,
  hintsUsed: 0,
  muted: false,
  startTime: Date.now(),
  elapsed: 0,
  timerId: null,
  won: false,
  audio: null,
};

function audioCtx() {
  if (!state.audio) {
    try { state.audio = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { state.audio = null; }
  }
  return state.audio;
}

function beep(freq, dur, type, gain) {
  if (state.muted) return;
  const ac = audioCtx();
  if (!ac) return;
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = type || 'sine';
  o.frequency.value = freq;
  g.gain.setValueAtTime(gain || 0.12, ac.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
  o.connect(g); g.connect(ac.destination);
  o.start(); o.stop(ac.currentTime + dur);
}

function playDing() { beep(880, 0.18, 'sine', 0.14); setTimeout(() => beep(1318, 0.25, 'sine', 0.12), 90); }
function playBuzz() { beep(160, 0.22, 'sawtooth', 0.08); }
function playWin() { [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => beep(f, 0.3, 'triangle', 0.14), i * 130)); }

const leftCanvas = document.getElementById('left');
const rightCanvas = document.getElementById('right');
const lctx = leftCanvas.getContext('2d');
const rctx = rightCanvas.getContext('2d');

function drawAll() {
  drawScene(lctx, false);
  drawScene(rctx, true);
  drawMarkers(lctx);
  drawMarkers(rctx);
  drawWrong(lctx);
  drawWrong(rctx);
}

function drawMarkers(ctx) {
  for (const d of DIFFERENCES) {
    if (!state.found.has(d.id)) continue;
    ctx.strokeStyle = '#2ee66b';
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(d.x, d.y, 26, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = 'rgba(46,230,107,0.35)';
    ctx.lineWidth = 9;
    ctx.beginPath(); ctx.arc(d.x, d.y, 30, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = '#2ee66b'; ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(d.x - 9, d.y); ctx.lineTo(d.x - 2, d.y + 8); ctx.lineTo(d.x + 11, d.y - 8);
    ctx.stroke();
  }
}

function drawWrong(ctx) {
  const now = Date.now();
  state.wrong = state.wrong.filter((w) => now - w.t < 700);
  for (const w of state.wrong) {
    ctx.strokeStyle = '#ff3b30';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(w.x - 10, w.y - 10); ctx.lineTo(w.x + 10, w.y + 10);
    ctx.moveTo(w.x + 10, w.y - 10); ctx.lineTo(w.x - 10, w.y + 10);
    ctx.stroke();
  }
}

function fmtTime(ms) {
  const s = Math.floor(ms / 1000);
  return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
}

function updateHud() {
  const n = state.found.size;
  document.getElementById('counter').textContent =
    'Ditemukan ' + n + ' dari 8  •  Sisa ' + (8 - n);
  document.getElementById('score').textContent = 'Skor ' + state.score;
  document.getElementById('timer').textContent = '⏱ ' + fmtTime(state.elapsed);
  document.getElementById('hintBtn').textContent =
    '💡 Hint (' + (3 - state.hintsUsed) + ' tersisa)';
  document.getElementById('hintBtn').disabled = state.hintsUsed >= 3 || state.won;
  const chips = document.getElementById('foundList');
  chips.innerHTML = '';
  for (const d of DIFFERENCES) {
    const chip = document.createElement('span');
    chip.className = 'chip' + (state.found.has(d.id) ? ' done' : '');
    chip.textContent = (state.found.has(d.id) ? '✓ ' : '○ ') + d.name;
    chips.appendChild(chip);
  }
}

function showWin() {
  state.won = true;
  clearInterval(state.timerId);
  playWin();
  const stars = state.mistakes === 0 ? '★★★' : state.mistakes <= 2 ? '★★☆' : '★☆☆';
  document.getElementById('winStars').textContent = stars;
  document.getElementById('winStats').textContent =
    'Waktu ' + fmtTime(state.elapsed) + '  •  Skor ' + state.score +
    '  •  Salah klik ' + state.mistakes + '  •  Hint dipakai ' + state.hintsUsed;
  document.getElementById('winOverlay').classList.add('show');
  updateHud();
}

function clickAt(canvas, ev) {
  if (state.won) return;
  const rect = canvas.getBoundingClientRect();
  const x = ((ev.clientX - rect.left) / rect.width) * W;
  const y = ((ev.clientY - rect.top) / rect.height) * H;
  for (const d of DIFFERENCES) {
    if (state.found.has(d.id)) continue;
    if (Math.hypot(x - d.x, y - d.y) <= 32) {
      state.found.add(d.id);
      state.score += 100;
      playDing();
      drawAll();
      updateHud();
      if (state.found.size === 8) showWin();
      return;
    }
  }
  state.wrong.push({ x, y, t: Date.now() });
  state.mistakes += 1;
  state.score = Math.max(0, state.score - 10);
  playBuzz();
  drawAll();
  updateHud();
  setTimeout(drawAll, 750);
}

function useHint() {
  if (state.won || state.hintsUsed >= 3) return;
  const rest = DIFFERENCES.filter((d) => !state.found.has(d.id));
  if (!rest.length) return;
  state.hintsUsed += 1;
  state.score = Math.max(0, state.score - 50);
  const d = rest[Math.floor(Math.random() * rest.length)];
  const ring = document.createElement('div');
  ring.className = 'hint-ring';
  const panel = document.getElementById('rightPanel');
  const canvas = rightCanvas;
  const pr = panel.getBoundingClientRect();
  const cr = canvas.getBoundingClientRect();
  ring.style.left = (cr.left - pr.left + (d.x / W) * cr.width) + 'px';
  ring.style.top = (cr.top - pr.top + (d.y / H) * cr.height) + 'px';
  panel.appendChild(ring);
  setTimeout(() => ring.remove(), 3000);
  beep(660, 0.15, 'triangle', 0.1);
  updateHud();
}

function restart() {
  state.found.clear();
  state.wrong = [];
  state.score = 0;
  state.mistakes = 0;
  state.hintsUsed = 0;
  state.won = false;
  state.startTime = Date.now();
  state.elapsed = 0;
  document.getElementById('winOverlay').classList.remove('show');
  clearInterval(state.timerId);
  state.timerId = setInterval(() => {
    state.elapsed = Date.now() - state.startTime;
    document.getElementById('timer').textContent = '⏱ ' + fmtTime(state.elapsed);
  }, 500);
  drawAll();
  updateHud();
}

leftCanvas.addEventListener('click', (e) => clickAt(leftCanvas, e));
rightCanvas.addEventListener('click', (e) => clickAt(rightCanvas, e));
document.getElementById('hintBtn').addEventListener('click', useHint);
document.getElementById('restartBtn').addEventListener('click', restart);
document.getElementById('soundBtn').addEventListener('click', (e) => {
  state.muted = !state.muted;
  e.target.textContent = state.muted ? '🔇 Suara mati' : '🔊 Suara nyala';
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'h' || e.key === 'H') useHint();
  if (e.key === 'r' || e.key === 'R') restart();
  if (e.key === 'm' || e.key === 'M') {
    state.muted = !state.muted;
    document.getElementById('soundBtn').textContent = state.muted ? '🔇 Suara mati' : '🔊 Suara nyala';
  }
});
document.getElementById('againBtn').addEventListener('click', restart);

// Screenshot presets: ?shot=start|play|play2|end pre-marks differences
// so the screenshots are real renders of this same code.
if (SHOT_FOUND >= 0) {
  for (let i = 0; i < SHOT_FOUND; i++) state.found.add(DIFFERENCES[i].id);
  state.score = SHOT_FOUND * 100;
  state.elapsed = SHOT === 'end' ? 148000 : SHOT === 'play2' ? 96000 : SHOT === 'play' ? 54000 : 0;
  if (SHOT === 'end') {
    state.won = true;
    document.getElementById('winStars').textContent = '★★★';
    document.getElementById('winStats').textContent =
      'Waktu 02:28  •  Skor 800  •  Salah klik 0  •  Hint dipakai 0';
    document.getElementById('winOverlay').classList.add('show');
  }
} else {
  state.timerId = setInterval(() => {
    state.elapsed = Date.now() - state.startTime;
    document.getElementById('timer').textContent = '⏱ ' + fmtTime(state.elapsed);
  }, 500);
}

drawAll();
updateHud();
