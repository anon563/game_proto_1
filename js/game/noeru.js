class Noeru extends Actor {
    actionIndex = 0;

    constructor(pos, size) {
        super(pos, size);
    }

    display = (cx, assets, pos) => {
        cx.drawImage(assets.images['shadow'], 0, 0, 32, 8, pos.x - 16, pos.y - 4, 32, 8);
        cx.drawImage(
            assets.images['noeru'],
            Math.floor(this.actionIndex / 15) % 4 * 32, 0, 32, 48,
            pos.x - 16, pos.y - pos.z - 48, 32, 48
        );
    }
    
    gameFilter = game => true;
}