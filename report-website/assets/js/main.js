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
})();
