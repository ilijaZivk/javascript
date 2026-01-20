class Player {
    constructor(id, name, skinId, lvl, position, HP, HPmax, hitbox, damagehitbox, HPregenrate) {
        this.id = id;
        this.name = name;
        this.skinId = skinId;
        this.level = lvl;
        this.position = position;
        this.HP = HP;
        this.HPregenrate = HPregenrate;
        this.HPmax = HPmax;
        this.hitbox = hitbox;
        this.damagehitbox = damagehitbox;
        this.isWalking = false;
        this.isAttacking = false;
        this.isDead = false;

        this.currentWalkSpriteStep = 0;
        this.walkSpriteDuration = 0;
        this.walkSpriteIndex = 0;
        this.walkSpritesNumber = 0;
    }

    update(updateData) {
        if (!updateData) return;

        if (updateData.position) {
            this.position = updateData.position;
        }
        if (updateData.lvl !== undefined) {
            this.level = updateData.lvl;
        }
        if (updateData.HP !== undefined) {
            this.HP = updateData.HP;
        }
        if (updateData.skinId !== undefined) {
            this.skinId = updateData.skinId;
        }
        if (updateData.name) {
            this.name = updateData.name;
        }
        if (updateData.HPmax !== undefined) {
            this.HPmax = updateData.HPmax;
        }
    }

    animate() {
        if (this.isWalking) {
            this.currentWalkSpriteStep++;
            if (this.currentWalkSpriteStep >= this.walkSpriteDuration) {
                this.currentWalkSpriteStep = 0;
                this.walkSpriteIndex++;
            }
            if (this.walkSpriteIndex >= this.walkSpritesNumber) {
                this.walkSpriteIndex = 0;
            }
        }

        console.log("Walk Animation :\n");
        console.log("isWalking =", this.isWalking);
        console.log("walkSpriteIndex =", this.walkSpriteIndex, "/", this.walkSpritesNumber);
        console.log("currentWalkSpriteStep =", this.currentWalkSpriteStep, "/", this.walkSpriteDuration);
    }
}