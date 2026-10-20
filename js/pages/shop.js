/* =========================================================================
   MAD WATCHES — SHOP PAGE (products.html)
   -------------------------------------------------------------------------
   Filters sidebar (a drawer on phones), sorting, active-filter chips,
   result count, "Load more", 2/3/4-column view and an empty state.
   The filtering logic itself is in js/filters.js.
   ========================================================================= */

const PAGE_SIZE = 12;
const COLS_KEY = "madwatches-cols";
const PRICE = priceBounds();
const DIAL_SWATCH = {
  black: "#121417", blue: "#2C5EA8", white: "#F4F5F7", silver: "#C9CED6", grey: "#7D8590", green: "#2F6B4F",
  gold: "#C9A54C", rose: "#D9A08F", brown: "#6E4A33", champagne: "#E2CFA5", red: "#A8322D"
};

let state = readFilterState(location.search);
let shown = PAGE_SIZE;
let firstRender = true;

const form = document.getElementById("filterForm");
const grid = document.getElementById("shopGrid");
const filtersEl = document.getElementById("filters");


/* -------------------------------------------------------------------------
   FILTER SIDEBAR (built once, then only the counts are updated)
   ------------------------------------------------------------------------- */
function group(key, title, body, open) {
  return `<details class="fgroup" data-group="${key}"${open ? " open" : ""}>
    <summary class="fgroup__title">${title}<span class="fgroup__selected" data-selected="${key}"></span></summary>
    <div class="fgroup__body">${body}</div>
  </details>`;
}

function checkList(key, options, labelOf) {
  return options.map((v) => `
    <label class="check">
      <input type="checkbox" name="${key}" value="${v}" ${state[key].includes(v) ? "checked" : ""} />
      <span>${escapeHTML(labelOf(v))}</span><span class="check__count" data-count="${key}:${v}"></span>
    </label>`).join("");
}

function buildFilterForm() {
  const minPos = priceToSlider(state.min ?? PRICE.min, PRICE);
  const maxPos = priceToSlider(state.max ?? PRICE.max, PRICE);

  form.innerHTML = `
    <div class="fgroup fgroup--search">
      <label class="visually-hidden" for="fSearch">${t("shop.searchLabel")}</label>
      <div class="fsearch">${icon("search")}<input class="input" id="fSearch" type="search" value="${escapeHTML(state.q)}" placeholder="${escapeHTML(t("shop.searchPlaceholder"))}" autocomplete="off" /></div>
    </div>

    ${group("brand", t("shop.brand"), `<div class="fgroup__scroll">${checkList("brand", stockedBrands().map((b) => b.id), (id) => brandName(id))}</div>`, true)}

    ${group("price", t("shop.price"), `
      <div class="range" style="--lo:${minPos / SLIDER_STEPS};--hi:${maxPos / SLIDER_STEPS}">
        <div class="range__track"><span class="range__fill"></span></div>
        <input type="range" id="priceLo" min="0" max="${SLIDER_STEPS}" value="${minPos}" aria-label="${t("shop.min")}" />
        <input type="range" id="priceHi" min="0" max="${SLIDER_STEPS}" value="${maxPos}" aria-label="${t("shop.max")}" />
      </div>
      <div class="range__inputs">
        <label><span>${t("shop.min")}</span><input class="input" id="priceMin" type="number" inputmode="numeric" min="${PRICE.min}" max="${PRICE.max}" step="50" value="${state.min ?? PRICE.min}" /></label>
        <span aria-hidden="true">—</span>
        <label><span>${t("shop.max")}</span><input class="input" id="priceMax" type="number" inputmode="numeric" min="${PRICE.min}" max="${PRICE.max}" step="50" value="${state.max ?? PRICE.max}" /></label>
      </div>`, true)}

    ${group("gender", t("shop.gender"), checkList("gender", MULTI_FILTERS.gender.options, (v) => t("gender." + v)), true)}
    ${group("style", t("shop.style"), checkList("style", MULTI_FILTERS.style.options, (v) => t("style." + v)), true)}
    ${group("strap", t("shop.strap"), checkList("strap", MULTI_FILTERS.strap.options, (v) => t("strap." + v)))}
    ${group("movement", t("shop.movement"), checkList("movement", MULTI_FILTERS.movement.options, (v) => t("movement." + v)))}
    ${group("size", t("shop.size"), checkList("size", MULTI_FILTERS.size.options, (v) => t("size." + v)))}

    ${group("dial", t("shop.dial"), `<div class="swatches">${MULTI_FILTERS.dial.options.map((v) => `
      <button type="button" class="swatch" data-dial="${v}" aria-pressed="${state.dial.includes(v)}" title="${t("dial." + v)}" style="--swatch:${DIAL_SWATCH[v]}">
        <span class="visually-hidden">${t("dial." + v)}</span>
      </button>`).join("")}</div>`)}

    ${group("wr", t("shop.water"), WATER_OPTIONS.map((m) => `
      <label class="check">
        <input type="radio" name="wr" value="${m}" ${state.wr === m ? "checked" : ""} />
        <span>${m ? t("shop.waterAtLeast", { m }) : t("shop.anyWater")}</span><span class="check__count" data-count="wr:${m}"></span>
      </label>`).join(""))}

    ${group("availability", t("shop.availability"), `
      <label class="switch"><span>${t("shop.inStockOnly")} <span class="check__count" data-count="stock"></span></span><input type="checkbox" name="stock" ${state.stock ? "checked" : ""} /></label>
      <label class="switch"><span>${t("shop.onSaleOnly")} <span class="check__count" data-count="sale"></span></span><input type="checkbox" name="sale" ${state.sale ? "checked" : ""} /></label>`, true)}`;
}

