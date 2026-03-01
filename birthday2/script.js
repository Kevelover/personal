// 1. LÓGICA PARA LA LLUVIA DE CORAZONES
const heartsContainer = document.getElementById('hearts-container');
const emojis = ['❤️', '💖', '💗', '💓', '💕']; // Diferentes tipos de corazones

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Elige un emoji al azar
    heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Posición horizontal aleatoria (0 a 100 de la pantalla)
    heart.style.left = Math.random() * 100 + 'vw';
    
    // Tamaño aleatorio para dar profundidad (entre 0.8rem y 2.5rem)
    heart.style.fontSize = Math.random() * 1.7 + 0.8 + 'rem';
    
    // Duración de caída aleatoria (entre 4s y 8s)
    const fallDuration = Math.random() * 4 + 4;
    heart.style.animationDuration = fallDuration + 's';
    
    heartsContainer.appendChild(heart);
    
    // Eliminar el corazón del DOM una vez que termina su animación
    // Esto es vital para que la página no se vuelva lenta
    setTimeout(() => {
        heart.remove();
    }, fallDuration * 1000);
}

// Crear un corazón nuevo cada 300 milisegundos
setInterval(createHeart, 300);


// 2. LÓGICA PARA LAS ANIMACIONES AL HACER SCROLL
// Usa Intersection Observer para saber cuándo un elemento entra en pantalla
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

// Seleccionar todos los elementos con la clase 'hidden' y observarlos
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Lógica del Juego de las Notas
const gameData = [
    { lang: "5", ans: "italian" },
    { lang: "2", ans: "swedish" },
    { lang: "8", ans: "russian" },
    { lang: "1", ans: "chinese" },
    { lang: "7", ans: "german" },
    { lang: "3", ans: "english" },
    { lang: "6", ans: "french" },
    { lang: "4", ans: "spanish" }
];

let currentStep = 0;

function checkAnswer() {
    const input = document.getElementById('answer-input').value.toLowerCase().trim();
    const feedback = document.getElementById('game-feedback');
    const langDisplay = document.querySelector('#language-name span');
    
    // Quité tildes y caracteres especiales básicos para que no sea tan difícil
    const normalizedInput = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const normalizedAns = gameData[currentStep].ans.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (normalizedInput === normalizedAns) {
        currentStep++;
        feedback.innerText = "Correct! ❤️";
        feedback.style.color = "green";
        document.getElementById('answer-input').value = "";

        if (currentStep < gameData.length) {
            langDisplay.innerText = gameData[currentStep].lang;
        } else {
            document.querySelector('.game-box').style.display = 'none';
            document.getElementById('final-surprise').style.display = 'block';
            feedback.innerText = "¡Completaste el desafío!";
        }
    } else {
        feedback.innerText = "Try again!";
        feedback.style.color = "red";
    }
}

// Permitir que la tecla "Enter" también verifique la respuesta
document.getElementById('answer-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const checkBtn = document.getElementById("check-btn");
    const guessInput = document.getElementById("reason-guess");
    const quizContainer = document.getElementById("quiz-container");
    const reasonsContent = document.getElementById("reasons-content");
    const errorMsg = document.getElementById("error-msg");

    function checkAnswer() {
        const guess = guessInput.value.trim();
        
        if (guess === "37") {
            // Correct answer! Hide the quiz and show the reasons.
            quizContainer.style.display = "none";
            reasonsContent.style.display = "block";
        } else {
            // Wrong answer. Show a cute error message.
            errorMsg.textContent = "Nope, that's not it! Try again 🥺";
            guessInput.value = ""; // Clear the input box
            guessInput.focus();    // Put the cursor back in the box
        }
    }

    // Run the check when the button is clicked
    checkBtn.addEventListener("click", checkAnswer);

    // Also run the check if they press the "Enter" key on their keyboard
    guessInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            checkAnswer();
        }
    });
});