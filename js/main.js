/* =========================================================================
   MAD WATCHES — SHARED HELPERS (loaded on every page)
   -------------------------------------------------------------------------
   You normally don't need to edit this file. Products and store details
   live in js/products.js, and all text lives in js/i18n.js.

   Script order on every page:
     products.js → i18n.js → main.js → cart.js → wishlist.js → layout.js → page script

   Contents
     1.  Line icons
     2.  Products: prices, discounts, stock, images, links
     3.  WhatsApp
     4.  Product card + price
     5.  Toast messages
     6.  Modals (open / close / focus) + quick view
     7.  Search (used by the navbar and the shop page)
     8.  Scroll reveal
     9.  Page title, description, Google data (SEO)
     10. Buttons that work on every page (add to cart, wishlist, compare, quick view)
   ========================================================================= */


/* -------------------------------------------------------------------------
   1. LINE ICONS (thin strokes, like the logo)
   icon("heart") returns the SVG as text.
   ------------------------------------------------------------------------- */
const ICONS = {
  search:   '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.4-4.4"/>',
  heart:    '<path class="icon-heart" d="M12 20s-7.5-4.6-7.5-10.1A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20Z"/>',
  bag:      '<path d="M5.5 8h13l-1 12.5h-11L5.5 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
  eye:      '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.8"/>',
  compare:  '<path d="M7 4v16M17 4v16M3.5 8.5 7 4l3.5 4.5M13.5 15.5 17 20l3.5-4.5"/>',
  close:    '<path d="M6 6l12 12M18 6 6 18"/>',
  arrow:    '<path d="M5 12h14M13 6l6 6-6 6"/>',
  chevron:  '<path d="m9 6 6 6-6 6"/>',
  chevronL: '<path d="m15 6-6 6 6 6"/>',
  up:       '<path d="M12 19V5M6 11l6-6 6 6"/>',
  whatsapp: '<path d="M20 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20l1.1-3.9A8.4 8.4 0 1 1 20 11.6Z"/><path d="M9 8.6c0 3.4 3 6.4 6.4 6.4l1-1.5-2-1-1 .8a4.4 4.4 0 0 1-2.2-2.2l.8-1-1-2-1.5 1Z"/>',
  instagram:'<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6"/>',
  tiktok:   '<path d="M13.6 3.5v11.3a3.6 3.6 0 1 1-3.6-3.6"/><path d="M13.6 3.5c.5 2.5 2.3 4.2 4.9 4.4"/>',
  facebook: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><path d="M15.4 7.8h-1.5c-1.3 0-2 .8-2 2.1v10.6M9.6 13h5.2"/>',
  mail:     '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
  pin:      '<path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock:    '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.2 2"/>',
  shield:   '<path d="M12 3 5 6v5.5c0 4.3 3 7.8 7 9.5 4-1.7 7-5.2 7-9.5V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
  award:    '<circle cx="12" cy="9" r="5.5"/><path d="m8.5 13.3-1.5 7.2 5-2.7 5 2.7-1.5-7.2"/>',
  cash:     '<rect x="2.5" y="6.5" width="19" height="11" rx="1.5"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5v5M18 9.5v5"/>',
  truck:    '<path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  refresh:  '<path d="M19.5 8.5A8 8 0 0 0 5 7.4M4.5 15.5A8 8 0 0 0 19 16.6"/><path d="M19.8 4v4.6h-4.6M4.2 20v-4.6h4.6"/>',
  box:      '<path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z"/><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9"/>',
  gift:     '<rect x="3.5" y="8" width="17" height="4"/><path d="M5 12v8.5h14V12M12 8v12.5M12 8S10.5 3.5 8 4.2 8.5 8 12 8Zm0 0s1.5-4.5 4-3.8S15.5 8 12 8Z"/>',
  drop:     '<path d="M12 3.5S6 10.2 6 14a6 6 0 0 0 12 0c0-3.8-6-10.5-6-10.5Z"/>',
  gear:     '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
  ruler:    '<path d="M3.5 15.5 15.5 3.5l5 5-12 12-5-5Z"/><path d="m7 12 2 2M10 9l1.5 1.5M13 6l2 2"/>',
  diamond:  '<path d="M6 4h12l3 5-9 11L3 9l3-5Z"/><path d="M3 9h18M12 20 8.5 9 12 4l3.5 5L12 20"/>',
  sun:      '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.2 5.2 7 7M17 17l1.8 1.8M5.2 18.8 7 17M17 7l1.8-1.8"/>',
  chrono:   '<circle cx="12" cy="13" r="7.5"/><path d="M12 13V9M10 2.5h4M18.5 6l1.3-1.3"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15" rx="1.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>',
  moon:     '<path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5Z"/>',
  phone:    '<rect x="6.5" y="2.5" width="11" height="19" rx="2"/><path d="M11 18.5h2"/>',
  filter:   '<path d="M4 6h16M7 12h10M10 18h4"/>',
  copy:     '<rect x="8.5" y="8.5" width="12" height="12" rx="1.5"/><path d="M15.5 8.5v-3a1.5 1.5 0 0 0-1.5-1.5H5A1.5 1.5 0 0 0 3.5 5.5V14A1.5 1.5 0 0 0 5 15.5h3.5"/>',
  check:    '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  dial:     '<circle cx="12" cy="12" r="8.5"/><path d="M12 4.5v1.5M12 18v1.5M4.5 12H6M18 12h1.5M12 12l-2.6-2.8M12 12l4.2-2.4"/>',
  user:     '<circle cx="12" cy="8" r="3.8"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>',
  grid2:    '<rect x="4" y="4" width="7" height="16"/><rect x="13" y="4" width="7" height="16"/>',
  grid3:    '<rect x="3" y="4" width="5" height="16"/><rect x="9.5" y="4" width="5" height="16"/><rect x="16" y="4" width="5" height="16"/>',
  grid4:    '<rect x="2.5" y="4" width="3.8" height="16"/><rect x="7.4" y="4" width="3.8" height="16"/><rect x="12.3" y="4" width="3.8" height="16"/><rect x="17.2" y="4" width="3.8" height="16"/>'
};

