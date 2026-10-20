/* =========================================================================
   MAD WATCHES — PRODUCT PAGE (product.html?id=<product id>)
   -------------------------------------------------------------------------
     1. Gallery: thumbnails, hover zoom (desktop), swipe (phones), lightbox
     2. Info: price block, stock, quantity, buttons, features
     3. Tabs: description / specifications / shipping / reviews
     4. You may also like + recently viewed
     5. Title, description and Google data (Product schema)
   Nothing to edit here: every product in js/products.js gets its page.
   ========================================================================= */

const productId = new URLSearchParams(location.search).get("id");
const product = getProduct(productId);
let qty = 1;
let activeImage = 0;

const FEATURE_ICONS = {
  water: "drop", movement: "gear", sapphire: "diamond",
  chronograph: "chrono", solar: "sun", lume: "moon", date: "calendar", smart: "phone"
};
const SPEC_ROWS = ["movement", "caseSize", "caseMaterial", "strap", "dialColor", "glass", "waterResistance", "weight"];


/* -------------------------------------------------------------------------
   1. GALLERY
   ------------------------------------------------------------------------- */
// The gallery = the photos + (optional) one video at the end (product.video in js/products.js)
function galleryCount() {
  return productImages(product).length + (product.video ? 1 : 0);
}

function showVideo() {
  const box = document.getElementById("galleryVideo");
  if (!box.firstChild) {
    const poster = product.videoPoster ? ` poster="${escapeHTML(product.videoPoster)}"` : "";
    box.innerHTML = `<video controls playsinline preload="metadata"${poster} src="${escapeHTML(product.video)}" aria-label="${escapeHTML(t("product.video"))}"></video>`;
  }
  document.getElementById("galleryMain").hidden = true;
  box.hidden = false;
}

function hideVideo() {
  const box = document.getElementById("galleryVideo");
  const v = box.querySelector("video");
  if (v) v.pause();
  box.hidden = true;
  document.getElementById("galleryMain").hidden = false;
}

function showImage(i) {
  const images = productImages(product);
  const total = galleryCount();
  activeImage = (i + total) % total;
  document.querySelectorAll(".gallery__thumb").forEach((b, n) => b.setAttribute("aria-current", n === activeImage));
  if (activeImage >= images.length) { showVideo(); return; }
  hideVideo();
  const img = document.getElementById("mainImage");
  img.src = imageUrl(images[activeImage], 1200);
  img.srcset = imageSrcset(images[activeImage]);
  img.sizes = "(max-width: 899px) 100vw, 620px";
  img.alt = productTitle(product) + (images.length > 1 ? " — " + t("product.photo", { n: activeImage + 1, total: images.length }) : "");
}

function renderGallery() {
  const images = productImages(product);
  const total = galleryCount();
  const thumbs = document.getElementById("thumbs");
  thumbs.hidden = total < 2;
  thumbs.setAttribute("aria-label", t("product.tabDescription"));
  const photoThumbs = images.map((src, i) => `
    <button class="gallery__thumb" type="button" data-index="${i}" aria-label="${t("product.photo", { n: i + 1, total: images.length })}">
      <img src="${imageUrl(src, 200)}" alt="" width="200" height="200" loading="lazy" onerror="${IMAGE_FALLBACK}" />
    </button>`);
  if (product.video) photoThumbs.push(`
    <button class="gallery__thumb gallery__thumb--video" type="button" data-index="${images.length}" aria-label="${escapeHTML(t("product.video"))}">
      ${product.videoPoster ? `<img src="${escapeHTML(product.videoPoster)}" alt="" width="200" height="200" loading="lazy" onerror="${IMAGE_FALLBACK}" />` : ""}
      <span class="gallery__play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg></span>
    </button>`);
  thumbs.innerHTML = total < 2 ? "" : photoThumbs.join("");

  const discount = discountPercent(product);
  document.getElementById("galleryBadges").innerHTML = [
    discount ? `<span class="badge" dir="ltr">-${discount}%</span>` : "",
    product.isNew ? `<span class="badge badge--outline">${t("common.new")}</span>` : "",
    stockState(product) === "out" ? `<span class="badge badge--outline">${t("common.outOfStock")}</span>` : ""
  ].join("");
  showImage(activeImage);
}

