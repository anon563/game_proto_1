class Actor {
    actionIndex = 0;
    
    pos = new Vector3D(32, 128, 0);
    relPos = null;
    size = new Vector3D(12, 12, 64);
    relSize = null;

    constructor(game, pos, size) {
        this.collisionBox = new CollisionBox3D(pos, size);
    }

    update = game => {
        this.actionIndex++;
    }

    display = game => {}
}