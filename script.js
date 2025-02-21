document.getElementById('spinButton').addEventListener('click', startSpinning);

let isSpinning = false;
let currentAngle = 0;
let baseSpeed = 2;         // Velocidad inicial baja para que las opciones sean visibles
let speedFactor = 1;        // Control de velocidad
let slowdownActive = false; // Bandera para efecto de "parada aparente"
let spinLoopId;

function startSpinning() {
    if (isSpinning) return;
    isSpinning = true;
    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spinButton');
    spinButton.disabled = true;

    // Reiniciar variables
    currentAngle = 0;
    speedFactor = 1;
    slowdownActive = false;

    // Iniciar el bucle de giro
    function spinLoop() {
        currentAngle += baseSpeed * speedFactor;
        wheel.style.transform = `rotate(${currentAngle}deg)`;
        spinLoopId = requestAnimationFrame(spinLoop);
    }

    spinLoop();

    // Después de 10 segundos, empieza el efecto de "falsa desaceleración"
    setTimeout(() => {
        function applySlowdown() {
            // Genera un intervalo aleatorio entre 10 y 12 segundos
            const interval = Math.random() * 2000 + 10000;

            setTimeout(() => {
                // Simula que la ruleta se va a parar reduciendo la velocidad a casi cero
                speedFactor = 0.03;
                slowdownActive = true;

                // Mantiene la velocidad reducida por 5 segundos
                setTimeout(() => {
                    // Vuelve a la velocidad normal
                    speedFactor = 1;
                    slowdownActive = false;

                    // Vuelve a programar el siguiente efecto de falsa desaceleración
                    applySlowdown();
                }, 5000);
            }, interval);
        }
        applySlowdown();
    }, 10000);

    // A los 35 segundos, mostrar el mensaje con confeti
    setTimeout(() => {
        showLobilloMessage();
    }, 35000);
}

// Función para mostrar el mensaje con confeti
function showLobilloMessage() {
    const container = document.querySelector('.container');
    const message = document.createElement('div');
    message.innerText = "pues no gilipollas, nos vamos al lobillo";
    message.classList.add('lobillo-message');
    container.appendChild(message);

    createConfetti(); // Llama a la función de confeti
}

// Función para crear confeti
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiContainer.appendChild(confetti);
    }
}

// Función para limpiar confeti después de unos segundos
function clearConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    confettiContainer.innerHTML = '';
}