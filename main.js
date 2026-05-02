/* ═══════════════════════════════════════
   PRESTIGE APOSTLE — main.js
   ═══════════════════════════════════════ */

const WA_NUMBER = '27724137487';
const WA_BASE   = `https://wa.me/${WA_NUMBER}`;

/* ── CUSTOM CURSOR ── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  if (!cursor || !ring) return;

  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button, .product-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hovered'); ring.classList.add('hovered'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hovered'); ring.classList.remove('hovered'); });
  });
})();

/* ── SCROLL REVEAL ── */
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  items.forEach(el => obs.observe(el));
})();

/* ── ACTIVE NAV LINK ── */
(function initNavHighlight() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('nav-active');
  });
})();

/* ── PRODUCT CATEGORY FILTER ── */
function filterCat(cat, btn) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.product-card').forEach(card => {
    const show = cat === 'all' || card.dataset.cat === cat;
    card.classList.toggle('hidden', !show);
  });
}

/* ── CONTACT FORM → WHATSAPP ── */
function submitForm() {
  const get = id => (document.getElementById(id) || {}).value || '';
  const firstName = get('firstName').trim();
  const lastName  = get('lastName').trim();
  const email     = get('email').trim();
  const phone     = get('phone').trim();
  const subject   = get('subject').trim();
  const message   = get('message').trim();

  if (!firstName || !message) {
    showToast('Please fill in your name and message.', 'error');
    return;
  }

  const text = [
    `*Prestige Apostle Enquiry*`,
    `Name: ${firstName} ${lastName}`,
    email   ? `Email: ${email}`   : '',
    phone   ? `Phone: ${phone}`   : '',
    subject ? `Subject: ${subject}` : '',
    `Message: ${message}`
  ].filter(Boolean).join('\n');

  window.open(`${WA_BASE}?text=${encodeURIComponent(text)}`, '_blank');
}

/* ── TOAST NOTIFICATION ── */
function showToast(msg, type = 'info') {
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3500);
}

/* ── MOBILE NAV TOGGLE ── */
(function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    toggle.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => { menu.classList.remove('open'); toggle.classList.remove('open'); });
  });
})();

