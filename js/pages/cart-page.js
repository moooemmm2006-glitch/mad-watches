/* =========================================================================
   MAD WATCHES — CART & CHECKOUT PAGE (cart.html)
   -------------------------------------------------------------------------
     1. Cart lines, first order discount, gift mode, order summary
     2. Checkout form (Egyptian phone validation, governorates, payment)
     3. Placing the order:
          validate → save it on this device → send to the Google Sheet
          (if STORE.ordersEndpoint is set) → open WhatsApp with the full
          order → show the confirmation screen → empty the cart
     4. Confirmation screen (resend, copy number, ask about the order)
   Prices, shipping and fees come from js/products.js (STORE).
   ========================================================================= */

const CUSTOMER_KEY = "madwatches-customer";   // ORDERS_KEY is in js/cart.js
const LAST_ORDER_KEY = "madwatches-last-order";

const form = document.getElementById("checkoutForm");


/* -------------------------------------------------------------------------
   1. CART
   ------------------------------------------------------------------------- */
function renderCartLines() {
  const lines = cartLines();
  document.getElementById("cartLines").innerHTML = lines.map((l) => {
    const p = l.product;
    const name = localized(p, "name");
    return `
      <li class="cart-line" data-id="${p.id}">
        <a class="cart-line__img" href="${productUrl(p.id)}" tabindex="-1" aria-hidden="true">
          <img src="${imageUrl(productImages(p)[0], 240)}" alt="" width="120" height="120" loading="lazy" onerror="${IMAGE_FALLBACK}" />
          ${l.discount ? `<span class="badge" dir="ltr">-${l.discount}%</span>` : ""}
        </a>
        <div class="cart-line__info">
          <p class="card__brand">${escapeHTML(brandName(p.brand))}</p>
          <a class="cart-line__name" href="${productUrl(p.id)}">${escapeHTML(name)}</a>
          ${p.model ? `<p class="cart-line__model">${t("common.ref")} <span dir="ltr">${escapeHTML(p.model)}</span></p>` : ""}
          <div class="cart-line__unit">${priceHTML(p)}<span class="cart-line__each">${t("cart.each")}</span></div>
          ${l.lineSaving ? `<p class="cart-line__save">${t("cart.itemSaving", { amount: formatPrice(l.lineSaving) })}</p>` : ""}
        </div>
        <div class="cart-line__qty">
          <div class="qty qty--sm" role="group" aria-label="${escapeHTML(name)}">
            <button type="button" data-step="-1" aria-label="${t("cart.decrease")}">−</button>
            <span>${l.qty}</span>
            <button type="button" data-step="1" aria-label="${t("cart.increase")}" ${l.qty >= maxQty(p) ? "disabled" : ""}>+</button>
          </div>
          <button class="cart-line__remove" type="button" data-remove-line>${t("cart.remove")}</button>
        </div>
        <p class="cart-line__total">${formatPrice(l.lineTotal)}</p>
      </li>`;
  }).join("");
}

document.getElementById("cartLines").addEventListener("click", (e) => {
  const row = e.target.closest(".cart-line");
  if (!row) return;
  const step = e.target.closest("[data-step]");
  const item = cart.find((i) => i.id === row.dataset.id);
  if (step && item) setCartQty(row.dataset.id, item.qty + Number(step.dataset.step));
  if (e.target.closest("[data-remove-line]")) removeFromCart(row.dataset.id);
});

/* ---------- First order discount: the code field + the "applied" message ---------- */
function renderPromo(totals) {
  const applied = document.getElementById("promoApplied");
  const promoForm = document.getElementById("promoForm");
  const hasDiscount = totals.discount > 0;
  document.getElementById("promo").hidden = !(Number(STORE.firstOrderDiscount) > 0);
  promoForm.hidden = hasDiscount;   // one discount per order
  applied.hidden = !hasDiscount;
  if (!hasDiscount) return;
  applied.innerHTML = icon("check") + `<span>${totals.discountAuto
    ? t("promo.auto")
    : t("promo.applied", { code: `<strong dir="ltr">${escapeHTML(totals.discountCode)}</strong>` })}</span>` +
    (totals.discountAuto ? "" : `<button class="link promo__remove" type="button" id="promoRemove">${t("promo.remove")}</button>`);
}

