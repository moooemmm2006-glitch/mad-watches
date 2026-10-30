/* =========================================================================
   MAD WATCHES — REVIEWS PAGE (reviews.html)
   The button opens the reviews highlight on Instagram (STORE.reviewsHighlight).
   ========================================================================= */

function renderReviewsPage() {
  setPageMeta({ title: t("meta.reviews"), description: t("meta.reviewsDesc"), path: "reviews.html" });
  renderRealReviews();   // js/main.js
}

renderReviewsPage();
document.addEventListener("languagechange", renderReviewsPage);
