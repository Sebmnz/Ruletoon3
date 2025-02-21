document.getElementById('spinButton').addEventListener('click', startSpinning);

let isSpinning = false;
let currentAngle = 0;
let spinSpeed = 50; // Aumento de la velocidad inicial
let speedFactor = 1; // Controla la aceleración/desaceleración

function startSpinning() {
    if (isSpinning) return;
    isSpinning = true;

    const wheel = document.getElementById('wheel');
    let spinButton = document.getElementById('spinButton');
    spinButton.disabled = true;

    function spinLoop() {
        if (!isSpinning) return;

        // Aumenta el ángulo rápidamente al inicio
        currentAngle += spinSpeed * speedFactor;
        wheel.style.transform = `rotate(${currentAngle}deg)`;

        // Alternar aceleración y desaceleración cada 1.5 - 2.5 segundos
        setTimeout(() => {
            speedFactor = Math.random() > 0.5 ? 0.4 : 2; // Se desacelera o acelera más fuerte
            spinLoop();
        }, Math.random() * 1000 + 1500); // Cambia cada 1.5 - 2.5 segundos
    }

    spinLoop();
}


