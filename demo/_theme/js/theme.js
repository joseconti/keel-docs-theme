/* ============================================================================
   keel-docs-theme · theme.js   (vanilla, no dependencies, file:// safe)
   Behaviors: i18n string injection, sidebar drawer, collapsible nav groups,
   TOC scrollspy, code tabs, copy buttons, offline client search, heading anchors.
   Data comes from globals defined by <script src> (works under file://):
     window.KEEL_I18N          (from strings-<locale>.js)
     window.KEEL_SEARCH_INDEX  (from search-index.js)
   Version: __THEME_VERSION__
============================================================================ */
(function () {
  "use strict";
  var doc = document;
  var root = doc.documentElement;
  var LANG = root.getAttribute("lang") || "es";
  var AUDIENCE = root.getAttribute("data-audience") || null;   // "user" | "dev" | null
  var BASE = root.getAttribute("data-root") || "";             // "" or "../../"
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(s, c) { return (c || doc).querySelector(s); }
  function $all(s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); }
  function fold(s) { return (s || "").toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }

  /* ---- shared live region ---- */
  var live = doc.createElement("div");
  live.className = "u-visually-hidden";
  live.setAttribute("aria-live", "polite");
  live.setAttribute("aria-atomic", "true");
  doc.addEventListener("DOMContentLoaded", function () { doc.body.appendChild(live); });
  function announce(msg) { live.textContent = ""; window.setTimeout(function () { live.textContent = msg; }, 30); }

  /* =========================================================================
     i18n — fill UI chrome strings from window.KEEL_I18N (never hard-coded)
     Markup contract:
       <x data-i18n="key">              → textContent
       <x data-i18n-attr="placeholder:key;title:key2">  → attributes
       <x data-i18n-aria="key">         → aria-label
     Interpolation: values may contain {n}, {v}; pass via data-i18n-vars='{"n":3}'
  ========================================================================= */
  function t(key, vars) {
    var dict = window.KEEL_I18N || {};
    var s = Object.prototype.hasOwnProperty.call(dict, key) ? dict[key] : key;
    if (vars) { for (var k in vars) { s = s.replace(new RegExp("\\{" + k + "\\}", "g"), vars[k]); } }
    return s;
  }
  function applyI18n(scope) {
    $all("[data-i18n]", scope).forEach(function (el) {
      var vars = el.getAttribute("data-i18n-vars");
      el.textContent = t(el.getAttribute("data-i18n"), vars ? JSON.parse(vars) : null);
    });
    $all("[data-i18n-aria]", scope).forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });
    $all("[data-i18n-attr]", scope).forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var bits = pair.split(":"); if (bits.length === 2) el.setAttribute(bits[0].trim(), t(bits[1].trim()));
      });
    });
  }

  /* =========================================================================
     Sidebar drawer (narrow screens)
  ========================================================================= */
  function initSidebar() {
    var toggle = $(".nav-toggle");
    var sidebar = $(".sidebar");
    if (!toggle || !sidebar) return;
    var scrim = $(".sidebar-scrim");
    if (!scrim) { scrim = doc.createElement("div"); scrim.className = "sidebar-scrim"; doc.body.appendChild(scrim); }

    function open() {
      doc.body.setAttribute("data-sidebar-open", "true");
      toggle.setAttribute("aria-expanded", "true");
      var first = $(".nav-tree__link, .nav-group__toggle", sidebar);
      if (first) first.focus();
    }
    function close(returnFocus) {
      doc.body.removeAttribute("data-sidebar-open");
      toggle.setAttribute("aria-expanded", "false");
      if (returnFocus) toggle.focus();
    }
    toggle.addEventListener("click", function () {
      (doc.body.getAttribute("data-sidebar-open") === "true") ? close(true) : open();
    });
    scrim.addEventListener("click", function () { close(false); });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && doc.body.getAttribute("data-sidebar-open") === "true") close(true);
    });
    // close after navigating on mobile
    $all(".nav-group__item, .nav-tree__link", sidebar).forEach(function (a) {
      a.addEventListener("click", function () {
        if (window.matchMedia("(max-width:767px)").matches) close(false);
      });
    });
  }

  /* =========================================================================
     Collapsible nav groups
  ========================================================================= */
  function initNavGroups() {
    $all(".nav-group__toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!expanded));
      });
    });
  }

  /* =========================================================================
     TOC scrollspy
  ========================================================================= */
  function initScrollspy() {
    var links = $all(".toc__link");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    var targets = [];
    links.forEach(function (a) {
      var id = (a.getAttribute("href") || "").replace(/^#/, "");
      var el = id && doc.getElementById(id);
      if (el) { map[id] = a; targets.push(el); }
    });
    var current = null;
    function setActive(id) {
      if (id === current) return;
      current = id;
      links.forEach(function (a) { a.removeAttribute("aria-current"); });
      if (map[id]) map[id].setAttribute("aria-current", "true");
    }
    var io = new IntersectionObserver(function (entries) {
      // choose the topmost heading currently intersecting the upper viewport band
      var visible = entries.filter(function (e) { return e.isIntersecting; });
      if (visible.length) {
        visible.sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
        setActive(visible[0].target.id);
      }
    }, { rootMargin: "-72px 0px -70% 0px", threshold: 0 });
    targets.forEach(function (el) { io.observe(el); });

    // smooth scroll (respect reduced motion) for TOC + in-page anchors
    $all('.toc__link, .heading-anchor').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = (a.getAttribute("href") || "").replace(/^#/, "");
        var el = id && doc.getElementById(id);
        if (!el) return;
        e.preventDefault();
        var top = el.getBoundingClientRect().top + window.pageYOffset - 72;
        window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
        history.replaceState(null, "", "#" + id);
        el.setAttribute("tabindex", "-1"); el.focus({ preventScroll: true });
      });
    });
  }

  /* =========================================================================
     Heading anchors (# link on h2/h3 with id)
  ========================================================================= */
  function initHeadingAnchors() {
    $all(".content h2[id], .content h3[id]").forEach(function (h) {
      if ($(".heading-anchor", h)) return;
      var a = doc.createElement("a");
      a.className = "heading-anchor"; a.href = "#" + h.id; a.textContent = "#";
      a.setAttribute("aria-label", t("heading_link"));
      h.appendChild(a);
    });
  }

  /* =========================================================================
     Code tabs (WAI-ARIA tabs, roving tabindex + arrow keys)
  ========================================================================= */
  function initCodeTabs() {
    $all(".code-block").forEach(function (block) {
      var tablist = $(".code-block__tabs", block);
      if (!tablist) return;
      var tabs = $all(".code-block__tab", tablist);
      var panels = $all(".code-block__panel", block);
      if (!tabs.length) return;

      function select(i, focus) {
        tabs.forEach(function (tab, j) {
          var on = i === j;
          tab.setAttribute("aria-selected", String(on));
          tab.setAttribute("tabindex", on ? "0" : "-1");
          if (panels[j]) panels[j].hidden = !on;
          if (on && focus) tab.focus();
        });
      }
      tabs.forEach(function (tab, i) {
        tab.addEventListener("click", function () { select(i, false); });
        tab.addEventListener("keydown", function (e) {
          var last = tabs.length - 1, ni = null;
          var isRTL = root.getAttribute("dir") === "rtl";
          if (e.key === "ArrowRight") ni = isRTL ? i - 1 : i + 1;
          else if (e.key === "ArrowLeft") ni = isRTL ? i + 1 : i - 1;
          else if (e.key === "Home") ni = 0;
          else if (e.key === "End") ni = last;
          if (ni === null) return;
          e.preventDefault();
          if (ni < 0) ni = last; if (ni > last) ni = 0;
          select(ni, true);
        });
      });
      select(0, false);
    });
  }

  /* =========================================================================
     Copy buttons
  ========================================================================= */
  function initCopy() {
    $all(".copy-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var sel = btn.getAttribute("data-copy-target");
        var srcEl = sel ? $(sel) : (btn.closest(".code-block, .terminal") || doc).querySelector("pre");
        var text = srcEl ? srcEl.innerText : "";
        var done = function () {
          btn.setAttribute("data-copied", "true");
          var label = $(".copy-btn__label", btn);
          var prev = label ? label.textContent : null;
          if (label) label.textContent = t("copied");
          announce(t("copied"));
          window.setTimeout(function () {
            btn.removeAttribute("data-copied");
            if (label && prev !== null) label.textContent = t("copy");
          }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, function () { fallback(text, done); });
        } else { fallback(text, done); }
      });
    });
    function fallback(text, done) {
      var ta = doc.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "absolute"; ta.style.left = "-9999px";
      doc.body.appendChild(ta); ta.select();
      try { doc.execCommand("copy"); done(); } catch (e) { /* noop */ }
      doc.body.removeChild(ta);
    }
  }

  /* =========================================================================
     Offline client search
  ========================================================================= */
  function initSearch() {
    var wrap = $(".search");
    if (!wrap) return;
    var input = $(".search__input", wrap);
    var results = $(".search__results", wrap);
    if (!input || !results) return;

    var index = (window.KEEL_SEARCH_INDEX && window.KEEL_SEARCH_INDEX.entries) || [];
    // scope to current lang + audience (audience null on entry page → all)
    var scoped = index.filter(function (e) {
      if (e.lang && e.lang !== LANG) return false;
      if (AUDIENCE && e.audience && e.audience !== AUDIENCE) return false;
      return true;
    });

    input.setAttribute("role", "combobox");
    input.setAttribute("aria-expanded", "false");
    input.setAttribute("aria-autocomplete", "list");
    var listId = "search-listbox";
    results.id = listId; results.setAttribute("role", "listbox");
    input.setAttribute("aria-controls", listId);

    var active = -1, items = [];

    function close() {
      wrap.setAttribute("data-open", "false");
      input.setAttribute("aria-expanded", "false");
      input.removeAttribute("aria-activedescendant");
      active = -1; items = [];
    }
    function open() { wrap.setAttribute("data-open", "true"); input.setAttribute("aria-expanded", "true"); }

    function highlight(text, q) {
      if (!q) return escapeHtml(text);
      var f = fold(text), fq = fold(q), out = "", i = 0, k;
      while ((k = f.indexOf(fq, i)) !== -1) {
        out += escapeHtml(text.slice(i, k)) + "<mark>" + escapeHtml(text.slice(k, k + q.length)) + "</mark>";
        i = k + q.length;
      }
      return out + escapeHtml(text.slice(i));
    }
    function escapeHtml(s) { return s.replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

    function search(q) {
      var fq = fold(q.trim());
      if (!fq) { close(); return; }
      var hits = [];
      for (var i = 0; i < scoped.length; i++) {
        var e = scoped[i];
        var hay = fold((e.title || "") + " " + (e.terms || "") + " " + (e.excerpt || ""));
        var pos = hay.indexOf(fq);
        if (pos !== -1) {
          // rank: title match first, then earlier position
          var titleHit = fold(e.title || "").indexOf(fq);
          hits.push({ e: e, score: (titleHit === 0 ? 0 : titleHit > -1 ? 1 : 2) * 1000 + pos });
        }
      }
      hits.sort(function (a, b) { return a.score - b.score; });
      render(hits.slice(0, 12), q);
    }

    function render(hits, q) {
      open();
      results.innerHTML = "";
      items = [];
      var countEl = doc.createElement("div");
      countEl.className = "search__count";
      countEl.textContent = t("search_count", { n: hits.length });
      results.appendChild(countEl);
      announce(t("search_count", { n: hits.length }));

      if (!hits.length) {
        var empty = doc.createElement("div");
        empty.className = "search__empty";
        empty.textContent = t("search_no_results");
        results.appendChild(empty);
        return;
      }
      hits.forEach(function (h, i) {
        var e = h.e;
        var a = doc.createElement("a");
        a.className = "search__result";
        a.href = BASE + e.path;
        a.id = "search-opt-" + i;
        a.setAttribute("role", "option");
        a.setAttribute("aria-selected", "false");
        a.innerHTML =
          '<span class="search__result-title">' + highlight(e.title || "", q) + "</span>" +
          (e.section ? '<span class="search__result-crumb">' + escapeHtml(e.section) + "</span>" : "") +
          (e.excerpt ? '<span class="search__result-excerpt">' + highlight(e.excerpt, q) + "</span>" : "");
        results.appendChild(a);
        items.push(a);
      });
      active = -1;
    }

    function move(delta) {
      if (!items.length) return;
      if (active > -1) items[active].setAttribute("aria-selected", "false");
      active = (active + delta + items.length) % items.length;
      var el = items[active];
      el.setAttribute("aria-selected", "true");
      input.setAttribute("aria-activedescendant", el.id);
      el.scrollIntoView({ block: "nearest" });
    }

    input.addEventListener("input", function () { search(input.value); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); if (wrap.getAttribute("data-open") !== "true") search(input.value); else move(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      else if (e.key === "Enter") { if (active > -1 && items[active]) { window.location.href = items[active].getAttribute("href"); } }
      else if (e.key === "Escape") { if (wrap.getAttribute("data-open") === "true") { close(); } else { input.blur(); } }
    });
    input.addEventListener("focus", function () { if (input.value.trim()) search(input.value); });
    doc.addEventListener("click", function (e) { if (!wrap.contains(e.target)) close(); });

    // "/" focuses search
    doc.addEventListener("keydown", function (e) {
      if (e.key === "/" && doc.activeElement !== input && !/^(input|textarea|select)$/i.test((doc.activeElement || {}).tagName || "")) {
        e.preventDefault(); input.focus();
      }
    });

    // empty index → disable gracefully
    if (!index.length) {
      input.setAttribute("aria-describedby", "search-noindex");
      var note = doc.createElement("span"); note.id = "search-noindex"; note.className = "u-visually-hidden";
      note.textContent = t("search_no_index"); wrap.appendChild(note);
    }
  }

  /* =========================================================================
     Entry page language panels (template-entry)
  ========================================================================= */
  function initEntryLang() {
    var btns = $all(".entry-lang__btn");
    if (!btns.length) return;
    function set(lang) {
      btns.forEach(function (b) { b.setAttribute("aria-selected", String(b.getAttribute("data-lang") === lang)); });
      $all("[data-lang-panel]").forEach(function (p) { p.hidden = p.getAttribute("data-lang-panel") !== lang; });
    }
    btns.forEach(function (b) { b.addEventListener("click", function () { set(b.getAttribute("data-lang")); }); });
    set(root.getAttribute("lang") || "es");
  }

  /* =========================================================================
     boot
  ========================================================================= */
  function boot() {
    applyI18n(doc);
    initSidebar();
    initNavGroups();
    initHeadingAnchors();
    initScrollspy();
    initCodeTabs();
    initCopy();
    initSearch();
    initEntryLang();
  }
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
