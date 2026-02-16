// Función para mostrar el siguiente mensaje
function showNext(messageNumber) {
    // Ocultar todos los mensajes
    const allMessages = document.querySelectorAll('.message-box');
    allMessages.forEach(msg => {
        msg.classList.add('hidden');
    });
    
    // Mostrar el mensaje solicitado
    const nextMessage = document.getElementById(`message-${messageNumber}`);
    if (nextMessage) {
        nextMessage.classList.remove('hidden');
    }
    
    // Actualizar el timeline
    updateTimeline(messageNumber);
    
    // Si es el mensaje del contador (último mensaje), iniciarlo
    if (messageNumber === 8) {
        startCountdown();
    }
    
    // Scroll suave al contenido
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Función para actualizar el estado del timeline
function updateTimeline(currentMessage) {
    const steps = document.querySelectorAll('.timeline-step');
    
    steps.forEach((step, index) => {
        step.classList.remove('active');
        
        // Marcar como visitados los anteriores
        if (index < currentMessage) {
            step.classList.add('visited');
        } else if (index === currentMessage) {
            step.classList.add('active');
        } else {
            step.classList.remove('visited');
        }
    });
}

// Función para el contador de tiempo hasta mañana
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    
    function updateCountdown() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const diff = tomorrow - now;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `
            <span style="font-size: 0.8em;">⏰ ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}</span>
            <br>
            <span style="font-size: 0.7em; opacity: 0.8;">hasta mañana</span>
        `;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Agregar efectos de partículas cuando se hace clic en un botón
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('next-btn')) {
        createHearts(e.pageX, e.pageY);
    }
});

function createHearts(x, y) {
    const hearts = ['❤️', '💖', '💝', '💗', '✨', '⭐', '🌟', '💫'];
    
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = '25px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.animation = 'floatUp 2s ease-out forwards';
        heart.style.filter = 'drop-shadow(0 0 10px rgba(135, 206, 250, 0.9))';
        
        const angle = (Math.PI * 2 * i) / 10;
        const velocity = 120;
        heart.style.setProperty('--tx', Math.cos(angle) * velocity + 'px');
        heart.style.setProperty('--ty', Math.sin(angle) * velocity - 200 + 'px');
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 2000);
    }
}

// Inicializar la página
window.addEventListener('DOMContentLoaded', function() {
    showNext(0);
});

// Agregar animación CSS para los corazones
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
