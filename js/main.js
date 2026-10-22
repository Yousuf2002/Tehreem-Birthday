/* Shared code for every page. Page-specific parts only run if their elements exist. */

document.addEventListener("DOMContentLoaded", () => {
  fillNames();
  floatingHearts();
  revealOnScroll();
  photoFallback();
  initTyped();
  initCountdown();
  initGallery();
  initTimeline();
  initCake();
  initReasons();
  initFlipCards();
  initQuiz();
  initGift();
  document.querySelectorAll("[data-confetti]").forEach(b => b.addEventListener("click", () => confetti(160)));
});

/* ---------- helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);

function fillNames() {
  document.querySelectorAll("[data-her]").forEach(e => (e.textContent = CONFIG.herName));
  document.querySelectorAll("[data-you]").forEach(e => (e.textContent = CONFIG.yourName));
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
}

/* Show a pretty placeholder when a photo file is missing */
function photoFallback() {
  document.addEventListener("error", e => {
    const img = e.target;
    if (img.tagName !== "IMG" || img.dataset.fb) return;
    img.dataset.fb = "1";
    const svg =
      "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>" +
      "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#ffd1dc'/><stop offset='1' stop-color='#ffe9b8'/></linearGradient></defs>" +
      "<rect width='800' height='600' fill='url(#g)'/>" +
      "<text x='400' y='290' font-size='90' text-anchor='middle'>&#128247;</text>" +
      "<text x='400' y='380' font-size='34' text-anchor='middle' fill='#c93a5e' font-family='sans-serif'>Add her photo in /images</text></svg>";
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }, true);
}

function floatingHearts() {
  const box = document.createElement("div");
  box.className = "floating-hearts";
  document.body.prepend(box);
  const symbols = ["♥", "❤", "💖", "✨"];
  setInterval(() => {
    const s = document.createElement("span");
    s.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    s.style.left = Math.random() * 100 + "vw";
    s.style.fontSize = 14 + Math.random() * 26 + "px";
    s.style.animationDuration = 6 + Math.random() * 7 + "s";
    box.appendChild(s);
    setTimeout(() => s.remove(), 14000);
  }, 700);
}

function revealOnScroll() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("visible"); obs.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
}

/* ---------- Confetti ---------- */
function confetti(count = 120) {
  let canvas = $("#confetti");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "confetti";
    document.body.appendChild(canvas);
  }
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const colors = ["#e8587a", "#ff9bb3", "#e9b44c", "#ffffff", "#7bc8f6", "#b28dff"];
  const bits = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * 0.5,
    r: 4 + Math.random() * 6,
    vx: -2 + Math.random() * 4,
    vy: 2 + Math.random() * 4,
    rot: Math.random() * 6,
    vr: -.2 + Math.random() * .4,
    c: colors[Math.floor(Math.random() * colors.length)]
  }));
  let frames = 0;
  (function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bits.forEach(b => {
      b.x += b.vx; b.y += b.vy; b.rot += b.vr;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rot);
      ctx.fillStyle = b.c;
      ctx.fillRect(-b.r, -b.r / 2, b.r * 2, b.r);
      ctx.restore();
    });
    if (++frames < 260) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  })();
}

/* ---------- Home: typing effect ---------- */
function initTyped() {
  const el = $("#typed");
  if (!el) return;
  const lines = CONFIG.heroLines;
  let li = 0, ci = 0, deleting = false;
  (function tick() {
    const text = lines[li];
    el.textContent = text.slice(0, ci);
    let delay = deleting ? 35 : 80;
    if (!deleting && ci === text.length) { delay = 1800; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; li = (li + 1) % lines.length; delay = 400; }
    else ci += deleting ? -1 : 1;
    setTimeout(tick, delay);
  })();
}

/* ---------- Home: countdown ---------- */
function initCountdown() {
  const box = $("#countdown");
  if (!box) return;
  const { month, day } = CONFIG.birthday;
  const pad = n => String(n).padStart(2, "0");

  function update() {
    const now = new Date();
    let target = new Date(now.getFullYear(), month - 1, day);
    const endOfDay = new Date(target.getTime() + 86400000);
    if (now >= target && now < endOfDay) {
      box.innerHTML = "<h2 class='display-font text-center w-100' style='color:var(--rose)'>🎉 It was your birthday Yesterday! 🎉</h2>";
      return;
    }
    if (now >= endOfDay) target = new Date(now.getFullYear() + 1, month - 1, day);
    const diff = target - now;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000) % 24;
    const m = Math.floor(diff / 60000) % 60;
    const s = Math.floor(diff / 1000) % 60;
    box.innerHTML = [["Days", d], ["Hours", h], ["Minutes", m], ["Seconds", s]]
      .map(([l, v]) => `<div class="count-box"><strong>${pad(v)}</strong><small>${l}</small></div>`).join("");
  }
  update();
  setInterval(update, 1000);
}

