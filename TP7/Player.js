class player {
    constructor(id, name, skinId, lvl, position, HP, HPmax, hitbox, damagehitbox, HPregenrate) {
        this.id = id
        this.name = name
        this.skinId = skinId
        this.level = lvl
        this.position = position
        this.HP = HP
        this.HPregenrate = HPregenrate
        this.HPmax = HPmax
        this.hitbox = hitbox
        this.damagehitbox = damagehitbox
        this.isWalking = false
        this.isAttacking = false
        this.isDead = false
    }

    update(updateData) {
        if (!updateData) {
            console.log("Aucune donnée à mettre à jour");
            return;
        }
        if (updateData.position) {
            this.position = updateData.position;
            console.log("Position mise à jour :", this.position);
        }
        if (updateData.lvl) {
            this.lvl = updateData.lvl;
            console.log("Niveau mis à jour :", this.lvl);
        }
        if (updateData.HP !== undefined) {
            this.HP = updateData.HP;
            console.log("HP mis à jour :", this.HP);
        }
        if (updateData.skinId !== undefined) {
            this.skinId = updateData.skinId;
            console.log("Skin mis à jour :", this.skinId);
        }
        if (updateData.name) {
            this.name = updateData.name;
            console.log("Nom mis à jour :", this.name);
        }
        if (updateData.HPmax) {
            this.HPmax = updateData.HPmax;
            console.log("Nom mis à jour :", this.HPmax);
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
        else if (this.isAttacking) {
        }
        else {}
    }
    console.log("Walk Animation :/n");
    console.log("isWalking = ", this.isWalking);
    console.log("walkSpriteIndex = ", this.walkSpriteIndex "/", this.walkSpritesNumber);
    console.log("this.currentWalkSpriteStep = ", this.currentWalkSpriteStep, "/", this.walkSpriteDuration);
}