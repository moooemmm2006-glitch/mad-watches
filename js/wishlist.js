/* =========================================================================
   MAD WATCHES — WISHLIST, COMPARE & RECENTLY VIEWED (shared)
   -------------------------------------------------------------------------
   All three lists are saved in the visitor's browser.
     - Wishlist: heart buttons, wishlist.html, count in the navbar
     - Compare: up to 3 watches, tray at the bottom, side-by-side table
     - Recently viewed: last 8 product pages opened
   ========================================================================= */

const WISH_KEY = "madwatches-wishlist";
const COMPARE_KEY = "madwatches-compare";
const RECENT_KEY = "madwatches-recent";
const COMPARE_MAX = 3;

function readList(key) {
  try {
    const list = JSON.parse(localStorage.getItem(key)) || [];
    return list.filter((id) => getProduct(id));
  } catch (err) {
    return [];
  }
}

function writeList(key, list) {
  try { localStorage.setItem(key, JSON.stringify(list)); } catch (err) { /* ignore */ }
}

let wishlist = readList(WISH_KEY);
let compareList = readList(COMPARE_KEY);


/* -------------------------------------------------------------------------
   WISHLIST
   ------------------------------------------------------------------------- */
function isWished(id) {
  return wishlist.includes(id);
}

function toggleWishlist(id) {
  const p = getProduct(id);
  if (!p) return;
  const adding = !isWished(id);
  wishlist = adding ? [id].concat(wishlist) : wishlist.filter((x) => x !== id);
  writeList(WISH_KEY, wishlist);

  // update every heart for this watch on the page
  document.querySelectorAll(`[data-wishlist="${id}"]`).forEach((btn) => {
    btn.setAttribute("aria-pressed", adding);
    const label = btn.getAttribute("aria-label") || "";
    btn.setAttribute("aria-label", t(adding ? "common.wishRemove" : "common.wishAdd") + label.slice(label.indexOf(":")));
  });
  updateWishlistBadges();
  showToast(t(adding ? "common.wishAdded" : "common.wishRemoved"), {
    icon: "heart",
    link: adding ? { href: "wishlist.html", label: t("nav.wishlist") } : null
  });
  document.dispatchEvent(new CustomEvent("wishlistchange"));
}

function clearWishlist() {
  wishlist = [];
  writeList(WISH_KEY, wishlist);
  updateWishlistBadges();
  document.dispatchEvent(new CustomEvent("wishlistchange"));
}

function updateWishlistBadges() {
  document.querySelectorAll("[data-wishlist-count]").forEach((el) => {
    el.textContent = wishlist.length;
    el.classList.toggle("has-items", wishlist.length > 0);
  });
}


/* -------------------------------------------------------------------------
   COMPARE (up to 3 watches)
   ------------------------------------------------------------------------- */
function isCompared(id) {
  return compareList.includes(id);
}

function toggleCompare(id) {
  if (!getProduct(id)) return;
  if (isCompared(id)) {
    compareList = compareList.filter((x) => x !== id);
    showToast(t("compare.removed"), { icon: "compare" });
  } else {
    if (compareList.length >= COMPARE_MAX) {
      showToast(t("compare.max"), { icon: "compare" });
      return;
    }
    compareList.push(id);
    showToast(t("compare.added"), { icon: "compare" });
  }
  writeList(COMPARE_KEY, compareList);
  document.querySelectorAll(`[data-compare="${id}"]`).forEach((btn) => btn.setAttribute("aria-pressed", isCompared(id)));
  renderCompareTray();
  const modal = document.getElementById("compareModal");
  if (modal && modal.classList.contains("is-open")) {
    if (compareList.length) renderCompareTable(); else closeModal(modal);
  }
}

function clearCompare() {
  compareList.forEach((id) => document.querySelectorAll(`[data-compare="${id}"]`).forEach((b) => b.setAttribute("aria-pressed", "false")));
  compareList = [];
  writeList(COMPARE_KEY, compareList);
  renderCompareTray();
}

// The small bar at the bottom: thumbnails + "Compare" button
function renderCompareTray() {
  let tray = document.getElementById("compareTray");
  if (!tray) {
    tray = document.createElement("div");
    tray.id = "compareTray";
    tray.className = "compare-tray";
    tray.setAttribute("role", "region");
    document.body.appendChild(tray);
    tray.addEventListener("click", (e) => {
      if (e.target.closest("[data-compare-open]")) openCompare();
      if (e.target.closest("[data-compare-clear]")) clearCompare();
    });
  }
  tray.setAttribute("aria-label", t("compare.title"));
  tray.classList.toggle("is-visible", compareList.length > 0);
  document.body.classList.toggle("has-compare", compareList.length > 0);   // toasts move above the tray
  tray.inert = compareList.length === 0;
  tray.innerHTML = `
    <div class="compare-tray__items">
      ${compareList.map((id) => {
        const p = getProduct(id);
        return `<span class="compare-tray__item"><img src="${imageUrl(productImages(p)[0], 120)}" alt="${escapeHTML(localized(p, "name"))}" width="40" height="40" onerror="${IMAGE_FALLBACK}" /></span>`;
      }).join("")}
      <span class="compare-tray__label">${t("compare.selected", { n: compareList.length })}</span>
    </div>
    <button class="icon-btn" type="button" data-compare-clear aria-label="${t("compare.clear")}">${icon("close")}</button>
    <button class="btn btn--small" type="button" data-compare-open>${t("compare.now")}</button>`;
}

