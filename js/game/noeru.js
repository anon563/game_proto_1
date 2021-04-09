class Noeru {
    actionIndex = 0;

    pos = new Vector3D(64, 64, 0);
    relPos = new Vector3D(0, 0, 0);

    update = game => {
        this.relPos = this.pos.dot(game.relAxis).round();
        this.actionIndex++;
    }

    display = game => {
        const cx = game.cx;
        const assets = game.assets;
        
        cx.drawImage(assets.images['shadow'], 0, 0, 32, 8, this.relPos.x - 16, this.relPos.y - 4, 32, 8);
        cx.drawImage(
            assets.images['noeru'],
            Math.floor(this.actionIndex / 15) % 4 * 32, 0, 32, 48,
            this.relPos.x - 16, this.relPos.y - this.relPos.z - 48, 32, 48
        );
    }
    
    gameFilter = game => true;
}