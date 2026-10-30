/* =========================================================================
   MAD WATCHES — BEST SELLER PAGE (bestsellers.html)
   Two sections, men and women. Each shows its Instagram reel
   (STORE.bestSellers in js/products.js) and the watches with bestSeller: true.
   ========================================================================= */

function renderBestSection(gender) {
  const settings = (STORE.bestSellers || {})[gender] || {};
  const reel = instagramPostUrl(settings.reel);
  const list = PRODUCTS.filter((p) => p.bestSeller && (p.gender === gender || p.gender === "unisex"));

  const reelBox = document.querySelector(`[data-best-reel="${gender}"]`);
  reelBox.innerHTML = reel ? instagramEmbedHTML(reel, t("best.watch")) : "";
  reelBox.hidden = !reel;

  const grid = document.querySelector(`[data-best-grid="${gender}"]`);
  grid.innerHTML = list.map((p, i) => productCardHTML(p, i)).join("");
  grid.hidden = list.length === 0;

  document.getElementById("best-" + gender).hidden = !reel && list.length === 0;
  observeReveals(grid);
  observeInstagram(reelBox);
}

function renderBestSellers() {
  setPageMeta({ title: t("meta.bestSellers"), description: t("meta.bestSellersDesc"), path: "bestsellers.html" });
  renderBestSection("men");
  renderBestSection("women");
}

renderBestSellers();
document.addEventListener("languagechange", renderBestSellers);
