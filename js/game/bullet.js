class Bullet {
    actionIndex = 0;

    speed = 4;

    constructor(game, pos, dir) {
        this.pos = pos;
        this.dir = dir;
        this.relPos = this.pos.dot(game.relAxis).round();
    }

    update = game => {
        this.pos = this.pos.plus(this.dir.times(this.speed));
        this.relPos = this.pos.dot(game.relAxis).round();

        this.actionIndex++;
    }

    display = game => {
        const cx = game.cx;
        const assets = game.assets;

        cx.drawImage(
            assets.images['bullet'],
            this.pos.z > 0 ? 0 : 16, 0, 16, 16,
            this.relPos.x - 8, this.relPos.y - this.relPos.z - 16, 16, 16
        );
    }

    gameFilter = game => this.pos.z >= 0;
}