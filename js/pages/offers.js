/* =========================================================================
   MAD WATCHES — OFFERS PAGE (offers.html)
   Shows every product that has an originalPrice higher than its price,
   biggest discount first (12 at a time). The countdown uses STORE.offerEndsAt.
   ========================================================================= */

const OFFERS_PAGE = 12;
let offersShown = OFFERS_PAGE;

function offerList() {
  return PRODUCTS
    .filter((p) => discountPercent(p) > 0)
    .sort((a, b) => (isInStock(b) - isInStock(a)) || (discountPercent(b) - discountPercent(a)));
}

function renderOffersPage(appendFrom) {
  setPageMeta({ title: t("meta.offers"), description: t("meta.offersDesc") });
  const list = offerList();
  const grid = document.getElementById("offersGrid");
  const visible = list.slice(0, offersShown);

  if (appendFrom) {
    grid.insertAdjacentHTML("beforeend", visible.slice(appendFrom).map((p, i) => productCardHTML(p, appendFrom + i, { ribbon: true, noReveal: true, enter: true, enterIndex: i })).join(""));
  } else {
    // the first photos load straight away (faster first view)
    grid.innerHTML = visible.map((p, i) => productCardHTML(p, i, { ribbon: true, eager: i < 2 })).join("");
    observeReveals(grid);
  }

  if (catalogIsEmpty()) grid.innerHTML = comingSoonHTML();   // no watches at all yet
  document.getElementById("offersCount").textContent = t("offers.count", { n: list.length });
  document.querySelector(".toolbar").hidden = list.length === 0;
  document.getElementById("offersEmpty").hidden = list.length > 0 || catalogIsEmpty();
  document.getElementById("offersMoreBox").hidden = list.length === 0;
  document.getElementById("offersMore").hidden = offersShown >= list.length;
  document.getElementById("offersShowing").textContent = t("shop.showing", { shown: Math.min(offersShown, list.length), total: list.length });
  const countdown = document.getElementById("offersCountdown");
  countdown.hidden = list.length === 0;   // no countdown without offers
  if (list.length) startCountdown(countdown);
}

document.getElementById("offersMore").addEventListener("click", () => {
  const from = offersShown;
  offersShown += OFFERS_PAGE;
  renderOffersPage(from);
});

renderOffersPage();
document.addEventListener("languagechange", () => renderOffersPage());