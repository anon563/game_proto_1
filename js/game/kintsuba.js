class Kintsuba extends Actor {
    actionIndex = 0;

    target = new Vector3D(0, 0, 0);
    dir = null;

    cooldown = 0;

    constructor(pos, size) {
        super(pos, size);
    }

    update = game => {
        const fuutan = game.actors.find(actor => actor instanceof Fuutan);

        // Fire bullet
        if (!this.cooldown && game.keys.shoot) {
            this.cooldown = 8;
            const dir = game.keys.focus
                ? this.dir.plus(new Vector3D(0, 0, -0.25))
                : fuutan.closestNaan && fuutan.pos.distance(fuutan.closestNaan.pos) < fuutan.maxDistance
                    ? this.pos.plus(fuutan.closestNaan.pos.times(-1)).times(-1 / this.pos.distance(fuutan.closestNaan.pos))
                    : this.dir.plus(new Vector3D(0, 0, -0.5));
            game.actors.push(new Bullet(this.pos.plus(new Vector3D(0, 0, 8)), new Vector3D(8, 8, 8), dir));
        }

        if (this.cooldown) this.cooldown--;
        this.dir = game.keys.focus ? this.dir : fuutan.dir;

        this.target = game.keys.focus ? new Vector3D(
            fuutan.pos.x + 12 * this.dir.x,
            fuutan.pos.y + 12 * this.dir.y,
            fuutan.pos.z + 16 + Math.cos(this.actionIndex * 0.075) * 4) : new Vector3D(
                fuutan.pos.x + Math.cos(this.actionIndex * 0.05) * 12,
                fuutan.pos.y + Math.sin(this.actionIndex * 0.05) * 8,
                40 + Math.cos(this.actionIndex * 0.075) * 8);

        this.pos = this.pos.lerp(this.target, 0.2);

        this.relPos = this.pos.dot(game.relAxis).round();

        this.actionIndex++;
    }

    display = (cx, assets, pos) => {
        
        cx.drawImage(
            assets.images['kintsuba'],
            0, 0, 24, 32,
            pos.x - 12, pos.y - pos.z - 32, 24, 32
        );
    }
    
    gameFilter = game => true;
}