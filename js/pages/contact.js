/* =========================================================================
   MAD WATCHES — CONTACT PAGE (contact.html)
   Contact details come from STORE in js/products.js.
   The message form opens WhatsApp with the message already written.
   ========================================================================= */

function renderContactPage() {
  setPageMeta({ title: t("meta.contact"), description: t("meta.contactDesc") });

  // WhatsApp: the main card. Only the link is used, the number is never shown.
  const whatsapp = document.getElementById("contactWhatsapp");
  whatsapp.href = chatLink();
  whatsapp.setAttribute("aria-label", t("social.ariaChat"));

  // One card per social platform that has a link in STORE (empty = no card)
  document.querySelectorAll(".contact-card--social").forEach((card) => card.remove());
  whatsapp.insertAdjacentHTML("afterend", socialAccounts().map((s) => `
    <a class="contact-card contact-card--social reveal" href="${escapeHTML(s.url)}" target="_blank" rel="noopener noreferrer"
      aria-label="${escapeHTML(t("social.ariaFollow", { name: t(s.name), handle: s.handle }))}">
      ${icon(s.id)}<span class="contact-card__label">${t(s.name)}</span><span class="contact-card__value" dir="ltr">${escapeHTML(s.handle)}</span>
    </a>`).join(""));
  observeReveals(whatsapp.parentElement);

  document.getElementById("contactEmail").href = "mailto:" + STORE.email;
  document.getElementById("contactEmailText").textContent = STORE.email;
  document.getElementById("contactHours").textContent = storeHoursText();
  document.getElementById("contactLocation").textContent = localized(STORE, "location");
}

// Form → WhatsApp
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const name = form.elements.name.value.trim();
  const phone = form.elements.phone.value.trim();
  const message = form.elements.message.value.trim();

  const setError = (input, text) => {
    document.getElementById(input.id + "Error").textContent = text;
    input.setAttribute("aria-invalid", text ? "true" : "false");
  };
  setError(form.elements.name, name.length >= 2 ? "" : t("contact.errName"));
  setError(form.elements.message, message.length >= 3 ? "" : t("contact.errMessage"));
  if (name.length < 2) return form.elements.name.focus();
  if (message.length < 3) return form.elements.message.focus();

  const text = [
    t("wa.hello", { store: STORE.name }),
    "— " + t("wa.contact") + " —",
    t("wa.name") + ": " + name,
    phone ? t("wa.phone") + ": " + phone : "",
    "",
    message
  ].filter((line, i, all) => line !== "" || all[i - 1] !== "").join("\n");
  window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
});

// Opening contact.html#faq expands the first question and scrolls to it
if (location.hash === "#faq") {
  document.querySelector("#faq details").open = true;
}

renderContactPage();
document.addEventListener("languagechange", renderContactPage);
