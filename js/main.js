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
      box.innerHTML = "<h2 class='display-font text-center w-100' style='color:var(--rose)'>🎉 It's your birthday today! 🎉</h2>";
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
