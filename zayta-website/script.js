(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calm = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const hd = $('#hd'), mt = $('.mt'), nav = $('.nav');
  let navCloseTimer;
  const closeNav = () => {
    nav.classList.remove('open');
    hd.classList.remove('menu-open');
    mt.setAttribute('aria-expanded', 'false');
    clearTimeout(navCloseTimer);
  };
  const resetNavTimer = () => {
    if (!nav.classList.contains('open')) return;
    clearTimeout(navCloseTimer);
    navCloseTimer = setTimeout(closeNav, 10000);
  };
  const onScroll = () => {
    hd.classList.toggle('s', scrollY > 24);
    if (nav.classList.contains('open')) closeNav();
  };
  onScroll(); addEventListener('scroll', onScroll, { passive: true });
  mt.addEventListener('click', () => {
    const o = nav.classList.toggle('open');
    hd.classList.toggle('menu-open', o);
    mt.setAttribute('aria-expanded', o);
    if (o) resetNavTimer();
    else clearTimeout(navCloseTimer);
  });
  $$('a', nav).forEach(a => a.addEventListener('click', closeNav));
  nav.addEventListener('pointermove', resetNavTimer);
  nav.addEventListener('touchstart', resetNavTimer, { passive: true });
  let navTouchStartY = null;
  addEventListener('touchstart', event => {
    if (nav.classList.contains('open') && event.touches.length) navTouchStartY = event.touches[0].clientY;
  }, { passive: true });
  addEventListener('touchend', event => {
    if (nav.classList.contains('open') && navTouchStartY !== null && event.changedTouches.length &&
        Math.abs(event.changedTouches[0].clientY - navTouchStartY) > 12) closeNav();
    navTouchStartY = null;
  }, { passive: true });
  addEventListener('wheel', event => {
    if (nav.classList.contains('open') && event.deltaY !== 0) closeNav();
  }, { passive: true });
  addEventListener('keydown', event => {
    if (!nav.classList.contains('open')) return;
    if (event.key === 'Escape') closeNav();
    else resetNavTimer();
  });
  $$('.yr').forEach(e => e.textContent = new Date().getFullYear());

  const assistantPages = [
    'index.html', 'about-us.html', 'robotics.html', 'ai-solutions.html', 'academy.html',
    'digital.html', 'automation.html', 'business-solutions.html', 'agriculture.html',
    'smart-home.html', 'technologies.html', 'careers.html', 'blog.html',
    'blog-ai-agents.html', 'blog-generative-ai.html', 'blog-responsible-ai.html'
  ];
  const assistantFallbackKnowledge = [
    { title: 'About ZAYTA', content: 'ZAYTA Robotics and Technologies is a technology company based in Kottarakara, Kerala. Its nine divisions are Robotics, AI Solutions, Academy, Digital, Automation, Business Solutions, Agriculture, Smart Home and Technologies. The team designs practical solutions and helps people and organisations learn, adapt and grow.', href: 'about-us.html' },
    { title: 'Contact ZAYTA', content: 'Contact the ZAYTA team by email at zaytarobotics@gmail.com or phone at +91 62828 69130. The office is in Pulamon P.O, Kottarakara, Kollam, Kerala 691531, India. You can also send an enquiry through WhatsApp.', href: 'index.html#contact' },
    { title: 'ZAYTA Robotics', content: 'ZAYTA Robotics builds kids robots, purpose-built prototypes, basic robot models and build-it-yourself robotics kits with controllers, sensors and actuators. The team also supports guided and custom projects for students, schools, colleges and innovators.', href: 'robotics.html' },
    { title: 'ZAYTA AI Solutions', content: 'ZAYTA AI Solutions helps organisations automate enquiries, follow-ups, data entry and reporting with AI assistants. Services also include company setup and registration, websites and CRM, marketing support, staffing and specialists.', href: 'ai-solutions.html' },
    { title: 'ZAYTA Academy', content: 'ZAYTA Academy offers hands-on learning in robotics, electronics, sensors, AI, automation, Python and digital marketing. Students can ask about courses, certification, internships, working alongside the team and placement assistance.', href: 'academy.html' },
    { title: 'ZAYTA Digital', content: 'ZAYTA Digital provides responsive websites, digital marketing and SEO, Meta, Google and YouTube advertising, video production, hosting, upgrades and maintenance, and complete marketing support.', href: 'digital.html' },
    { title: 'ZAYTA Automation', content: 'ZAYTA Automation designs and installs home automation, IoT and smart-device control, farming automation, schedules and timers, device management, and system commissioning for homes, farms and businesses.', href: 'automation.html' },
    { title: 'ZAYTA Business Solutions', content: 'ZAYTA Business Solutions supports businesses with branding, marketing, content and campaigns, consultancy and practical guidance on technology, automation and growth.', href: 'business-solutions.html' },
    { title: 'ZAYTA Agriculture', content: 'ZAYTA Agriculture develops automated pod cultures and compact house-farming systems. These systems manage humidity, lighting and irrigation, monitor growing conditions and support fresh vegetables and greens in smaller spaces.', href: 'agriculture.html' },
    { title: 'ZAYTA Smart Home', content: 'ZAYTA Smart Home brings together home automation, smart agri-tech for polyhouse, hydroponic and aquaponic growing, solar generation and battery management, connected security and unified controls.', href: 'smart-home.html' },
    { title: 'ZAYTA Technologies', content: 'ZAYTA Technologies works on custom industrial and commercial robotics, turnkey integration, IoT and smart automation, intelligent security, precision farming and renewable energy, AI and control applications, prototypes and automation consulting.', href: 'technologies.html' },
    { title: 'Careers and internships', content: 'Students can enquire about internships and practical experience with ZAYTA. The team also welcomes enquiries from people interested in working with them across robotics, embedded systems, AI, software, IoT, automation, digital media, business support and smart agriculture. Email zaytarobotics@gmail.com with a short introduction, interests, relevant skills or projects and availability.', href: 'careers.html' },
    { title: 'ZAYTA Blog and advertising', content: 'The ZAYTA Blog has sample explainers about AI agents, generative AI and responsible AI. For sponsored features or website advertising partnerships, contact zaytarobotics@gmail.com. Current blog posts are educational samples, not dated breaking-news updates.', href: 'blog.html' }
  ];
  const assistantButton = document.createElement('button');
  assistantButton.className = 'assistant-launcher';
  assistantButton.type = 'button';
  assistantButton.setAttribute('aria-label', 'Open ZAYTA website assistant');
  assistantButton.setAttribute('aria-expanded', 'false');
  assistantButton.setAttribute('aria-controls', 'assistant-panel');
  assistantButton.innerHTML = '<svg class="assistant-robot" viewBox="0 0 64 64" aria-hidden="true"><path class="robot-antenna" d="M32 13V6"/><circle class="robot-led" cx="32" cy="5" r="3.5"/><path class="robot-ear" d="M13 29H8v12h5m38-12h5v12h-5"/><rect class="robot-face" x="13" y="15" width="38" height="38" rx="11"/><rect class="robot-screen" x="19" y="22" width="26" height="18" rx="7"/><circle class="robot-eye" cx="26" cy="31" r="2.4"/><circle class="robot-eye" cx="38" cy="31" r="2.4"/><path class="robot-mouth" d="M26 46h12"/></svg>';

  const assistantPanel = document.createElement('section');
  assistantPanel.id = 'assistant-panel';
  assistantPanel.className = 'assistant-panel';
  assistantPanel.setAttribute('aria-label', 'ZAYTA website assistant');
  assistantPanel.setAttribute('aria-describedby', 'assistant-intro');
  assistantPanel.hidden = true;
  assistantPanel.innerHTML = '<div class="assistant-head"><div><strong>ZAYTA Assistant</strong><p id="assistant-intro">Ask about our divisions, services, careers or contact details.</p></div><button class="assistant-close" type="button" aria-label="Close assistant">×</button></div><div class="assistant-log" role="log" aria-live="polite" aria-relevant="additions"></div><form class="assistant-form"><label class="sr-only" for="assistant-question">Your question</label><input id="assistant-question" name="question" type="text" autocomplete="off" placeholder="Type your question…" required><button type="submit" aria-label="Send question">Send</button></form>';
  document.body.append(assistantPanel, assistantButton);

  const assistantLog = $('.assistant-log', assistantPanel);
  const assistantForm = $('.assistant-form', assistantPanel);
  const assistantInput = $('#assistant-question', assistantPanel);
  let assistantKnowledge;

  const addAssistantMessage = (text, kind) => {
    const message = document.createElement('div');
    message.className = `assistant-message ${kind}`;
    message.textContent = text;
    assistantLog.append(message);
    assistantLog.scrollTop = assistantLog.scrollHeight;
    return message;
  };
  const addAssistantLink = (container, text, href) => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = text;
    if (/^https?:/.test(href)) {
      link.target = '_blank';
      link.rel = 'noopener';
    }
    container.append(' ', link);
  };
  const getAssistantKnowledge = () => {
    if (!assistantKnowledge) {
      assistantKnowledge = Promise.all(assistantPages.map(async path => {
        const response = await fetch(new URL(path, `${location.origin}/`));
        if (!response.ok) throw new Error(`Could not load ${path} (${response.status})`);
        const page = new DOMParser().parseFromString(await response.text(), 'text/html');
        const main = $('main', page);
        if (!main) throw new Error(`No main content found in ${path}`);
        const pageTitle = $('title', page)?.textContent.trim() || path;
        const sections = $$('section', main);
        return sections.map(section => {
          const heading = $('h1,h2,h3', section);
          const content = (section.innerText || section.textContent).replace(/\s+/g, ' ').trim();
          return {
            title: heading ? heading.textContent.trim() : pageTitle,
            content,
            href: `${path}${section.id ? `#${encodeURIComponent(section.id)}` : ''}`
          };
        }).filter(section => section.content.length > 40);
      })).then(pages => pages.flat()).catch(error => {
        console.warn('ZAYTA assistant is using its built-in website guide:', error);
        return assistantFallbackKnowledge;
      });
    }
    return assistantKnowledge;
  };
  const showAssistantAnswer = (message, answer, source) => {
    message.textContent = answer;
    if (source) addAssistantLink(message, `Read: ${source.title}`, source.href);
    assistantLog.scrollTop = assistantLog.scrollHeight;
  };
  const answerAssistantQuestion = async question => {
    const normalized = question.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
    const greeting = normalized.match(/^(hi|hello|hey|good morning|good afternoon|good evening)\b/);
    if (greeting) {
      const salutation = greeting[1].startsWith('good ') ? `${greeting[1][0].toUpperCase()}${greeting[1].slice(1)}` : 'Hi there';
      showAssistantAnswer(addAssistantMessage('', 'assistant'), `${salutation}! Thanks for visiting ZAYTA. How can I help you today? I can answer questions about our services, divisions, careers or contact details.`);
      return;
    }
    if (/^(thanks|thank you)\b/.test(normalized)) {
      showAssistantAnswer(addAssistantMessage('', 'assistant'), 'You’re very welcome! Is there anything else I can help you with?');
      return;
    }
    if (/^(how are you|how is it going)\b/.test(normalized)) {
      showAssistantAnswer(addAssistantMessage('', 'assistant'), 'I’m doing well, thanks for asking! I’m ready to help with questions about ZAYTA.');
      return;
    }

    const pending = addAssistantMessage('Searching ZAYTA’s website…', 'assistant');
    try {
      const knowledge = await getAssistantKnowledge();

      const ignored = new Set(['about', 'and', 'are', 'can', 'could', 'does', 'for', 'from', 'have', 'help', 'how', 'is', 'me', 'please', 'tell', 'the', 'their', 'this', 'what', 'when', 'where', 'which', 'who', 'with', 'would', 'you', 'your', 'zayta']);
      const terms = [...new Set(normalized.match(/[a-z0-9]+/g) || [])].filter(term => !ignored.has(term) && (term.length > 2 || term === 'ai' || term === 'iot'));
      const careerIntent = /\b(intern(ship|ships)|career|jobs?|employment|apply|vacanc(y|ies))\b|work with you|join your team/.test(normalized);
      if (!terms.length) {
        showAssistantAnswer(pending, 'Of course! ZAYTA brings together nine divisions: Robotics, AI Solutions, Academy, Digital, Automation, Business Solutions, Agriculture, Smart Home and Technologies. Which area would you like to know about?', assistantFallbackKnowledge[0]);
        return;
      }

      const matches = knowledge.map(section => {
        const text = section.content.toLowerCase();
        const words = text.match(/[a-z0-9]+/g) || [];
        const score = terms.reduce((total, term) => {
          if (text.includes(term)) return total + 1;
          if (words.some(word => word.length > 3 && (word.startsWith(term) || term.startsWith(word)))) return total + 0.6;
          return total;
        }, 0);
        const pageBoost = careerIntent && section.href.startsWith('careers.html') ? 4 : 0;
        return { ...section, score: score + pageBoost };
      }).filter(section => section.score > 0).sort((a, b) => b.score - a.score);

      if (!matches.length || matches[0].score < 1) {
        showAssistantAnswer(pending, 'I’m not sure about that detail, and I don’t want to guess. I can help with ZAYTA’s services, divisions, internships or contact information—or connect you with the team.');
        addAssistantLink(pending, 'Email ZAYTA', 'mailto:zaytarobotics@gmail.com');
        addAssistantLink(pending, 'WhatsApp', 'https://wa.me/916282869130');
        return;
      }

      const best = matches[0];
      const excerpt = best.content.length > 520 ? `${best.content.slice(0, 517).trimEnd()}…` : best.content;
      showAssistantAnswer(pending, `Sure — here’s what I found about ${best.title}: ${excerpt} Would you like help with anything else?`, best);
      if (matches[1] && matches[1].score >= 2 && matches[1].title !== best.title) {
        const related = document.createElement('div');
        related.className = 'assistant-related';
        related.textContent = 'You may also find this useful:';
        addAssistantLink(related, matches[1].title, matches[1].href);
        assistantLog.append(related);
        assistantLog.scrollTop = assistantLog.scrollHeight;
      }
      const contact = document.createElement('div');
      contact.className = 'assistant-related';
      contact.textContent = 'Would you prefer to speak with our team?';
      addAssistantLink(contact, 'Contact the team', 'mailto:zaytarobotics@gmail.com');
      assistantLog.append(contact);
      assistantLog.scrollTop = assistantLog.scrollHeight;
    } catch (error) {
      console.error('ZAYTA assistant could not search website content:', error);
      showAssistantAnswer(pending, 'I’m sorry, I couldn’t look that up just now. The ZAYTA team can still help you directly:');
      addAssistantLink(pending, 'Email ZAYTA', 'mailto:zaytarobotics@gmail.com');
      addAssistantLink(pending, 'WhatsApp', 'https://wa.me/916282869130');
    }
  };

  const setAssistantOpen = open => {
    assistantPanel.hidden = !open;
    assistantButton.setAttribute('aria-expanded', String(open));
    if (open) assistantInput.focus();
  };
  assistantButton.addEventListener('click', () => setAssistantOpen(assistantPanel.hidden));
  $('.assistant-close', assistantPanel).addEventListener('click', () => {
    setAssistantOpen(false);
    assistantButton.focus();
  });
  addEventListener('keydown', event => {
    if (event.key === 'Escape' && !assistantPanel.hidden) setAssistantOpen(false);
  });
  assistantForm.addEventListener('submit', event => {
    event.preventDefault();
    const question = assistantInput.value.trim();
    if (!question) return;
    addAssistantMessage(question, 'user');
    assistantInput.value = '';
    answerAssistantQuestion(question);
  });
  addAssistantMessage('Hi there! Welcome to ZAYTA. How can I help you today? Ask me about our services, divisions, internships or contact details.', 'assistant');

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
