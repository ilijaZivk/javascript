class player {
    constructor(id, name, skinId, level, position, HP, HPmax, hitbox, damagehitbox, damage) {
        this.id = id
        this.name = name
        this.skinId = skinId
        this.level = level
        this.position = position
        this.HP = HP
        this.HPmax = HPmax
        this.hitbox = hitbox
        this.damagehitbox = damagehitbox
        this.damage = damage
        this.isWalking = false
        this.isAttacking = false
        this.isDead = false
    }

    update(updateData) {
        if (!updateData) {
            console.log("Aucune donnée à mettre à jour");
            return;
        }

        // Mise a jour de la position du joueur
        if (updateData.position) {
            this.position = updateData.position;
            console.log("Position mise à jour :", this.position);
        }

        // Mise a jour des points de vie
        if (updateData.HP !== undefined) {
            this.HP = updateData.HP;
            console.log("HP mis à jour :", this.HP);
        }

        // Mise a jour du skin
        if (updateData.skinId !== undefined) {
            this.skinId = updateData.skinId;
            console.log("Skin mis à jour :", this.skinId);
        }

        // Mise a jour du nom
        if (updateData.name) {
            this.name = updateData.name;
            console.log("Nom mis à jour :", this.name);
        }

        // Mise a jour des HP max si lvl up
        if (updateData.HPmax) {
            this.HPmax = updateData.HPmax;
            console.log("Nom mis à jour :", this.HPmax);
        }
    }

    animate() {
        // Le joueur marche
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
        // Le joueur attaque
        else if (this.isAttacking) {
  
        }
        // Le joueur est en idle
        else {}
    }
    console.log("Walk Animation :/n");
    console.log("isWalking = ", this.isWalking);
    console.log("walkSpriteIndex = ", this.walkSpriteIndex "/", this.walkSpritesNumber);
    console.log("this.currentWalkSpriteStep = ", this.currentWalkSpriteStep, "/", this.walkSpriteDuration);
}