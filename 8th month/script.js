// Falling Hearts
const heartsContainer = document.getElementById("hearts-container");

// Add a variety of romantic emojis
const heartEmojis = ["💖", "❤️", "💕", "💗", "💘", "💓", "💞", "🩷"];

function createHeart() {
  const heart = document.createElement("div");
  
  // Pick a random emoji each time
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

  heart.style.position = "absolute";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 24 + 16 + "px";
  heart.style.animation = `fall ${3 + Math.random() * 5}s linear`;
  heart.style.opacity = Math.random();

  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 8000);
}

setInterval(createHeart, 250); // faster falling for more hearts!



  // Hide all messages
function revealMessage(el) {
  const msg = el.querySelector(".message");

  // If this message is already visible, hide it
  if (msg.classList.contains("show")) {
    msg.classList.remove("show");
  } else {
    // Hide all other messages first
    document.querySelectorAll(".heart .message").forEach(m => {
      m.classList.remove("show");
    });

    // Show this message
    msg.classList.add("show");
  }
}



// Mini Game Quiz
function checkAnswer(button, correct) {
  const result = document.getElementById("quiz-result");
  if(correct) {
    result.textContent = "🎉 YES, I ALSO LOVE YOU A LOT AND SO MUCH BUT I LOVE YOU INFINITE TONSSS 💖";
  } else {
    result.textContent = "❌ Think again >:(";
  }
}

// --- Audio player ---
const button = document.getElementById('playPauseButton');
const audio = document.getElementById('myAudio');
const volumeSlider = document.getElementById('volumeSlider');

let lastVolume = audio.volume || 1;

button.textContent = '🎵'; // initial emoji

// Playlist
const playlist = [
  '/something special.mp3',
  '/fire for you.mp3',
  '/her.mp3'
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

// Lightbox elements
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox .close");

// Open lightbox when any gallery image is clicked
document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

// Close lightbox when clicking the X
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Also close when clicking outside the image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

