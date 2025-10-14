document.addEventListener('DOMContentLoaded', () => {
    // ... (All of your existing code for the game logic remains the same) ...

    const questions = [
        { question: "Where did we met?", answer: "Valorant" },
        { question: "What is the name of the first movie we watched together?", answer: "Meet Joe Black" },
        { question: "What is my favorite thing in the world?", answer: "Fanny" },
        { question: "What month did we first meet?", answer: "December" }
    ];

    let currentQuestionIndex = 0;
    const startScreen = document.getElementById('start-screen');
    const startButton = document.getElementById('start-button');
    const questionContainer = document.getElementById('question-container');
    const questionText = document.getElementById('question-text');
    const answerInput = document.getElementById('answer-input');
    const submitButton = document.getElementById('submit-button');
    const feedback = document.getElementById('feedback');
    const finalMessage = document.getElementById('final-message');
    const continueButton = document.getElementById('continue-button');
    const moreContent = document.getElementById('more-content');

    startButton.addEventListener('click', startGame);
    submitButton.addEventListener('click', submitAnswer);
    answerInput.addEventListener('keyup', (event) => {
        if (event.key === "Enter") {
            submitButton.click();
        }
    });
    continueButton.addEventListener('click', showMoreContent);

    function startGame() {
        startScreen.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        displayQuestion();
    }

    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            questionText.textContent = questions[currentQuestionIndex].question;
            answerInput.value = '';
            feedback.textContent = '';
        } else {
            showFinalMessage();
        }
    }

    function submitAnswer() {
        const userAnswer = answerInput.value.trim().toLowerCase();
        const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();

        if (userAnswer === correctAnswer) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            feedback.textContent = "That's not quite right. Try again!";
        }
    }
    
    function showFinalMessage() {
        questionContainer.classList.add('hidden');
        finalMessage.classList.remove('hidden');
    }

    function showMoreContent() {
        finalMessage.classList.add('hidden');
        moreContent.classList.remove('hidden');
    }

    // --- HEARTS BACKGROUND LOGIC ---

    const heartsContainer = document.getElementById('hearts-container');
    const heartEmojis = ['💖', '❤️', '💕', '💓', '💗'];

    function explode(x, y) {
        const particleCount = 15;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            particle.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

            const randomX = (Math.random() - 0.5) * 200;
            const randomY = (Math.random() - 0.5) * 200;
            particle.style.setProperty('--x', `${randomX}px`);
            particle.style.setProperty('--y', `${randomY}px`);

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 5 + 5}s`;
        heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

        // This event listener now works because the CSS is fixed
        heart.addEventListener('click', (e) => {
            explode(e.clientX, e.clientY);
            // Hide the heart immediately for a better feel
            heart.style.display = 'none'; 
            // Then remove it after a moment
            setTimeout(() => heart.remove(), 500); 
        });

        heartsContainer.appendChild(heart);

        // This removes hearts that are not clicked after 10 seconds
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }

    setInterval(createHeart, 400);
});