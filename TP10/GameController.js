class GameController {
    constructor() {
        this.game = new Game();
        this.gameView = new GameView(this.game);
        // Server sends updates at 20 ticks per second
        this.SERVER_TICK_RATE = 20;
        // Duration between two server ticks in milliseconds
        this.SERVER_INTERVAL = 1000 / this.SERVER_TICK_RATE;


        const userData = JSON.parse(localStorage.getItem("jsArenaPlayer"));
        this.pseudo = userData.pseudo;
        this.serverUrl = userData.serverUrl;
        this.skinPath = userData.skinPath;
        this.socket = new WebSocket(this.serverUrl);

        this.inputState = {
            up: false,
            down: false,
            left: false,
            right: false,
            attack: false
        };

        this.initSocket();
        this.initInput();
        this.startInputSender();
        // Permanently bind "this" at the instance of the GameController class
        this.loop = this.loop.bind(this);

        // Regulates framerate to keep 60fps
        requestAnimationFrame(this.loop);
    }

    // === Main render loop ===
    loop = (timestamp) => {
        const elapsed = timestamp - this.lastServerTick;

        // Alpha entre 0 et 1
        let alpha = elapsed / this.SERVER_INTERVAL;
        alpha = Math.min(alpha, 1);

        // Interpolation de tous les joueurs
        for (let id in this.game.players) {
            this.game.players[id].interpolate(alpha);
        }

        this.gameView.render();
        //console.log(alpha.toFixed(2));

        requestAnimationFrame(this.loop);
    };


    initSocket() {
        this.socket.onopen = () => {
            console.log("Connexion WebSocket établie avec le backend");
            this.socket.send(JSON.stringify({
                name: this.pseudo,
                skinPath: this.skinPath
            }))
        };

        this.socket.onmessage = (event) => {
            const gameStateFromServer = JSON.parse(event.data);
            this.lastServerTick = performance.now();
            //console.log(gameStateFromServer);
            this.game.update(gameStateFromServer);
        };

    }

    initInput() {
        document.addEventListener("keydown", (event) =>{
            switch(event.key) {
                case "ArrowUp":
                case "z":
                    this.inputState.up = true;
                    break;
                case "ArrowDown":
                case "s":
                    this.inputState.down = true;
                    break;
                case "ArrowRight":
                case "d":
                    this.inputState.right = true;
                    break;
                case "ArrowLeft":
                case "q":
                    this.inputState.left = true;
                    break;
            }

            console.log(this.inputState);
            
        });

        document.addEventListener("keyup", (event) =>{
            switch(event.key) {
                case "ArrowUp":
                case "z":
                    this.inputState.up = false;
                    break;
                case "ArrowDown":
                case "s":
                    this.inputState.down = false;
                    break;
                case "ArrowRight":
                case "d":
                    this.inputState.right = false;
                    break;
                case "ArrowLeft":
                case "q":
                    this.inputState.left = false;
                    break;
            }

            console.log(this.inputState);
            
        });

        window.addEventListener("mousedown", (event) => {
            if (event.button === 0) {
                this.inputState.attack = true;
            }

            console.log(this.inputState);
        });

        window.addEventListener("mouseup", (event) => {
            if (event.button === 0) {
                this.inputState.attack = false;
            }
        });

        // Empêche le menu contextuel par défaut au clic droit
        window.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            console.log(this.inputState);
        });

        
    }

    startInputSender() {
        setInterval(() => {
            if (this.socket.readyState !== WebSocket.OPEN) return;

            const message = {
                type: "input",
                input: this.inputState
            };

            this.socket.send(JSON.stringify(message));
        }, this.SERVER_INTERVAL);

    }

}

const myGameController = new GameController();
// === Start the game controller by instantiating the GameController class ===
// This line will execute the constructor (e.g, launch the frontend)