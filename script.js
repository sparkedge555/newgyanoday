/* ======================================================
   NEW GYANODAY ENGLISH SCHOOL — script.js
   Author: SparkEdge
   ====================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Preloader ---- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hide'), 1800);
  });

  /* ---- Navbar: scroll effect + active link ---- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const onScroll = () => {
    if (window.scrollY > 80) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    // Back to top button
    const btt = document.getElementById('backToTop');
    if (window.scrollY > 500) btt.classList.add('visible');
    else btt.classList.remove('visible');

    // Active nav link
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile Nav Toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navLinksEl.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    navLinksEl.classList.contains('open')
      ? animateHamburger(spans, true)
      : animateHamburger(spans, false);
  });

  function animateHamburger(spans, open) {
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  }

  // Close mobile nav on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksEl.classList.remove('open');
      animateHamburger(navToggle.querySelectorAll('span'), false);
    });
  });

  /* ---- Smooth scroll for all anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  /* ---- Back to Top ---- */
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Scroll Reveal ---- */
  const revealElements = document.querySelectorAll(
    '.facility-card, .step-card, .about-highlights .highlight-item, .fee-extra-card, .gallery-item, .contact-icon-card, .admission-info-card, .leader-card, .infra-row, .stat'
  );
  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---- Gallery Tabs ---- */
  const galleryTabs = document.querySelectorAll('.gtab');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      galleryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.tab;
      galleryItems.forEach(item => {
        const cat = item.dataset.cat;
        if (filter === 'all' || cat === filter) {
          item.style.display = '';
          item.style.animation = 'galleryFadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ---- Stats Counter Animation ---- */
  const statNums = document.querySelectorAll('.stat-num');
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const match = text.match(/(\d+)/);
        if (match) {
          const target = parseInt(match[1]);
          let count = 0;
          const step = Math.max(1, Math.floor(target / 60));
          const timer = setInterval(() => {
            count = Math.min(count + step, target);
            el.textContent = text.replace(/\d+/, count.toLocaleString());
            if (count >= target) clearInterval(timer);
          }, 25);
        }
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => statsObserver.observe(el));

  /* ---- Ticker pause on hover ---- */
  const tickerContent = document.querySelector('.ticker-content');
  if (tickerContent) {
    tickerContent.addEventListener('mouseenter', () => tickerContent.style.animationPlayState = 'paused');
    tickerContent.addEventListener('mouseleave', () => tickerContent.style.animationPlayState = 'running');
  }

  /* ---- Form iframe detection (show placeholder if form not set) ---- */
  const formFrame = document.getElementById('contactFormFrame');
  const formPlaceholder = document.getElementById('formPlaceholder');
  if (formFrame && formPlaceholder) {
    const src = formFrame.getAttribute('src');
    if (src && src.includes('REPLACE_WITH_ACTUAL_FORM_ID')) {
      formPlaceholder.style.display = 'flex';
      formFrame.style.display = 'none';
    } else {
      formPlaceholder.style.display = 'none';
    }
  }

  /* ---- Gallery lightbox effect ---- */
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const wrap = item.querySelector('.gallery-img-wrap');
      const label = item.querySelector('.gallery-placeholder span');
      if (!label) return;
      const overlay = document.createElement('div');
      overlay.className = 'lightbox-overlay';
      overlay.innerHTML = `
        <div class="lightbox-inner">
          <div class="lightbox-img" style="${wrap.getAttribute('style') || 'background: var(--navy);'}">
            <div style="color:rgba(255,255,255,0.6); font-family: var(--font-ui); font-size: 1.1rem; text-align:center;">
              ${label.textContent}<br><small style="opacity:0.5;font-size:0.8rem;">Photo coming soon</small>
            </div>
          </div>
          <button class="lightbox-close"><i class="fa-solid fa-xmark"></i></button>
        </div>
      `;
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';
      setTimeout(() => overlay.style.opacity = '1', 10);
      const closeBtn = overlay.querySelector('.lightbox-close');
      closeBtn.addEventListener('click', () => {
        overlay.style.opacity = '0';
        setTimeout(() => { overlay.remove(); document.body.style.overflow = ''; }, 300);
      });
      overlay.addEventListener('click', e => {
        if (e.target === overlay) closeBtn.click();
      });
    });
  });

  /* ---- Inject lightbox CSS ---- */
  const lbStyle = document.createElement('style');
  lbStyle.textContent = `
    .lightbox-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 9998;
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity 0.3s ease; padding: 2rem;
    }
    .lightbox-inner { position: relative; max-width: 700px; width: 100%; }
    .lightbox-img {
      width: 100%; height: 400px; border-radius: 16px;
      display: flex; align-items: center; justify-content: center; color: white;
    }
    .lightbox-close {
      position: absolute; top: -16px; right: -16px;
      width: 40px; height: 40px; border-radius: 50%;
      background: rgba(255,255,255,0.2); color: white;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; font-size: 1.1rem;
      transition: background 0.3s;
    }
    .lightbox-close:hover { background: rgba(255,255,255,0.4); }
    @keyframes galleryFadeIn { from{opacity:0;transform:scale(0.95);}to{opacity:1;transform:scale(1);} }
  `;
  document.head.appendChild(lbStyle);

  /* ---- Active nav highlight on click ---- */
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

});
