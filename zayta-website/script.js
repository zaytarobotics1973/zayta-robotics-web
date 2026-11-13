(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calm = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const hd = $('#hd'), mt = $('.mt'), nav = $('.nav');
  const onScroll = () => hd.classList.toggle('s', scrollY > 24);
  onScroll(); addEventListener('scroll', onScroll, { passive: true });
  mt.addEventListener('click', () => {
    const o = nav.classList.toggle('open');
    mt.setAttribute('aria-expanded', o);
  });
  $$('a', nav).forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); mt.setAttribute('aria-expanded', false); }));
  $$('.yr').forEach(e => e.textContent = new Date().getFullYear());

  // Decode (scramble) text
  const G = '01<>/\\{}[]#%&*+=ZAYTA';
  const decode = el => {
    const t = (el.dataset.text || el.textContent).trim(); el.dataset.text = t;
    if (calm) { el.textContent = t; return; }
    let f = 0; const n = 28;
    const id = setInterval(() => {
      el.textContent = [...t].map((c, i) => c === ' ' || c === '\n' ? c : (i < t.length * f / n ? c : G[Math.random() * G.length | 0])).join('');
      if (++f > n) { clearInterval(id); el.textContent = t; }
    }, 40);
  };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    if (e.target.hasAttribute('data-decode')) decode(e.target);
    io.unobserve(e.target);
  }), { threshold: .25 });
  $$('.rv,[data-decode]').forEach(e => io.observe(e));

  // Typewriter
  $$('[data-type]').forEach(el => {
    const w = el.dataset.type.split('|'); let i = 0, j = 0, del = false;
    el.classList.add('cur');
    if (calm) { el.textContent = w[0]; return; }
    (function tick() {
      const s = w[i];
      el.textContent = s.slice(0, j);
      if (!del && j === s.length) { del = true; return setTimeout(tick, 1600); }
      if (del && j === 0) { del = false; i = (i + 1) % w.length; }
      j += del ? -1 : 1;
      setTimeout(tick, del ? 35 : 80);
    })();
  });

  // Robotic node network
  const cv = $('#net');
  if (cv && !calm) {
    const c = cv.getContext('2d'); let W, H, P = [], m = { x: -999, y: -999 };
    const col = getComputedStyle(document.body).getPropertyValue('--a').trim() || '#22d3ee';
    const size = () => {
      const r = devicePixelRatio || 1; W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * r; cv.height = H * r; c.setTransform(r, 0, 0, r, 0, 0);
      P = Array.from({ length: Math.min(90, W * H / 14000 | 0) }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4 }));
    };
    size(); addEventListener('resize', size);
    cv.parentElement.addEventListener('pointermove', e => { const b = cv.getBoundingClientRect(); m = { x: e.clientX - b.left, y: e.clientY - b.top }; });
    c.lineWidth = 1;
    (function draw() {
      c.clearRect(0, 0, W, H); c.fillStyle = col; c.strokeStyle = col;
      P.forEach((p, i) => {
        p.x = (p.x + p.vx + W) % W; p.y = (p.y + p.vy + H) % H;
        c.globalAlpha = .8; c.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
        for (let k = i + 1; k < P.length; k++) {
          const q = P[k], d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 130) { c.globalAlpha = (1 - d / 130) * .35; c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(q.x, q.y); c.stroke(); }
        }
        const dm = Math.hypot(p.x - m.x, p.y - m.y);
        if (dm < 170) { c.globalAlpha = (1 - dm / 170) * .8; c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(m.x, m.y); c.stroke(); }
      });
      requestAnimationFrame(draw);
    })();
  }

  // Enquiry form -> WhatsApp (works on a static site, no backend needed)
  const f = $('#enquiry');
  if (f) f.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(f);
    const t = `Hello ZAYTA, I'm ${d.get('name')} (${d.get('contact')}).\nInterested in: ${d.get('topic')}\n\n${d.get('msg')}`;
    open('https://wa.me/916282869130?text=' + encodeURIComponent(t), '_blank', 'noopener');
  });
})();