// Counts next to each option + options with no results are dimmed
function updateFilterCounts() {
  const counts = facetCounts(state);
  form.querySelectorAll("[data-count]").forEach((el) => {
    const [key, value] = el.dataset.count.split(":");
    const n = value === undefined ? counts[key] : (counts[key] || {})[value] || 0;
    el.textContent = n;
    const input = el.closest("label").querySelector("input");
    el.closest("label").classList.toggle("is-empty", n === 0 && !input.checked);
  });
  form.querySelectorAll(".swatch").forEach((sw) => {
    const n = counts.dial[sw.dataset.dial] || 0;
    sw.classList.toggle("is-empty", n === 0 && sw.getAttribute("aria-pressed") !== "true");
    sw.title = t("dial." + sw.dataset.dial) + " (" + n + ")";
  });
  form.querySelectorAll("[data-selected]").forEach((el) => {
    const key = el.dataset.selected;
    const n = MULTI_FILTERS[key] ? state[key].length : key === "price" ? (state.min !== null || state.max !== null ? 1 : 0) : key === "wr" ? (state.wr ? 1 : 0) : 0;
    el.textContent = n ? n : "";
  });
}


/* -------------------------------------------------------------------------
   RESULTS
   ------------------------------------------------------------------------- */
function priceLabel(v, edge) {
  return formatPrice(v ?? edge);
}

// Chips for every active filter (click × to remove one)
function renderChips() {
  const chips = [];
  const chip = (label, data) => chips.push(`<button type="button" class="chip is-active" data-remove="${data}" aria-label="${escapeHTML(t("shop.removeFilter", { name: label }))}">${escapeHTML(label)} ${icon("close")}</button>`);
  if (state.q) chip(t("shop.searchChip", { q: state.q }), "q");
  state.brand.forEach((v) => chip(brandName(v), "brand:" + v));
  if (state.min !== null || state.max !== null) chip(t("shop.priceChip", { min: priceLabel(state.min, PRICE.min), max: priceLabel(state.max, PRICE.max) }), "price");
  ["gender", "style", "strap", "movement", "size", "dial"].forEach((k) => state[k].forEach((v) => chip(t((k === "size" ? "size." : k === "dial" ? "dial." : k + ".") + v), k + ":" + v)));
  if (state.wr) chip(t("shop.waterAtLeast", { m: state.wr }), "wr");
  if (state.stock) chip(t("shop.inStockOnly"), "stock");
  if (state.sale) chip(t("shop.onSaleOnly"), "sale");
  const box = document.getElementById("activeChips");
  box.innerHTML = chips.length ? chips.join("") + `<button type="button" class="link" data-clear-filters>${t("shop.clearAll")}</button>` : "";
  box.hidden = chips.length === 0;
}

// Title, intro and breadcrumbs change when exactly one brand is selected
function renderHeading() {
  const brand = state.brand.length === 1 ? getBrand(state.brand[0]) : null;
  const title = brand ? t("shop.titleBrand", { brand: localized(brand, "name") }) : t("shop.title");
  document.getElementById("shopTitle").textContent = title;
  const lead = document.getElementById("shopLead");
  lead.textContent = brand ? localized(brand, "story") : "";
  lead.hidden = !brand;
  document.getElementById("shopCrumbs").innerHTML =
    `<li><a href="index.html">${t("nav.home")}</a></li>` +
    (brand ? `<li><a href="brands.html">${t("nav.brands")}</a></li><li aria-current="page">${escapeHTML(localized(brand, "name"))}</li>`
           : `<li aria-current="page">${t("nav.shop")}</li>`);
  setPageMeta(brand
    ? { title: t("meta.brandShop", { brand: localized(brand, "name") }), description: localized(brand, "story"), path: brandShopUrl(brand.id) }
    : { title: t("meta.shop"), description: t("meta.shopDesc"), path: "products.html" });
}

