(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in, .fade-in-left, .stagger').forEach(function (el) {
    observer.observe(el);
  });

  var header = document.querySelector('.site-header');
  var btn = document.querySelector('.back-to-top');
  window.addEventListener('scroll', function () {
    var scrolled = window.scrollY > 30;
    if (header) header.classList.toggle('scrolled', scrolled);
    if (btn) btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  if (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
