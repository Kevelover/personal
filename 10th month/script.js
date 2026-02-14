// --- 1. FALLING HEARTS LOGIC ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // You can mix and match emojis here!
    const emojis = ['💖', '💕', '💗', '💓'];
    heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Give it a random starting position from left to right
    heart.style.left = Math.random() * 100 + 'vw';
    
    // Give it a random falling speed (between 3 and 7 seconds)
    const duration = Math.random() * 4 + 3;
    heart.style.animationDuration = duration + 's';
    
    // Give it a random size
    const size = Math.random() * 20 + 15;
    heart.style.fontSize = size + 'px';
    
    document.getElementById('hearts-container').appendChild(heart);
    
    // Clean up the heart after it falls so your browser doesn't lag
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Spawn a new heart every 400 milliseconds
setInterval(createHeart, 400);


// --- 2. INTERACTIVE BUTTON LOGIC ---
// You can customize these messages!
const reasons = [
    "Your smile lights up my life. ✨",
    "Every day with you is a day I want to remember. 🥰",
    "You are the best girlfriend ever. 👯‍♀️",
    "I love the way you laugh ☺️",
    "10 months down, 100 years to go. ♾️",
    "You make me want to be the best version of myself. 🌟",
    "You are the most amazing person ever. 🫂"
];

const btn = document.getElementById('love-btn');
const display = document.getElementById('message-display');

btn.addEventListener('click', () => {
    // Pick a random reason from the list
    const randomIndex = Math.floor(Math.random() * reasons.length);
    display.innerText = reasons[randomIndex];
    
    // Add a quick little "pop" animation to the text
    display.style.transform = 'scale(1.1)';
    display.style.transition = 'transform 0.2s';
    
    setTimeout(() => {
        display.style.transform = 'scale(1)';
    }, 200);
});