// No watches in the catalog yet: one "Coming soon" message instead of filters and results
function renderComingSoon() {
  renderHeading();
  document.querySelector(".shop").classList.add("shop--soon");
  filtersEl.hidden = true;
  document.querySelector(".shop__bar").hidden = true;
  ["activeChips", "loadMoreBox", "noResults"].forEach((id) => (document.getElementById(id).hidden = true));
  grid.innerHTML = comingSoonHTML();
}

function render(opts) {
  opts = opts || {};
  if (catalogIsEmpty()) { renderComingSoon(); return; }
  const list = filterProducts(state);
  const total = list.length;
  shown = Math.min(Math.max(shown, PAGE_SIZE), Math.max(total, PAGE_SIZE));

  renderHeading();
  updateFilterCounts();
  renderChips();

  const countText = total === 1 ? t("shop.result1") : t("shop.results", { n: total });
  document.getElementById("resultCount").textContent = countText;
  document.getElementById("filtersApply").textContent = t("shop.apply", { n: total });
  const active = activeFilterCount(state);
  document.getElementById("filterCount").textContent = active ? "(" + active + ")" : "";

  // cards: only the newly loaded ones animate in when "Load more" is used
  const from = opts.appendFrom || 0;
  const visible = list.slice(0, shown);
  if (from > 0) {
    grid.insertAdjacentHTML("beforeend", visible.slice(from).map((p, i) => productCardHTML(p, from + i, { noReveal: true, enter: true, enterIndex: i })).join(""));
  } else {
    grid.innerHTML = visible.map((p, i) => productCardHTML(p, i, { noReveal: true, enter: true, enterIndex: i, eager: firstRender && i < 2 })).join("");
    firstRender = false;   // only the very first photos load straight away (faster first view)
  }

  document.getElementById("noResults").hidden = total > 0;
  const more = document.getElementById("loadMoreBox");
  more.hidden = total === 0;
  document.getElementById("loadMore").hidden = shown >= total;
  document.getElementById("showingText").textContent = t("shop.showing", { shown: Math.min(shown, total), total });
  document.getElementById("showingBar").style.width = (total ? Math.min(shown, total) / total * 100 : 0) + "%";

  document.getElementById("sortSelect").value = state.sort;
}

/* ---------- keep the address bar in sync ---------- */
let urlTimer;
function commit(delay) {
  clearTimeout(urlTimer);
  const save = () => {
    const url = "products.html" + filterStateToQuery(state);
    if (url !== location.pathname.split("/").pop() + location.search) history.pushState(null, "", url);
  };
  if (delay) urlTimer = setTimeout(save, delay); else save();
}

function update(delay) {
  shown = PAGE_SIZE;
  render();
  commit(delay);
}


/* -------------------------------------------------------------------------
   EVENTS
   ------------------------------------------------------------------------- */
let searchTimer;
form.addEventListener("input", (e) => {
  const el = e.target;
  if (el.id === "fSearch") {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { state.q = el.value.trim(); update(600); }, 250);
    return;
  }
  if (el.id === "priceLo" || el.id === "priceHi") {
    const lo = document.getElementById("priceLo"), hi = document.getElementById("priceHi");
    if (Number(lo.value) > Number(hi.value) - 10) {
      if (el === lo) lo.value = Number(hi.value) - 10; else hi.value = Number(lo.value) + 10;
    }
    const minV = sliderToPrice(Number(lo.value), PRICE), maxV = sliderToPrice(Number(hi.value), PRICE);
    state.min = minV <= PRICE.min ? null : minV;
    state.max = maxV >= PRICE.max ? null : maxV;
    document.getElementById("priceMin").value = minV;
    document.getElementById("priceMax").value = maxV;
    el.closest(".range").style.setProperty("--lo", lo.value / SLIDER_STEPS);
    el.closest(".range").style.setProperty("--hi", hi.value / SLIDER_STEPS);
    update(600);
  }
});

