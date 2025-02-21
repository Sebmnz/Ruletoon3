document.getElementById('spinButton').addEventListener('click', startSpinning);

let isSpinning = false;
let currentAngle = 0;
let baseSpeed = 60;         // Velocidad base alta
let speedFactor = 1;        // Factor de velocidad actual (1 = velocidad completa)
let slowdownActive = false; // Bandera para saber si se está aplicando el efecto de "parada aparente"
let spinLoopId;

function startSpinning() {
  if (isSpinning) return;
  isSpinning = true;
  const wheel = document.getElementById('wheel');
  const spinButton = document.getElementById('spinButton');
  spinButton.disabled = true;

  // Reiniciamos variables
  currentAngle = 0;
  speedFactor = 1;
  slowdownActive = false;

  // Iniciar el bucle de giro (usando requestAnimationFrame)
  function spinLoop() {
    currentAngle += baseSpeed * speedFactor;
    wheel.style.transform = `rotate(${currentAngle}deg)`;
    spinLoopId = requestAnimationFrame(spinLoop);
  }
  
  spinLoop();

  // Durante los primeros 10 segundos, no se hace nada; luego se inician los "efectos de parada aparente"
  setTimeout(() => {
    // Función recursiva para aplicar el efecto de desaceleración
    function applySlowdown() {
      // Genera un intervalo aleatorio entre 10 y 12 segundos
      const interval = Math.random() * 2000 + 10000; // en milisegundos

      setTimeout(() => {
        // Simula que la ruleta se para: baja el speedFactor a casi cero
        speedFactor = 0.05; 
        slowdownActive = true;
        // Mantiene este estado por 1 segundo (ajustable)
        setTimeout(() => {
          // Vuelve a la velocidad normal
          speedFactor = 1;
          slowdownActive = false;
          // Vuelve a programar el próximo "efecto de parada aparente"
          applySlowdown();
        }, 1000);
      }, interval);
    }
    applySlowdown();
  }, 10000);
}

