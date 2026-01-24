(function () {
  const path = window.location.pathname;
  const isLegalPage =
    path.startsWith('/privacy') ||
    path.startsWith('/cookies') ||
    path.startsWith('/terms');

  const preloader = document.getElementById('preloader');
  const video = document.getElementById('bg-video');
  const toggle = document.getElementById('menu-toggle');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileContent = document.getElementById('mobile-content');
  const contact = document.querySelector('.contact-section');
  const footer = document.querySelector('.footer-copy');
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const closeBtn = document.getElementById('close-cookie');

  let preloaderHidden = false;

  /* ---------- Disable Preloader/Video on Legal Pages ---------- */
  if (isLegalPage) {
    // Skip video and preloader completely
    if (preloader) preloader.remove();
    document.documentElement.classList.add('reveal-ready');

    // Subtle fade-in effect
    document.body.style.opacity = 0;
    document.body.style.transition = 'opacity 0.6s ease';
    window.addEventListener('load', () => {
      requestAnimationFrame(() => {
        document.body.style.opacity = 1;
      });
    });
  } else {
    /* ---------- Preloader / Video (Homepage Only) ---------- */
    function hidePreloader() {
      if (preloaderHidden) return;
      preloaderHidden = true;
      if (!preloader) return;

      preloader.classList.add('hide');
      requestAnimationFrame(() => {
        preloader.addEventListener('transitionend', function onEnd() {
          preloader.removeEventListener('transitionend', onEnd);
          if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
          document.documentElement.classList.add('reveal-ready');
          updateContactBottom();
          showCookieBanner();
        });
      });
    }

    function onVideoReady() {
      try {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.then === 'function') {
          playPromise.then(hidePreloader).catch(hidePreloader);
        } else hidePreloader();
      } catch {
        hidePreloader();
      }
    }

    if (video) {
      video.addEventListener('playing', onVideoReady, { once: true });
      video.addEventListener('canplay', onVideoReady, { once: true });
      video.addEventListener('canplaythrough', onVideoReady, { once: true });
      video.addEventListener('error', hidePreloader);
      video.addEventListener('contextmenu', (e) => e.preventDefault());
    } else {
      hidePreloader();
    }

    // Safety fallback
    setTimeout(() => {
      if (!preloaderHidden) hidePreloader();
    }, 3500);
  }

  /* ---------- Mobile Menu ---------- */
  function updateMenuCenter() {
    if (!toggle) return;
    const rect = toggle.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    document.documentElement.style.setProperty('--menu-cx', `${cx}px`);
    document.documentElement.style.setProperty('--menu-cy', `${cy}px`);
  }

  if (toggle) {
    updateMenuCenter();
    window.addEventListener('resize', updateMenuCenter);
    window.addEventListener('scroll', updateMenuCenter);
  }

  function toggleMenu() {
    updateMenuCenter();
    const isOpen = mobileOverlay.classList.toggle('open');
    mobileContent.classList.toggle('visible', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  }

  if (toggle) toggle.addEventListener('click', toggleMenu);

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      mobileOverlay.classList.remove('open');
      mobileContent.classList.remove('visible');
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', false);
    }
  });

  /* ---------- Cookie Banner (Homepage Only) ---------- */
  function showCookieBanner() {
    if (!banner || !acceptBtn || !closeBtn) return;
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted) return;

    setTimeout(() => banner.classList.add('show'), 1500);

    function hideBanner() {
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 400);
    }

    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookiesAccepted', 'true');
      hideBanner();
    });

    closeBtn.addEventListener('click', hideBanner);
  }

  /* ---------- Footer spacing ---------- */
  function updateContactBottom() {
    const footerHeight = footer?.offsetHeight || 0;
    document.documentElement.style.setProperty('--contact-bottom', `${footerHeight + 40}px`);
  }

  window.addEventListener('resize', updateContactBottom);
  window.addEventListener('orientationchange', updateContactBottom);
  updateContactBottom();
})();
