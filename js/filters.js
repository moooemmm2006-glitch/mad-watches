/* =========================================================================
   MAD WATCHES — SHOP FILTERS (logic only, used by js/pages/shop.js)
   -------------------------------------------------------------------------
   Every filter and the sort order are kept in the page address, e.g.
     products.html?brand=seiko,casio&max=20000&style=diver&sort=price-asc
   so a filtered page can be shared, bookmarked, and the Back button works.

   You don't need to edit this file. To add a new option to a filter, use
   the allowed values listed in js/products.js (and add its label in i18n.js).
   ========================================================================= */

// Checkbox filters: URL name → product field (or a function)
const MULTI_FILTERS = {
  brand:    { field: "brand" },
  gender:   { field: "gender",   options: ["men", "women", "unisex"] },
  style:    { field: "style",    options: ["luxury", "dress", "sport", "casual", "diver", "smart"] },
  strap:    { field: "strap",    options: ["steel", "leather", "rubber", "fabric", "gold"] },
  movement: { field: "movement", options: ["automatic", "quartz", "smart"] },
  size:     { get: (p) => caseSizeGroup(p), options: ["small", "medium", "large"] },
  dial:     { field: "dialColor", options: ["black", "blue", "white", "silver", "grey", "green", "gold", "rose", "brown", "champagne", "red"] }
};

const WATER_OPTIONS = [0, 50, 100, 200];   // "at least" in metres (0 = any)

