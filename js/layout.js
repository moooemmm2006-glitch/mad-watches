/* =========================================================================
   MAD WATCHES — LAYOUT (navbar, footer and shared bits, on every page)
   -------------------------------------------------------------------------
   Every page has two empty placeholders:
       <header id="siteHeader" class="site-header"></header>
       <footer id="siteFooter" class="site-footer"></footer>
   This file fills them, so the navbar and footer are written ONCE, here.

   To add a link to the navbar: add a line to NAV_LINKS below.
   To change the announcement bar: edit STORE.announcement in js/products.js.

   Contents
     1. Navbar links
     2. Header (announcement + navbar + search panel)
     3. Footer (+ trust badges)
     4. Instant search
     5. Mobile menu, scroll style, language switch
     6. Live mini clocks
     7. Back-to-top button
     8. Intro animation (once per visit)
     9. Start
   ========================================================================= */


/* -------------------------------------------------------------------------
   1. NAVBAR LINKS
   ------------------------------------------------------------------------- */
const NAV_LINKS = [
  { id: "home",    href: "index.html",    key: "nav.home" },
  { id: "shop",    href: "products.html", key: "nav.shop" },
  { id: "brands",  href: "brands.html",   key: "nav.brands" },
  { id: "offers",  href: "offers.html",   key: "nav.offers" },
  { id: "about",   href: "about.html",    key: "nav.about" },
  { id: "contact", href: "contact.html",  key: "nav.contact" }
];

// Which link is highlighted: <body data-page="shop">
const CURRENT_PAGE = document.body.dataset.page || "";
const ACTIVE_LINK = CURRENT_PAGE === "product" ? "shop" : CURRENT_PAGE;


/* -------------------------------------------------------------------------
   2. HEADER
   ------------------------------------------------------------------------- */
// Small dial used in the navbar and footer (hands are moved by updateClocks)
function miniClockSVG() {
  let ticks = "";
  for (let i = 0; i < 12; i++) {
    const a = i * Math.PI / 6, r1 = 11.2, r2 = i % 3 === 0 ? 8.6 : 9.8;
    ticks += `M${(13 + r1 * Math.sin(a)).toFixed(2)} ${(13 - r1 * Math.cos(a)).toFixed(2)}L${(13 + r2 * Math.sin(a)).toFixed(2)} ${(13 - r2 * Math.cos(a)).toFixed(2)}`;
  }
  return `<svg viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-linecap="round" aria-hidden="true">
    <circle cx="13" cy="13" r="12.5" stroke-width="1"/>
    <path d="${ticks}" stroke-width=".8" opacity=".7"/>
    <line class="mc-hand mc-hour" x1="13" y1="13" x2="13" y2="7.6" stroke-width="1.5"/>
    <line class="mc-hand mc-min" x1="13" y1="13" x2="13" y2="4.6" stroke-width="1"/>
    <circle cx="13" cy="13" r="1.1" fill="currentColor" stroke="none"/>
  </svg>`;
}

function langSwitchHTML() {
  return `
    <div class="lang-switch" role="group" data-i18n-attr="aria-label:lang.label">
      <button type="button" data-set-lang="en" lang="en" aria-pressed="${currentLang === "en"}">EN</button>
      <span aria-hidden="true">|</span>
      <button type="button" data-set-lang="ar" lang="ar" aria-pressed="${currentLang === "ar"}">عربي</button>
    </div>`;
}

