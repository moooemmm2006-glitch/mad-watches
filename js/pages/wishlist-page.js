/* =========================================================================
   MAD WATCHES — WISHLIST PAGE (wishlist.html)
   Shows the watches saved with the heart button (stored in the browser).
   ========================================================================= */

function renderWishlistPage() {
  setPageMeta({ title: t("meta.wishlist"), description: t("wishlist.text") });
  const items = wishlist.map(getProduct).filter(Boolean);
  const grid = document.getElementById("wishGrid");

  document.getElementById("wishToolbar").hidden = items.length === 0;
  document.getElementById("wishEmpty").hidden = items.length > 0;
  document.getElementById("wishCount").textContent = countLabel(items.length);
  grid.innerHTML = items.map((p, i) => productCardHTML(p, i)).join("");
  observeReveals(grid);

  const message = [t("wa.hello", { store: STORE.name }), t("wa.wishlist"), ""]
    .concat(items.map((p) => "• " + productTitle(p) + " — " + formatPrice(p.price))).join("\n");
  document.getElementById("wishShare").href = whatsappLink(message);
}

document.getElementById("wishAddAll").addEventListener("click", () => {
  wishlist.map(getProduct).filter((p) => p && isInStock(p)).forEach((p) => addToCart(p.id, 1));
});

document.getElementById("wishClear").addEventListener("click", clearWishlist);

renderWishlistPage();
document.addEventListener("languagechange", renderWishlistPage);
document.addEventListener("wishlistchange", renderWishlistPage);
