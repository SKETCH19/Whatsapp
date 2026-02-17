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
    
    // Si es el mensaje del video (mensaje 9), reproducirlo automáticamente
    if (messageNumber === 9) {
        const video = document.getElementById('songVideo');
        if (video) {
            video.play().catch(err => {
                console.log('Error al reproducir el video:', err);
            });
        }
    }
    
    // Si es el mensaje del contador (último mensaje), iniciarlo
    if (messageNumber === 10) {
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
            ⏰ ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}
            <br>
            <span style="font-size: 0.6em; opacity: 0.8;">hasta mañana</span>
        `;
        
        // Si llega a 0, el contador se reiniciará automáticamente en la próxima actualización
        // porque calculará un nuevo "tomorrow" (24 horas más)
    }
    
    updateCountdown();
    // El contador se actualiza cada segundo y siempre se reinicia automáticamente cada 24 horas
    const countdownInterval = setInterval(updateCountdown, 1000);
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
    updateTimeline(0);
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
    
    /* Estilos para el contenedor del video */
    .video-container {
        margin: 20px 0;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(135, 206, 250, 0.3);
    }
    
    .video-container video {
        display: block;
        border-radius: 15px;
        max-width: 100%;
        height: auto;
    }
`;
document.head.appendChild(style);