function renderHeader() {
  const header = document.getElementById("siteHeader");
  if (!header) return;
  header.classList.toggle("is-solid", document.body.dataset.header !== "transparent");

  header.innerHTML = `
    <a class="skip-link" href="#main" data-i18n="nav.skip"></a>
    <div class="announce" id="announceBar">
      <div class="announce__items" id="announce"></div>
      <div class="announce__social" data-social-icons></div>
    </div>
    <div class="nav">
      <div class="nav__inner container">
        <a class="nav__logo" href="index.html" data-i18n-attr="aria-label:nav.logoAlt">
          <img src="images/logo-120.png" srcset="images/logo-120.png 1x, images/logo-240.png 2x" width="233" height="120" alt="Mad Watches" />
        </a>

        <nav class="nav__menu" id="navMenu" data-i18n-attr="aria-label:nav.main">
          ${NAV_LINKS.map((link) => `<a class="nav__link" href="${link.href}" data-i18n="${link.key}"${link.id === ACTIVE_LINK ? ' aria-current="page"' : ""}></a>`).join("")}
          <div class="nav__menu-extra">
            ${langSwitchHTML()}
            <a class="icon-btn" href="wishlist.html" data-i18n-attr="aria-label:nav.wishlist">${icon("heart")}<span class="count-badge" data-wishlist-count>0</span></a>
          </div>
          <div class="nav__menu-social" data-social-icons></div>
        </nav>

        <div class="nav__actions">
          <button class="icon-btn" type="button" id="searchToggle" aria-expanded="false" aria-controls="searchPanel" data-i18n-attr="aria-label:nav.search">${icon("search")}</button>
          ${langSwitchHTML()}
          <a class="icon-btn nav-wishlist" href="wishlist.html" data-i18n-attr="aria-label:nav.wishlist"${CURRENT_PAGE === "wishlist" ? ' aria-current="page"' : ""}>${icon("heart")}<span class="count-badge" data-wishlist-count>0</span></a>
          <a class="icon-btn" href="cart.html" data-i18n-attr="aria-label:nav.cart"${CURRENT_PAGE === "cart" ? ' aria-current="page"' : ""}>${icon("bag")}<span class="count-badge" data-cart-count>0</span></a>
          <span class="mini-clock" data-clock="local" role="img">${miniClockSVG()}</span>
          <button class="nav__toggle" type="button" id="navToggle" aria-expanded="false" aria-controls="navMenu" data-i18n-attr="aria-label:nav.openMenu"><span></span><span></span></button>
        </div>
      </div>

      <div class="search-panel" id="searchPanel" inert>
        <div class="container">
          <form class="search-panel__form" role="search" action="products.html" method="get">
            ${icon("search")}
            <label class="visually-hidden" for="siteSearch" data-i18n="nav.search"></label>
            <input class="search-panel__input" id="siteSearch" name="q" type="search" autocomplete="off" data-i18n-attr="placeholder:search.placeholder" />
            <button class="icon-btn" type="button" id="searchClose" data-i18n-attr="aria-label:search.close">${icon("close")}</button>
          </form>
          <div class="search-results" id="searchResults" aria-live="polite"></div>
        </div>
      </div>
    </div>`;

  translatePage(header);
  renderAnnouncement();
}

// "EGP 100 off your first order | Cash on delivery" — from STORE.announcement
function renderAnnouncement() {
  const bar = document.getElementById("announce");
  const items = (STORE.announcement || []).map((a) => localized(a, "text")).filter(Boolean);
  document.getElementById("announceBar").hidden = items.length === 0;
  document.documentElement.style.setProperty("--announce-h", items.length ? "" : "0px");
  bar.innerHTML = items.map((text, i) => `<span class="announce__item${i === 0 ? " is-current" : ""}">${escapeHTML(text)}</span>`).join('<span class="announce__sep" aria-hidden="true">|</span>');

  // On phones only one message fits: show them one after another
  clearInterval(bar._timer);
  if (items.length > 1 && !reduceMotion) {
    let current = 0;
    bar._timer = setInterval(() => {
      const spans = bar.querySelectorAll(".announce__item");
      spans[current].classList.remove("is-current");
      current = (current + 1) % spans.length;
      spans[current].classList.add("is-current");
    }, 3500);
  }
}


/* -------------------------------------------------------------------------
   3. FOOTER
   ------------------------------------------------------------------------- */
