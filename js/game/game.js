class Game {
    actionIndex = 0;

    axisRel = new Vector2D(2, 1);
    pos = new Vector2D(0, 0);
    walk = false;
    dir = true;

    constructor(assets) {
        this.display = new Display(assets);
        this.keys = new KeyboardListener().keys;
    }
    
    update = () => {
        const velocity = new Vector2D(0, 0);
        this.walk = false;

        if (this.keys.down) velocity.y++;
        if (this.keys.up) velocity.y--;
        if (this.keys.left) velocity.x--;
        if (this.keys.right) velocity.x++;
        this.dir = velocity.x ? velocity.x > 0 : this.dir;

        if (velocity.x !== 0 || velocity.y !== 0) {
            this.pos = this.pos.plus(velocity);
            this.walk = true;
        }

        this.display.drawOld(this);
        this.actionIndex++;
        requestAnimationFrame(this.update);
    }
}