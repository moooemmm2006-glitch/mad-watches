/* =========================================================================
   MAD WATCHES — CART (shared by every page)
   -------------------------------------------------------------------------
   The cart is saved in the browser, so it stays after a refresh and on
   every page:  [{ id: "rolex-submariner", qty: 1 }, ...]

   Prices come from STORE in js/products.js:
     STORE.shippingFee, STORE.giftWrapFee,
     STORE.firstOrderDiscount + STORE.firstOrderCode (first order discount)
   ========================================================================= */

const CART_KEY = "madwatches-cart";
const GIFT_KEY = "madwatches-gift";
const PROMO_KEY = "madwatches-promo";     // the discount code typed in the cart
const ORDERS_KEY = "madwatches-orders";   // orders placed on this device (js/pages/cart-page.js)

let cart = loadCart();

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    return saved.filter((item) => getProduct(item.id) && item.qty > 0);  // drop removed products
  } catch (err) {
    return [];
  }
}

function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (err) { /* private mode */ }
  updateCartBadges();
  document.dispatchEvent(new CustomEvent("cartchange"));
}

// Most you can order of one watch (its stock, or 10)
function maxQty(p) {
  return typeof p.stockCount === "number" && p.stockCount > 0 ? Math.min(p.stockCount, 10) : 10;
}

function cartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function addToCart(productId, qty) {
  const p = getProduct(productId);
  if (!p || !isInStock(p)) return;
  qty = Math.max(1, qty || 1);

  const item = cart.find((i) => i.id === productId);
  if (item) item.qty = Math.min(maxQty(p), item.qty + qty);
  else cart.push({ id: productId, qty: Math.min(maxQty(p), qty) });
  saveCart();

  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.classList.remove("bump");
    void el.offsetWidth;   // restart the little bump animation
    el.classList.add("bump");
  });
  showToast(t("common.added", { name: localized(p, "name") }), {
    icon: "bag",
    link: { href: "cart.html", label: t("common.viewCart") }
  });
}

function setCartQty(productId, qty) {
  const item = cart.find((i) => i.id === productId);
  if (!item) return;
  const p = getProduct(productId);
  if (qty <= 0) cart = cart.filter((i) => i.id !== productId);
  else item.qty = Math.min(maxQty(p), qty);
  saveCart();
}

function removeFromCart(productId) {
  cart = cart.filter((i) => i.id !== productId);
  saveCart();
}

function clearCart() {
  cart = [];
  saveCart();
}

/* ---------- Gift options (wrapping + message card) ---------- */
function loadGift() {
  try {
    return Object.assign({ wrap: false, card: false, message: "" }, JSON.parse(localStorage.getItem(GIFT_KEY)) || {});
  } catch (err) {
    return { wrap: false, card: false, message: "" };
  }
}

function saveGift(gift) {
  try { localStorage.setItem(GIFT_KEY, JSON.stringify(gift)); } catch (err) { /* ignore */ }
  document.dispatchEvent(new CustomEvent("cartchange"));
}

/* ---------- First order discount ----------
   Applied automatically when this device has no previous order, or when the
   customer types STORE.firstOrderCode. Only one discount per order. */
function hasPreviousOrder() {
  try {
    const list = JSON.parse(localStorage.getItem(ORDERS_KEY));
    return Array.isArray(list) && list.length > 0;
  } catch (err) {
    return false;
  }
}

function savedDiscountCode() {
  try { return localStorage.getItem(PROMO_KEY) || ""; } catch (err) { return ""; }
}

// { amount, code, auto } or null when no discount applies
function firstOrderDiscount() {
  const amount = Number(STORE.firstOrderDiscount) || 0;
  if (amount <= 0) return null;
  const code = savedDiscountCode();
  if (code && code === String(STORE.firstOrderCode || "").toUpperCase()) return { amount, code, auto: false };
  if (!hasPreviousOrder()) return { amount, code: "", auto: true };
  return null;
}

// "ok" | "empty" | "invalid" | "already"
function applyDiscountCode(input) {
  const code = String(input || "").trim().toUpperCase();
  if (!code) return "empty";
  if (!STORE.firstOrderCode || !(Number(STORE.firstOrderDiscount) > 0) || code !== String(STORE.firstOrderCode).toUpperCase()) return "invalid";
  if (firstOrderDiscount()) return "already";
  try { localStorage.setItem(PROMO_KEY, code); } catch (err) { /* ignore */ }
  document.dispatchEvent(new CustomEvent("cartchange"));
  return "ok";
}

function removeDiscountCode(silent) {
  try { localStorage.removeItem(PROMO_KEY); } catch (err) { /* ignore */ }
  if (!silent) document.dispatchEvent(new CustomEvent("cartchange"));
}

/* ---------- Lines + totals ---------- */
// Every cart row with its prices worked out
function cartLines() {
  return cart.map((item) => {
    const p = getProduct(item.id);
    const original = p.originalPrice > p.price ? p.originalPrice : p.price;
    return {
      product: p,
      qty: item.qty,
      unit: p.price,
      unitOriginal: original,
      discount: discountPercent(p),
      lineTotal: p.price * item.qty,
      lineSaving: (original - p.price) * item.qty
    };
  });
}

// Subtotal, savings, first order discount, shipping, gift wrap and total
function cartTotals() {
  const lines = cartLines();
  const gift = loadGift();
  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const savings = lines.reduce((s, l) => s + l.lineSaving, 0);
  const promo = lines.length ? firstOrderDiscount() : null;
  const discount = promo ? Math.min(promo.amount, subtotal) : 0;   // never more than the subtotal
  const shipping = lines.length ? (STORE.shippingFee || 0) : 0;
  const giftFee = lines.length && gift.wrap ? (STORE.giftWrapFee || 0) : 0;
  return {
    count: cartCount(),
    subtotal,
    savings,
    discount,
    discountCode: promo ? promo.code : "",
    discountAuto: promo ? promo.auto : false,
    shipping,
    giftFee,
    total: Math.max(0, subtotal - discount + shipping + giftFee)
  };
}

/* ---------- Count badges in the navbar ---------- */
function updateCartBadges() {
  const n = cartCount();
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = n;
    el.classList.toggle("has-items", n > 0);
  });
}

// Keep tabs in sync (cart changed in another tab)
window.addEventListener("storage", (e) => {
  if (e.key === CART_KEY || e.key === GIFT_KEY || e.key === PROMO_KEY || e.key === ORDERS_KEY) {
    cart = loadCart();
    updateCartBadges();
    document.dispatchEvent(new CustomEvent("cartchange"));
  }
});