const TRUST_BADGES = [
  { icon: "box",     title: "trust.packaging", text: "trust.packagingText" },
  { icon: "cash",    title: "trust.cod",      text: "trust.codText" },
  { icon: "truck",   title: "trust.fast",     text: "trust.fastText" },
  { icon: "refresh", title: "trust.exchange", text: "trust.exchangeText" }
];

function trustBadgesHTML() {
  return `<div class="trust">${TRUST_BADGES.map((b) => `
    <div class="trust__item">${icon(b.icon)}<strong data-i18n="${b.title}"></strong><span data-i18n="${b.text}"></span></div>`).join("")}</div>`;
}

function renderFooter() {
  const footer = document.getElementById("siteFooter");
  if (!footer) return;

  footer.innerHTML = `
    ${document.body.dataset.trust === "off" ? "" : trustBadgesHTML()}
    <div class="container footer__top">
      <div class="footer__brand">
        <a class="footer__logo" href="index.html" data-i18n-attr="aria-label:nav.logoAlt">
          <img src="images/logo-240.png" width="465" height="240" alt="Mad Watches" loading="lazy" />
        </a>
        <p class="footer__tagline" data-i18n="footer.tagline"></p>
        <p class="footer__follow" data-i18n="social.followUs"></p>
        <div class="socials" data-social-icons></div>
        <p class="footer__time"><span class="mini-clock" data-clock="cairo" role="img">${miniClockSVG()}</span><span><span data-i18n="footer.time"></span> · <time id="cairoTime" dir="ltr"></time></span></p>
      </div>

      <nav aria-labelledby="footShop">
        <h2 class="footer__title" id="footShop" data-i18n="footer.shop"></h2>
        <ul class="footer__links">
          <li><a href="products.html" data-i18n="footer.all"></a></li>
          <li><a href="products.html?sort=newest" data-i18n="footer.new"></a></li>
          <li><a href="offers.html" data-i18n="footer.offers"></a></li>
          <li><a href="brands.html" data-i18n="footer.brands"></a></li>
          <li><a href="index.html#quiz" data-i18n="footer.quiz"></a></li>
        </ul>
      </nav>

      <nav aria-labelledby="footHelp">
        <h2 class="footer__title" id="footHelp" data-i18n="footer.help"></h2>
        <ul class="footer__links">
          <li><a href="contact.html" data-i18n="nav.contact"></a></li>
          <li><a href="contact.html#faq" data-i18n="footer.faq"></a></li>
          <li><a href="about.html#promise" data-i18n="footer.shipping"></a></li>
          <li><a href="wishlist.html" data-i18n="nav.wishlist"></a></li>
          <li><a href="cart.html" data-i18n="nav.cart"></a></li>
        </ul>
      </nav>

      <div>
        <h2 class="footer__title" data-i18n="footer.contact"></h2>
        <ul class="footer__contact" id="footerContact"></ul>
      </div>
    </div>
    <div class="container footer__bottom">
      <span>&copy; ${new Date().getFullYear()} <span lang="en" dir="ltr">Mad Watches</span>. <span data-i18n="footer.rights"></span></span>
      <span data-i18n="footer.cod"></span>
    </div>`;

  translatePage(footer);
  renderFooterContact();
}

// Contact column: WhatsApp (no number shown), each social handle, email, hours
function renderFooterContact() {
  const list = document.getElementById("footerContact");
  if (!list) return;
  list.innerHTML = [
    `<li>${icon("whatsapp")}<a href="${chatLink()}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(t("social.ariaChat"))}">${t("social.chat")}</a></li>`,
    ...socialAccounts().map((s) => `<li>${icon(s.id)}<a href="${escapeHTML(s.url)}" target="_blank" rel="noopener noreferrer" dir="ltr"
        aria-label="${escapeHTML(t("social.ariaFollow", { name: t(s.name), handle: s.handle }))}">${escapeHTML(s.handle)}</a></li>`),
    `<li>${icon("mail")}<a href="mailto:${STORE.email}" dir="ltr">${escapeHTML(STORE.email)}</a></li>`,
    `<li>${icon("clock")}<span>${escapeHTML(storeHoursText())}</span></li>`
  ].join("");
}