function openCompare() {
  if (compareList.length < 2) {
    showToast(t("compare.need"), { icon: "compare" });
    return;
  }
  const modal = createModal("compareModal", "modal__box--wide");
  modal.querySelector(".modal__box").setAttribute("aria-labelledby", "compareTitle");
  renderCompareTable();
  openModal(modal);
}

// Side-by-side table. The best value in a row (lowest price, most water resistance…) is highlighted.
function renderCompareTable() {
  const modal = document.getElementById("compareModal");
  const items = compareList.map(getProduct);
  const specsOf = items.map(productSpecs);

  const best = (values, pick) => {
    const nums = values.map(Number).filter((n) => !isNaN(n) && n > 0);
    if (nums.length < 2) return -1;
    const target = pick === "min" ? Math.min(...nums) : Math.max(...nums);
    return values.map(Number).indexOf(target);
  };
  const row = (label, cells, bestIndex) =>
    `<tr><th scope="row">${label}</th>${cells.map((c, i) => `<td class="${i === bestIndex ? "is-best" : ""}">${c || "—"}</td>`).join("")}</tr>`;

  const prices = items.map((p) => p.price);
  const waters = items.map((p) => p.waterResistance || 0);

  modal.querySelector(".modal__content").innerHTML = `
    <div class="modal__head"><h2 class="title title--sm" id="compareTitle">${t("compare.title")}</h2><div class="ticks" style="margin-inline:0"></div></div>
    <div class="modal__body compare-scroll">
      <table class="compare-table">
        <thead><tr><td></td>${items.map((p) => `
          <th scope="col" class="compare__product">
            <a href="${productUrl(p.id)}"><img src="${imageUrl(productImages(p)[0], 320)}" alt="" width="150" height="150" loading="lazy" onerror="${IMAGE_FALLBACK}" />
            <span class="compare__name">${escapeHTML(localized(p, "name"))}</span></a>
            <button class="link" type="button" data-compare="${p.id}" style="margin-top:.6rem">${t("compare.remove")}</button>
          </th>`).join("")}</tr></thead>
        <tbody>
          ${row(t("spec.price"), items.map((p) => priceHTML(p)), best(prices, "min"))}
          ${row(t("spec.brand"), items.map((p) => escapeHTML(brandName(p.brand))))}
          ${row(t("spec.model"), items.map((p) => escapeHTML(p.model || "")))}
          ${row(t("spec.movement"), items.map((p, i) => escapeHTML(specsOf[i].movement || optionLabel("movement", p.movement))))}
          ${row(t("spec.caseSize"), items.map((p) => p.caseSize ? p.caseSize + (currentLang === "ar" ? " مم" : " mm") : ""))}
          ${row(t("spec.caseMaterial"), items.map((p, i) => escapeHTML(specsOf[i].caseMaterial || "")))}
          ${row(t("spec.strap"), items.map((p, i) => escapeHTML(specsOf[i].strap || optionLabel("strap", p.strap))))}
          ${row(t("spec.dialColor"), items.map((p) => p.dialColor ? optionLabel("dial", p.dialColor) : ""))}
          ${row(t("spec.glass"), items.map((p, i) => escapeHTML(specsOf[i].glass || "")))}
          ${row(t("spec.waterResistance"), items.map((p) => p.waterResistance ? p.waterResistance + (currentLang === "ar" ? " متر" : " m") : ""), best(waters, "max"))}
          <tr><th scope="row"></th>${items.map((p) => `<td><button class="btn btn--small btn--block" type="button" data-add-to-cart="${p.id}" ${isInStock(p) ? "" : "disabled"}>${t(isInStock(p) ? "common.addToCart" : "common.outOfStock")}</button></td>`).join("")}</tr>
        </tbody>
      </table>
    </div>`;
}


/* -------------------------------------------------------------------------
   RECENTLY VIEWED (used by the product page)
   ------------------------------------------------------------------------- */
function addRecentlyViewed(id) {
  const list = [id].concat(readList(RECENT_KEY).filter((x) => x !== id)).slice(0, 8);
  writeList(RECENT_KEY, list);
}

function getRecentlyViewed(excludeId) {
  return readList(RECENT_KEY).filter((id) => id !== excludeId).map(getProduct);
}


/* -------------------------------------------------------------------------
   START
   ------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  updateWishlistBadges();
  renderCompareTray();
});

document.addEventListener("languagechange", () => {
  renderCompareTray();
  const modal = document.getElementById("compareModal");
  if (modal && modal.classList.contains("is-open")) renderCompareTable();
});

window.addEventListener("storage", (e) => {
  if (e.key === WISH_KEY) { wishlist = readList(WISH_KEY); updateWishlistBadges(); document.dispatchEvent(new CustomEvent("wishlistchange")); }
  if (e.key === COMPARE_KEY) { compareList = readList(COMPARE_KEY); renderCompareTray(); }
});
