/* ===================================================================
   PORTFOLIO – main.js
   =================================================================== */

'use strict';

/* ── 1. Dark / Light Mode ──────────────────────────────────────────── */
(function initTheme() {
  const root    = document.documentElement;
  const btn     = document.getElementById('themeToggle');
  const ICONS   = { dark: '🌙', light: '☀️' };
  const STORAGE = 'portfolio-theme';

  // Respect stored preference, fall back to OS preference
  const saved = localStorage.getItem(STORAGE);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');

  applyTheme(initial);

  btn.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE, next);
  });

  function applyTheme(theme) {
    root.dataset.theme = theme;
    btn.querySelector('.theme-toggle__icon').textContent = ICONS[theme];
    btn.setAttribute(
      'aria-label',
      `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`
    );
  }
})();

/* ── 2. Navbar ─────────────────────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  // Scroll shadow
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 10);
  }, { passive: true });

  // Mobile menu toggle
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('is-open');
    navLinks.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-open');
      navLinks.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    const scrollY = window.scrollY + 80;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      const link   = navLinks.querySelector(`[href="#${id}"]`);
      if (!link) return;
      if (scrollY >= top && scrollY < top + height) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
})();

/* ── 3. Typed Text Effect ──────────────────────────────────────────── */
(function initTyped() {
  const el     = document.getElementById('typedText');
  const phrases = [
    'Full-Stack Developer',
    'UI / UX Enthusiast',
    'Open-Source Contributor',
    'Clean Code Advocate',
  ];
  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;
  let paused    = false;

  function type() {
    const phrase = phrases[phraseIdx];

    if (deleting) {
      charIdx -= 1;
    } else {
      charIdx += 1;
    }

    el.textContent = phrase.slice(0, charIdx);

    let delay = deleting ? 60 : 100;

    if (!deleting && charIdx === phrase.length) {
      // Finished typing — pause then start deleting
      if (paused) {
        paused   = false;
        deleting = true;
        delay    = 80;
      } else {
        paused = true;
        delay  = 1800;
      }
    } else if (deleting && charIdx === 0) {
      // Finished deleting — move to next phrase
      deleting  = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay     = 400;
    }

    setTimeout(type, delay);
  }

  type();
})();

/* ── 4. Scroll Reveal ──────────────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger children when the parent is a grid
          const delay = entry.target.closest('.projects__grid, .skills__grid')
            ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80
            : 0;
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach(el => observer.observe(el));
})();

/* ── 5. Skill Bars ─────────────────────────────────────────────────── */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar__fill');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const level = entry.target.style.getPropertyValue('--level');
          entry.target.style.width = level;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  bars.forEach(bar => observer.observe(bar));
})();

/* ── 6. Animated Counters ──────────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.stat__number[data-count]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.count.includes('+') ? '+' : '';
        let current  = 0;
        const step   = Math.ceil(target / 40);

        const tick = () => {
          current = Math.min(current + step, target);
          el.textContent = current + suffix;
          if (current < target) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
})();

/* ── 7. Contact Form ───────────────────────────────────────────────── */
(function initForm() {
  const form        = document.getElementById('contactForm');
  const submitBtn   = document.getElementById('submitBtn');
  const successMsg  = document.getElementById('formSuccess');

  if (!form) return;

  // Simple validation helpers
  function validateField(input) {
    const errEl = document.getElementById(input.id + 'Error');
    let msg = '';

    if (!input.value.trim()) {
      msg = 'This field is required.';
    } else if (input.type === 'email') {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(input.value.trim())) {
        msg = 'Please enter a valid email address.';
      }
    } else if (input.id === 'message' && input.value.trim().length < 10) {
      msg = 'Message must be at least 10 characters.';
    }

    if (errEl) errEl.textContent = msg;
    input.classList.toggle('is-invalid', msg !== '');
    return msg === '';
  }

  // Live validation on blur
  form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) validateField(input);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputs  = [...form.querySelectorAll('.form-input')];
    const allValid = inputs.every(input => validateField(input));

    if (!allValid) return;

    // Simulate async send (replace with real fetch() when backend is ready)
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;
    successMsg.textContent = '';

    setTimeout(() => {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
      form.reset();
      successMsg.textContent = '✅ Message sent! I\'ll get back to you soon.';
      setTimeout(() => { successMsg.textContent = ''; }, 5000);
    }, 1500);
  });
})();

/* ── 8. Footer Year ────────────────────────────────────────────────── */
(function setYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
})();
