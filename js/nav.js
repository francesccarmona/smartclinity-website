/* ============================================================
   SmartClinity — Navigation JS
   ============================================================ */

(function () {
  'use strict';

  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile');

  // Detect platform page (dark hero)
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const isPlatformPage = currentFile === 'platform.html';

  // Scroll behaviour
  function onScroll() {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
      if (isPlatformPage) nav.classList.remove('nav--on-dark');
    } else {
      nav.classList.remove('scrolled');
      if (isPlatformPage) nav.classList.add('nav--on-dark');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // Mobile menu toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      if (isOpen) {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active link highlight
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

})();
