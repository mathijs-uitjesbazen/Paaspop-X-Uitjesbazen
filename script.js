const EVENT_DATE = new Date(2026, 3, 5);

const COUNTDOWN_UPDATE_MS = 1000 * 60 * 60;

const LOGO_CYCLE_MS = 1000 * 10;
const LOGO_VISIBLE_MS = 5000;

const BOTTOM_TOGGLE_MS = 5000;

const countdownEl = document.getElementById("countdown");
const logoEl = document.getElementById("logo");
const bottomText = document.querySelector(".bottom-text");

function updateCountdown(){
  const now = new Date();
  const diffMs = EVENT_DATE.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  countdownEl.textContent = String(Math.max(0, diffDays));
}

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

function toggleBottom(){
  if (bottomText) bottomText.classList.toggle("logo-mode");
}

window.addEventListener("load", () => {
  updateCountdown();
  setInterval(updateCountdown, COUNTDOWN_UPDATE_MS);

  toggleBottom();
  setInterval(toggleBottom, BOTTOM_TOGGLE_MS);

  animateLogo();
  setInterval(animateLogo, LOGO_CYCLE_MS);
});