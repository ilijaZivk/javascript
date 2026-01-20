class GameController {
    constructor() {
        console.log("=== TEST 1 : ajout des joueurs initiaux ===");

        this.SERVER_TICK_RATE = 20;
        this.SERVER_INTERVAL = 1000 / this.SERVER_TICK_RATE;

        this.loop = this.loop.bind(this);
        requestAnimationFrame(this.loop);

        this.inputs = { up: false, down: false, left: false, right: false, attack: false };

        // Récupération des infos joueur avec sécurité
        const jsArenaPlayer = JSON.parse(localStorage.getItem("jsArenaPlayer") || 
            JSON.stringify({
                pseudo: "JoueurTest",
                serverUrl: "ws://localhost:8000/ws",
                skinPath: "./spritesheets/1.png"
            })
        );

        this.pseudo = jsArenaPlayer.pseudo;
        this.serverUrl = jsArenaPlayer.serverUrl;
        this.skinPath = jsArenaPlayer.skinPath;

        console.log("Player info:", this.pseudo, this.serverUrl, this.skinPath);

        this.model = {};

        this.game = new Game();
        console.log("Game object created");

        // WebSocket
        this.socket = new WebSocket(this.serverUrl);
        this.initSocket();

        // Gestion du clavier
        this.initInput();
    }

    initSocket() {
        this.socket.onopen = () => {
            console.log("Connected to server");
            this.socket.send(JSON.stringify({
                name: this.pseudo,
                skinPath: this.skinPath
            }));
        };

        this.socket.onmessage = (event) => {
            const snapshot = JSON.parse(event.data);
            this.game.state = snapshot;

            console.log("État du jeu:");
            console.log("Chronomètre:", snapshot.timer || 0);
            console.log("Jeu en cours:", snapshot.isRunning || false);
            console.log("Jeu terminé:", snapshot.isFinished || false);
            console.log("Joueurs:", snapshot.players || {});
        };

        this.socket.onerror = (err) => console.error("WebSocket error:", err);
        this.socket.onclose = () => console.warn("WebSocket connection closed");
    }

    initInput() {
        window.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") this.inputs.up = true;
            if (event.key === "ArrowDown") this.inputs.down = true;
            if (event.key === "ArrowLeft") this.inputs.left = true;
            if (event.key === "ArrowRight") this.inputs.right = true;
            if (event.key === " ") this.inputs.attack = true;

            console.log("Inputs pressés:", this.inputs);
        });

        window.addEventListener("keyup", (event) => {
            if (event.key === "ArrowUp") this.inputs.up = false;
            if (event.key === "ArrowDown") this.inputs.down = false;
            if (event.key === "ArrowLeft") this.inputs.left = false;
            if (event.key === "ArrowRight") this.inputs.right = false;
            if (event.key === " ") this.inputs.attack = false;

            console.log("Inputs relâchés:", this.inputs);
        });
    }

    loop(timestamp) {
        // Log état du jeu à chaque tick
        if (this.game && this.game.state) {
            console.log("=== Tick ===");
            console.log("Chronomètre:", this.game.state.timer);
            console.log("Jeu en cours:", this.game.state.isRunning);
            console.log("Joueurs:", this.game.state.players);
        }

        requestAnimationFrame(this.loop);
    }
}

new GameController();
