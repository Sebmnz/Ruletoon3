document.getElementById('spinButton').addEventListener('click', spinWheel);

function spinWheel() {
    const wheel = document.getElementById('wheel');
    const confettiContainer = document.getElementById('confetti-container');
    const result = document.getElementById('result');
    const spinButton = document.getElementById('spinButton');

    // Desactivar el botón mientras gira
    spinButton.disabled = true;
    result.classList.add('hidden');

    // Opciones y sus pesos
    const options = ['BESO', 'CHUPITO', 'TORTAZO', 'JUEGO'];
    const weights = [0.2, 0.2, 0.1, 0.5]; // Probabilidades trucazo
    // Seleccionar una opción basada en los pesos
    const selectedOptionIndex = weightedRandom(options, weights);
    const selectedOption = options[selectedOptionIndex];

    // Calcular el ángulo para la ruleta basado en la opción seleccionada
    const anglePerSection = 360 / options.length;
    const randomAngleOffset = Math.random() * anglePerSection;
    const angle = (selectedOptionIndex * anglePerSection) + randomAngleOffset + 720; // Asegurar al menos 2 vueltas completas

    // Girar la ruleta
    wheel.style.setProperty('--rotate', angle);

    // Mostrar confeti y resultado después de que termine de girar
    setTimeout(() => {
        createConfetti();
        
        // Ajustar el resultado para los casos específicos
        let displayOption = selectedOption;
        if (selectedOption === 'JUEGO') {
            displayOption = 'CHUPITO';
        } else if (selectedOption === 'CHUPITO') {
            displayOption = 'JUEGO';
        }

        result.innerText = displayOption;
        result.classList.remove('hidden');

        // Redirigir después de 7.5 segundos
        setTimeout(() => {
            clearConfetti();
            window.location.href = 'https://instagram.com/sebasm97';
        }, 75000);
    }, 5000); // La ruleta gira durante 5 segundos

    // Rehabilitar el botón después de 15 segundos
    setTimeout(() => {
        spinButton.disabled = false;
    }, 15000);
}

// Función para seleccionar una opción basada en los pesos
function weightedRandom(items, weights) {
    let totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
    let randomNum = Math.random() * totalWeight;
    for (let i = 0; i < items.length; i++) {
        if (randomNum < weights[i]) {
            return i;
        }
        randomNum -= weights[i];
    }
    return -1; // Por si algo sale mal
}

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

function clearConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    confettiContainer.innerHTML = '';
}
