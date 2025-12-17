    const heartEmojis = ['💗','💖','💞','💕','💓'];
    function createHeart() {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDuration = (5 + Math.random() * 5) + 's';
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 10000);
    }
    setInterval(createHeart, 300);