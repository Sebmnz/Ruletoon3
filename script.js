document.getElementById('spinButton').addEventListener('click', startSpinning);

let isSpinning = false;
let currentAngle = 0;
let spinSpeed = 60; // Velocidad inicial rápida
let speedFactor = 1; // Control de velocidad
let slowMotionEffect = false; // Controla el efecto de falsa ralentización

function startSpinning() {
    if (isSpinning) return;
    isSpinning = true;

    const wheel = document.getElementById('wheel');
    let spinButton = document.getElementById('spinButton');
    spinButton.disabled = true;

    // Gira rápido durante los primeros 6 segundos
    setTimeout(() => {
        slowMotionEffect = true; // Activa el efecto de falsa ralentización
        applySlowMotionEffect();
    }, 6000);

    function spinLoop() {
        if (!isSpinning) return;

        // Aplica el ángulo con la velocidad ajustada
        currentAngle += spinSpeed * speedFactor;
        wheel.style.transform = `rotate(${currentAngle}deg)`;

        // Sigue girando sin parar
        requestAnimationFrame(spinLoop);
    }

    spinLoop();
}

// Función para simular la ralentización cada 6-7 segundos
function applySlowMotionEffect() {
    if (!slowMotionEffect) return;

    setInterval(() => {
        speedFactor = 0.4; // Parece que se desacelera

        setTimeout(() => {
            speedFactor = 1; // Vuelve a girar a la velocidad normal
        }, 1000); // Falsa ralentización por 1 segundo
    }, Math.random


