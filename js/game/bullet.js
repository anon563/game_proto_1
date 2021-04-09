class Bullet extends Actor {
    actionIndex = 0;

    speed = 4;
    hit = false;

    constructor(pos, size, dir) {
        super(pos, size);
        this.dir = dir;
    }

    update = game => {
        this.pos = this.pos.plus(this.dir.times(this.speed));

        const target = game.actors.find(actor => actor instanceof Naan && new CollisionBox3D(actor.pos, actor.size).collidesWith(new CollisionBox3D(this.pos, this.size)));
        if (target) {
            this.hit = true;
            if (target.health) target.health--;
        }

        this.actionIndex++;
    }

    display = (cx, assets, pos) => {
        cx.drawImage(
            assets.images['bullet'],
            !this.hit && this.pos.z >= 0 ? 0 : 16, 0, 16, 16,
            pos.x - 8, pos.y - pos.z - 16, 16, 16
        );
    }

    gameFilter = game => !this.hit && this.pos.z >= 0;
}