document.getElementById("thumbs").addEventListener("click", (e) => {
  const b = e.target.closest(".gallery__thumb");
  if (b) showImage(Number(b.dataset.index));
});

// arrow keys move between thumbnails
document.getElementById("thumbs").addEventListener("keydown", (e) => {
  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
  const forward = (e.key === "ArrowRight") !== (currentLang === "ar");
  showImage(activeImage + (forward ? 1 : -1));
  document.querySelectorAll(".gallery__thumb")[activeImage].focus();
});

// Desktop: zoom follows the mouse
const galleryMain = document.getElementById("galleryMain");
if (window.matchMedia("(hover: hover)").matches && !reduceMotion) {
  galleryMain.addEventListener("mousemove", (e) => {
    const r = galleryMain.getBoundingClientRect();
    const img = document.getElementById("mainImage");
    img.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
    galleryMain.classList.add("is-zoomed");
  });
  galleryMain.addEventListener("mouseleave", () => galleryMain.classList.remove("is-zoomed"));
}

// Phones: swipe between photos
let touchX = null;
galleryMain.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
galleryMain.addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  touchX = null;
  if (Math.abs(dx) < 40) return;
  galleryMain.dataset.swiped = "1";
  const forward = currentLang === "ar" ? dx > 0 : dx < 0;
  showImage(activeImage + (forward ? 1 : -1));
});

// Click: open the lightbox
galleryMain.addEventListener("click", () => {
  if (galleryMain.dataset.swiped) { delete galleryMain.dataset.swiped; return; }
  openLightbox(activeImage);
});

function openLightbox(index) {
  const modal = createModal("lightbox");
  modal.classList.add("lightbox");
  const images = productImages(product);
  let current = index;
  const draw = () => {
    modal.querySelector(".modal__content").innerHTML = `
      <img src="${imageUrl(images[current], 1600)}" alt="${escapeHTML(productTitle(product))}" onerror="${IMAGE_FALLBACK}" />
      ${images.length > 1 ? `
        <button class="icon-btn lightbox__nav lightbox__prev" type="button" data-lb="-1" aria-label="${t("common.prev")}">${icon("chevronL")}</button>
        <button class="icon-btn lightbox__nav lightbox__next" type="button" data-lb="1" aria-label="${t("common.next")}">${icon("chevron")}</button>
        <p class="lightbox__count">${t("product.photo", { n: current + 1, total: images.length })}</p>` : ""}`;
  };
  draw();
  modal.querySelector(".modal__box").setAttribute("aria-label", productTitle(product));
  modal.onclick = (e) => {
    const nav = e.target.closest("[data-lb]");
    if (nav) { current = (current + Number(nav.dataset.lb) + images.length) % images.length; draw(); }
  };
  modal.onkeydown = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      const step = (e.key === "ArrowRight") !== (currentLang === "ar") ? 1 : -1;
      current = (current + step + images.length) % images.length;
      draw();
    }
  };
  openModal(modal);
}


/* -------------------------------------------------------------------------
   2. INFO, PRICE, BUTTONS
   ------------------------------------------------------------------------- */
function renderBuy() {
  const state = stockState(product);
  const max = maxQty(product);
  qty = Math.min(qty, max);
  document.getElementById("qtyValue").textContent = qty;
  document.getElementById("qtyMinus").disabled = state === "out" || qty <= 1;
  document.getElementById("qtyPlus").disabled = state === "out" || qty >= max;

  const add = document.getElementById("pAdd");
  add.dataset.addToCart = product.id;
  add.disabled = state === "out";
  document.getElementById("pAddLabel").textContent = t(state === "out" ? "common.outOfStock" : "common.addToCart");

  document.getElementById("pWhatsapp").href = whatsappLink(productMessage(product, qty));
  document.getElementById("pWhatsappLabel").textContent = t(state === "out" ? "product.askWhatsapp" : "common.orderWhatsapp");

  const wish = document.getElementById("pWish");
  wish.dataset.wishlist = product.id;
  wish.setAttribute("aria-pressed", isWished(product.id));
  wish.setAttribute("aria-label", t(isWished(product.id) ? "common.wishRemove" : "common.wishAdd") + ": " + localized(product, "name"));
  const cmp = document.getElementById("pCompare");
  cmp.dataset.compare = product.id;
  cmp.setAttribute("aria-pressed", isCompared(product.id));
}

