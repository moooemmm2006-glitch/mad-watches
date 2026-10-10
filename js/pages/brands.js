/* =========================================================================
   MAD WATCHES — BRANDS PAGE (brands.html)
   One card per brand from BRANDS in js/products.js.
   Each card opens the shop filtered by that brand: products.html?brand=<id>
   ========================================================================= */

function renderBrandsPage() {
  setPageMeta({ title: t("meta.brands"), description: t("meta.brandsDesc") });
  const grid = document.getElementById("brandGrid");

  grid.innerHTML = BRANDS.map((b, i) => {
    const items = PRODUCTS.filter((p) => p.brand === b.id);
    const from = items.length ? Math.min(...items.map((p) => p.price)) : 0;
    const onSale = items.filter((p) => discountPercent(p) > 0).length;
    return `
      <a class="brand-card" href="${brandShopUrl(b.id)}"
         aria-label="${escapeHTML(t("brands.shop", { brand: localized(b, "name") }))}">
        <span class="brand-card__num" lang="en">${String(i + 1).padStart(2, "0")}</span>
        <span class="brand-card__name">${escapeHTML(localized(b, "name"))}</span>
        <span class="brand-card__origin">${escapeHTML(localized(b, "origin"))}</span>
        <span class="brand-card__thumbs" aria-hidden="true">${items.slice(0, 3).map((p) =>
          `<img src="${imageUrl(productImages(p)[0], 160)}" alt="" width="56" height="56" loading="lazy" onerror="this.remove()" />`).join("")}</span>
        <span class="brand-card__meta">${countLabel(items.length)}${from ? " · " + t("common.from", { price: formatPrice(from) }) : ""}</span>
        ${onSale ? `<span class="badge brand-card__sale">${t("nav.offers")} · ${onSale}</span>` : ""}
      </a>`;
  }).join("");
  grid.classList.add("reveal");   // the whole grid fades in (cards share hairline borders)
  observeReveals(grid.parentNode);
}

renderBrandsPage();
document.addEventListener("languagechange", renderBrandsPage);
