try {
    const audio = document.getElementById('audio');
    const seekSlider = document.getElementById('seekSlider');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');
    const playPauseBtn = document.getElementById('playPauseBtn');

    // Verificar el nombre del archivo en la URL
    const currentPage = window.location.pathname.split('/').pop(); // Obtener el nombre del archivo actual

    if (currentPage === "indexen.html") {
        audio.src = "img/audioENG.mp3";  // Cambiar el audio a inglés si es "indexen.html"
    } else {
        audio.src = "img/audio.mp3";  // Usar el audio en español por defecto
    }

    playPauseBtn.style.backgroundImage = 'url("img/playbutton.svg")';
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
                playPauseBtn.style.backgroundImage = 'url("img/playbutton.svg")';
                ESPP.style.textDecoration = 'underline';
                ESPP.style.color = '#E6E5DD';
                ENGP.style.textDecoration = 'none';
                ENGP.style.color = '#8b8b8b';
                break;
            case "ENG":
                audio.src = "img/audioENG.mp3";
                playPauseBtn.style.backgroundImage = 'url("img/playbutton.svg")';
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
            playPauseBtn.style.backgroundImage = 'url("img/pause.svg")';
        } else {
            audio.pause();
            playPauseBtn.style.backgroundImage = 'url("img/playbutton.svg")';
        }
    });
} catch (error) {
    console.error("Error en el manejo del audio y el slider:", error);
}


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

document.addEventListener('DOMContentLoaded', function () {
    const textToCopy = 'NEBULA.DESIGNBRAND@GMAIL.COM';

    const button = document.querySelector('.nebdes');
    const labelContInt = document.querySelector('.labelContInt');

    button.addEventListener('mouseover', () => {
        labelContInt.style.transform = 'translateY(-2vh)';
    });

    button.addEventListener('mouseout', () => {
        labelContInt.style.transform = 'translateY(0)';
    });

    button.addEventListener('click', () => {
        labelContInt.style.transform = 'translateY(-4.4vh)';

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log('Texto copiado al portapapeles');
            })
            .catch(err => {
                console.error('Error al copiar el texto: ', err);
        });

        setTimeout(() => {
            labelContInt.style.transform = 'translateY(0)';
        }, 2000);
    });
});