document.getElementById("qtyMinus").addEventListener("click", () => { qty = Math.max(1, qty - 1); renderBuy(); });
document.getElementById("qtyPlus").addEventListener("click", () => { qty = Math.min(maxQty(product), qty + 1); renderBuy(); });

function renderInfo() {
  const name = localized(product, "name");
  const brand = brandName(product.brand);
  const discount = discountPercent(product);
  const state = stockState(product);

  document.getElementById("productCrumbs").innerHTML =
    `<li><a href="index.html">${t("nav.home")}</a></li><li><a href="products.html">${t("nav.shop")}</a></li>` +
    `<li><a href="${brandShopUrl(product.brand)}">${escapeHTML(brand)}</a></li><li aria-current="page">${escapeHTML(name)}</li>`;

  const brandLink = document.getElementById("pBrand");
  brandLink.textContent = brand;
  brandLink.href = brandShopUrl(product.brand);
  brandLink.title = t("product.brandAll", { brand });
  document.getElementById("pName").textContent = name;
  document.getElementById("pModel").textContent = product.model || "—";
  document.getElementById("pShort").textContent = localized(product, "description");

  // Price block: current price big, old price struck through, -% badge, "You save"
  document.getElementById("pPrice").innerHTML = priceHTML(product, true) + (discount ? `
    <p class="price-block__save"><span class="badge" dir="ltr">-${discount}%</span> ${t("common.save", { amount: formatPrice(savingAmount(product)) })}</p>` : "");

  const stock = document.getElementById("pStock");
  stock.textContent = stockLabel(product);
  stock.className = "stock stock--" + state;

  document.getElementById("pReassure").innerHTML = (STORE.reassurance || [])
    .map((r) => `<li>${icon("check")}<span>${escapeHTML(localized(r, "text"))}</span></li>`).join("");

  const specs = productSpecs(product);
  document.getElementById("pFeatures").innerHTML = (product.features || []).map((f) => {
    const label = t("feature." + f, {
      m: product.waterResistance, movement: specs.movement || optionLabel("movement", product.movement)
    });
    return `<li>${icon(FEATURE_ICONS[f] || "check")}<span>${escapeHTML(label)}</span></li>`;
  }).join("");
}


/* -------------------------------------------------------------------------
   3. TABS
   ------------------------------------------------------------------------- */
function renderTabs() {
  document.getElementById("pDescription").textContent = localized(product, "description");
  const specs = productSpecs(product);

  const rows = SPEC_ROWS.filter((k) => specs[k]).map((k) => `<tr><th scope="row">${t("spec." + k)}</th><td>${escapeHTML(specs[k])}</td></tr>`);
  rows.unshift(`<tr><th scope="row">${t("spec.model")}</th><td dir="ltr">${escapeHTML(product.model || "—")}</td></tr>`);
  rows.push(`<tr><th scope="row">${t("spec.gender")}</th><td>${optionLabel("gender", product.gender)}</td></tr>`);
  rows.push(`<tr><th scope="row">${t("spec.style")}</th><td>${optionLabel("style", product.style)}</td></tr>`);
  document.getElementById("pSpecs").innerHTML = rows.join("");

  document.getElementById("pShipping").textContent = t("product.shippingText", {
    fee: formatPrice(STORE.shippingFee)
  });

  // Reviews tab: real reviews are on Instagram (+ the video from STORE.reviewVideo, if set)
  renderRealReviews(document.getElementById("panel-reviews"));
}

// Accessible tabs: click, or arrow keys between tabs
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab, focus) {
  tabs.forEach((t2) => {
    const on = t2 === tab;
    t2.setAttribute("aria-selected", on);
    t2.tabIndex = on ? 0 : -1;
    document.getElementById(t2.getAttribute("aria-controls")).hidden = !on;
  });
  if (focus) tab.focus();
}
tabs.forEach((tab) => tab.addEventListener("click", () => selectTab(tab)));
document.querySelector(".tabs").addEventListener("keydown", (e) => {
  const i = tabs.indexOf(document.activeElement);
  if (i < 0) return;
  let next = null;
  if (e.key === "ArrowRight") next = tabs[(i + (currentLang === "ar" ? -1 : 1) + tabs.length) % tabs.length];
  if (e.key === "ArrowLeft") next = tabs[(i + (currentLang === "ar" ? 1 : -1) + tabs.length) % tabs.length];
  if (e.key === "Home") next = tabs[0];
  if (e.key === "End") next = tabs[tabs.length - 1];
  if (next) { e.preventDefault(); selectTab(next, true); }
});


