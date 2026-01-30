const directions = {
    north: 0,
    east: 1,
    south: 2,
    west: 3
};

class Player {
    constructor(id, name, skinPath, position) {
        this.id = id;
        this.name = name;
        this.skinPath = skinPath;

        this.x = position[0];
        this.y = position[1];
        this.position = position;

        this.renderX = this.x;
        this.renderY = this.y;
        this.prevX = this.x;
        this.prevY = this.y;

        this.lvl = 1;
        this.hp = 100;
        this.maxHp = 100;
        this.speed = 0.2;

        this.direction = directions.south;
        this.isWalking = false;
        this.isAttacking = false;
        this.isDying = false;
        this.isDead = false;

        this.walkSpriteIndex = 0;
        this.walkFrameCounter = 0;
        this.walkSpritesNumber = 9;
        this.walkFramesPerSprite = 10;

        this.attackSpriteIndex = 0;
        this.attackFrameCounter = 0;
        this.attackSpritesNumber = 6;
        this.attackFramesPerSprite = 6;

        this.deathSpriteIndex = 0;
        this.deathFrameCounter = 0;
        this.deathSpritesNumber = 6;
        this.deathFramesPerSprite = 10;
    }

    update(updateData) {
        this.prevX = this.x;
        this.prevY = this.y;

        this.name = updateData.name;
        this.lvl = updateData.lvl;
        this.hp = updateData.hp;
        this.maxHp = updateData.maxHp;
        this.speed = updateData.speed;

        this.x = updateData.position[0];
        this.y = updateData.position[1];

        this.direction = updateData.direction;
        this.isWalking = updateData.isWalking;
        this.isAttacking = updateData.isAttacking;
        this.isDying = updateData.isDying;
        this.skinPath = updateData.skinPath;
    }

    animate() {
        if (this.isWalking) {
            this.walkFrameCounter++;
            this.walkSpriteIndex =
                Math.floor(this.walkFrameCounter / this.walkFramesPerSprite) %
                this.walkSpritesNumber;
        } else {
            this.walkFrameCounter = 0;
            this.walkSpriteIndex = 0;
        }

        if (this.isAttacking || this.attackFrameCounter || this.attackSpriteIndex) {
            this.attackFrameCounter++;

            if (this.attackFrameCounter >= this.attackFramesPerSprite) {
                this.attackFrameCounter = 0;
                this.attackSpriteIndex++;
            }

            if (this.attackSpriteIndex >= this.attackSpritesNumber) {
                this.attackSpriteIndex = 0;
            }
        } else {
            this.attackFrameCounter = 0;
            this.attackSpriteIndex = 0;
        }

        if (this.isDying) {
            this.deathFrameCounter++;

            if (this.deathFrameCounter >= this.deathFramesPerSprite) {
                this.deathFrameCounter = 0;
                this.deathSpriteIndex++;
            }

            if (this.deathSpriteIndex >= this.deathSpritesNumber) {
                this.isDead = true;
            }
        }
    }

    interpolate(alpha) {
        this.renderX = this.prevX + (this.x - this.prevX) * alpha;
        this.renderY = this.prevY + (this.y - this.prevY) * alpha;
    }
}