function icon(name, extraClass) {
  return `<svg class="icon${extraClass ? " " + extraClass : ""}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ""}</svg>`;
}

// true if the visitor asked their device for less motion
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Makes text safe to put inside HTML
function escapeHTML(text) {
  return String(text === undefined || text === null ? "" : text).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

function lockScroll(lock) {
  document.body.classList.toggle("no-scroll", lock);
}


/* -------------------------------------------------------------------------
   2. PRODUCTS: PRICES, DISCOUNTS, STOCK, IMAGES, LINKS
   ------------------------------------------------------------------------- */

// 720000 → "EGP 720,000" (English) or "720,000 ج.م" (Arabic)
function formatPrice(amount) {
  const number = Math.round(Number(amount) || 0).toLocaleString("en-US");
  return currentLang === "ar" ? number + " ج.م" : STORE.currency + " " + number;
}

function getBrand(brandId) {
  return BRANDS.find((b) => b.id === brandId);
}

function getProduct(productId) {
  return PRODUCTS.find((p) => p.id === productId);
}

// Brand name in the current language ("rolex" → "Rolex" / "رولكس")
function brandName(brandId) {
  return localized(getBrand(brandId), "name") || brandId;
}

// "Rolex Submariner Date"
function productTitle(p) {
  return brandName(p.brand) + " " + localized(p, "name");
}

// Discount in % (calculated automatically from originalPrice and price)
function discountPercent(p) {
  return p.originalPrice > p.price ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
}

function savingAmount(p) {
  return p.originalPrice > p.price ? p.originalPrice - p.price : 0;
}

// "in" | "low" (3 or fewer left) | "out"
function stockState(p) {
  if (p.inStock === false || p.stockCount === 0) return "out";
  if (typeof p.stockCount === "number" && p.stockCount <= 3) return "low";
  return "in";
}

function isInStock(p) {
  return stockState(p) !== "out";
}

function stockLabel(p) {
  const state = stockState(p);
  if (state === "out") return t("common.outOfStock");
  if (state === "low") return t("common.lowStock", { n: p.stockCount });
  return t("common.inStock");
}

// All photos of a product (works with the old "image" field too)
function productImages(p) {
  const list = Array.isArray(p.images) ? p.images.filter(Boolean) : [];
  if (p.image && !list.includes(p.image)) list.unshift(p.image);
  return list.length ? list : ["images/placeholder.svg"];
}

// Unsplash photos can be resized through the link. Local photos are used as they are.
function imageUrl(src, width) {
  if (!/images\.unsplash\.com/.test(src)) return src;
  return src.replace(/([?&])w=\d+/, "$1w=" + width).replace(/([?&])h=\d+/, "$1h=" + width);
}

function imageSrcset(src) {
  if (!/images\.unsplash\.com/.test(src)) return "";
  return [320, 480, 800, 1200].map((w) => imageUrl(src, w) + " " + w + "w").join(", ");
}

// If a photo can't load, show the placeholder
const IMAGE_FALLBACK = "this.onerror=null;this.srcset='';this.src='images/placeholder.svg'";

// <img> tag for a product photo
function productImg(src, alt, opts) {
  opts = opts || {};
  const srcset = imageSrcset(src);
  return `<img src="${imageUrl(src, opts.width || 800)}"${srcset ? ` srcset="${srcset}" sizes="${opts.sizes || "(max-width: 759px) 50vw, 300px"}"` : ""}
    alt="${escapeHTML(alt)}" width="800" height="800" ${opts.eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" onerror="${IMAGE_FALLBACK}" />`;
}

// Links
function productUrl(id) { return "product.html?id=" + encodeURIComponent(id); }
function shopUrl(params) {
  const q = new URLSearchParams(params || {}).toString();
  return "products.html" + (q ? "?" + q : "");
}
function brandShopUrl(brandId) { return shopUrl({ brand: brandId }); }

// Translated labels for product attributes ("diver" → "Diver" / "غوص")
function optionLabel(group, value) {
  return t(group + "." + value);
}

// Specs in the current language (Arabic values fall back to English)
function productSpecs(p) {
  const specs = Object.assign({}, p.specs || {});
  if (currentLang === "ar" && p.specs_ar) Object.assign(specs, p.specs_ar);
  return specs;
}


/* -------------------------------------------------------------------------
   3. WHATSAPP
   ------------------------------------------------------------------------- */
function whatsappLink(message) {
  return "https://wa.me/" + STORE.whatsapp + (message ? "?text=" + encodeURIComponent(message) : "");
}

// "Chat with us" link with a polite first message in the current language
function chatLink() {
  return whatsappLink(t("wa.ask"));
}

/* ---------- Social platforms (all from STORE in js/products.js) ----------
   A platform whose link is "" in STORE is skipped everywhere automatically. */
const SOCIAL_PLATFORMS = [
  { id: "instagram", name: "social.instagram", text: "social.igText" },
  { id: "tiktok",    name: "social.tiktok",    text: "social.ttText" },
  { id: "facebook",  name: "social.facebook",  text: "social.fbText" }
];

// "https://www.instagram.com/madwatches1/" → "@madwatches1"
function socialHandle(url) {
  const last = String(url).replace(/[?#].*$/, "").replace(/\/+$/, "").split("/").pop();
  if (!last || last.includes(".php")) return STORE.name;   // e.g. facebook.com/profile.php?id=…
  return last.startsWith("@") ? last : "@" + last;
}

// The platforms that have a link, with their handle
function socialAccounts() {
  return SOCIAL_PLATFORMS
    .filter((s) => /^https?:\/\//.test(STORE[s.id] || ""))
    .map((s) => Object.assign({}, s, { url: STORE[s.id], handle: socialHandle(STORE[s.id]) }));
}

// Round icon links: WhatsApp first (optional), then every social platform
function socialIconsHTML(opts) {
  opts = opts || {};
  const links = [];
  if (opts.whatsapp !== false) {
    links.push(`<a class="social-link social-link--whatsapp" href="${chatLink()}" target="_blank" rel="noopener noreferrer"
      aria-label="${escapeHTML(t("social.ariaChat"))}" title="${escapeHTML(t("social.chat"))}">${icon("whatsapp")}</a>`);
  }
  socialAccounts().forEach((s) => {
    links.push(`<a class="social-link" href="${escapeHTML(s.url)}" target="_blank" rel="noopener noreferrer"
      aria-label="${escapeHTML(t("social.ariaFollow", { name: t(s.name), handle: s.handle }))}" title="${escapeHTML(t(s.name))}">${icon(s.id)}</a>`);
  });
  return links.join("");
}

/* ---------- Working hours (STORE.hours in js/products.js) ---------- */
// "Open 24/7" / "متاحين 24 ساعة، كل أيام الأسبوع", or your own text
function storeHoursText() {
  if (STORE.hours === "24/7") return t("hours.always");
  return typeof STORE.hours === "object" ? localized(STORE.hours, "text") : String(STORE.hours || "");
}

// "Mo-Su 00:00-23:59" → Google's opening-hours format
function openingHoursSpec() {
  const m = /^(\w\w)-(\w\w) (\d\d:\d\d)-(\d\d:\d\d)$/.exec(STORE.openingHours || "");
  if (!m) return null;
  const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  return {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": NAMES.slice(DAYS.indexOf(m[1]), DAYS.indexOf(m[2]) + 1),
    "opens": m[3],
    "closes": m[4]
  };
}

/* ---------- Real customer reviews ----------
   No ratings or written reviews on the site: the real ones are in the
   Instagram highlights. Shows a line of text, a button to Instagram and,
   only if STORE.reviewVideo has a link, that one Instagram video. */
function reviewVideoUrl() {
  const url = String(STORE.reviewVideo || "").trim();
  return /^https:\/\/(www\.)?instagram\.com\/(p|reel|reels|tv)\/[\w-]+/.test(url) ? url : "";
}

// A video file on the site itself (e.g. "videos/customer-review-1.mp4")
function reviewVideoFile() {
  const src = String(STORE.reviewVideo || "").trim();
  return /\.(mp4|webm)$/i.test(src) ? src : "";
}

function realReviewsHTML() {
  const video = reviewVideoUrl();
  const file = reviewVideoFile();
  const poster = STORE.reviewVideoPoster ? ` poster="${escapeHTML(STORE.reviewVideoPoster)}"` : "";
  return `
    <p class="real-reviews__text">${t("reviews.text")}</p>
    ${STORE.instagram ? `<a class="btn real-reviews__btn" href="${escapeHTML(STORE.instagram)}" target="_blank" rel="noopener noreferrer"
      aria-label="${escapeHTML(t("reviews.cta") + " " + t("social.newTab"))}">${icon("instagram")}<span>${t("reviews.cta")}</span></a>` : ""}
    ${video ? `<div class="review-video">
      <blockquote class="instagram-media" data-instgrm-permalink="${escapeHTML(video)}" data-instgrm-version="14">
        <a href="${escapeHTML(video)}" target="_blank" rel="noopener noreferrer">${t("reviews.watch")}</a>
      </blockquote>
    </div>` : ""}
    ${file ? `<div class="review-video review-video--file">
      <video controls playsinline preload="none"${poster} src="${escapeHTML(file)}" aria-label="${escapeHTML(t("reviews.video"))}"></video>
    </div>` : ""}`;
}

// Fills every [data-real-reviews] box; the Instagram script loads only when the video is near the screen
function renderRealReviews(root) {
  (root || document).querySelectorAll("[data-real-reviews]").forEach((box) => {
    box.innerHTML = realReviewsHTML();
    const video = box.querySelector(".review-video .instagram-media");   // only Instagram needs its script
    if (!video) return;
    if (!("IntersectionObserver" in window)) return loadInstagramEmbed();
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { io.disconnect(); loadInstagramEmbed(); }
    }, { rootMargin: "300px" });
    io.observe(video);
  });
}

function loadInstagramEmbed() {
  if (window.instgrm && window.instgrm.Embeds) return window.instgrm.Embeds.process();
  if (document.getElementById("instagram-embed")) return;
  const script = document.createElement("script");
  script.id = "instagram-embed";
  script.async = true;
  script.src = "https://www.instagram.com/embed.js";
  document.body.appendChild(script);
}

// Short message about one product (cards, product page, quick view)
function productMessage(p, qty) {
  qty = qty || 1;
  const discount = discountPercent(p);
  const lines = [
    t("wa.hello", { store: STORE.name }),
    t("wa.interest"),
    "",
    "• " + productTitle(p) + (p.model ? " (" + t("common.ref") + " " + p.model + ")" : ""),
    "  " + (qty > 1 ? qty + " × " : "") + formatPrice(p.price) + (discount ? "  (" + t("wa.off", { n: discount }) + ", " + t("wa.was") + " " + formatPrice(p.originalPrice) + ")" : ""),
    "",
    t(isInStock(p) ? "wa.available" : "wa.whenAvailable")
  ];
  return lines.join("\n");
}


/* -------------------------------------------------------------------------
   4. PRODUCT CARD + PRICE
   ------------------------------------------------------------------------- */
// New price big, old price struck through
function priceHTML(p, large) {
  const old = p.originalPrice > p.price
    ? `<s class="price__old"><span class="visually-hidden">${t("wa.was")} </span>${formatPrice(p.originalPrice)}</s>` : "";
  return `<div class="price${large ? " price--lg" : ""}"><span class="price__now">${formatPrice(p.price)}</span>${old}</div>`;
}

function productCardHTML(p, index, opts) {
  opts = opts || {};
  const name = localized(p, "name");
  const brand = brandName(p.brand);
  const images = productImages(p);
  const discount = discountPercent(p);
  const state = stockState(p);
  const wished = typeof isWished === "function" && isWished(p.id);
  const compared = typeof isCompared === "function" && isCompared(p.id);

  const badges = [
    discount ? `<span class="badge" dir="ltr">-${discount}%</span>` : "",
    p.isNew ? `<span class="badge badge--outline">${t("common.new")}</span>` : "",
    state === "out" ? `<span class="badge badge--outline">${t("common.outOfStock")}</span>` : ""
  ].join("");

  return `
    <article class="card${opts.noReveal ? "" : " reveal"}${opts.enter ? " is-entering" : ""}" data-id="${p.id}"
      style="--delay:${opts.enter ? Math.min(opts.enterIndex || 0, 11) * 0.04 : ((index || 0) % 4) * 0.07}s">
      <a class="card__media" href="${productUrl(p.id)}" tabindex="-1" aria-hidden="true">
        ${productImg(images[0], brand + " " + name, { sizes: opts.sizes, eager: opts.eager })}
        ${images[1] ? `<img src="${imageUrl(images[1], 480)}" alt="" width="480" height="480" loading="lazy" decoding="async" onerror="this.remove()" />` : ""}
        <span class="card__badges">${badges}</span>
        ${opts.ribbon && discount ? `<span class="ribbon">${t("common.limited")}</span>` : ""}
      </a>
      <div class="card__tools">
        <button class="card__tool" type="button" data-wishlist="${p.id}" aria-pressed="${wished}" aria-label="${t(wished ? "common.wishRemove" : "common.wishAdd")}: ${escapeHTML(name)}">${icon("heart")}</button>
        <button class="card__tool card__tool--hover" type="button" data-compare="${p.id}" aria-pressed="${compared}" aria-label="${t("common.compare")}: ${escapeHTML(name)}">${icon("compare")}</button>
        <button class="card__tool card__tool--hover card__tool--quick" type="button" data-quick-view="${p.id}" aria-label="${t("common.quickView")}: ${escapeHTML(name)}">${icon("eye")}</button>
      </div>
      <div class="card__body">
        <p class="card__brand">${escapeHTML(brand)}</p>
        <h3 class="card__name"><a href="${productUrl(p.id)}">${escapeHTML(name)}</a></h3>
        ${priceHTML(p)}
        <div class="card__actions">
          <button class="btn btn--small" type="button" data-add-to-cart="${p.id}" ${state === "out" ? "disabled" : ""}>
            ${t(state === "out" ? "common.outOfStock" : "common.addToCart")}
          </button>
        </div>
      </div>
    </article>`;
}

// Grey placeholder cards shown while a grid is being built
function skeletonCards(n) {
  return Array.from({ length: n }, () =>
    `<div class="skeleton-card" aria-hidden="true"><div class="skeleton skeleton-card__img"></div><div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line"></div></div>`
  ).join("");
}

/* ---------- Empty catalog: "Coming soon" ----------
   While PRODUCTS in js/products.js has no watches yet, the shop, offers,
   brands and home sections show this message instead of empty grids. */
function catalogIsEmpty() {
  return PRODUCTS.length === 0;
}

// Only the brands that have at least one watch (brand strip, brands page, filters)
function stockedBrands() {
  return BRANDS.filter((b) => PRODUCTS.some((p) => p.brand === b.id));
}

function comingSoonHTML() {
  const instagram = socialAccounts().find((s) => s.id === "instagram");
  return `
    <div class="empty coming-soon">
      ${icon("clock")}
      <p class="empty__title">${t("soon.title")}</p>
      <p class="lead">${t("soon.text")}</p>
      <div class="cta__actions">
        ${instagram ? `<a class="btn" href="${escapeHTML(instagram.url)}" target="_blank" rel="noopener noreferrer">${t("soon.follow")}</a>` : ""}
        <a class="btn btn--ghost" href="${chatLink()}" target="_blank" rel="noopener noreferrer">${t("social.chat")}</a>
      </div>
    </div>`;
}


/* -------------------------------------------------------------------------
   5. TOAST MESSAGES
   showToast("Saved!", { icon: "check", link: { href: "cart.html", label: "View cart" } })
   ------------------------------------------------------------------------- */
function showToast(text, opts) {
  opts = opts || {};
  let box = document.getElementById("toasts");
  if (!box) {
    box = document.createElement("div");
    box.id = "toasts";
    box.className = "toasts";
    box.setAttribute("role", "status");
    box.setAttribute("aria-live", "polite");
    document.body.appendChild(box);
  }
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = icon(opts.icon || "check") + `<span>${escapeHTML(text)}</span>` +
    (opts.link ? `<a href="${opts.link.href}">${escapeHTML(opts.link.label)}</a>` : "");
  box.appendChild(toast);
  while (box.children.length > 3) box.firstElementChild.remove();
  setTimeout(() => {
    toast.classList.add("is-leaving");
    setTimeout(() => toast.remove(), 400);
  }, opts.duration || 2800);
}


/* -------------------------------------------------------------------------
   6. MODALS
   Any element with class="modal" can be opened with openModal(element).
   Close: the × button, clicking the backdrop, or Escape.
   ------------------------------------------------------------------------- */
const openModals = [];

function createModal(id, boxClass) {
  let modal = document.getElementById(id);
  if (modal) return modal;
  modal = document.createElement("div");
  modal.className = "modal";
  modal.id = id;
  modal.inert = true;
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="modal__backdrop" data-close-modal></div>
    <div class="modal__box ${boxClass || ""}" role="dialog" aria-modal="true">
      <button class="icon-btn modal__close" type="button" data-close-modal aria-label="${t("common.close")}">${icon("close")}</button>
      <div class="modal__content"></div>
    </div>`;
  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close-modal]")) closeModal(modal);
  });
  document.body.appendChild(modal);
  return modal;
}

function openModal(modal, focusSelector) {
  modal._lastFocus = document.activeElement;
  modal.inert = false;
  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("is-open");
  if (!openModals.includes(modal)) openModals.push(modal);
  lockScroll(true);
  const target = (focusSelector && modal.querySelector(focusSelector)) || modal.querySelector(".modal__close");
  if (target) setTimeout(() => target.focus(), 50);
}

function closeModal(modal) {
  if (!modal || !modal.classList.contains("is-open")) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  modal.inert = true;
  openModals.splice(openModals.indexOf(modal), 1);
  if (!openModals.length) lockScroll(false);
  if (modal._lastFocus && modal._lastFocus.focus) modal._lastFocus.focus();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && openModals.length) closeModal(openModals[openModals.length - 1]);
});

/* ---------- Quick view ---------- */
function openQuickView(productId) {
  const p = getProduct(productId);
  if (!p) return;
  const modal = createModal("quickView");
  const name = localized(p, "name");
  const state = stockState(p);
  const discount = discountPercent(p);
  modal.querySelector(".modal__box").setAttribute("aria-label", t("common.quickView") + ": " + name);
  modal.querySelector(".modal__content").innerHTML = `
    <div class="quick">
      <div class="quick__media">${productImg(productImages(p)[0], brandName(p.brand) + " " + name, { sizes: "(max-width: 759px) 100vw, 460px", eager: true })}</div>
      <div class="quick__info">
        <a class="eyebrow" href="${brandShopUrl(p.brand)}">${escapeHTML(brandName(p.brand))}</a>
        <h2 class="quick__name">${escapeHTML(name)}</h2>
        <div>${priceHTML(p, true)}${discount ? `<p class="price-block__save"><span class="badge" dir="ltr">-${discount}%</span> ${t("common.save", { amount: formatPrice(savingAmount(p)) })}</p>` : ""}</div>
        <span class="stock stock--${state}">${stockLabel(p)}</span>
        <p class="quick__desc">${escapeHTML(localized(p, "description"))}</p>
        <div class="quick__actions">
          <button class="btn" type="button" data-add-to-cart="${p.id}" ${state === "out" ? "disabled" : ""}>${icon("bag")}${t(state === "out" ? "common.outOfStock" : "common.addToCart")}</button>
          <a class="btn btn--ghost" href="${whatsappLink(productMessage(p))}" target="_blank" rel="noopener noreferrer">${icon("whatsapp")}${t(state === "out" ? "product.askWhatsapp" : "common.orderWhatsapp")}</a>
          <a class="link" href="${productUrl(p.id)}">${t("common.seeProduct")} ${icon("arrow")}</a>
        </div>
      </div>
    </div>`;
  openModal(modal);
}


/* -------------------------------------------------------------------------
   7. SEARCH (navbar suggestions + shop search box)
   Matches English and Arabic names, brands, models and styles.
   ------------------------------------------------------------------------- */

// Lowercase, no accents, Arabic letter variants unified (أ إ آ → ا, ة → ه, ى → ي)
function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[ً-ْـ]/g, "")
    .replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي")
    .replace(/[^a-z0-9؀-ۿ]+/g, " ")
    .trim();
}

// Text that a product can be found by
function productSearchText(p) {
  const b = getBrand(p.brand) || {};
  return normalizeText([
    p.name, p.name_ar, b.name, b.name_ar, p.model, p.style, p.strap, p.movement, p.dialColor, p.gender,
    TRANSLATIONS.ar["style." + p.style], TRANSLATIONS.ar["dial." + p.dialColor], TRANSLATIONS.ar["gender." + p.gender]
  ].join(" "));
}

// Returns { products, brands } that match every word typed
function searchCatalog(query, limit) {
  const words = normalizeText(query).split(" ").filter(Boolean);
  if (!words.length) return { products: [], brands: [] };
  const products = PRODUCTS
    .map((p) => {
      const text = productSearchText(p);
      if (!words.every((w) => text.includes(w))) return null;
      const name = normalizeText(localized(p, "name") + " " + brandName(p.brand));
      return { p, score: words.filter((w) => name.includes(w)).length + (p.isFeatured ? 0.5 : 0) };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
  const brands = stockedBrands().filter((b) => {
    const text = normalizeText(b.name + " " + (b.name_ar || ""));
    return words.every((w) => text.includes(w));
  });
  return { products: limit ? products.slice(0, limit) : products, brands: brands.slice(0, 4) };
}


/* ---------- Countdown to STORE.offerEndsAt (home + offers page) ---------- */
function startCountdown(el) {
  if (!el) return;
  const end = new Date(STORE.offerEndsAt).getTime();
  function tick() {
    const left = Math.max(0, end - Date.now());
    if (!end || isNaN(end) || left === 0) {
      el.innerHTML = `<span class="countdown__label">${t("offers.ended")}</span>`;
      return;
    }
    const units = [
      [Math.floor(left / 86400000), "offers.days"],
      [Math.floor(left / 3600000) % 24, "offers.hours"],
      [Math.floor(left / 60000) % 60, "offers.mins"],
      [Math.floor(left / 1000) % 60, "offers.secs"]
    ];
    el.innerHTML = `<span class="countdown__label">${t("offers.endsIn")}</span>` + units.map(([n, key]) =>
      `<span class="countdown__unit"><span class="countdown__num">${String(n).padStart(2, "0")}</span><span class="countdown__txt">${t(key)}</span></span>`).join("");
    el.setAttribute("aria-label", t("offers.endsIn") + " " + units.map(([n, key]) => n + " " + t(key)).join(", "));
  }
  tick();
  clearInterval(el._timer);
  el._timer = setInterval(tick, 1000);
}


/* -------------------------------------------------------------------------
   8. SCROLL REVEAL — elements with class="reveal" fade up once on screen
   ------------------------------------------------------------------------- */
const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" })
  : null;

function observeReveals(root) {
  (root || document).querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
    if (revealObserver) revealObserver.observe(el);
    else el.classList.add("is-visible");
  });
}


/* -------------------------------------------------------------------------
   9. PAGE TITLE, DESCRIPTION, GOOGLE DATA (SEO)
   ------------------------------------------------------------------------- */
function setPageMeta(meta) {
  if (meta.title) document.title = meta.title;
  let desc = meta.description || "";
  if (desc.length > 160) desc = desc.slice(0, 157).replace(/\s+\S*$/, "") + "…";
  const set = (selector, value) => {
    const el = document.querySelector(selector);
    if (el && value) el.setAttribute(el.tagName === "LINK" ? "href" : "content", value);
  };
  set('meta[name="description"]', desc);
  set('meta[property="og:title"]', meta.title);
  set('meta[property="og:description"]', desc);
  set('meta[name="twitter:title"]', meta.title);
  set('meta[name="twitter:description"]', desc);
  if (meta.path !== undefined) {
    set('link[rel="canonical"]', STORE.siteUrl + "/" + meta.path);
    set('meta[property="og:url"]', STORE.siteUrl + "/" + meta.path);
  }
  if (meta.image) {
    set('meta[property="og:image"]', meta.image);
    set('meta[name="twitter:image"]', meta.image);
  }
}

function setStructuredData(id, data) {
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

// "images/x.jpg" → "https://your-site.com/images/x.jpg"
function absoluteUrl(src) {
  return /^https?:\/\//.test(src) ? src : STORE.siteUrl + "/" + String(src).replace(/^\//, "");
}


/* -------------------------------------------------------------------------
   10. BUTTONS THAT WORK ON EVERY PAGE
   Cards are re-drawn often, so one listener on the page handles them all.
   ------------------------------------------------------------------------- */
document.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add-to-cart]");
  if (add) {
    const qtyInput = add.dataset.qtyFrom ? document.querySelector(add.dataset.qtyFrom) : null;
    addToCart(add.dataset.addToCart, qtyInput ? Number(qtyInput.value || qtyInput.textContent) || 1 : 1);
    return;
  }
  const wish = e.target.closest("[data-wishlist]");
  if (wish) { toggleWishlist(wish.dataset.wishlist); return; }

  const cmp = e.target.closest("[data-compare]");
  if (cmp) { toggleCompare(cmp.dataset.compare); return; }

  const quick = e.target.closest("[data-quick-view]");
  if (quick) { openQuickView(quick.dataset.quickView); }
});
