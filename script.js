document.getElementById('spinButton').addEventListener('click', startSpinning);

let isSpinning = false;
let currentAngle = 0;
let spinSpeed = 20; // Velocidad inicial
let speedFactor = 1; // Controla la aceleración/desaceleración

function startSpinning() {
    if (isSpinning) return;
    isSpinning = true;

    const wheel = document.getElementById('wheel');
    let spinButton = document.getElementById('spinButton');
    spinButton.disabled = true;

    function spinLoop() {
        if (!isSpinning) return;

        currentAngle += spinSpeed * speedFactor;
        wheel.style.transform = `rotate(${currentAngle}deg)`;

        // Alternar aceleración y desaceleración cada 2-3 segundos
        setTimeout(() => {
            speedFactor = Math.random() > 0.5 ? 0.5 : 1.5; // Acelera o desacelera aleatoriamente
            spinLoop();
        }, Math.random() * 1000 + 2000); // Cambia cada 2-3 segundos
    }

    spinLoop();
}

