class Noeru extends Actor {
    actionIndex = 0;
    
    dir = new Vector3D(1, 0, 0);

    constructor(pos, size) {
        super(pos, size);
    }

    update = game => {
        const fuutan = game.actors.find(actor => actor instanceof Fuutan);
        this.dir.x = fuutan.pos.x > this.pos.x ? 1 : -1;
        this.actionIndex++;
    }

    display = (cx, assets, pos) => {
        cx.drawImage(assets.images['shadow'], 0, 0, 32, 8, pos.x - 16, pos.y - 4, 32, 8);
        if (this.dir.x === -1) this.flipHorizontally(cx, pos.x);
        cx.drawImage(
            assets.images['noeru'],
            Math.floor(this.actionIndex / 15) % 4 * 32, 0, 32, 48,
            pos.x - 16, pos.y - pos.z - 48, 32, 48
        );
    }
    
    gameFilter = game => true;
}