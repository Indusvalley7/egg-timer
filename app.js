// Resize browser window to fixed size
window.resizeTo(493, 638);

const cards = document.querySelectorAll(".card");

const screenChoose = document.querySelector("#screen-choose");
const screenTimer = document.querySelector("#screen-timer");

const timerTitle = document.querySelector("#timer-title");
const timerFace = document.querySelector("#timer-face");
const timeDisplay = document.querySelector("#time-display");

const btnStart = document.querySelector("#btn-start");
const btnReset = document.querySelector("#btn-reset");
const btnBack = document.querySelector("#btn-back");

const eggConfig = {
  soft: { label: "Soft Boiled", seconds: 6 * 60 + 30, emoji: "🥚", image: "soft-egg.png" },
  hard: { label: "Hard Boiled", seconds: 10 * 60, emoji: "🍳", image: "hard-egg.png" },
  fried: { label: "Fried", seconds: 3 * 60, emoji: "🍞", image: "fried-egg.png" },
  scrambled: { label: "Scrambled", seconds: 4 * 60, emoji: "🫓", image: "sunny-side-egg.png" },
};

let selectedEggKey = null;
let remainingSeconds = 0;

let intervalId = null;
let isRunning = false;

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  return `${mm}:${ss}`;
}

function renderTimer() {
  timeDisplay.textContent = formatTime(remainingSeconds);
}

function stopTimer() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
  isRunning = false;
  btnStart.textContent = "Start";
  timerFace.classList.remove("cooking");
}

function playDing() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContextClass();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.value = 880; // pitch

  gain.gain.value = 0.0;

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();

  // quick fade in
  gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.02);
  // quick fade out
  gain.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.25);

  osc.stop(ctx.currentTime + 0.26);

  osc.onended = () => ctx.close();
}

function playClickSound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContextClass();

  // Create a short click using white noise
  const bufferSize = ctx.sampleRate * 0.05; // 50ms
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const channelData = buffer.getChannelData(0);

  // Generate white noise
  for (let i = 0; i < bufferSize; i++) {
    channelData[i] = Math.random() * 2 - 1;
  }

  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  source.buffer = buffer;
  filter.type = "highpass";
  filter.frequency.value = 3000; // High pass filter for click sound

  gain.gain.value = 0;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  source.start();
  gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.01);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.05);

  source.onended = () => ctx.close();
}

function tick() {
  if (remainingSeconds <= 0) {
  remainingSeconds = 0;
  renderTimer();
  
  stopTimer();
  playDing();
  const timerFaceImg = timerFace.querySelector('img');
  if (timerFaceImg) {
    timerFaceImg.src = eggConfig[selectedEggKey].image;
    timerFaceImg.alt = "Ready";
  }
  timerFace.textContent = "🎉";
  timerTitle.textContent = "Your egg is ready!";
  return;
}

  remainingSeconds -= 1;
  renderTimer();

  if (remainingSeconds === 0) {
    const timerFaceImg = timerFace.querySelector('img');
    if (timerFaceImg) {
      timerFaceImg.src = eggConfig[selectedEggKey].image;
    }
  }
}

function startTimer() {
  if (!selectedEggKey) return;

  if (remainingSeconds === 0) {
    remainingSeconds = eggConfig[selectedEggKey].seconds;
  }

  if (isRunning) return;

  isRunning = true;
  btnStart.textContent = "Pause";
  const timerFaceImg = timerFace.querySelector('img');
  if (timerFaceImg) {
    timerFaceImg.src = eggConfig[selectedEggKey].image;
  }
  timerFace.classList.add("cooking");


  intervalId = setInterval(() => {
    tick();
  }, 1000);
}

function resetTimer() {
  stopTimer();
  remainingSeconds = eggConfig[selectedEggKey].seconds;
  const timerFaceImg = timerFace.querySelector('img');
  if (timerFaceImg) {
    timerFaceImg.src = eggConfig[selectedEggKey].image;
  }
  renderTimer();
}

function showTimerScreen(eggKey) {
  const cfg = eggConfig[eggKey];
  selectedEggKey = eggKey;

  stopTimer();
  remainingSeconds = cfg.seconds;

  timerTitle.textContent = cfg.label;
  const timerFaceImg = timerFace.querySelector('img');
  if (timerFaceImg) {
    timerFaceImg.src = cfg.image;
  }
  renderTimer();

  screenChoose.classList.add("hidden");
  screenTimer.classList.remove("hidden");
}

function showChooseScreen() {
  stopTimer();
  screenTimer.classList.add("hidden");
  screenChoose.classList.remove("hidden");
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    playClickSound();
    cards.forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");

    const eggKey = card.dataset.egg;
    showTimerScreen(eggKey);
  });
});

btnStart.addEventListener("click", () => {
  playClickSound();
  if (!selectedEggKey) return;

  if (isRunning) {
    stopTimer();
  } else {
    startTimer();
  }
});

btnReset.addEventListener("click", () => {
  playClickSound();
  if (!selectedEggKey) return;
  resetTimer();
});

btnBack.addEventListener("click", () => {
  playClickSound();
  showChooseScreen();
});

// Service worker temporarily disabled for debugging
// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", async () => {
//     try {
//       await navigator.serviceWorker.register("./service-worker.js");
//     } catch (err) {
//       console.log("Service worker registration failed:", err);
//     }
//   });
// }