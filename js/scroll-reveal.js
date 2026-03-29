/* ============================================================
   SmartClinity — Scroll Reveal
   ============================================================ */

(function () {
  'use strict';

  const revealClasses = ['.reveal', '.reveal-fade', '.reveal-scale', '.svg-draw'];

  function initReveal() {
    const elements = document.querySelectorAll(revealClasses.join(', '));

    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Don't unobserve — let transition handle it
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }

})();
