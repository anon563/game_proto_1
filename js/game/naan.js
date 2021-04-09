class Naan {
    actionIndex = 0;

    maxHealth = 1000;
    health = this.maxHealth;

    constructor(game, pos) {
        this.pos = pos;
        this.relPos = this.pos.dot(game.relAxis).round();
    }

    update = game => {
        this.relPos = this.pos.dot(game.relAxis).round();
        if (this.health) this.health--;
        this.actionIndex++;
    }

    display = game => {
        const cx = game.cx;
        const assets = game.assets;
        
        cx.drawImage(assets.images['shadow'], 0, 0, 32, 8, this.relPos.x - 16, this.relPos.y - 4, 32, 8);
        cx.drawImage(
            assets.images['naan'],
            Math.floor(this.actionIndex / 16) % 2 * 32, 0, 32, 32,
            this.relPos.x - 16, this.relPos.y - this.relPos.z - 32, 32, 32
        );

        const healthBarLength = 32;
        const healthRatio = this.health / this.maxHealth;

        cx.fillStyle = '#000';
        cx.fillRect(this.relPos.x - healthBarLength / 2, this.relPos.y - this.relPos.z - 40, healthBarLength, 2);
        cx.fillStyle = healthRatio > 0.5 ? '#0f0' : healthRatio > 0.25 ? '#ff0' : '#f00';
        cx.fillRect(this.relPos.x - healthBarLength / 2, this.relPos.y - this.relPos.z - 40, Math.ceil(healthBarLength * healthRatio), 2);
    }
    
    gameFilter = game => true;
}