/* -------------------------------------------------------------------------
   4. INSTANT SEARCH (suggestions while you type)
   ------------------------------------------------------------------------- */
function setupSearch() {
  const panel = document.getElementById("searchPanel");
  const toggle = document.getElementById("searchToggle");
  const input = document.getElementById("siteSearch");
  const results = document.getElementById("searchResults");
  let active = -1;

  function open() {
    panel.inert = false;
    panel.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    render();
    setTimeout(() => input.focus(), 60);
  }

  function close() {
    panel.classList.remove("is-open");
    panel.inert = true;
    toggle.setAttribute("aria-expanded", "false");
  }

  function suggestionHTML(p) {
    return `<a class="suggestion" href="${productUrl(p.id)}">
      <img src="${imageUrl(productImages(p)[0], 120)}" alt="" width="48" height="48" loading="lazy" onerror="${IMAGE_FALLBACK}" />
      <span><span class="suggestion__name">${escapeHTML(localized(p, "name"))}</span><br><span class="suggestion__meta">${escapeHTML(brandName(p.brand))}</span></span>
      <span class="suggestion__price">${formatPrice(p.price)}</span>
    </a>`;
  }

  function render() {
    const q = input.value.trim();
    active = -1;
    if (!q) {
      const popular = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);
      results.innerHTML = `
        <div><p class="search-results__title">${t("search.popular")}</p>${popular.map(suggestionHTML).join("")}</div>
        <div><p class="search-results__title">${t("search.brands")}</p><div style="display:flex;flex-wrap:wrap;gap:.4rem">${BRANDS.slice(0, 10).map((b) => `<a class="chip" href="${brandShopUrl(b.id)}">${escapeHTML(localized(b, "name"))}</a>`).join("")}</div></div>`;
      return;
    }
    const found = searchCatalog(q, 6);
    if (!found.products.length && !found.brands.length) {
      results.innerHTML = `<p class="search-empty">${escapeHTML(t("search.empty", { q }))}</p>`;
      return;
    }
    results.innerHTML = `
      <div>
        ${found.products.length ? `<p class="search-results__title">${t("search.watches")}</p>${found.products.map(suggestionHTML).join("")}` : ""}
        <a class="link" style="margin-top:1rem" href="${shopUrl({ q })}">${t("search.all")} ${icon("arrow")}</a>
      </div>
      <div>${found.brands.length ? `<p class="search-results__title">${t("search.brands")}</p>${found.brands.map((b) => `
        <a class="suggestion" href="${brandShopUrl(b.id)}"><span class="suggestion__name">${escapeHTML(localized(b, "name"))}</span><span class="suggestion__meta" style="margin-inline-start:auto">${escapeHTML(localized(b, "origin"))}</span></a>`).join("")}` : ""}</div>`;
  }

  toggle.addEventListener("click", () => (panel.classList.contains("is-open") ? close() : open()));
  document.getElementById("searchClose").addEventListener("click", close);
  input.addEventListener("input", render);

  // Arrow keys move through the suggestions
  input.addEventListener("keydown", (e) => {
    const items = [...results.querySelectorAll(".suggestion")];
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!items.length) return;
      active = (active + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      items.forEach((el, i) => el.classList.toggle("is-active", i === active));
    } else if (e.key === "Enter" && active >= 0 && items[active]) {
      e.preventDefault();
      window.location.href = items[active].href;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.classList.contains("is-open")) { close(); toggle.focus(); }
    // "/" opens the search from anywhere (like many shops)
    if (e.key === "/" && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); open(); }
  });
  document.addEventListener("click", (e) => {
    if (panel.classList.contains("is-open") && !e.target.closest("#searchPanel, #searchToggle")) close();
  });
  document.addEventListener("languagechange", () => { if (panel.classList.contains("is-open")) render(); });
}


