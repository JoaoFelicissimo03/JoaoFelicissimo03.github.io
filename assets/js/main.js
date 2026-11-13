(function () {
  'use strict';

  document.documentElement.classList.add('js');
  var base = window.PROJECTS || [];
  var I18N = window.I18N || { en: {}, pt: {} };
  var PT = window.PROJECTS_PT || {};
  var $ = function (id) { return document.getElementById(id); };
  var each = function (list, fn) { Array.prototype.forEach.call(list, fn); };

  var ARROW = '<svg class="ic" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* ---------- Language ---------- */
  var lang = 'en';
  function t(key) { return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key; }

  function storedLang() {
    try { return localStorage.getItem('lang'); } catch (e) { return null; }
  }
  function initialLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'pt' || q === 'en') return q;
    var s = storedLang();
    if (s === 'pt' || s === 'en') return s;
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
    return nav.toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en';
  }

  /* Project texts in the current language: Portuguese overrides fall back to English. */
  function project(i) {
    var p = base[i];
    if (lang !== 'pt' || !PT[p.id]) return p;
    var o = PT[p.id];
    var out = Object.assign({}, p, o);
    out.images = p.images.map(function (img, k) { return Object.assign({}, img, (o.images || [])[k] || {}); });
    return out;
  }

  function applyLang(next, save) {
    lang = next === 'pt' ? 'pt' : 'en';
    document.documentElement.lang = lang === 'pt' ? 'pt-PT' : 'en';
    each(document.querySelectorAll('[data-i18n]'), function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    each(document.querySelectorAll('[data-i18n-aria]'), function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
    each(document.querySelectorAll('[data-i18n-alt]'), function (el) { el.setAttribute('alt', t(el.getAttribute('data-i18n-alt'))); });
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.desc'));
    each(document.querySelectorAll('[data-lang]'), function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });
    toggle.setAttribute('aria-label', t(links.classList.contains('open') ? 'nav.close' : 'nav.open'));
    renderTiles();
    if (current >= 0) fill(current, true);
    if (save) {
      try { localStorage.setItem('lang', lang); } catch (e) {}
      var url = new URL(location.href);
      url.searchParams.set('lang', lang);
      history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
  }

  /* ---------- Year ---------- */
  var year = $('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Header state ---------- */
  var header = $('site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = $('nav-toggle');
  var links = $('nav-links');
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', t(open ? 'nav.close' : 'nav.open'));
    links.classList.toggle('open', open);
    header.classList.toggle('menu-open', open);
  }
  toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
  links.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && links.classList.contains('open')) { setMenu(false); toggle.focus(); } });
  window.addEventListener('resize', function () { if (window.innerWidth > 860) setMenu(false); });

  /* ---------- Active nav link ---------- */
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navAnchors.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['top', 'capabilities', 'projects', 'how-i-work', 'certifications', 'contact'].forEach(function (id) {
      var el = $(id); if (el) spy.observe(el);
    });
  }

  /* ---------- CV button: shown only when the file exists ---------- */
  var cvLinks = document.querySelectorAll('.js-cv');
  if (cvLinks.length && window.fetch && location.protocol.indexOf('http') === 0) {
    fetch(cvLinks[0].getAttribute('href'), { method: 'HEAD' }).then(function (r) {
      if (!r.ok) return;
      each(cvLinks, function (a) { a.hidden = false; });
      each(document.querySelectorAll('.js-cv-fallback'), function (a) { a.hidden = true; a.style.display = 'none'; });
    }).catch(function () {});
  }

  /* ---------- Project tiles ---------- */
  var tiles = $('tiles');
  var revealReady = false;
  function renderTiles() {
    tiles.innerHTML = base.map(function (_, i) {
      var p = project(i);
      var chips = p.chips.map(function (c) {
        return '<span class="chip"><b>' + esc(c.value) + '</b><small>' + esc(c.label) + '</small></span>';
      }).join('');
      var tags = p.tags.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('');
      return '<article class="tile reveal' + (revealReady ? ' in' : '') + '">' +
        '<button type="button" class="tile-btn" data-open="' + esc(p.id) + '" aria-haspopup="dialog" aria-label="' + esc(p.title + ': ' + p.subtitle + '. ' + t('pd.openTile')) + '" style="--tint:' + esc(p.tint) + '">' +
          '<img class="tile-scene" src="assets/img/scenes/' + esc(p.id) + '.svg" alt="" aria-hidden="true">' +
          '<span class="tile-tint" aria-hidden="true"></span>' +
          '<span class="tile-peek" aria-hidden="true"><img src="' + esc(p.tile) + '" alt="" loading="lazy"></span>' +
          '<span class="tile-shade" aria-hidden="true"></span>' +
          '<span class="tile-num" aria-hidden="true">' + pad(i + 1) + '</span>' +
          '<span class="tile-chips" aria-hidden="true">' + chips + '</span>' +
          '<span class="tile-foot">' +
            '<span class="tile-title">' + esc(p.title) + '</span>' +
            '<span class="tile-meta"><span class="tile-tags">' + tags + '</span><span class="tile-arrow" aria-hidden="true">' + ARROW + '</span></span>' +
          '</span>' +
        '</button></article>';
    }).join('');
    if (revealReady) return;
  }

  /* ---------- Project dialog ---------- */
  var dialog = $('project-dialog');
  var current = -1;
  var currentImg = 0;
  var lastFocus = null;
  var supportsDialog = typeof dialog.showModal === 'function';

  function setImage(p, k) {
    var img = p.images[k];
    var main = $('pd-main');
    currentImg = k;
    main.src = img.src; main.alt = img.alt; main.width = img.w; main.height = img.h;
    $('pd-main-link').href = img.src;
    $('pd-caption').textContent = p.images.length > 1 ? img.caption + ' · ' + (k + 1) + ' ' + t('pd.of') + ' ' + p.images.length : img.caption;
    each($('pd-thumbs').children, function (b, j) { b.setAttribute('aria-current', String(j === k)); });
  }

  function fill(i, keepImage) {
    var p = project(i);
    var n = base.length;
    var prev = project((i - 1 + n) % n);
    var next = project((i + 1) % n);
    current = i;
    $('pd-count').textContent = t('pd.project') + ' ' + pad(i + 1) + ' / ' + pad(n);
    $('pd-tags').textContent = p.tags.join(' · ');
    $('pd-title').textContent = p.title;
    $('pd-subtitle').textContent = p.subtitle;
    $('pd-summary').textContent = p.summary;
    $('pd-question').textContent = p.question;
    $('pd-did').innerHTML = p.did.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('');
    $('pd-stack').innerHTML = p.stack.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('');
    $('pd-findings').innerHTML = p.findings.map(function (f) { return '<li><b>' + esc(f.value) + '</b><span>' + esc(f.text) + '</span></li>'; }).join('');
    $('pd-repo').href = p.repo;
    $('pd-prev-title').textContent = prev.title;
    $('pd-next-title').textContent = next.title;
    var thumbs = $('pd-thumbs');
    thumbs.hidden = p.images.length < 2;
    thumbs.innerHTML = p.images.map(function (img, k) {
      return '<button type="button" data-img="' + k + '" aria-label="' + esc(t('pd.show') + ' ' + img.caption) + '"><img src="' + esc(img.src) + '" alt="" loading="lazy"></button>';
    }).join('');
    setImage(p, keepImage ? Math.min(currentImg, p.images.length - 1) : 0);
    if (!keepImage) dialog.querySelector('.pd-inner').scrollTop = 0;
  }

  function openProject(id, push) {
    var i = base.findIndex(function (p) { return p.id === id; });
    if (i < 0) return;
    fill(i);
    if (!dialog.open) {
      lastFocus = document.activeElement;
      if (supportsDialog) dialog.showModal(); else dialog.setAttribute('open', '');
      document.body.classList.add('no-scroll');
      $('pd-close').focus();
    }
    if (push !== false) history.replaceState(null, '', location.pathname + location.search + '#project-' + id);
  }

  function closeProject() {
    if (!dialog.open) return;
    if (supportsDialog) dialog.close(); else { dialog.removeAttribute('open'); onClosed(); }
  }

  function onClosed() {
    document.body.classList.remove('no-scroll');
    if (location.hash.indexOf('#project-') === 0) history.replaceState(null, '', location.pathname + location.search + '#projects');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    current = -1;
  }
  dialog.addEventListener('close', onClosed);

  document.addEventListener('click', function (e) {
    var langBtn = e.target.closest('[data-lang]');
    if (langBtn) { applyLang(langBtn.getAttribute('data-lang'), true); return; }
    var opener = e.target.closest('[data-open]');
    if (opener) openProject(opener.getAttribute('data-open'));
  });
  $('pd-close').addEventListener('click', closeProject);
  dialog.addEventListener('click', function (e) { if (e.target === dialog) closeProject(); });
  $('pd-prev').addEventListener('click', function () { var n = base.length; openProject(base[(current - 1 + n) % n].id); });
  $('pd-next').addEventListener('click', function () { openProject(base[(current + 1) % base.length].id); });
  $('pd-thumbs').addEventListener('click', function (e) {
    var b = e.target.closest('[data-img]');
    if (b) setImage(project(current), Number(b.getAttribute('data-img')));
  });
  dialog.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { $('pd-next').click(); }
    if (e.key === 'ArrowLeft') { $('pd-prev').click(); }
  });

  /* ---------- Start ---------- */
  applyLang(initialLang(), false);

  function fromHash() {
    var m = location.hash.match(/^#project-([\w-]+)$/);
    if (m) openProject(m[1], false);
  }
  window.addEventListener('hashchange', fromHash);
  fromHash();

  /* ---------- Reveal on scroll ---------- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    each(items, function (el, k) {
      el.style.transitionDelay = (k % 3) * 70 + 'ms';
      io.observe(el);
    });
  } else {
    each(items, function (el) { el.classList.add('in'); });
  }
  revealReady = true;
})();