document.getElementById("promoForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("promoCode");
  const result = applyDiscountCode(input.value);
  document.getElementById("promoError").textContent = result === "ok" ? "" : t("promo." + result);
  input.setAttribute("aria-invalid", result === "ok" ? "false" : "true");
  if (result === "ok") {
    input.value = "";
    showToast(t("promo.applied", { code: STORE.firstOrderCode.toUpperCase() }), { icon: "check" });
  }
});

document.getElementById("promoCode").addEventListener("input", (e) => {
  document.getElementById("promoError").textContent = "";
  e.target.setAttribute("aria-invalid", "false");
});

document.getElementById("promoApplied").addEventListener("click", (e) => {
  if (e.target.closest("#promoRemove")) removeDiscountCode();
});

// Rows of the summary (also used on the confirmation screen)
function summaryRowsHTML(totals) {
  const row = (label, value, cls) => `<div class="summary__row${cls ? " " + cls : ""}"><dt>${label}</dt><dd>${value}</dd></div>`;
  return [
    row(t("cart.subtotal") + " · " + countLabel(totals.count, "item"), formatPrice(totals.subtotal)),
    totals.savings ? row(t("cart.savings"), "− " + formatPrice(totals.savings), "is-saving") : "",
    totals.discount ? row(t("cart.firstDiscount") + (totals.discountCode ? ` <span class="summary__code" dir="ltr">${escapeHTML(totals.discountCode)}</span>` : ""),
      "− " + formatPrice(totals.discount), "is-saving is-discount") : "",
    row(t("cart.shipping"), totals.shipping ? formatPrice(totals.shipping) : t("cart.free")),
    totals.giftFee ? row(t("cart.giftFee"), formatPrice(totals.giftFee)) : "",
    row(t("cart.total"), formatPrice(totals.total), "is-total")
  ].join("");
}

function renderGift() {
  const gift = loadGift();
  document.getElementById("giftWrap").checked = gift.wrap;
  document.getElementById("giftCard").checked = gift.card;
  document.getElementById("giftMessage").value = gift.message;
  document.getElementById("giftMessageField").hidden = !gift.card;
  document.getElementById("giftWrapLabel").textContent = t("cart.giftWrap", { fee: STORE.giftWrapFee ? formatPrice(STORE.giftWrapFee) : t("cart.free") });
}

["giftWrap", "giftCard"].forEach((id) => document.getElementById(id).addEventListener("change", () => {
  const gift = loadGift();
  gift.wrap = document.getElementById("giftWrap").checked;
  gift.card = document.getElementById("giftCard").checked;
  saveGift(gift);
  document.getElementById("giftMessageField").hidden = !gift.card;
}));
document.getElementById("giftMessage").addEventListener("input", (e) => {
  const gift = loadGift();
  gift.message = e.target.value;
  try { localStorage.setItem(GIFT_KEY, JSON.stringify(gift)); } catch (err) { /* ignore */ }
});

function renderCartPage() {
  const totals = cartTotals();
  const hasItems = cart.length > 0;
  const showingConfirm = !document.getElementById("confirmation").hidden;

  document.getElementById("cartPage").hidden = !hasItems || showingConfirm;
  document.getElementById("cartEmpty").hidden = hasItems || showingConfirm;
  document.getElementById("cartItemCount").textContent = hasItems && !showingConfirm ? countLabel(totals.count, "item") : "";
  if (!hasItems) return;

  renderCartLines();
  renderPromo(totals);
  document.getElementById("summaryRows").innerHTML = summaryRowsHTML(totals);
  document.getElementById("reassure").innerHTML = (STORE.reassurance || [])
    .map((r) => `<li>${icon("check")}<span>${escapeHTML(localized(r, "text"))}</span></li>`).join("");
}


/* -------------------------------------------------------------------------
   2. CHECKOUT FORM
   ------------------------------------------------------------------------- */
function enabledPayments() {
  const list = (STORE.paymentMethods || []).filter((m) => m.enabled);
  return list.length ? list : [{ id: "cod", name: "Cash on delivery", name_ar: "الدفع عند الاستلام" }];
}

