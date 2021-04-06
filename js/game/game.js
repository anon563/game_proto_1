class Game {
    actionIndex = 0;

    axisRel = new Vector3D(2, 1, 1);
    pos = new Vector3D(0, 0, 0);
    realPos = new Vector3D(0, 0, 0);
    walk = false;
    dir = true;
    velocity = new Vector3D(0, 0, 0);

    constructor(assets) {
        this.display = new Display(assets);
        this.keys = new KeyboardListener().keys;
    }
    
    update = () => {
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.velocity.z -= 0.25;
        if (!this.realPos.z && this.keys.a) this.velocity.z = 4;

        this.walk = false;

        if (this.keys.down) this.velocity.y++;
        if (this.keys.up) this.velocity.y--;
        if (this.keys.left) this.velocity.x--;
        if (this.keys.right) this.velocity.x++;
        this.dir = this.velocity.x ? this.velocity.x > 0 : this.dir;

        if (this.velocity.x !== 0 || this.velocity.y !== 0) this.walk = true;

        this.realPos = this.realPos.plus(this.velocity.dot(this.axisRel));
        if (this.realPos.z < 0) this.realPos.z = 0;
        this.pos = this.realPos.round();

        this.display.update(this);
        this.actionIndex++;
        requestAnimationFrame(this.update);
    }
}