/* ---------- Memories: carousel + photo cards + lightbox ---------- */
function initGallery() {
  const car = $("#photoCarousel");
  const grid = $("#photoGrid");
  if (!car && !grid) return;
  const photos = CONFIG.photos;

  if (car) {
    car.innerHTML =
      `<div class="carousel-indicators">${photos.map((_, i) =>
        `<button type="button" data-bs-target="#photoCarousel" data-bs-slide-to="${i}" class="${i === 0 ? "active" : ""}"></button>`).join("")}</div>` +
      `<div class="carousel-inner">${photos.map((p, i) =>
        `<div class="carousel-item ${i === 0 ? "active" : ""}">
           <img src="${p.src}" class="d-block w-100" alt="${p.caption}">
           <div class="carousel-caption"><h5>${p.caption}</h5></div>
         </div>`).join("")}</div>
       <button class="carousel-control-prev" type="button" data-bs-target="#photoCarousel" data-bs-slide="prev"><span class="carousel-control-prev-icon"></span></button>
       <button class="carousel-control-next" type="button" data-bs-target="#photoCarousel" data-bs-slide="next"><span class="carousel-control-next-icon"></span></button>`;
  }

  if (grid) {
    grid.innerHTML = photos.map((p, i) =>
      `<div class="col-sm-6 col-lg-4 reveal">
         <div class="card love-card photo-card">
           <div class="img-wrap"><img src="${p.src}" alt="${p.caption}" data-index="${i}"></div>
           <div class="card-body text-center"><p class="mb-0 fw-medium">${p.caption}</p></div>
         </div>
       </div>`).join("");
    revealOnScroll();

    const modalEl = $("#lightbox");
    const modalImg = $("#lightboxImg");
    const modalCap = $("#lightboxCap");
    const modal = new bootstrap.Modal(modalEl);
    grid.addEventListener("click", e => {
      if (e.target.tagName !== "IMG") return;
      const p = photos[e.target.dataset.index];
      modalImg.src = e.target.src;
      modalCap.textContent = p.caption;
      modal.show();
    });
  }
}

function initTimeline() {
  const box = $("#timeline");
  if (!box) return;
  box.innerHTML = CONFIG.timeline.map(t =>
    `<div class="timeline-item reveal"><h5>${t.when}</h5><p class="mb-0">${t.text}</p></div>`).join("");
  revealOnScroll();
}

/* ---------- Surprise: cake ---------- */
function initCake() {
  const candles = document.querySelectorAll(".candle");
  if (!candles.length) return;
  const msg = $("#cakeMsg");
  candles.forEach(c => c.addEventListener("click", () => {
    c.classList.add("out");
    const left = document.querySelectorAll(".candle:not(.out)").length;
    if (left === 0) {
      msg.textContent = "🎂 Wish granted! Happy Birthday! 🎂";
      confetti(220);
    } else {
      msg.textContent = left + " candle" + (left > 1 ? "s" : "") + " left... make a wish!";
    }
  }));
  const relight = $("#relight");
  if (relight) relight.addEventListener("click", () => {
    candles.forEach(c => c.classList.remove("out"));
    msg.textContent = "Tap each candle to blow it out and make a wish";
  });
}

/* ---------- Surprise: reasons generator ---------- */
function initReasons() {
  const btn = $("#reasonBtn");
  if (!btn) return;
  const out = $("#reasonText");
  let last = -1;
  btn.addEventListener("click", () => {
    let i;
    do { i = Math.floor(Math.random() * CONFIG.reasons.length); } while (i === last && CONFIG.reasons.length > 1);
    last = i;
    out.style.opacity = 0;
    setTimeout(() => { out.textContent = "💗 " + CONFIG.reasons[i]; out.style.opacity = 1; }, 200);
  });
}

/* ---------- Surprise: flip cards ---------- */
function initFlipCards() {
  const row = $("#flipRow");
  if (!row) return;
  row.innerHTML = CONFIG.letterCards.map(c =>
    `<div class="col-md-6 col-lg-3 reveal">
       <div class="flip"><div class="flip-inner">
         <div class="flip-face flip-front">${c.front}</div>
         <div class="flip-face flip-back">${c.back}</div>
       </div></div>
     </div>`).join("");
  row.querySelectorAll(".flip").forEach(f => f.addEventListener("click", () => f.classList.toggle("flipped")));
  revealOnScroll();
}

