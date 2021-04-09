class Naan extends Actor {
    actionIndex = 0;

    maxHealth = 50;
    health = this.maxHealth;

    constructor(pos, size) {
        super(pos, size);
    }

    update = game => {
        // if (this.health) this.health--;
        this.actionIndex++;
    }

    display = (cx, assets, pos) => {
        cx.drawImage(assets.images['shadow'], 0, 0, 32, 8, pos.x - 16, pos.y - 4, 32, 8);
        cx.drawImage(
            assets.images['naan'],
            Math.floor(this.actionIndex / 16) % 2 * 32, 0, 32, 32,
            pos.x - 16, pos.y - pos.z - 32, 32, 32
        );

        const healthBarLength = 32;
        const healthRatio = this.health / this.maxHealth;

        cx.fillStyle = '#000';
        cx.fillRect(pos.x - healthBarLength / 2, pos.y - pos.z - 40, healthBarLength, 2);
        cx.fillStyle = healthRatio > 0.5 ? '#0f0' : healthRatio > 0.25 ? '#ff0' : '#f00';
        cx.fillRect(pos.x - healthBarLength / 2, pos.y - pos.z - 40, Math.ceil(healthBarLength * healthRatio), 2);
    }
    
    gameFilter = game => this.health;
}