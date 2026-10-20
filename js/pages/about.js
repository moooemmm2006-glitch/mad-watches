/* =========================================================================
   MAD WATCHES — ABOUT PAGE (about.html)
   Numbers (brands, watches, governorates) are counted from js/products.js.
   ========================================================================= */

function renderAboutPage() {
  setPageMeta({ title: t("meta.about"), description: t("meta.aboutDesc") });

  // brands and watches are only shown once the catalog has watches
  const numbers = [
    [stockedBrands().length, "about.numbers1"],
    [PRODUCTS.length, "about.numbers2"],
    [GOVERNORATES.length, "about.numbers3"]
  ].filter(([n]) => n > 0);
  document.getElementById("numbers").innerHTML = numbers.map(([n, key]) =>
    `<div class="number reveal"><span class="number__value" lang="en">${n}</span><span class="number__label">${t(key)}</span></div>`).join("");

  document.getElementById("aboutShipping").textContent = t("product.shippingText", {
    fee: formatPrice(STORE.shippingFee)
  });
  observeReveals(document.getElementById("numbers"));
}

renderAboutPage();
document.addEventListener("languagechange", renderAboutPage);
