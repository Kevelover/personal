// --- 1. VERTICAL FALLING HEARTS LOGIC ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Mix of Valentine's themed emojis
    const emojis = ['❤️', '🌹', '🥰', '🍫', '💘'];
    heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Pick a random horizontal starting position
    heart.style.left = Math.random() * 100 + 'vw';
    
    // Random duration between 4 and 8 seconds for the fall
    const duration = Math.random() * 4 + 4;
    heart.style.animationDuration = duration + 's';
    
    // Random size
    const size = Math.random() * 20 + 15;
    heart.style.fontSize = size + 'px';
    
    document.getElementById('hearts-container').appendChild(heart);
    
    // Remove the heart from the code once it hits the bottom
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Create a new heart every 500 milliseconds
setInterval(createHeart, 500);

// --- 2. INTERACTIVE VALENTINE'S COUPONS LOGIC ---
const coupons = document.querySelectorAll('.coupon');

coupons.forEach(coupon => {
    coupon.addEventListener('click', function() {
        // Check if it's already been revealed
        if (!this.classList.contains('revealed')) {
            // Get the hidden reward text from the HTML 'data-reward' attribute
            const rewardText = this.getAttribute('data-reward');
            
            // Change the text and apply the revealed styling
            this.innerHTML = rewardText;
            this.classList.add('revealed');
        }
    });
});