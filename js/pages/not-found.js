/* =========================================================================
   MAD WATCHES — 404 PAGE (404.html)
   Netlify shows this page automatically for links that don't exist.
   ========================================================================= */

function renderNotFound() {
  setPageMeta({ title: t("meta.notFound"), description: t("404.text") });
}

renderNotFound();
document.addEventListener("languagechange", renderNotFound);