function renderFormOptions() {
  const select = document.getElementById("coGovernorate");
  const current = select.value;
  select.innerHTML = `<option value="">${t("checkout.choose")}</option>` +
    GOVERNORATES.map((g) => `<option value="${g.en}">${currentLang === "ar" ? g.ar : g.en}</option>`).join("");
  select.value = current;

  const box = document.getElementById("paymentOptions");
  const chosen = (box.querySelector("input:checked") || {}).value || enabledPayments()[0].id;
  box.innerHTML = enabledPayments().map((m) => `
    <label class="pay-option">
      <span class="check"><input type="radio" name="payment" value="${m.id}" ${m.id === chosen ? "checked" : ""} /><span>${escapeHTML(localized(m, "name"))}</span></span>
      ${m.note ? `<span class="pay-option__note">${escapeHTML(localized(m, "note"))}</span>` : ""}
    </label>`).join("");
}

// Returning customers don't type their details again
function prefillCustomer() {
  try {
    const saved = JSON.parse(localStorage.getItem(CUSTOMER_KEY)) || {};
    ["name", "phone", "governorate", "city", "address"].forEach((f) => {
      if (saved[f] && form.elements[f]) form.elements[f].value = saved[f];
    });
  } catch (err) { /* nothing saved */ }
}

// "٠١٠ ١٢٣٤ ٥٦٧٨" or "+20 10 1234 5678" → "01012345678". null if not a valid Egyptian mobile.
function normalizePhone(raw) {
  const digits = String(raw)
    .replace(/[٠-٩]/g, (d) => d.charCodeAt(0) - 0x0660)   // Arabic digits
    .replace(/[۰-۹]/g, (d) => d.charCodeAt(0) - 0x06F0)   // Persian digits
    .replace(/[\s\-().]/g, "");
  const match = digits.match(/^(?:\+?20|0020)?0?(1[0125]\d{8})$/);    // 010 / 011 / 012 / 015 + 8 digits
  return match ? "0" + match[1] : null;
}

function setFieldError(input, message) {
  const error = document.getElementById(input.id + "Error");
  if (!error) return;
  error.textContent = message;
  input.setAttribute("aria-invalid", message ? "true" : "false");
  if (message) input.setAttribute("aria-describedby", error.id); else input.removeAttribute("aria-describedby");
}

form.addEventListener("input", (e) => { if (e.target.id) setFieldError(e.target, ""); });