/* -------------------------------------------------------------------------
   4. YOU MAY ALSO LIKE + RECENTLY VIEWED
   ------------------------------------------------------------------------- */
function renderRelated() {
  const sameBrand = PRODUCTS.filter((p) => p.brand === product.brand && p.id !== product.id);
  const sameStyle = PRODUCTS
    .filter((p) => p.brand !== product.brand && p.style === product.style)
    .sort((a, b) => Math.abs(a.price - product.price) - Math.abs(b.price - product.price));
  const list = sameBrand.concat(sameStyle).slice(0, 4);
  document.getElementById("relatedEyebrow").textContent = t("product.brandAll", { brand: brandName(product.brand) });
  const grid = document.getElementById("relatedGrid");
  grid.innerHTML = list.map((p, i) => productCardHTML(p, i)).join("");
  observeReveals(grid.parentNode);

  const recent = getRecentlyViewed(product.id).filter(Boolean).slice(0, 4);
  document.getElementById("recent").hidden = recent.length === 0;
  const rgrid = document.getElementById("recentGrid");
  rgrid.innerHTML = recent.map((p, i) => productCardHTML(p, i)).join("");
  observeReveals(rgrid.parentNode);
}


/* -------------------------------------------------------------------------
   5. PAGE META + GOOGLE DATA
   ------------------------------------------------------------------------- */
function renderMeta() {
  const name = localized(product, "name");
  const brand = brandName(product.brand);
  setPageMeta({
    title: t("meta.product", { brand, name }),
    description: t("meta.productDesc", { brand, name, model: product.model || "", price: formatPrice(product.price), description: localized(product, "description") }),
    path: productUrl(product.id),
    image: absoluteUrl(imageUrl(productImages(product)[0], 1200))
  });

  const offer = {
    "@type": "Offer",
    url: STORE.siteUrl + "/" + productUrl(product.id),
    priceCurrency: STORE.currency,
    price: product.price,
    availability: isInStock(product) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: { "@type": "Organization", name: STORE.name }
  };
  if (discountPercent(product) && STORE.offerEndsAt) offer.priceValidUntil = STORE.offerEndsAt.slice(0, 10);

  setStructuredData("ld-product", {
    "@context": "https://schema.org",
    "@type": "Product",
    name: brandName(product.brand) + " " + product.name,
    sku: product.id,
    mpn: product.model || undefined,
    image: productImages(product).map((src) => absoluteUrl(imageUrl(src, 1200))),
    description: localized(product, "description"),
    brand: { "@type": "Brand", name: (getBrand(product.brand) || {}).name || product.brand },
    offers: offer
  });
  setStructuredData("ld-breadcrumbs", {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("nav.home"), item: STORE.siteUrl + "/" },
      { "@type": "ListItem", position: 2, name: t("nav.shop"), item: STORE.siteUrl + "/products.html" },
      { "@type": "ListItem", position: 3, name: brand, item: STORE.siteUrl + "/" + brandShopUrl(product.brand) },
      { "@type": "ListItem", position: 4, name: name, item: STORE.siteUrl + "/" + productUrl(product.id) }
    ]
  });
}


/* -------------------------------------------------------------------------
   START
   ------------------------------------------------------------------------- */
function renderProductPage() {
  if (!product) {
    ["product", "productTabs", "related", "recent"].forEach((id) => (document.getElementById(id).hidden = true));
    document.getElementById("notFound").hidden = false;
    setPageMeta({ title: t("product.notFound") + " | Mad Watches", description: t("product.notFoundText") });
    return;
  }
  renderGallery();
  renderInfo();
  renderBuy();
  renderTabs();
  renderRelated();
  renderMeta();
}

if (product) addRecentlyViewed(product.id);
renderProductPage();
document.addEventListener("languagechange", renderProductPage);
document.addEventListener("wishlistchange", () => product && renderBuy());