form.addEventListener("change", (e) => {
  const el = e.target;
  if (MULTI_FILTERS[el.name]) {
    state[el.name] = [...form.querySelectorAll(`input[name="${el.name}"]:checked`)].map((i) => i.value);
    update();
  } else if (el.name === "wr") {
    state.wr = Number(el.value);
    update();
  } else if (el.name === "stock" || el.name === "sale") {
    state[el.name] = el.checked;
    update();
  } else if (el.id === "priceMin" || el.id === "priceMax") {
    const minV = Math.max(PRICE.min, Number(document.getElementById("priceMin").value) || PRICE.min);
    const maxV = Math.min(PRICE.max, Number(document.getElementById("priceMax").value) || PRICE.max);
    state.min = minV > PRICE.min ? Math.min(minV, maxV) : null;
    state.max = maxV < PRICE.max ? Math.max(minV, maxV) : null;
    const range = form.querySelector(".range");
    document.getElementById("priceLo").value = priceToSlider(state.min ?? PRICE.min, PRICE);
    document.getElementById("priceHi").value = priceToSlider(state.max ?? PRICE.max, PRICE);
    range.style.setProperty("--lo", document.getElementById("priceLo").value / SLIDER_STEPS);
    range.style.setProperty("--hi", document.getElementById("priceHi").value / SLIDER_STEPS);
    update();
  }
});

// dial color swatches
form.addEventListener("click", (e) => {
  const sw = e.target.closest(".swatch");
  if (!sw) return;
  const on = sw.getAttribute("aria-pressed") !== "true";
  sw.setAttribute("aria-pressed", on);
  state.dial = on ? state.dial.concat(sw.dataset.dial) : state.dial.filter((d) => d !== sw.dataset.dial);
  update();
});

// remove one chip / clear everything
document.addEventListener("click", (e) => {
  const remove = e.target.closest("[data-remove]");
  if (remove) {
    const [key, value] = remove.dataset.remove.split(":");
    if (key === "q") state.q = "";
    else if (key === "price") { state.min = null; state.max = null; }
    else if (key === "wr") state.wr = 0;
    else if (key === "stock" || key === "sale") state[key] = false;
    else state[key] = state[key].filter((v) => v !== value);
    buildFilterForm();
    update();
    return;
  }
  if (e.target.closest("[data-clear-filters]")) {
    const sort = state.sort;
    state = emptyFilterState();
    state.sort = sort;
    buildFilterForm();
    update();
  }
});

document.getElementById("sortSelect").addEventListener("change", (e) => {
  state.sort = e.target.value;
  update();
});

document.getElementById("loadMore").addEventListener("click", () => {
  const from = shown;
  shown += PAGE_SIZE;
  render({ appendFrom: from });
  const next = grid.children[from];
  if (next) next.querySelector(".card__name a").focus({ preventScroll: true });
});

// 2 / 3 / 4 columns (desktop), remembered on this device
function setCols(n) {
  grid.dataset.cols = n;
  document.querySelectorAll(".view-toggle button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.cols === String(n)));
  try { localStorage.setItem(COLS_KEY, n); } catch (err) { /* ignore */ }
}
document.querySelector(".view-toggle").addEventListener("click", (e) => {
  const b = e.target.closest("[data-cols]");
  if (b) setCols(b.dataset.cols);
});

// Back / forward buttons: read the filters from the address again
window.addEventListener("popstate", () => {
  state = readFilterState(location.search);
  shown = PAGE_SIZE;
  buildFilterForm();
  render();
});

/* ---------- phones: filters slide in as a drawer ---------- */
const openBtn = document.getElementById("openFilters");
function setFilters(open) {
  filtersEl.classList.toggle("is-open", open);
  openBtn.setAttribute("aria-expanded", open);
  lockScroll(open);
  if (open) setTimeout(() => filtersEl.querySelector(".filters__close").focus(), 60);
  else openBtn.focus({ preventScroll: true });
}
openBtn.addEventListener("click", () => setFilters(true));
filtersEl.addEventListener("click", (e) => { if (e.target.closest("[data-close-filters]")) setFilters(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && filtersEl.classList.contains("is-open")) setFilters(false); });


/* -------------------------------------------------------------------------
   START
   ------------------------------------------------------------------------- */
function renderSortOptions() {
  document.getElementById("sortSelect").innerHTML = Object.keys(SORTS)
    .map((k) => `<option value="${k}">${t(SORT_LABELS[k])}</option>`).join("");
}

let savedCols = 3;
try { savedCols = Number(localStorage.getItem(COLS_KEY)) || 3; } catch (err) { /* ignore */ }
setCols([2, 3, 4].includes(savedCols) ? savedCols : 3);
renderSortOptions();
buildFilterForm();
render();

document.addEventListener("languagechange", () => {
  renderSortOptions();
  buildFilterForm();
  render();
});