function validateCheckout() {
  const f = form.elements;
  const v = {
    name: f.name.value.trim(),
    phone: normalizePhone(f.phone.value),
    governorate: f.governorate.value,
    city: f.city.value.trim(),
    address: f.address.value.trim(),
    notes: f.notes.value.trim(),
    payment: (form.querySelector('input[name="payment"]:checked') || {}).value || enabledPayments()[0].id
  };
  const checks = [
    [f.name, v.name.length >= 3 ? "" : t("err.name")],
    [f.phone, v.phone ? "" : t("err.phone")],
    [f.governorate, v.governorate ? "" : t("err.governorate")],
    [f.city, v.city.length >= 2 ? "" : t("err.city")],
    [f.address, v.address.length >= 6 ? "" : t("err.address")]
  ];
  checks.forEach(([input, msg]) => setFieldError(input, msg));
  const first = checks.find(([, msg]) => msg);
  if (first) { first[0].focus(); first[0].scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" }); return null; }
  return v;
}


/* -------------------------------------------------------------------------
   3. PLACING THE ORDER
   ------------------------------------------------------------------------- */

// e.g. MW-20261002-4827 (date + 4 random digits, so two customers never share a number)
function makeOrderNumber() {
  const d = new Date();
  const ymd = d.getFullYear() + String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0");
  return "MW-" + ymd + "-" + String(Math.floor(1000 + Math.random() * 9000));
}

function governorateName(en) {
  const g = GOVERNORATES.find((x) => x.en === en);
  return g ? (currentLang === "ar" ? g.ar : g.en) : en;
}

function paymentName(id) {
  return localized(enabledPayments().find((m) => m.id === id) || { name: id }, "name");
}

// Everything about the order (saved on the device + sent to the Google Sheet)
function buildOrder(customer) {
  const totals = cartTotals();
  const gift = loadGift();
  const now = new Date();
  return {
    orderId: makeOrderNumber(),
    date: now.toISOString(),
    dateText: now.toLocaleString("en-GB", { timeZone: "Africa/Cairo", day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    language: currentLang,
    name: customer.name,
    phone: customer.phone,
    governorate: customer.governorate,
    city: customer.city,
    address: customer.address,
    notes: customer.notes,
    paymentMethod: customer.payment,
    paymentName: (enabledPayments().find((m) => m.id === customer.payment) || {}).name || customer.payment,
    giftWrap: gift.wrap,
    giftMessage: gift.card ? gift.message.trim() : "",
    items: cartLines().map((l) => ({
      id: l.product.id,
      brand: (getBrand(l.product.brand) || {}).name || l.product.brand,
      name: l.product.name,
      model: l.product.model || "",
      qty: l.qty,
      price: l.unit,
      originalPrice: l.unitOriginal,
      discount: l.discount,
      subtotal: l.lineTotal
    })),
    subtotal: totals.subtotal,
    savings: totals.savings,
    discount: totals.discount,                  // first order discount (EGP)
    discountCode: totals.discountCode,          // "" when it was applied automatically
    discountType: totals.discount ? (totals.discountAuto ? "first-order-auto" : "first-order-code") : "",
    shipping: totals.shipping,
    giftFee: totals.giftFee,
    total: totals.total,
    currency: STORE.currency,
    page: location.href
  };
}

// The WhatsApp message: clear sections, in the visitor's language
function orderMessage(order) {
  const lines = [];
  lines.push("*" + t("wa.orderTitle") + "*");
  lines.push(t("wa.orderNo") + ": " + order.orderId);
  lines.push(t("wa.date") + ": " + order.dateText);
  lines.push("");
  lines.push("*" + t("wa.customer") + "*");
  lines.push(t("wa.name") + ": " + order.name);
  lines.push(t("wa.phone") + ": " + order.phone);
  const comma = currentLang === "ar" ? "، " : ", ";
  lines.push(t("wa.address") + ": " + [order.address, order.city, governorateName(order.governorate)].join(comma));
  lines.push("");
  lines.push("*" + t("wa.items") + "*");
  order.items.forEach((item, i) => {
    const p = getProduct(item.id);
    lines.push((i + 1) + ". " + productTitle(p) + (item.model ? " (" + t("common.ref") + " " + item.model + ")" : ""));
    lines.push("   " + t("wa.qty") + ": " + item.qty + " × " + formatPrice(item.price));
    if (item.discount) lines.push("   " + t("wa.discount") + ": " + (currentLang === "ar" ? item.discount + "%" : "-" + item.discount + "%") + " (" + t("wa.was") + " " + formatPrice(item.originalPrice) + ")");
  });
  lines.push("");
  lines.push(t("wa.subtotal") + ": " + formatPrice(order.subtotal));
  if (order.savings) lines.push(t("wa.savings") + ": " + formatPrice(order.savings));
  if (order.discount) lines.push(t("cart.firstDiscount") + ": -" + formatPrice(order.discount) + (order.discountCode ? " (" + order.discountCode + ")" : ""));
  lines.push(t("wa.shipping") + ": " + (order.shipping ? formatPrice(order.shipping) : t("wa.free")));
  if (order.giftWrap) lines.push(t("wa.gift") + ": " + (order.giftFee ? formatPrice(order.giftFee) : t("wa.free")));
  if (order.giftMessage) lines.push(t("wa.giftCard") + ": “" + order.giftMessage + "”");
  lines.push("*" + t("wa.total") + ": " + formatPrice(order.total) + "*");
  lines.push("");
  lines.push(t("wa.payment") + ": " + paymentName(order.paymentMethod));
  if (order.notes) lines.push(t("wa.notes") + ": " + order.notes);
  lines.push("");
  lines.push(t("wa.confirm"));
  return lines.join("\n");
}

// Sends the order to the Google Apps Script. true = saved in the sheet.
async function sendOrderToSheet(order) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(STORE.ordersEndpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },   // avoids a "preflight" request Google doesn't support
      body: JSON.stringify(order),
      signal: controller.signal
    });
    const data = await res.json();
    return data && data.ok === true;
  } catch (err) {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

function saveOrderLocally(order) {
  try {
    const list = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
    list.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(list.slice(0, 20)));
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify({ name: order.name, phone: order.phone, governorate: order.governorate, city: order.city, address: order.address }));
    sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
  } catch (err) { /* storage blocked: the order still goes to WhatsApp */ }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!cart.length) return;
  if (form.elements.website.value) return;   // spam bot

  const customer = validateCheckout();
  if (!customer) return;

  const order = buildOrder(customer);
  order.message = orderMessage(order);
  const waUrl = whatsappLink(order.message);
  saveOrderLocally(order);

  // Browsers only allow opening a tab during the click itself, so the WhatsApp
  // tab is opened right away and sent to WhatsApp once the sheet has the order.
  let waTab = null;
  if (STORE.ordersEndpoint) {
    try { waTab = window.open("", "_blank"); } catch (err) { waTab = null; }
    const btn = document.getElementById("confirmBtn");
    btn.disabled = true;
    document.getElementById("confirmLabel").textContent = t("checkout.sending");
    order.savedToSheet = await sendOrderToSheet(order);
    btn.disabled = false;
    document.getElementById("confirmLabel").textContent = t("checkout.confirm");
    if (waTab && !waTab.closed) { waTab.opener = null; waTab.location.href = waUrl; }
  } else {
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }

  // Only now (order confirmed) is the cart emptied
  removeDiscountCode(true);   // the code was used on this order
  clearCart();
  saveGift({ wrap: false, card: false, message: "" });
  form.elements.notes.value = "";
  showConfirmation(order);
});


