// Animaciones y mejoras. Sin JavaScript el sitio se ve completo y estático.
(function () {
  "use strict";
  var doc = document.documentElement;
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var clamp = function (n) { return Math.max(0, Math.min(1, n)); };

  // 1. Aparición suave de cada bloque al entrar en pantalla
  var reveals = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !calm) {
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); seen.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (el) { seen.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // 2. Frase que se ilumina palabra por palabra
  var words = document.querySelector("[data-words]");
  var spans = [];
  if (words) {
    var parts = words.textContent.trim().split(/\s+/);
    words.textContent = "";
    parts.forEach(function (w, i) {
      var s = document.createElement("span");
      s.textContent = w;
      words.appendChild(s);
      if (i < parts.length - 1) words.appendChild(document.createTextNode(" "));
      spans.push(s);
    });
    if (calm) spans.forEach(function (s) { s.classList.add("on"); });
  }

  // 3. Efectos ligados al scroll: barra de progreso, imágenes que crecen, frase
  var nav = document.getElementById("nav");
  var scrubs = document.querySelectorAll("[data-scrub]");
  var ticking = false;
  function frame() {
    ticking = false;
    var vh = window.innerHeight;
    var max = doc.scrollHeight - vh;
    if (nav) {
      nav.classList.toggle("scrolled", window.scrollY > 8);
      nav.style.setProperty("--scroll", max > 0 ? clamp(window.scrollY / max).toFixed(4) : 0);
    }
    if (calm) return;
    scrubs.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top > vh * 1.2 || r.bottom < -vh * 0.2) return;
      el.style.setProperty("--p", clamp((vh - r.top) / (vh * 0.75)).toFixed(3));
    });
    if (spans.length) {
      var wr = words.getBoundingClientRect();
      var prog = clamp((vh * 0.85 - wr.top) / (wr.height + vh * 0.35));
      var lit = Math.round(prog * spans.length);
      spans.forEach(function (s, i) { s.classList.toggle("on", i < lit); });
    }
  }
  function onScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(frame); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  frame();

  // 4. Cifras que cuentan hacia arriba
  var counts = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && !calm) {
    var counter = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        counter.unobserve(en.target);
        var el = en.target, end = +el.dataset.count, t0 = null;
        (function step(t) {
          if (t0 === null) t0 = t;
          var k = clamp((t - t0) / 1100);
          el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
          if (k < 1) window.requestAnimationFrame(step);
        })(window.performance.now());
      });
    }, { threshold: 0.6 });
    counts.forEach(function (el) { el.textContent = "0"; counter.observe(el); });
  }

  // 5. Sección activa en el menú
  var links = {};
  document.querySelectorAll('#menu a[href^="#"]').forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var a = links[en.target.id];
        if (a && en.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].removeAttribute("aria-current"); });
          a.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  // 6. Menú en pantallas pequeñas
  var menuBtn = document.querySelector(".menu-btn");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
    document.querySelectorAll("#menu a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (ev) { if (ev.key === "Escape") setMenu(false); });
  }

  // 7. Abrir y cerrar el detalle de cada proyecto
  document.querySelectorAll(".more").forEach(function (b) {
    var box = document.getElementById(b.getAttribute("aria-controls"));
    box.inert = true;
    b.addEventListener("click", function () {
      var open = b.getAttribute("aria-expanded") !== "true";
      b.setAttribute("aria-expanded", open ? "true" : "false");
      b.firstChild.textContent = open ? b.dataset.less : b.dataset.more;
      box.classList.toggle("open", open);
      box.inert = !open;
    });
  });
  // Si alguien llega con un enlace directo a un proyecto, se abre su detalle
  function openFromHash() {
    var el = location.hash.length > 1 && document.getElementById(location.hash.slice(1));
    var t = el && el.classList.contains("tile") && el.querySelector(".more");
    if (t && t.getAttribute("aria-expanded") !== "true") t.click();
  }
  window.addEventListener("hashchange", openFromHash);
  openFromHash();

  // 8. Visor de capturas (sin JavaScript, el enlace abre la imagen)
  var dlg = document.getElementById("viewer");
  if (dlg && typeof dlg.showModal === "function") {
    var big = dlg.querySelector("img");
    document.querySelectorAll("a[data-zoom]").forEach(function (a) {
      a.addEventListener("click", function (ev) {
        ev.preventDefault();
        big.src = a.href;
        big.alt = a.querySelector("img").alt;
        dlg.showModal();
      });
    });
    dlg.addEventListener("click", function (ev) { if (ev.target === dlg) dlg.close(); });
  }
})();
