/* =========================================================
   REYDIOUS — main.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Navbar scroll state ─────────────────────────── */
  const navbar  = document.getElementById('navbar');
  const pageBox = document.querySelector('.page-box');

  const handleNavbarScroll = () => {
    // Use window.scrollY since the whole page scrolls
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });


  /* ── 2. Mobile hamburger menu ────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });


  /* ── 3. Active nav link on scroll ────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const highlightNav = () => {
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 80) currentId = sec.id;
    });

    navAnchors.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === `#${currentId}`) {
        a.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });


  /* ── 4. Scroll-reveal (Intersection Observer) ─────────── */
  const fadeTargets = document.querySelectorAll(
    '.section-title, .section-lead, .section-label, .section-desc, ' +
    '.problem-item, .solution-card, .card, .step, .section-sub-lead, ' +
    '.section-footer-text, .capabilities-title, .hero-badge, ' +
    '.closing-lead, .closing-desc, .demo-coming-soon'
  );

  fadeTargets.forEach(el => el.classList.add('fade-in'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children in grids
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Stagger cards in grids
  document.querySelectorAll('.cards-grid').forEach(grid => {
    grid.querySelectorAll('.card').forEach((card, i) => {
      card.dataset.delay = i * 90;
    });
  });

  document.querySelectorAll('.problem-list .problem-item').forEach((item, i) => {
    item.dataset.delay = i * 100;
  });

  document.querySelectorAll('.solution-grid .solution-card').forEach((card, i) => {
    card.dataset.delay = i * 90;
  });

  document.querySelectorAll('.step').forEach((step, i) => {
    step.dataset.delay = i * 100;
  });

  fadeTargets.forEach(el => revealObserver.observe(el));

  // Hero content fades in immediately
  document.querySelectorAll('.hero-content > *').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100 + i * 110);
  });


  /* ── 5. Contact form submission (Formspree) ─────────── */
  const form        = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      const data = new FormData(form);

      try {
        const res = await fetch('https://formspree.io/f/xeelnkqj', {
          method:  'POST',
          headers: { 'Accept': 'application/json' },
          body:    data,
        });

        if (res.ok) {
          form.reset();
          submitBtn.style.display = 'none';
          formSuccess.classList.add('visible');
        } else {
          const json = await res.json();
          const errMsg = json?.errors?.map(e => e.message).join(', ') || 'Submission failed.';
          throw new Error(errMsg);
        }
      } catch (err) {
        submitBtn.disabled    = false;
        submitBtn.textContent = 'Send Message';
        alert('Something went wrong: ' + err.message);
      }
    });
  }


  /* ── 6. Footer — dynamic year ────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ── 7. Pipeline node hover interaction ──────────────── */
  const pipelineNodes = document.querySelectorAll('.pipeline-node');
  pipelineNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      node.style.transition = 'border-color 0.25s, box-shadow 0.25s, transform 0.25s';
      if (!node.classList.contains('node-reydious')) {
        node.style.borderColor = 'rgba(255,106,0,0.45)';
        node.style.boxShadow   = '0 0 20px rgba(255,106,0,0.12)';
      }
    });
    node.addEventListener('mouseleave', () => {
      if (!node.classList.contains('node-reydious')) {
        node.style.borderColor = '';
        node.style.boxShadow   = '';
      }
    });
  });


  /* ── 8. Smooth scroll offset for fixed navbar ─────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});
