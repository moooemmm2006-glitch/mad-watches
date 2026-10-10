/* =========================================================================
   MAD WATCHES — HOME PAGE (index.html)
   -------------------------------------------------------------------------
     1. Hero watch: hands show the real time, the sub-dial ticks seconds
     2. Featured collection (products with isFeatured: true)
     3. Current offers (products with an originalPrice) + countdown
     4. Brand strip
     5. Real customer reviews (Instagram button + optional video)
     6. "Follow our world" social cards + WhatsApp chat strip
     7. Store info for search engines (links + hours read from STORE)
   ========================================================================= */


/* -------------------------------------------------------------------------
   1. HERO WATCH
   ------------------------------------------------------------------------- */
function startHeroWatch() {
  const hour = document.getElementById("hwHour");
  const minute = document.getElementById("hwMinute");
  const second = document.getElementById("hwSecond");
  if (!hour) return;
  let turns = 0, last = -1;   // keeps the second hand going forward at :00

  function tick() {
    const now = new Date();
    const s = now.getSeconds();
    const m = now.getMinutes() + s / 60;
    const h = (now.getHours() % 12) + m / 60;
    if (s < last) turns++;
    last = s;
    hour.style.transform = `rotate(${h * 30}deg)`;
    minute.style.transform = `rotate(${m * 6}deg)`;
    second.style.transform = `rotate(${turns * 360 + s * 6}deg)`;
    setTimeout(tick, 1000 - (Date.now() % 1000));
  }
  tick();
}


/* -------------------------------------------------------------------------
   2–5. SECTIONS
   ------------------------------------------------------------------------- */
function renderFeatured() {
  const grid = document.getElementById("featuredGrid");
  let list = PRODUCTS.filter((p) => p.isFeatured);
  if (list.length < 4) list = list.concat(PRODUCTS.filter((p) => !p.isFeatured)).slice(0, 8);
  grid.innerHTML = list.slice(0, 8).map((p, i) => productCardHTML(p, i)).join("");
  observeReveals(grid);
}

function renderOffers() {
  const grid = document.getElementById("offersGrid");
  const list = PRODUCTS
    .filter((p) => discountPercent(p) > 0 && isInStock(p))
    .sort((a, b) => discountPercent(b) - discountPercent(a))
    .slice(0, 4);
  document.getElementById("offers").hidden = list.length === 0;
  grid.innerHTML = list.map((p, i) => productCardHTML(p, i, { ribbon: true })).join("");
  observeReveals(grid);
  startCountdown(document.getElementById("homeCountdown"));
}

function renderBrandStrip() {
  const links = BRANDS.map((b) => `<a href="${brandShopUrl(b.id)}">${escapeHTML(localized(b, "name"))}</a>`).join("");
  // the list is repeated so the sliding strip loops without a gap
  document.getElementById("brandStrip").innerHTML = links + links.replace(/<a /g, '<a tabindex="-1" aria-hidden="true" ');
}

/* ---------- "Follow our world": one card per social link in STORE ---------- */
function renderFollow() {
  const grid = document.getElementById("followGrid");
  const accounts = socialAccounts();   // platforms with an empty link are skipped
  grid.hidden = accounts.length === 0;
  grid.innerHTML = accounts.map((s, i) => `
    <article class="follow-card follow-card--${s.id} reveal" style="--delay:${i * 90}ms">
      <span class="follow-card__icon" aria-hidden="true">${icon(s.id)}</span>
      <h3 class="follow-card__name">${t(s.name)}</h3>
      <p class="follow-card__handle" dir="ltr">${escapeHTML(s.handle)}</p>
      <p class="follow-card__text">${t(s.text)}</p>
      <a class="btn btn--ghost btn--small" href="${escapeHTML(s.url)}" target="_blank" rel="noopener noreferrer"
        aria-label="${escapeHTML(t("social.ariaFollow", { name: t(s.name), handle: s.handle }))}">${t("social.follow")}</a>
    </article>`).join("");
  document.getElementById("followChat").href = chatLink();
  observeReveals(grid);
}

/* ---------- Store info for search engines ----------
   index.html already contains this block; here its links are refreshed from
   STORE so a new social link (e.g. Facebook) is picked up automatically. */
function renderOrgData() {
  const script = document.getElementById("ld-org");
  if (!script) return;
  try {
    const data = JSON.parse(script.textContent);
    const org = data["@graph"][0];
    org.email = STORE.email;
    org.sameAs = socialAccounts().map((s) => s.url).concat(whatsappLink());
    org.contactPoint.url = whatsappLink();
    const hours = openingHoursSpec();   // from STORE.openingHours
    if (hours) org.contactPoint.hoursAvailable = hours;
    else delete org.contactPoint.hoursAvailable;
    setStructuredData("ld-org", data);
  } catch (err) { /* keep the original block */ }
}

function renderHome() {
  setPageMeta({ title: t("meta.home"), description: t("meta.homeDesc") });
  renderFeatured();
  renderOffers();
  renderBrandStrip();
  renderRealReviews();   // js/main.js: Instagram button (+ the video if STORE.reviewVideo is set)
  renderFollow();
}

startHeroWatch();
renderHome();
renderOrgData();
document.addEventListener("languagechange", renderHome);
