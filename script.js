
const container = document.getElementById('hearts-container');
const heartsCount = 20;

// --- MODIFIED: This function will be attached to each heart ---
function handleHeartClick(event) {
    const heart = event.currentTarget;
    
    // Hide the heart immediately
    heart.style.display = 'none';

    // Trigger the explosion at the click position
    explode(event.clientX, event.clientY);
    
    // After a delay, remove the heart element completely
    setTimeout(() => {
        heart.remove();
    }, 1000);
}

for (let i = 0; i < heartsCount; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
    const heartEmojis = ['💖', '💕', '💗', '💝', '💓'];
    heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    
    // --- MODIFIED: Attach the click listener directly to the heart ---
    heart.addEventListener('click', handleHeartClick);

    container.appendChild(heart);
}

function explode(x, y) {
    const particleCount = 10;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        const heartEmojis = ['💖', '💕', '💗', '💝', '💓'];
        particle.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        const angle = Math.random() * 360;
        const distance = Math.random() * 100 + 50;
        
        const x_end = distance * Math.cos(angle * Math.PI / 180);
        const y_end = distance * Math.sin(angle * Math.PI / 180);
        
        particle.style.setProperty('--x', x_end + 'px');
        particle.style.setProperty('--y', y_end + 'px');
        
        // Add particles directly to the body to ensure they appear on top
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}