/* -------------------------------------------------------------------------
   5. MOBILE MENU, SCROLL STYLE, LANGUAGE SWITCH
   ------------------------------------------------------------------------- */
function setupNav() {
  const header = document.getElementById("siteHeader");
  const menu = document.getElementById("navMenu");
  const toggle = document.getElementById("navToggle");

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function setMenu(open) {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", t(open ? "nav.closeMenu" : "nav.openMenu"));
    lockScroll(open);
  }
  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) setMenu(false);
  });

  // EN | عربي (there are two switches: navbar + mobile menu)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-set-lang]");
    if (btn && btn.dataset.setLang !== currentLang) setLanguage(btn.dataset.setLang, true);
  });
}


/* -------------------------------------------------------------------------
   6. LIVE MINI CLOCKS (navbar = visitor's time, footer = Cairo time)
   ------------------------------------------------------------------------- */
function timeParts(timeZone) {
  const now = new Date();
  if (!timeZone) return { h: now.getHours(), m: now.getMinutes(), s: now.getSeconds() };
  try {
    const parts = new Intl.DateTimeFormat("en-GB", { timeZone, hour: "numeric", minute: "numeric", second: "numeric", hourCycle: "h23" }).formatToParts(now);
    const get = (type) => Number((parts.find((x) => x.type === type) || {}).value || 0);
    return { h: get("hour"), m: get("minute"), s: get("second") };
  } catch (err) {
    return { h: now.getHours(), m: now.getMinutes(), s: now.getSeconds() };
  }
}

function updateClocks() {
  document.querySelectorAll(".mini-clock").forEach((clock) => {
    const time = timeParts(clock.dataset.clock === "cairo" ? "Africa/Cairo" : null);
    const m = time.m + time.s / 60;
    const h = (time.h % 12) + m / 60;
    clock.querySelector(".mc-hour").style.transform = `rotate(${h * 30}deg)`;
    clock.querySelector(".mc-min").style.transform = `rotate(${m * 6}deg)`;
    const label = String(time.h).padStart(2, "0") + ":" + String(time.m).padStart(2, "0");
    clock.setAttribute("aria-label", t(clock.dataset.clock === "cairo" ? "footer.time" : "nav.time") + " " + label);
    if (clock.dataset.clock === "cairo") {
      const out = document.getElementById("cairoTime");
      if (out) out.textContent = label;
    }
  });
}


/* -------------------------------------------------------------------------
   7. BACK-TO-TOP (the ring fills as you scroll down the page)
   ------------------------------------------------------------------------- */
function setupBackToTop() {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "to-top";
  btn.setAttribute("data-i18n-attr", "aria-label:common.backToTop");   // re-translated on language change
  btn.setAttribute("aria-label", t("common.backToTop"));
  btn.innerHTML = `<svg class="to-top__ring" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="23"/></svg>${icon("up")}`;
  document.body.appendChild(btn);

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      btn.style.setProperty("--progress", max > 0 ? (window.scrollY / max).toFixed(3) : 0);
      btn.classList.toggle("is-visible", window.scrollY > 700);
      ticking = false;
    });
  }, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
}


/* -------------------------------------------------------------------------
   7b. WHATSAPP + SOCIAL ICONS
   - Every element with data-social-icons gets the round icons
     (navbar on desktop, mobile menu, footer), built from STORE.
   - A floating "Chat with us" WhatsApp button on every page: bottom-right
     (bottom-left in Arabic). The back-to-top button sits just above it.
   ------------------------------------------------------------------------- */
function renderSocialIcons() {
  document.querySelectorAll("[data-social-icons]").forEach((box) => {
    box.innerHTML = socialIconsHTML();
    box.setAttribute("aria-label", t("social.followUs"));
    box.setAttribute("role", "group");
  });
}

