const EVENT_DATE = new Date(2026, 3, 5);

const COUNTDOWN_UPDATE_MS = 1000 * 60 * 60;

const LOGO_CYCLE_MS = 1000 * 10;     // 10s cyclus
const LOGO_VISIBLE_MS = 5000;        // 5s in beeld

const BOTTOM_TOGGLE_MS = 5000;

const countdownEl = document.getElementById("countdown");
const logoEl = document.getElementById("logo");            // jouw bestaande SVG overlay
const bottomText = document.querySelector(".bottom-text");

// COLLAB elementen (nieuw)
const collabEl = document.getElementById("collab");        // container
// (de children hoeven we niet apart te pakken, we sturen met classes)

function updateCountdown(){
  const now = new Date();
  const diffMs = EVENT_DATE.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  countdownEl.textContent = String(Math.max(0, diffDays));
}

/* ---------------------------------------------------------
   COLLAB animatie:
   - Paaspop komt midden met bounce
   - daarna reveal: Paaspop schuift links + X + UB komen
   - daarna out
--------------------------------------------------------- */
function animateCollab(){
  if (!collabEl) return;

  // dagen weg
  countdownEl.style.opacity = "0";

  // reset
  collabEl.className = "";
  void collabEl.offsetWidth;

  // aan + bounce
  collabEl.classList.add("active", "in");

  // reveal na 0.7s
  setTimeout(() => {
    collabEl.classList.add("reveal");
  }, 700);

  // out start rond 4.2s
  setTimeout(() => {
    collabEl.classList.add("out");
  }, 4200);

  // na 5s: alles uit + dagen terug
  setTimeout(() => {
    collabEl.className = "";
    countdownEl.style.opacity = "1";
  }, LOGO_VISIBLE_MS);
}

/* ---------------------------------------------------------
   Jouw bestaande logo animatie (oude gedrag)
   LET OP: als je collab gebruikt, wil je meestal deze UIT zetten,
   anders heb je 2 shows door elkaar.
--------------------------------------------------------- */
function animateLogo(){

  countdownEl.style.opacity = "0";
  logoEl.style.opacity = "1";

  // zoom + bounce
  logoEl.style.animation = "logoZoomBounce 0.7s ease forwards";

  setTimeout(() => {

    // spin weg
    logoEl.style.animation = "logoSpinOut 0.8s ease forwards";
    logoEl.style.opacity = "0";
    countdownEl.style.opacity = "1";

  }, LOGO_VISIBLE_MS);
}

/* ---------------------------------------------------------
   Onderste tekst/logo toggle
--------------------------------------------------------- */
function toggleBottom(){
  if (bottomText) bottomText.classList.toggle("logo-mode");
}

const bgVideo = document.getElementById("bg-video");

const VIDEO_INTERVAL = 5 * 30 * 1000;
const VIDEO_DURATION = 22000;

function playBackgroundVideo(){

  if(!bgVideo) return;

  bgVideo.currentTime = 0;
  bgVideo.style.opacity = "1";

  bgVideo.play();

  setTimeout(() => {

    bgVideo.style.opacity = "0";
    bgVideo.pause();

  }, VIDEO_DURATION);

}

// elke 30 minuten
setInterval(playBackgroundVideo, VIDEO_INTERVAL);

// test bij laden (optioneel)
// setTimeout(playBackgroundVideo, 3000);

window.addEventListener("load", () => {
  updateCountdown();
  setInterval(updateCountdown, COUNTDOWN_UPDATE_MS);

  toggleBottom();
  setInterval(toggleBottom, BOTTOM_TOGGLE_MS);

  // Kies welke show je wilt:
  // 1) Alleen collab (aanrader)
  animateCollab();
  setInterval(animateCollab, LOGO_CYCLE_MS);

  // 2) Als je toch je oude #logo show wil houden, uncomment:
  // animateLogo();
  // setInterval(animateLogo, LOGO_CYCLE_MS);
});