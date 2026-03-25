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

  var btn = document.querySelector('.back-to-top');
  window.addEventListener('scroll', function () {
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

  /* Accordion dropdowns: scroll opened <details> so its top sits just below the sticky header (measured, not fixed rem) */
  document.addEventListener('toggle', function (e) {
    var el = e.target;
    if (!el.matches || !el.matches('details.evaluation-item')) return;
    if (!el.open) return;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        var header = document.querySelector('.site-header');
        var gap = 14;
        var hh = header ? header.getBoundingClientRect().height : 0;
        var rect = el.getBoundingClientRect();
        var targetY = rect.top + window.scrollY - hh - gap;
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      });
    });
  });

  /* Evaluation: incomplete-requirement notes use fixed positioning (escapes overflow/scroll clipping) */
  var reqTrace = document.querySelector('#requirements-traceability');
  if (reqTrace) {
    function nearestFixedContainingBlock(el) {
      var node = el.parentElement;
      while (node && node !== document.documentElement) {
        var s = window.getComputedStyle(node);
        if (s.transform && s.transform !== 'none') return node;
        if (s.filter && s.filter !== 'none') return node;
        if (s.perspective && s.perspective !== 'none') return node;
        if (s.backdropFilter && s.backdropFilter !== 'none') return node;
        if (s.webkitBackdropFilter && s.webkitBackdropFilter !== 'none') return node;
        node = node.parentElement;
      }
      return null;
    }

    reqTrace.querySelectorAll('.req-status-tooltip').forEach(function (wrap) {
      var panel = wrap.querySelector('.req-status-tooltip__panel');
      if (!panel) return;

      var row = wrap.closest('tr.req-row--incomplete');
      var anchor = row || wrap;

      function place() {
        var rect = wrap.getBoundingClientRect();
        var gap = 8;
        var margin = 8;
        var maxW = Math.min(320, window.innerWidth - margin * 2);
        var cb = nearestFixedContainingBlock(panel);
        var cbRect = cb ? cb.getBoundingClientRect() : { left: 0, top: 0 };

        panel.style.width = maxW + 'px';
        panel.style.right = 'auto';
        panel.style.bottom = 'auto';

        /* Viewport coords, then convert to fixed-position coords (relative to containing block if any) */
        var leftViewport = rect.left + rect.width / 2 - maxW / 2;
        leftViewport = Math.max(margin, Math.min(leftViewport, window.innerWidth - maxW - margin));
        panel.style.left = leftViewport - cbRect.left + 'px';

        function applyVertical() {
          var ph = panel.getBoundingClientRect().height;
          var topViewport = rect.top - gap - ph;
          if (topViewport < margin) {
            topViewport = rect.bottom + gap;
          }
          var pr = panel.getBoundingClientRect();
          if (pr.bottom > window.innerHeight - margin) {
            var above = rect.top - gap - pr.height;
            if (above >= margin) {
              topViewport = above;
            } else {
              topViewport = Math.max(margin, window.innerHeight - margin - pr.height);
            }
          }
          panel.style.top = topViewport - cbRect.top + 'px';
        }

        requestAnimationFrame(function () {
          requestAnimationFrame(applyVertical);
        });
      }

      function clearPlacement() {
        panel.style.left = '';
        panel.style.top = '';
        panel.style.width = '';
        panel.style.right = '';
        panel.style.bottom = '';
      }

      anchor.addEventListener('mouseenter', place);
      anchor.addEventListener('mouseleave', function () {
        if (!anchor.contains(document.activeElement)) {
          clearPlacement();
        }
      });
      anchor.addEventListener('focusin', place);
      anchor.addEventListener('focusout', function (e) {
        if (!anchor.contains(e.relatedTarget)) {
          clearPlacement();
        }
      });

      function placeIfActive() {
        if (anchor.matches(':hover') || anchor.contains(document.activeElement)) {
          place();
        }
      }
      window.addEventListener('scroll', placeIfActive, true);
      window.addEventListener('resize', placeIfActive);

      /* Click / tap: many browsers do not focus tabindex wrappers on pointer down, so :focus-within never fires */
      if (row) {
        row.addEventListener('click', function (e) {
          if (e.target.closest && e.target.closest('a')) return;
          wrap.focus({ preventScroll: true });
          requestAnimationFrame(place);
        });
      } else {
        wrap.addEventListener('click', function () {
          wrap.focus({ preventScroll: true });
          requestAnimationFrame(place);
        });
      }
    });
  }

  /* Glossary popovers: click/tap toggles (hover alone fails on touch); Escape closes */
  function glossaryEventEl(target) {
    return target && target.nodeType === 3 ? target.parentElement : target;
  }
  document.querySelectorAll('.glossary-pop').forEach(function (anchor) {
    if (!anchor.hasAttribute('aria-expanded')) {
      anchor.setAttribute('aria-expanded', 'false');
    }
    anchor.addEventListener('click', function (e) {
      var t = glossaryEventEl(e.target);
      if (t && t.closest && t.closest('.glossary-pop__panel')) {
        return;
      }
      e.preventDefault();
      var wasOpen = anchor.classList.contains('is-open');
      document.querySelectorAll('.glossary-pop.is-open').forEach(function (el) {
        el.classList.remove('is-open');
        el.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        anchor.classList.add('is-open');
        anchor.setAttribute('aria-expanded', 'true');
      }
    });
  });
  document.addEventListener('click', function (e) {
    var t = glossaryEventEl(e.target);
    if (t && t.closest && t.closest('.glossary-pop')) return;
    document.querySelectorAll('.glossary-pop.is-open').forEach(function (el) {
      el.classList.remove('is-open');
      el.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.glossary-pop.is-open').forEach(function (el) {
      el.classList.remove('is-open');
      el.setAttribute('aria-expanded', 'false');
    });
  });
})();