function setupWhatsappButton() {
  const fab = document.createElement("a");
  fab.className = "wa-fab";
  fab.target = "_blank";
  fab.rel = "noopener noreferrer";
  fab.innerHTML = `<span class="wa-fab__pulse" aria-hidden="true"></span>${icon("whatsapp")}<span class="wa-fab__tip" aria-hidden="true"></span>`;
  document.body.appendChild(fab);
  renderWhatsappButton();

  // once per visit, the "Chat with us" label shows by itself for a few seconds
  let seen = false;
  try { seen = !!sessionStorage.getItem("madwatches-chat-hint"); } catch (err) { /* ignore */ }
  if (!seen) {
    setTimeout(() => fab.classList.add("is-hinting"), 3500);
    setTimeout(() => fab.classList.remove("is-hinting"), 8000);
    try { sessionStorage.setItem("madwatches-chat-hint", "1"); } catch (err) { /* ignore */ }
  }
}

function renderWhatsappButton() {
  const fab = document.querySelector(".wa-fab");
  if (!fab) return;
  fab.href = chatLink();
  fab.setAttribute("aria-label", t("social.ariaChat"));
  fab.querySelector(".wa-fab__tip").textContent = t("social.chatShort");
}

/* -------------------------------------------------------------------------
   8. INTRO ANIMATION
   The logo's dial ticks draw in a circle, the logo appears, then it fades
   into the site. Shown once per visit (not again until the browser is
   reopened), and never for visitors who prefer reduced motion.
   ------------------------------------------------------------------------- */
function runIntro() {
  const html = document.documentElement;
  if (!html.classList.contains("intro-pending")) return;

  let ticks = "";
  for (let i = 0; i < 60; i++) {
    const a = i * Math.PI / 30, hour = i % 5 === 0;
    const r1 = 104, r2 = hour ? 90 : 97;
    ticks += `<line class="intro__tick${hour ? " intro__tick--hour" : ""}" style="--i:${i}" pathLength="1"
      x1="${(r1 * Math.sin(a)).toFixed(2)}" y1="${(-r1 * Math.cos(a)).toFixed(2)}" x2="${(r2 * Math.sin(a)).toFixed(2)}" y2="${(-r2 * Math.cos(a)).toFixed(2)}"/>`;
  }
  const intro = document.createElement("div");
  intro.className = "intro";
  intro.setAttribute("aria-hidden", "true");
  intro.innerHTML = `<div class="intro__dial"><svg viewBox="-112 -112 224 224">${ticks}</svg>
    <img class="intro__logo" src="images/logo-240.png" alt="" width="465" height="240" /></div>`;
  document.body.appendChild(intro);
  html.classList.remove("intro-pending");
  try { sessionStorage.setItem("madwatches-intro", "1"); } catch (err) { /* ignore */ }

  const finish = () => {
    intro.classList.add("is-done");
    setTimeout(() => intro.remove(), 800);
  };
  setTimeout(finish, 1700);
  intro.addEventListener("click", finish);   // tap to skip
}


/* -------------------------------------------------------------------------
   9. START
   ------------------------------------------------------------------------- */
renderHeader();
renderFooter();
runIntro();
setupNav();
setupSearch();
setupBackToTop();
setupWhatsappButton();
renderSocialIcons();
updateCartBadges();
updateWishlistBadges();
updateClocks();
setInterval(updateClocks, 15000);

document.addEventListener("languagechange", () => {
  renderAnnouncement();
  renderFooterContact();
  renderSocialIcons();
  renderWhatsappButton();
  updateClocks();
  document.getElementById("navToggle").setAttribute("aria-label", t(document.getElementById("navMenu").classList.contains("is-open") ? "nav.closeMenu" : "nav.openMenu"));
});

translatePage(document);
observeReveals(document);