/* ---------- Surprise: quiz ---------- */
function initQuiz() {
  const box = $("#quiz");
  if (!box) return;
  let i = 0, score = 0;

  function show() {
    if (i >= CONFIG.quiz.length) {
      box.innerHTML = `<div class="text-center"><h3 class="display-font">You got ${score} / ${CONFIG.quiz.length} 💕</h3>
        <p>${score === CONFIG.quiz.length ? "Perfect! You know us so well." : "Cute! Either way, I love you."}</p>
        <button class="btn btn-love" id="quizAgain">Play again</button></div>`;
      if (score === CONFIG.quiz.length) confetti(150);
      $("#quizAgain").addEventListener("click", () => { i = 0; score = 0; show(); });
      return;
    }
    const q = CONFIG.quiz[i];
    box.innerHTML = `<p class="text-muted small mb-1">Question ${i + 1} of ${CONFIG.quiz.length}</p>
      <h4 class="mb-3">${q.q}</h4>
      ${q.options.map((o, n) => `<button class="quiz-option" data-n="${n}">${o}</button>`).join("")}
      <div id="quizNext" class="text-end"></div>`;
    box.querySelectorAll(".quiz-option").forEach(b => b.addEventListener("click", () => {
      const n = +b.dataset.n;
      box.querySelectorAll(".quiz-option").forEach(x => (x.disabled = true));
      box.querySelectorAll(".quiz-option")[q.answer].classList.add("correct");
      if (n === q.answer) score++; else b.classList.add("wrong");
      $("#quizNext").innerHTML = `<button class="btn btn-love btn-sm mt-2" id="nextQ">${i + 1 === CONFIG.quiz.length ? "See result" : "Next"}</button>`;
      $("#nextQ").addEventListener("click", () => { i++; show(); });
    }));
  }
  show();
}

/* ---------- Surprise: gift box ---------- */
function initGift() {
  const gift = $("#gift");
  if (!gift) return;
  const msg = $("#giftMsg");
  msg.textContent = CONFIG.giftMessage;
  gift.addEventListener("click", () => {
    if (gift.classList.contains("open")) return;
    gift.classList.add("open");
    gift.textContent = "💝";
    msg.classList.add("show");
    confetti(250);
  });
}

/* Code for sorry.html only. Text lives in js/sorry-config.js */
document.addEventListener("DOMContentLoaded", () => {
  if (!document.body.classList.contains("sorry-page") || typeof SORRY === "undefined") return;
  drawStars();
  setupLanterns();
  setupEnvelope();
  setupJar();
  setupPromises();
  setupForgive();
  setupReply();
});

const q = (s, el = document) => el.querySelector(s);

function drawStars() {
  const box = q("#stars");
  if (!box) return;
  for (let i = 0; i < 90; i++) {
    const s = document.createElement("i");
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";
    s.style.animationDelay = Math.random() * 3 + "s";
    s.style.animationDuration = 2 + Math.random() * 3 + "s";
    box.appendChild(s);
  }
  q("#heroLine").textContent = SORRY.heroLine;
}

/* ---- Heart mending progress ---- */
let mendedOnce = false;
function mend(p) {
  const pct = Math.round(p * 100);
  q("#mendBar").style.width = pct + "%";
  q("#mendText").textContent = pct + "% mended";
  q("#bigHeart").textContent = p >= 1 ? "❤️" : p >= 0.5 ? "❤️‍🩹" : "💔";
  if (p >= 1 && !mendedOnce) {
    mendedOnce = true;
    q("#mendText").textContent = "100% satisfy. Thank you for reading every note 💖";
    confetti(140);
  }
}

/* ---- Lanterns ---- */
function setupLanterns() {
  const box = q("#lanterns");
  const total = SORRY.lanterns.length;
  const read = new Set();
  box.innerHTML = SORRY.lanterns.map((l, i) =>
    `<div class="col-4 col-md-3 col-lg-2 text-center">
       <button class="lantern" style="animation-delay:${(i * 0.45).toFixed(2)}s" data-i="${i}" aria-label="Open note ${i + 1}"><span>${i + 1}</span></button>
     </div>`).join("");
  const modal = new bootstrap.Modal(q("#noteModal"));
  box.addEventListener("click", e => {
    const b = e.target.closest(".lantern");
    if (!b) return;
    const i = +b.dataset.i;
    q("#noteTitle").textContent = SORRY.lanterns[i].title;
    q("#noteText").textContent = SORRY.lanterns[i].text;
    modal.show();
    b.classList.add("read");
    read.add(i);
    mend(read.size / total);
  });
}

