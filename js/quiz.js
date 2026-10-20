/* =========================================================================
   MAD WATCHES — "FIND YOUR WATCH" QUIZ
   -------------------------------------------------------------------------
   Four quick questions (who, budget, style, occasion) → the watches from
   js/products.js that fit best. Opens from any button with data-open-quiz.
   The questions' text is in js/i18n.js (quiz.q1 … quiz.q4d).
   ========================================================================= */

const QUIZ = [
  { key: "who",      title: "quiz.q1", options: ["a", "b", "c", "d"] },   // me (man), me (woman), gift for him, gift for her
  { key: "budget",   title: "quiz.q2", options: ["a", "b", "c", "d"] },   // <3k, 3–15k, 15–100k, >100k
  { key: "style",    title: "quiz.q3", options: ["a", "b", "c", "d"] },   // classic, sporty, simple, smart
  { key: "occasion", title: "quiz.q4", options: ["a", "b", "c", "d"] }    // daily, work, events, sports & sea
];

const QUIZ_BUDGETS = { a: [0, 3000], b: [3000, 15000], c: [15000, 100000], d: [100000, Infinity] };
const QUIZ_STYLES = { a: ["dress", "luxury"], b: ["sport", "diver"], c: ["casual", "dress"], d: ["smart"] };
const QUIZ_OCCASIONS = { a: ["casual", "sport", "smart"], b: ["dress", "luxury"], c: ["luxury", "dress"], d: ["diver", "sport"] };

let quizStep = 0;
let quizAnswers = {};

function quizGender() {
  return quizAnswers.who === "b" || quizAnswers.who === "d" ? "women" : "men";
}

// Scores every watch against the answers and returns the best 4
function quizResults() {
  const gender = quizGender();
  const [lo, hi] = QUIZ_BUDGETS[quizAnswers.budget] || [0, Infinity];
  const styles = QUIZ_STYLES[quizAnswers.style] || [];
  const occasions = QUIZ_OCCASIONS[quizAnswers.occasion] || [];

  const scored = PRODUCTS
    .filter((p) => isInStock(p) && (p.gender === gender || p.gender === "unisex"))
    .map((p) => {
      let score = 0;
      if (p.price >= lo && p.price <= hi) score += 4;
      else score -= Math.min(3, Math.abs(Math.log((p.price < lo ? lo : hi) / p.price)));   // a little outside the budget is OK
      if (styles.includes(p.style)) score += 3;
      if (occasions.includes(p.style)) score += 2;
      if (quizAnswers.occasion === "d" && (p.waterResistance || 0) >= 100) score += 1.5;
      if (quizAnswers.occasion === "c" && p.strap === "gold") score += 1;
      if (quizAnswers.who === "c" || quizAnswers.who === "d") score += discountPercent(p) ? 0.5 : 0;   // gifts: nice offers first
      score += p.isFeatured ? 0.6 : 0;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score);
  return { list: scored.slice(0, 4).map((x) => x.p), exact: scored.length > 0 && scored[0].score >= 7 };
}

// Link to the shop with matching filters ("See all watches")
function quizShopLink() {
  const params = { gender: quizGender() };
  const [lo, hi] = QUIZ_BUDGETS[quizAnswers.budget] || [];
  if (lo) params.min = lo;
  if (hi && hi !== Infinity) params.max = hi;
  if (QUIZ_STYLES[quizAnswers.style]) params.style = QUIZ_STYLES[quizAnswers.style].join(",");
  return shopUrl(params);
}

function renderQuiz() {
  const modal = document.getElementById("quizModal");
  const content = modal.querySelector(".modal__content");
  const done = quizStep >= QUIZ.length;
  // little tick marks: one per question
  const progress = `<div class="quiz__progress" aria-hidden="true">${QUIZ.map((q, i) => `<span class="${i < quizStep ? "is-done" : i === quizStep ? "is-current" : ""}"></span>`).join("")}</div>`;

  if (!done) {
    const q = QUIZ[quizStep];
    content.innerHTML = `
      <div class="quiz">
        ${progress}
        <p class="eyebrow">${t("quiz.step", { n: quizStep + 1, total: QUIZ.length })}</p>
        <h2 class="title title--sm" id="quizQuestion">${t(q.title)}</h2>
        <div class="quiz__options" role="group" aria-labelledby="quizQuestion">
          ${q.options.map((o, i) => `
            <button type="button" class="quiz__option${quizAnswers[q.key] === o ? " is-selected" : ""}" data-answer="${o}">
              <span class="quiz__num" lang="en">${["I", "II", "III", "IV"][i]}</span><span>${t(q.title + o)}</span>
            </button>`).join("")}
        </div>
        ${quizStep > 0 ? `<button type="button" class="link quiz__back" data-quiz-back>${t("quiz.back")}</button>` : ""}
      </div>`;
    setTimeout(() => { const first = content.querySelector(".quiz__option"); if (first) first.focus(); }, 60);
    return;
  }

  const { list, exact } = quizResults();
  content.innerHTML = `
    <div class="quiz quiz--results">
      ${progress}
      <p class="eyebrow">${t("quiz.title")}</p>
      <h2 class="title title--sm" id="quizQuestion">${t("quiz.resultsTitle")}</h2>
      ${catalogIsEmpty() ? comingSoonHTML() : `<p class="lead">${t(exact ? "quiz.resultsText" : "quiz.none")}</p>`}
      <div class="grid grid--4 quiz__results"${list.length ? "" : " hidden"}>${list.map((p, i) => productCardHTML(p, i, { noReveal: true, enter: true, enterIndex: i, sizes: "(max-width: 759px) 50vw, 230px" })).join("")}</div>
      <div class="cta__actions">
        ${catalogIsEmpty() ? "" : `<a class="btn" href="${quizShopLink()}">${t("quiz.seeAll")}</a>`}
        <button type="button" class="btn btn--ghost" data-quiz-restart>${t("quiz.restart")}</button>
      </div>
    </div>`;
}

function openQuiz() {
  const modal = createModal("quizModal", "modal__box--quiz");
  modal.querySelector(".modal__box").setAttribute("aria-labelledby", "quizQuestion");
  if (!modal._quizReady) {
    modal._quizReady = true;
    modal.addEventListener("click", (e) => {
      const answer = e.target.closest("[data-answer]");
      if (answer) {
        quizAnswers[QUIZ[quizStep].key] = answer.dataset.answer;
        quizStep++;
        renderQuiz();
      }
      if (e.target.closest("[data-quiz-back]")) { quizStep = Math.max(0, quizStep - 1); renderQuiz(); }
      if (e.target.closest("[data-quiz-restart]")) { quizStep = 0; quizAnswers = {}; renderQuiz(); }
    });
  }
  quizStep = 0;
  quizAnswers = {};
  renderQuiz();
  openModal(modal, ".quiz__option");
}

document.addEventListener("click", (e) => {
  if (e.target.closest("[data-open-quiz]")) {
    e.preventDefault();
    openQuiz();
  }
});

document.addEventListener("languagechange", () => {
  const modal = document.getElementById("quizModal");
  if (modal && modal.classList.contains("is-open")) renderQuiz();
});

// index.html#quiz from the footer link: open the quiz straight away
if (location.hash === "#quiz" && document.body.dataset.page === "home") {
  window.addEventListener("load", () => setTimeout(openQuiz, 400));
}