const SORTS = {
  "featured":   (a, b) => (b.isFeatured - a.isFeatured) || String(b.createdAt || "").localeCompare(String(a.createdAt || "")),
  "newest":     (a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")),
  "price-asc":  (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "discount":   (a, b) => discountPercent(b) - discountPercent(a) || savingAmount(b) - savingAmount(a),
  "name":       (a, b) => localized(a, "name").localeCompare(localized(b, "name"), currentLang)
};
const SORT_LABELS = { "featured": "sort.featured", "newest": "sort.newest", "price-asc": "sort.priceAsc", "price-desc": "sort.priceDesc", "discount": "sort.discount", "name": "sort.name" };

// small < 36 mm, medium 36–41 mm, large > 41 mm
function caseSizeGroup(p) {
  if (!p.caseSize) return "";
  if (p.caseSize < 36) return "small";
  if (p.caseSize <= 41) return "medium";
  return "large";
}

// Lowest and highest price in the shop (rounded to nice numbers)
function priceBounds() {
  const prices = PRODUCTS.map((p) => p.price);
  if (!prices.length) return { min: 0, max: 0 };   // empty catalog
  return { min: Math.floor(Math.min(...prices) / 100) * 100, max: Math.ceil(Math.max(...prices) / 1000) * 1000 };
}

function emptyFilterState() {
  const state = { q: "", min: null, max: null, wr: 0, stock: false, sale: false, sort: "featured" };
  Object.keys(MULTI_FILTERS).forEach((k) => (state[k] = []));
  return state;
}

/* ---------- address bar ⇄ filters ---------- */
function readFilterState(search) {
  const params = new URLSearchParams(search);
  const state = emptyFilterState();
  state.q = (params.get("q") || "").trim();
  Object.keys(MULTI_FILTERS).forEach((k) => {
    state[k] = (params.get(k) || "").split(",").map((v) => v.trim()).filter(Boolean);
  });
  const num = (v) => (v !== null && v !== "" && !isNaN(Number(v)) ? Number(v) : null);
  state.min = num(params.get("min"));
  state.max = num(params.get("max"));
  state.wr = WATER_OPTIONS.includes(Number(params.get("wr"))) ? Number(params.get("wr")) : 0;
  state.stock = params.get("stock") === "1";
  state.sale = params.get("sale") === "1";
  state.sort = SORTS[params.get("sort")] ? params.get("sort") : "featured";
  return state;
}

function filterStateToQuery(state) {
  const params = new URLSearchParams();
  if (state.q) params.set("q", state.q);
  Object.keys(MULTI_FILTERS).forEach((k) => { if (state[k].length) params.set(k, state[k].join(",")); });
  if (state.min !== null) params.set("min", state.min);
  if (state.max !== null) params.set("max", state.max);
  if (state.wr) params.set("wr", state.wr);
  if (state.stock) params.set("stock", "1");
  if (state.sale) params.set("sale", "1");
  if (state.sort !== "featured") params.set("sort", state.sort);
  const q = params.toString();
  return q ? "?" + q.replace(/%2C/g, ",") : "";
}

/* ---------- filtering ---------- */
function valueOf(p, key) {
  const f = MULTI_FILTERS[key];
  return f.get ? f.get(p) : p[f.field];
}

// skip: leave one filter out (used to count options of that filter)
function matchesFilters(p, state, skip) {
  if (state.q && skip !== "q") {
    const words = normalizeText(state.q).split(" ").filter(Boolean);
    const text = productSearchText(p);
    if (!words.every((w) => text.includes(w))) return false;
  }
  for (const key of Object.keys(MULTI_FILTERS)) {
    if (key !== skip && state[key].length && !state[key].includes(valueOf(p, key))) return false;
  }
  if (skip !== "price") {
    if (state.min !== null && p.price < state.min) return false;
    if (state.max !== null && p.price > state.max) return false;
  }
  if (skip !== "wr" && state.wr && (p.waterResistance || 0) < state.wr) return false;
  if (skip !== "stock" && state.stock && !isInStock(p)) return false;
  if (skip !== "sale" && state.sale && discountPercent(p) === 0) return false;
  return true;
}

function filterProducts(state) {
  return PRODUCTS.filter((p) => matchesFilters(p, state)).sort(SORTS[state.sort] || SORTS.featured);
}

// How many results each option would give (with the other filters applied)
function facetCounts(state) {
  const counts = {};
  Object.keys(MULTI_FILTERS).forEach((key) => {
    counts[key] = {};
    PRODUCTS.filter((p) => matchesFilters(p, state, key)).forEach((p) => {
      const v = valueOf(p, key);
      counts[key][v] = (counts[key][v] || 0) + 1;
    });
  });
  counts.wr = {};
  const forWater = PRODUCTS.filter((p) => matchesFilters(p, state, "wr"));
  WATER_OPTIONS.forEach((m) => (counts.wr[m] = forWater.filter((p) => (p.waterResistance || 0) >= m).length));
  counts.stock = PRODUCTS.filter((p) => matchesFilters(p, state, "stock") && isInStock(p)).length;
  counts.sale = PRODUCTS.filter((p) => matchesFilters(p, state, "sale") && discountPercent(p) > 0).length;
  return counts;
}

// Number of active filters (for the "Filters (3)" button)
function activeFilterCount(state) {
  let n = Object.keys(MULTI_FILTERS).reduce((sum, k) => sum + state[k].length, 0);
  if (state.q) n++;
  if (state.min !== null || state.max !== null) n++;
  if (state.wr) n++;
  if (state.stock) n++;
  if (state.sale) n++;
  return n;
}

/* ---------- price slider on a curved (logarithmic) scale ----------
   Prices go from ~EGP 1,000 to over a million, so equal steps on the slider
   would make cheap watches impossible to pick. Position 0–1000 → price. */
const SLIDER_STEPS = 1000;

function sliderToPrice(pos, bounds) {
  const lo = Math.log(Math.max(bounds.min, 1)), hi = Math.log(bounds.max);
  const raw = Math.exp(lo + (hi - lo) * (pos / SLIDER_STEPS));
  const step = raw < 5000 ? 50 : raw < 50000 ? 500 : raw < 500000 ? 5000 : 50000;
  return Math.min(bounds.max, Math.max(bounds.min, Math.round(raw / step) * step));
}

function priceToSlider(price, bounds) {
  const lo = Math.log(Math.max(bounds.min, 1)), hi = Math.log(bounds.max);
  const v = Math.min(bounds.max, Math.max(bounds.min, price));
  return Math.round((Math.log(v) - lo) / (hi - lo) * SLIDER_STEPS);
}