/* ---- Envelope letter ---- */
function setupEnvelope() {
  const env = q("#envelope");
  const paper = q("#letterPaper");
  const L = SORRY.letter;
  paper.innerHTML =
    `<p class="fw-bold">${esc(L.greeting)}</p>` +
    L.paragraphs.map(p => `<p>${esc(p)}</p>`).join("") +
    `<p class="signoff">${esc(L.signoff)}<br>${esc(typeof CONFIG !== "undefined" ? CONFIG.yourName : "")}</p>`;
  paper.querySelectorAll("p").forEach((p, i) => (p.style.transitionDelay = 0.5 + i * 0.5 + "s"));
  env.addEventListener("click", () => {
    const open = env.classList.toggle("open");
    paper.classList.toggle("show", open);
  });
}

function esc(t) {
  const d = document.createElement("div");
  d.textContent = t;
  return d.innerHTML;
}

/* ---- Apology jar ---- */
function setupJar() {
  const btn = q("#jarBtn");
  const jar = q("#jar");
  const note = q("#jarNote");
  const count = q("#jarCount");
  let bag = [];
  let pulled = 0;
  btn.addEventListener("click", () => {
    if (!bag.length) bag = SORRY.jar.map((_, i) => i).sort(() => Math.random() - 0.5);
    const i = bag.pop();
    pulled++;
    jar.classList.remove("shake");
    void jar.offsetWidth;
    jar.classList.add("shake");
    setTimeout(() => {
      note.textContent = SORRY.jar[i];
      note.classList.remove("pop");
      void note.offsetWidth;
      note.classList.add("pop");
    }, 350);
    count.textContent = "Notes pulled: " + pulled;
  });
}

/* ---- Promises ---- */
function setupPromises() {
  const list = q("#promises");
  const out = q("#promiseProgress");
  list.innerHTML = SORRY.promises.map((p, i) =>
    `<label class="promise"><input type="checkbox" data-i="${i}"><span class="box">✓</span><span class="txt">${esc(p)}</span></label>`).join("");
  const update = () => {
    const done = list.querySelectorAll("input:checked").length;
    const all = SORRY.promises.length;
    out.textContent = done === all
      ? "Apse kiya hua har wada nibhaounga 🤞💖"
      : `${done} of ${all} promises accepted`;
    if (done === all) confetti(100);
  };
  list.addEventListener("change", update);
  update();
}

/* ---- Forgive me? (the No button runs away) ---- */
function setupForgive() {
  const arena = q("#arena");
  const yes = q("#yesBtn");
  const no = q("#noBtn");
  const msg = q("#finalMsg");
  q("#forgiveQ").textContent = SORRY.forgiveQuestion;
  msg.textContent = SORRY.yesMessage;
  let tries = 0;

  const dodge = e => {
    if (e) e.preventDefault();
    tries++;
    no.textContent = SORRY.noTexts[Math.min(tries, SORRY.noTexts.length - 1)];
    const w = arena.clientWidth, h = arena.clientHeight;
    no.style.left = 12 + Math.random() * (w - 24 - no.offsetWidth) + no.offsetWidth / 2 + "px";
    no.style.top = 20 + Math.random() * (h - 40) + "px";
    yes.style.scale = Math.min(1 + tries * 0.18, 2.2);
  };
  no.addEventListener("mouseenter", dodge);
  no.addEventListener("touchstart", dodge, { passive: false });
  no.addEventListener("click", dodge);

  yes.addEventListener("click", () => {
    arena.style.display = "none";
    q("#forgiveQ").textContent = "💖";
    msg.classList.add("show");
    confetti(300);
    setTimeout(() => confetti(200), 700);
    setTimeout(() => confetti(200), 1400);
  });
}

/* ---- Reply box ---- */
function setupReply() {
  q("#replyTitle").textContent = SORRY.replyTitle;
  q("#replyHint").textContent = SORRY.replyHint;
  const ta = q("#replyText");
  const num = (SORRY.whatsapp || "").replace(/\D/g, "");
  q("#sendWa").addEventListener("click", () => {
    const text = ta.value.trim();
    if (!text) { ta.focus(); return; }
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(text)}`, "_blank");
  });
  q("#copyReply").addEventListener("click", async () => {
    const btn = q("#copyReply");
    try { await navigator.clipboard.writeText(ta.value); btn.textContent = "Copied ✓"; }
    catch (e) { ta.select(); btn.textContent = "Select & copy"; }
    setTimeout(() => (btn.textContent = "Copy"), 2000);
  });
}

