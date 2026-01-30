class GameView {
    constructor(game) {
        this.game = game;
        this.canvas = document.getElementById("canvas");

        this.canvas.width = 600;
        this.canvas.height = 600;

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.ctx = this.canvas.getContext("2d");
        this.FRAME_SIZE = 64;

        this.LARGE_ATTACK_SKINS = [
            "1.png",
            "2.png",
            "3.png",
            "4.png",
            "5.png",
            "6.png",
            "8.png",
            "9.png",
            "10.png",
            "11.png",
            "12.png",
            "14.png",
            "15.png",
            "16.png",
            "17.png",
            "19.png",
            "20.png",
            "22.png",
            "23.png",
            "25.png",
            "27.png",
            "28.png",
        ];



        this.spriteCache = {};
        this.drawBackground();
        this.clear();

    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBackground() {
        const ctx = this.ctx;

        // === FOND DÉGRADÉ ===
        const gradient = ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, "#1e1e2f");
        gradient.addColorStop(1, "#0f0f1a");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.lineWidth = 1;

        const gridSize = 64;

        for (let x = 0; x <= this.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.height);
            ctx.stroke();
        }

        for (let y = 0; y <= this.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this.width, y);
            ctx.stroke();
        }

        ctx.strokeStyle = "#ff914d";
        ctx.lineWidth = 4;
        ctx.strokeRect(0, 0, this.width, this.height);

        const light = ctx.createRadialGradient(
            this.width / 2,
            this.height / 2,
            50,
            this.width / 2,
            this.height / 2,
            this.width / 1.2
        );

        light.addColorStop(0, "rgba(255,255,255,0.05)");
        light.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = light;
        ctx.fillRect(0, 0, this.width, this.height);
    }


    render() {
        this.clear();
        this.drawBackground();

        for (let id in this.game.players) {
            this.drawPlayer(this.game.players[id]);
        }
    }


    drawPlayer(player) {
        if (!player.position) return;

        let sprite = this.spriteCache[player.skinPath];
        if (!sprite) {
            sprite = new Image();
            sprite.src = player.skinPath;
            this.spriteCache[player.skinPath] = sprite;
            return;
        }

        if (!sprite.complete || sprite.naturalWidth === 0) return;

        let canvasX, canvasY;
        if (Array.isArray(player.position)) {
            canvasX = player.renderX * this.width;
            canvasY = player.renderY * this.height;
        }

        if (player.animate) player.animate();

        let frameX = 0;
        let frameY = 0;

        let sourceWidth = 64;
        let sourceHeight = 64;
        let destWidth = 64;
        let destHeight = 64;

        let drawX = canvasX;
        let drawY = canvasY;

        const direction = player.direction;
        const directionMap = { 0: 0, 1: 3, 2: 2, 3: 1 };

        if (direction !== undefined && directionMap[direction] !== undefined) {
            const mappedDir = directionMap[direction];

            if (player.isDying) {
                frameY = 20 * this.FRAME_SIZE;

                if (player.deathSpriteIndex !== undefined) {
                    frameX = player.deathSpriteIndex * this.FRAME_SIZE;
                }
            }

            else if (
                player.isAttacking ||
                player.attackSpriteIndex > 0 ||
                player.attackFrameCounter > 0
            ) {
                const skinName = player.skinPath.split("/").pop();
                const isLarge = this.LARGE_ATTACK_SKINS.includes(skinName);

                if (isLarge) {
                    const size = 192;
                    sourceWidth = size;
                    sourceHeight = size;
                    destWidth = size;
                    destHeight = size;

                    const attackRows = { 0: 54, 1: 63, 2: 60, 3: 57 };
                    frameY = (attackRows[direction] || 60) * this.FRAME_SIZE;

                    drawX = canvasX - 64;
                    drawY = canvasY - 64;

                    if (player.attackSpriteIndex !== undefined)
                        frameX = player.attackSpriteIndex * size;
                } else {
                    const size = 128;
                    sourceWidth = size;
                    sourceHeight = size;
                    destWidth = size;
                    destHeight = size;

                    const attackRows = { 0: 54, 1: 60, 2: 58, 3: 56 };
                    frameY = (attackRows[direction] || 58) * this.FRAME_SIZE;

                    drawX = canvasX - 32;
                    drawY = canvasY - 32;

                    if (player.attackSpriteIndex !== undefined)
                        frameX = player.attackSpriteIndex * size;
                }
            }
            else if (player.isWalking) {
                frameY = (mappedDir + 8) * this.FRAME_SIZE;
                if (player.walkSpriteIndex !== undefined) {
                    frameX = player.walkSpriteIndex * this.FRAME_SIZE;
                }
            }
            else {
                frameY = mappedDir * this.FRAME_SIZE;
            }
        }

        this.ctx.drawImage(
            sprite,
            frameX,
            frameY,
            sourceWidth,
            sourceHeight,
            drawX,
            drawY,
            destWidth,
            destHeight,
        );

        if (!player.isDying && player.hp > 0) {
            const barWidth = 40;
            const barHeight = 5;
            const barX = canvasX + (64 - barWidth) / 2;
            const barY = canvasY - 2;

            this.ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
            this.ctx.fillRect(barX, barY, barWidth, barHeight);

            const hpPercent = Math.max(0, player.hp / player.maxHp);
            this.ctx.fillStyle = "#00ff00";
            this.ctx.fillRect(barX, barY, barWidth * hpPercent, barHeight);

            this.ctx.fillStyle = "#ffffff";
            this.ctx.font = "12px Arial";
            this.ctx.textAlign = "center";
            this.ctx.fillText(player.lvl, canvasX + 32, canvasY - 15);

            this.ctx.strokeStyle = "black";
            this.ctx.lineWidth = 0.5;
            this.ctx.strokeRect(barX, barY, barWidth, barHeight);
        }

        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = "12px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText(player.name, canvasX + 32, canvasY + 70);

        this.ctx.font = "16px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "top";
        this.ctx.fillText(this.game.getElapsedTime(), this.canvas.width / 2, 20);
    }

}
