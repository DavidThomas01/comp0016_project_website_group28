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
