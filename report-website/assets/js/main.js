(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var SITE_FOOTER_HTML = "<footer class=\"site-footer fade-in site-footer--motion\" id=\"site-footer\" aria-label=\"Site\">\n  <div class=\"container site-footer__inner\">\n    <div class=\"site-footer__grid site-footer__grid--3 stagger\">\n      <div class=\"site-footer__block site-footer__about\">\n        <h3 class=\"site-footer__heading\">Site info</h3>\n        <p class=\"site-footer__blurb\">We\u2019re Team 28 (COMP0016). This site is for <strong class=\"text-brand\">Prompt Injection Protection</strong>\u2014our project on prompt injection when LLMs use tools, the mitigations we tried, and how we tested everything.</p>\n      </div>\n      <div class=\"site-footer__block site-footer__pages\">\n        <h3 class=\"site-footer__heading\">Pages</h3>\n        <nav class=\"site-footer__nav\" aria-label=\"Report pages\">\n          <a href=\"index.html\">Home</a>\n          <a href=\"requirements.html\">Requirements</a>\n          <a href=\"research.html\">Research</a>\n          <a href=\"algorithms.html\">Algorithms</a>\n          <a href=\"ui-design.html\">UI Design</a>\n          <a href=\"system-design.html\">System Design</a>\n          <a href=\"implementation.html\">Implementation</a>\n          <a href=\"evaluation.html\">Evaluation</a>\n          <a href=\"testing.html\">Testing</a>\n          <a href=\"conclusion.html\">Conclusion</a>\n          <a href=\"appendices.html\">Appendices</a>\n        </nav>\n      </div>\n      <div class=\"site-footer__block site-footer__project\">\n        <h3 class=\"site-footer__heading\">Project</h3>\n        <p class=\"site-footer__title\">Prompt Injection Protection</p>\n        <p class=\"site-footer__meta\">Team 28 \u00b7 UCL COMP0016 \u00b7 2025\u201326</p>\n        <a class=\"site-footer__blog-link\" href=\"appendices.html#dev-blog\">Development Blog</a>\n        <p class=\"site-footer__subheading\">Supporters</p>\n        <ul class=\"site-footer__sponsors\" role=\"list\">\n          <li>\n            <a class=\"site-footer__sponsor\" href=\"https://www.ucl.ac.uk/\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"UCL (opens in a new tab)\">\n              <img src=\"assets/img/logo-ucl.png\" alt=\"\" class=\"site-footer__sponsor-img site-footer__sponsor-img--ucl\" width=\"160\" height=\"48\" decoding=\"async\" />\n            </a>\n          </li>\n          <li>\n            <a class=\"site-footer__sponsor\" href=\"https://www.avanade.com/\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Avanade (opens in a new tab)\">\n              <img src=\"assets/img/logo-avanade.webp\" alt=\"\" class=\"site-footer__sponsor-img site-footer__sponsor-img--avanade\" width=\"160\" height=\"48\" decoding=\"async\" />\n            </a>\n          </li>\n        </ul>\n      </div>\n    </div>\n    <div class=\"site-footer__bottom\">\n      <p class=\"site-footer__credit\">\u00a9 2025\u201326 Team 28 \u00b7 UCL COMP0016</p>\n    </div>\n  </div>\n</footer>";

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

  /* Gantt phase tooltips: click label to open; fixed position; close on leaving tooltip, outside click, or Escape */
  var ganttScroll = document.querySelector('.gantt-scroll');
  if (ganttScroll) {
    function fixedPositioningRoot(el) {
      var p = el.parentElement;
      while (p && p !== document.documentElement) {
        var st = window.getComputedStyle(p);
        if (st.transform && st.transform !== 'none') return p;
        if (st.filter && st.filter !== 'none') return p;
        if (st.perspective && st.perspective !== 'none') return p;
        p = p.parentElement;
      }
      return null;
    }

    function placeGanttTooltip(row) {
      var label = row.querySelector('.gantt-row-label');
      var tooltip = row.querySelector('.gantt-phase-tooltip');
      if (!label || !tooltip || !tooltip.classList.contains('is-open')) return;
      var rect = label.getBoundingClientRect();
      var gap = 6;
      var margin = 8;
      var root = fixedPositioningRoot(tooltip);
      var rootRect = root ? root.getBoundingClientRect() : { left: 0, top: 0 };
      var tw = Math.min(tooltip.offsetWidth || 280, window.innerWidth - margin * 2);
      var leftViewport = Math.max(margin, Math.min(rect.left, window.innerWidth - tw - margin));
      var topViewport = rect.bottom + gap;
      tooltip.style.left = (leftViewport - rootRect.left) + 'px';
      tooltip.style.top = (topViewport - rootRect.top) + 'px';
      requestAnimationFrame(function () {
        if (!tooltip.classList.contains('is-open')) return;
        var tipRect = tooltip.getBoundingClientRect();
        if (tipRect.bottom > window.innerHeight - margin) {
          var flipTop = rect.top - gap - tipRect.height;
          if (flipTop >= margin) {
            tooltip.style.top = (flipTop - rootRect.top) + 'px';
          }
        }
      });
    }

    function closeGanttTooltip(tooltip) {
      if (!tooltip || !tooltip.classList.contains('is-open')) return;
      tooltip.classList.remove('is-open');
      tooltip.style.left = '-9999px';
      tooltip.style.top = '0';
      var row = tooltip.closest('.gantt-row');
      var label = row && row.querySelector('.gantt-row-label');
      if (label) label.setAttribute('aria-expanded', 'false');
    }

    function openGanttTooltip(row) {
      document.querySelectorAll('.gantt-phase-tooltip.is-open').forEach(function (t) {
        closeGanttTooltip(t);
      });
      var tooltip = row.querySelector('.gantt-phase-tooltip');
      var label = row.querySelector('.gantt-row-label');
      if (!tooltip || !label) return;
      tooltip.classList.add('is-open');
      label.setAttribute('aria-expanded', 'true');
      placeGanttTooltip(row);
    }

    function toggleGanttTooltip(row) {
      var tooltip = row.querySelector('.gantt-phase-tooltip');
      if (!tooltip) return;
      if (tooltip.classList.contains('is-open')) {
        closeGanttTooltip(tooltip);
      } else {
        openGanttTooltip(row);
      }
    }

    document.querySelectorAll('.gantt-row--task .gantt-row-label').forEach(function (label) {
      label.setAttribute('role', 'button');
      label.setAttribute('aria-expanded', 'false');
    });

    document.querySelectorAll('.gantt-row--task').forEach(function (row) {
      var tooltip = row.querySelector('.gantt-phase-tooltip');
      var label = row.querySelector('.gantt-row-label');
      if (!tooltip || !label) return;

      label.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleGanttTooltip(row);
      });
      label.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleGanttTooltip(row);
        }
      });

      tooltip.addEventListener('mouseleave', function () {
        closeGanttTooltip(tooltip);
      });
    });

    document.addEventListener('click', function (e) {
      document.querySelectorAll('.gantt-phase-tooltip.is-open').forEach(function (tooltip) {
        var row = tooltip.closest('.gantt-row');
        var label = row && row.querySelector('.gantt-row-label');
        if (tooltip.contains(e.target)) return;
        if (label && label.contains(e.target)) return;
        closeGanttTooltip(tooltip);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      document.querySelectorAll('.gantt-phase-tooltip.is-open').forEach(closeGanttTooltip);
    });

    window.addEventListener('scroll', function () {
      document.querySelectorAll('.gantt-phase-tooltip.is-open').forEach(function (tooltip) {
        var row = tooltip.closest('.gantt-row');
        if (row) placeGanttTooltip(row);
      });
    }, true);
    ganttScroll.addEventListener('scroll', function () {
      document.querySelectorAll('.gantt-phase-tooltip.is-open').forEach(function (tooltip) {
        var row = tooltip.closest('.gantt-row');
        if (row) placeGanttTooltip(row);
      });
    }, { passive: true });
    window.addEventListener('resize', function () {
      document.querySelectorAll('.gantt-phase-tooltip.is-open').forEach(function (tooltip) {
        var row = tooltip.closest('.gantt-row');
        if (row) placeGanttTooltip(row);
      });
    });
  }

  /* Home: key features — only one <details> open at a time */
  var keyFeaturesRoot = document.getElementById('key-features');
  if (keyFeaturesRoot) {
    var keyFeatureDetails = keyFeaturesRoot.querySelectorAll('details.evaluation-item');
    keyFeatureDetails.forEach(function (detail) {
      detail.addEventListener('toggle', function () {
        if (!detail.open) return;
        keyFeatureDetails.forEach(function (other) {
          if (other !== detail && other.open) other.open = false;
        });
      });
    });
  }

  /* Evaluation: incomplete-requirement notes use fixed positioning (escapes overflow/scroll clipping) */
  var reqTrace = document.querySelector('#requirements-traceability');
  if (reqTrace) {
    reqTrace.querySelectorAll('.req-status-tooltip').forEach(function (wrap) {
      var panel = wrap.querySelector('.req-status-tooltip__panel');
      if (!panel) return;

      function place() {
        var rect = wrap.getBoundingClientRect();
        var gap = 6;
        var margin = 8;
        var maxW = Math.min(320, window.innerWidth - margin * 2);
        var left = rect.left + rect.width / 2 - maxW / 2;
        left = Math.max(margin, Math.min(left, window.innerWidth - maxW - margin));
        var top = rect.bottom + gap;
        panel.style.left = left + 'px';
        panel.style.top = top + 'px';
        panel.style.width = maxW + 'px';

        requestAnimationFrame(function () {
          var pr = panel.getBoundingClientRect();
          if (pr.bottom > window.innerHeight - margin) {
            var flip = rect.top - gap - pr.height;
            if (flip >= margin) {
              panel.style.top = flip + 'px';
            }
          }
        });
      }

      function clearPlacement() {
        panel.style.left = '';
        panel.style.top = '';
        panel.style.width = '';
      }

      wrap.addEventListener('mouseenter', place);
      wrap.addEventListener('mouseleave', function () {
        if (!wrap.contains(document.activeElement)) {
          clearPlacement();
        }
      });
      wrap.addEventListener('focusin', place);
      wrap.addEventListener('focusout', function (e) {
        if (!wrap.contains(e.relatedTarget)) {
          clearPlacement();
        }
      });

      function placeIfActive() {
        if (wrap.matches(':hover') || wrap.contains(document.activeElement)) {
          place();
        }
      }
      window.addEventListener('scroll', placeIfActive, true);
      window.addEventListener('resize', placeIfActive);
    });
  }
})();
