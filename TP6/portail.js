const skinsContainer = document.querySelector(".skins-container");
let selectedSkin = null;
const SKIN_COUNT = 29;

for (let i = 1; i <= SKIN_COUNT; i++) {
    const skinDiv = document.createElement("div");
    skinDiv.className = "skin";
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64; 
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    const image = new Image();
    image.src = `assets/${i}.png`;
    image.onload = () => {
        const sx = 128; // x départ
        const sy = 128; // y départ
        const sw = 64; // largeur
        const sh = 64; // hauteur
        ctx.clearRect(0, 0, 64, 64);
        ctx.drawImage(
            image,
            sx, sy, sw, sh,
            0, 0, 64, 64
        );
    };
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "skin";
    input.value = image.src;
    skinDiv.addEventListener("click", () => {
        input.checked = true;
        selectedSkin = image.src;
        document.querySelectorAll(".skin").forEach(s => {
            s.classList.remove("selected");
        });
        skinDiv.classList.add("selected");
    });
    skinDiv.appendChild(canvas);
    skinDiv.appendChild(input);
    skinsContainer.appendChild(skinDiv);
}

function joinGame() {
    const pseudo = document.getElementById("pseudo").value;
    const serverUrl = document.getElementById("serverUrl").value;
    if (!pseudo || !serverUrl || !selectedSkin) {
        alert("Veuillez remplir tous les champs et choisir un skin");
        return;
    }

    localStorage.setItem("pseudo", pseudo);
    localStorage.setItem("serverUrl", serverUrl);
    localStorage.setItem("skin", selectedSkin);
    window.location.href = "lobby.html";
}