/* -------------------------------------------------------------------------
   4. CONFIRMATION
   ------------------------------------------------------------------------- */
let confirmedOrder = null;

function showConfirmation(order) {
  confirmedOrder = order;
  const box = document.getElementById("confirmation");
  box.hidden = false;
  document.getElementById("cartPage").hidden = true;
  document.getElementById("cartEmpty").hidden = true;
  document.getElementById("cartItemCount").textContent = "";
  document.getElementById("cartHeading").textContent = t("confirm.title");
  renderConfirmation();
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  box.focus({ preventScroll: true });
}

function renderConfirmation() {
  if (!confirmedOrder) return;
  const o = confirmedOrder;
  document.getElementById("confirmNumber").textContent = o.orderId;
  document.getElementById("resendWhatsapp").href = whatsappLink(o.message || orderMessage(o));
  document.getElementById("trackOrder").href = whatsappLink(t("wa.hello", { store: STORE.name }) + "\n" + t("wa.track", { id: o.orderId }));
  document.getElementById("confirmSummary").innerHTML = summaryRowsHTML({
    count: o.items.reduce((s, i) => s + i.qty, 0), subtotal: o.subtotal, savings: o.savings,
    discount: o.discount || 0, discountCode: o.discountCode || "", shipping: o.shipping, giftFee: o.giftFee, total: o.total
  });
}

document.getElementById("copyOrder").addEventListener("click", async () => {
  if (!confirmedOrder) return;
  const id = confirmedOrder.orderId;
  try {
    await navigator.clipboard.writeText(id);
  } catch (err) {
    // older browsers: copy through a hidden text box
    const tmp = document.createElement("textarea");
    tmp.value = id;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand("copy");
    tmp.remove();
  }
  showToast(t("common.copied") + ": " + id, { icon: "copy" });
});


/* -------------------------------------------------------------------------
   START
   ------------------------------------------------------------------------- */
function renderAll() {
  setPageMeta({ title: t("meta.cart"), description: t("cart.emptyText") });
  renderFormOptions();
  renderGift();
  renderCartPage();
  renderConfirmation();
}

renderFormOptions();
prefillCustomer();

// Coming back to this page right after ordering (e.g. from WhatsApp): show the confirmation again
try {
  const last = JSON.parse(sessionStorage.getItem(LAST_ORDER_KEY));
  if (last && !cart.length) showConfirmation(last);
} catch (err) { /* ignore */ }

renderAll();
document.addEventListener("cartchange", renderCartPage);
document.addEventListener("languagechange", () => {
  renderAll();
  if (confirmedOrder) document.getElementById("cartHeading").textContent = t("confirm.title");
});
