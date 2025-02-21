document.getElementById('spinButton').addEventListener('click', startSpinning);

let isSpinning = false;
let currentAngle = 0;
let baseSpeed = 0.7;         // Velocidad inicial más baja para que las opciones sean visibles
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
                speedFactor = 0.2;
                slowdownActive = true;

                // Mantiene la velocidad reducida por 1.5 segundos
                setTimeout(() => {
                    // Vuelve a la velocidad normal
                    speedFactor = 1;
                    slowdownActive = false;

                    // Vuelve a programar el siguiente efecto de falsa desaceleración
                    applySlowdown();
                }, 1500);
            }, interval);
        }
        applySlowdown();
    }, 10000);
}

