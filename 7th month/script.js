// --- Wheel + drawing setup ---
const options = [
  "Kisses 💋",
  "Cuddle time 🤗",
  "Love letter 💌",
  "Dinner date 🍝",
  "Massage night 💆‍♀️",
  "Movie and snack 🍿",
  "Sweet surprise 🎁",
  "Dance together 💃"
];

const colors = [
  "#fadde1","#ffc4d6","#ffa6c1","#ff87ab",
  "#ff5d8f","#ff97b7","#ffacc5","#ffcad4"
];

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const size = canvas.width;
const center = size / 2;
const segCount = options.length;
const segAngle = 360 / segCount;

// Draw wheel
ctx.font = "17px 'Great Vibes', cursive";
ctx.textBaseline = "middle";

for (let i = 0; i < segCount; i++) {
  const startDeg = i * segAngle;
  const startRad = (startDeg * Math.PI) / 180;
  const endRad = ((startDeg + segAngle) * Math.PI) / 180;

  ctx.beginPath();
  ctx.moveTo(center, center);
  ctx.arc(center, center, center, startRad, endRad);
  ctx.fillStyle = colors[i % colors.length];
  ctx.fill();

  ctx.save();
  ctx.translate(center, center);
  const midDeg = startDeg + segAngle / 2;
  ctx.rotate((midDeg * Math.PI) / 180);
  ctx.textAlign = "right";
  ctx.fillStyle = "#fff";
  ctx.fillText(options[i], center - 10, 0);
  ctx.restore();
}

// Spin logic
let spinning = false;
const spinBtn = document.getElementById("spin");
const resultEl = document.getElementById("result");

spinBtn.addEventListener("click", () => {
  if (spinning) return;
  spinning = true;
  resultEl.textContent = "";

  // Pick a random segment
  const chosenIndex = Math.floor(Math.random() * options.length);

  // Calculate rotation so that the chosen segment lands under the bottom indicator
  // Bottom corresponds to 90° (canvas coordinates)
  const targetAngle = 360 - (chosenIndex * segAngle + segAngle / 2) + 90;

  // Add full rotations for smooth spin
  const fullRotations = 5; // adjust for more spins
  const spinDegrees = fullRotations * 360 + targetAngle;

  let current = 0;
  const duration = 5200;
  const start = performance.now();

  function animate(now) {
    const elapsed = now - start;
    if (elapsed >= duration) {
      canvas.style.transform = `rotate(${spinDegrees}deg)`;
      resultEl.textContent = `You won: ${options[chosenIndex]} 💞`;
      spinning = false;
      return;
    }

    const t = elapsed / duration;
    const ease = 1 - Math.pow(1 - t, 3); // cubic ease-out
    const deg = ease * spinDegrees;
    current = deg;
    canvas.style.transform = `rotate(${deg}deg)`;
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});


// --- Falling hearts ---
setInterval(() => {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  // 💕 pick a random heart emoji each time
  const hearts = ["💖", "💞", "💘", "💝", "💕", "❤️"];
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 22 + 18 + "px";
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 8000);
}, 550);



// --- Love counter ---
const startDate = new Date("2025-03-13");
function updateCounter() {
  const today = new Date();
  const diff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  document.getElementById("counter").textContent = `We've been together for ${diff} beautiful days 💞`;
}
updateCounter();

// --- Audio player ---
const button = document.getElementById('playPauseButton');
const audio = document.getElementById('myAudio');
const volumeSlider = document.getElementById('volumeSlider');

let lastVolume = audio.volume || 1;

button.textContent = '🎵'; // initial emoji

// Playlist
const playlist = [
  '/lovewith.mp3',
  '/until.mp3',
  '/third-song.mp3'
];
let currentIndex = 0;
audio.src = playlist[currentIndex];

// Play/Pause button
button.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().catch(err => console.log("Playback error:", err));
    button.textContent = '🔇';
    button.classList.add('playing');
  } else {
    audio.pause();
    button.textContent = '🎵';
    button.classList.remove('playing');
  }
  updateSliderVisibility();
});

// Mute/unmute on double click
button.addEventListener('dblclick', () => {
  if (audio.volume > 0) {
    lastVolume = audio.volume;
    audio.volume = 0;
    button.textContent = '🎵';
    button.classList.remove('playing');
  } else {
    audio.volume = lastVolume;
    button.textContent = '🔇';
    if (!audio.paused) button.classList.add('playing');
  }
  updateSliderVisibility();
});

// Volume slider
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
  if (audio.volume > 0) lastVolume = audio.volume;
  updateSliderVisibility();
});

// Slider visibility
function updateSliderVisibility() {
  if (!audio.paused) {
    volumeSlider.style.display = 'block';
  } else {
    volumeSlider.style.display = 'none';
  }
}
updateSliderVisibility();

// Auto-play next song
audio.addEventListener('ended', () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  audio.src = playlist[currentIndex];
  audio.play().catch(err => console.log("Playback error:", err));
  button.textContent = '🔇';
  button.classList.add('playing');
  updateSliderVisibility();
});
