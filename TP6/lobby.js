window.addEventListener("DOMContentLoaded", () => {
    const pseudo = localStorage.getItem("pseudo");
    const skinSrc = localStorage.getItem("skin");

    if (!pseudo || !skinSrc) {
        window.location.href = "portail.html";
        return;
    }

    const player = document.querySelector(".player");
    const nameSpan = document.querySelector(".player-name");
    const canvas = document.querySelector(".player-skin");
    const readyBtn = document.querySelector(".ready-btn");
    const countdown = document.querySelector(".countdown");
    const timerSpan = document.getElementById("timer");

    nameSpan.textContent = pseudo;

    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = skinSrc;

    image.onload = () => {
        ctx.drawImage(image, 128, 128, 64, 64, 0, 0, 64, 64);
    };

    let isReady = false;
    let countdownInterval = null;

    readyBtn.addEventListener("click", () => {
        isReady = !isReady;
        player.dataset.ready = isReady;

        readyBtn.textContent = isReady ? "Prêt ✔" : "Pas prêt";
        readyBtn.classList.toggle("ready", isReady);

        checkAllReady();
    });

    function checkAllReady() {
        const players = document.querySelectorAll(".player");
        const allReady = [...players].every(p => p.dataset.ready === "true");

        if (allReady) {
            startCountdown();
        } else {
            stopCountdown();
        }
    }

    function startCountdown() {
        if (countdownInterval) return;

        let time = 3;
        timerSpan.textContent = time;
        countdown.style.display = "block";

        countdownInterval = setInterval(() => {
            time--;
            timerSpan.textContent = time;

            if (time === 0) {
                clearInterval(countdownInterval);
                launchGame();
            }
        }, 1000);
    }

    function stopCountdown() {
        clearInterval(countdownInterval);
        countdownInterval = null;
        countdown.style.display = "none";
    }

    function launchGame() {
    }
});