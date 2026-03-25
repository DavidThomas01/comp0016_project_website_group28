(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var SITE_FOOTER_HTML = "<footer class=\"site-footer fade-in site-footer--motion\" id=\"site-footer\" aria-label=\"Site\">\n  <div class=\"container site-footer__inner\">\n    <div class=\"site-footer__grid site-footer__grid--3 stagger\">\n      <div class=\"site-footer__block site-footer__about\">\n        <h3 class=\"site-footer__heading\">Site info</h3>\n        <p class=\"site-footer__blurb\">We\u2019re Team 28 (COMP0016). This site is for <strong class=\"text-brand\">Prompt Injection Protection</strong>\u2014our project on prompt injection when LLMs use tools, the mitigations we tried, and how we tested everything.</p>\n      </div>\n      <div class=\"site-footer__block site-footer__pages\">\n        <h3 class=\"site-footer__heading\">Pages</h3>\n        <nav class=\"site-footer__nav\" aria-label=\"Report pages\">\n          <a href=\"index.html\">Home</a>\n          <a href=\"requirements.html\">Requirements</a>\n          <a href=\"research.html\">Research</a>\n          <a href=\"algorithms.html\">Algorithms</a>\n          <a href=\"ui-design.html\">UI Design</a>\n          <a href=\"system-design.html\">System Design</a>\n          <a href=\"implementation.html\">Implementation</a>\n          <a href=\"testing.html\">Testing</a>\n          <a href=\"evaluation.html\">Evaluation</a>\n          <a href=\"appendices.html\">Appendices</a>\n        </nav>\n      </div>\n      <div class=\"site-footer__block site-footer__project\">\n        <h3 class=\"site-footer__heading\">Project</h3>\n        <p class=\"site-footer__title\">Prompt Injection Protection</p>\n        <p class=\"site-footer__meta\">Team 28 \u00b7 UCL COMP0016 \u00b7 2025\u201326</p>\n        <a class=\"site-footer__blog-link\" href=\"https://team-28.hashnode.dev/\" target=\"_blank\" rel=\"noopener noreferrer\">Development Blog</a>\n        <div class=\"site-footer__supporters\">\n        <p class=\"site-footer__subheading\">Supporters</p>\n        <ul class=\"site-footer__sponsors\" role=\"list\">\n          <li>\n            <a class=\"site-footer__sponsor\" href=\"https://www.ucl.ac.uk/\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"UCL (opens in a new tab)\">\n              <img src=\"assets/img/logo-ucl.png\" alt=\"\" class=\"site-footer__sponsor-img site-footer__sponsor-img--ucl\" width=\"160\" height=\"48\" decoding=\"async\" />\n            </a>\n          </li>\n          <li>\n            <a class=\"site-footer__sponsor\" href=\"https://www.avanade.com/\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Avanade (opens in a new tab)\">\n              <img src=\"assets/img/logo-avanade.webp\" alt=\"\" class=\"site-footer__sponsor-img site-footer__sponsor-img--avanade\" width=\"160\" height=\"48\" decoding=\"async\" />\n            </a>\n          </li>\n        </ul>\n        </div>\n      </div>\n    </div>\n    <div class=\"site-footer__bottom\">\n      <p class=\"site-footer__credit\">\u00a9 2025\u201326 Team 28 \u00b7 UCL COMP0016</p>\n    </div>\n  </div>\n</footer>";

  (function injectSiteFooter() {
    var mount = document.getElementById('footer-root');
    if (!mount) return;
    mount.outerHTML = SITE_FOOTER_HTML;
  })();

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

  var zoomableImages = document.querySelectorAll('.prototype-shot img');
  if (zoomableImages.length) {
    var lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.setAttribute('hidden', '');
    lightbox.innerHTML = [
      '<div class="image-lightbox__backdrop" data-close-lightbox="true"></div>',
      '<div class="image-lightbox__dialog" role="dialog" aria-modal="true" aria-label="Image preview">',
      '<button class="image-lightbox__close" type="button" aria-label="Close image preview">×</button>',
      '<img class="image-lightbox__img" src="" alt="" />',
      '</div>'
    ].join('');
    document.body.appendChild(lightbox);

    var lightboxImg = lightbox.querySelector('.image-lightbox__img');
    var closeBtn = lightbox.querySelector('.image-lightbox__close');

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('hidden', '');
      document.body.classList.remove('lightbox-open');
    }

    function openLightbox(img) {
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt || 'Expanded image';
      lightbox.removeAttribute('hidden');
      lightbox.classList.add('is-open');
      document.body.classList.add('lightbox-open');
      closeBtn.focus();
    }

    zoomableImages.forEach(function (img) {
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', (img.alt || 'Image') + '. Click to enlarge');

      img.addEventListener('click', function () {
        openLightbox(img);
      });

      img.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openLightbox(img);
        }
      });
    });

    lightbox.addEventListener('click', function (event) {
      if (event.target === closeBtn || event.target.hasAttribute('data-close-lightbox')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  }

})();
