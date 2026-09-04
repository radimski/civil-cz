(function () {
  document.documentElement.classList.add("js");

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  function bindNav() {
    var btn = document.querySelector("[data-nav-toggle]");
    var panel = document.getElementById("mobile-nav");
    if (!btn || !panel) return;
    function setOpen(open) {
      if (open) panel.removeAttribute("hidden");
      else panel.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "Zavřít" : "Menu";
    }
    btn.addEventListener("click", function () {
      setOpen(panel.hasAttribute("hidden"));
    });
    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
  }

  function bindHeader() {
    var header = document.querySelector("[data-header]");
    if (!header) return;
    function paint() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }
    paint();
    window.addEventListener("scroll", paint, { passive: true });
  }

  function bindFilters() {
    var bar = document.querySelector("[data-filters]");
    if (!bar) return;
    var items = document.querySelectorAll("[data-ref]");
    bar.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-filter]");
      if (!btn) return;
      bar.querySelectorAll("[data-filter]").forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      var cat = btn.getAttribute("data-filter");
      items.forEach(function (el) {
        var show = cat === "all" || el.getAttribute("data-ref") === cat;
        el.hidden = !show;
      });
    });
  }

  function bindReveal() {
    var nodes = document.querySelectorAll("[data-reveal]");
    if (!nodes.length) return;
    if (!("IntersectionObserver" in window)) {
      nodes.forEach(function (n) { n.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.01, rootMargin: "0px 0px 12% 0px" });
    nodes.forEach(function (n) {
      var rect = n.getBoundingClientRect();
      if (rect.top < window.innerHeight - 8) {
        n.classList.add("is-in");
        return;
      }
      io.observe(n);
    });
  }

  function countTo(el, target, duration) {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.textContent = String(target);
      return;
    }
    var start = null;
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function bindCounts() {
    var nodes = document.querySelectorAll("[data-years-since], [data-count-to]");
    if (!nodes.length) return;
    function run(el) {
      if (el.getAttribute("data-counted") === "1") return;
      el.setAttribute("data-counted", "1");
      var yearsFrom = Number(el.getAttribute("data-years-since"));
      var target = yearsFrom ? new Date().getFullYear() - yearsFrom : Number(el.getAttribute("data-count-to"));
      if (!target && target !== 0) return;
      countTo(el, target, target > 100 ? 1100 : 800);
    }
    if (!("IntersectionObserver" in window)) {
      nodes.forEach(run);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        run(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  ready(function () {
    bindNav();
    bindHeader();
    bindFilters();
    bindReveal();
    bindCounts();
  });
})();
