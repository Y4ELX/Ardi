try {
    const audio = document.getElementById('audio');
    const seekSlider = document.getElementById('seekSlider');
    const ESPP = document.getElementById('ESP');
    const ENGP = document.getElementById('ENG');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');
    const playPauseBtn = document.getElementById('playPauseBtn');

    audio.src = "img/audio.mp3";
    playPauseBtn.style.backgroundImage = 'url("img/playbutton.svg")';
    ESPP.style.textDecoration = 'underline';
    ESPP.style.color = '#E6E5DD';
    ENGP.style.textDecoration = 'none';
    ENGP.style.color = '#8b8b8b';

    audio.load();

    audio.addEventListener('loadedmetadata', () => {
        const duration = Math.floor(audio.duration);
        seekSlider.max = duration;
        durationDisplay.textContent = formatTime(duration);

        seekSlider.value = 0;
        currentTimeDisplay.textContent = formatTime(0);
    });

    window.changelang = function (lang) {
        switch (lang) {
            case "ESP":
                audio.src = "img/audio.mp3";
                playPauseBtn.style.backgroundImage = 'url("img/playbutton.png")';
                ESPP.style.textDecoration = 'underline';
                ESPP.style.color = '#E6E5DD';
                ENGP.style.textDecoration = 'none';
                ENGP.style.color = '#8b8b8b';
                break;
            case "ENG":
                audio.src = "img/audioENG.mp3";
                playPauseBtn.style.backgroundImage = 'url("img/playbutton.png")';
                ESPP.style.textDecoration = 'none';
                ESPP.style.color = '#8b8b8b';
                ENGP.style.textDecoration = 'underline';
                ENGP.style.color = '#E6E5DD';
                break;
            default:
                console.error("Idioma no soportado");
                return;
        }

        audio.load();

        audio.addEventListener('loadedmetadata', () => {
            const duration = Math.floor(audio.duration);
            seekSlider.max = duration;
            durationDisplay.textContent = formatTime(duration);

            seekSlider.value = 0;
            currentTimeDisplay.textContent = formatTime(0);
        });
    };

    audio.addEventListener('timeupdate', () => {
        const currentTime = Math.floor(audio.currentTime);
        const duration = Math.floor(audio.duration);

        seekSlider.value = currentTime;
        seekSlider.style.setProperty('--value', `${(currentTime / duration) * 100}%`);

        currentTimeDisplay.textContent = formatTime(currentTime);
    });

    seekSlider.addEventListener('input', () => {
        audio.currentTime = seekSlider.value;
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch((error) => {
                console.error("Error al intentar reproducir el archivo de audio:", error);
            });
            playPauseBtn.style.backgroundImage = 'url("img/pausebutton.png")';
        } else {
            audio.pause();
            playPauseBtn.style.backgroundImage = 'url("img/playbutton.png")';
        }
    });
} catch (error) {
    console.error("Error en el manejo del audio y el slider:", error);
}


let scrollVelocity = 0;
let isScrolling = false;
const friction = 0.95; // Factor de fricción para la inercia (ajustar para más/menos inercia)
const scrollSensitivity = 0.1; // Sensibilidad de desplazamiento (ajustar para más/menos distancia)

function onScroll(event) {
    isScrolling = true;
    // Ajustar la distancia de desplazamiento con scrollSensitivity
    scrollVelocity += event.deltaY * scrollSensitivity;
}

function smoothScroll() {
    if (isScrolling) {
        window.scrollBy(0, scrollVelocity);
        scrollVelocity *= friction; // Aplicar fricción para simular la inercia

        if (Math.abs(scrollVelocity) < 0.5) { // Umbral para detener el scroll
            isScrolling = false;
            scrollVelocity = 0;
        }
    }
    requestAnimationFrame(smoothScroll);
}


window.addEventListener('wheel', onScroll);
smoothScroll();

//! Cursor


document.addEventListener('DOMContentLoaded', function () {

    document.addEventListener('mousemove', function (e) {
        const { clientX, clientY } = e;
        const cursorSize = 20;
        const cursorHalfSize = cursorSize / 8;
        const cursorX = clientX - cursorHalfSize;
        const cursorY = clientY - cursorHalfSize;

        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
    });
});