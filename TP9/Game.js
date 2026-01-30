class Game {
    constructor() {
        this.isRunning = false;
        this.isOver = false;

        this.timer = 0;
        setInterval(() => {
            if(this.isRunning && !this.isOver) {
                this.timer++;
            }
        }, 300);

        this.players = {};

    }

    update(gameStateFromServer) {
        this.isRunning = gameStateFromServer.isRunning;
        this.isOver = gameStateFromServer.isOver;
        this.timer = gameStateFromServer.timer;

        for(let playerId in gameStateFromServer.players) {
            let backendPlayer = gameStateFromServer.players[playerId]
            if(!this.players[playerId]) {
                this.players[playerId] = new Player (
                    playerId,
                    backendPlayer.name,
                    backendPlayer.skinPath,
                    backendPlayer.position
                )
            } 
            
            this.players[playerId].update(backendPlayer);
        }

    
        for (let frontPlayerId in this.players) {
            if (!(frontPlayerId in gameStateFromServer.players)) {
                delete this.players[frontPlayerId];
            } 
        }
    }

    getElapsedTime() {
        const seconds =  Math.floor(this.timer);
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        const hh = h.toString().padStart(2, '0');
        const mm = m.toString().padStart(2, '0');
        const ss = s.toString().padStart(2, '0');

        return `${hh}:${mm}:${ss}`;
    }

}