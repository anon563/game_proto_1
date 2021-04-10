class Fuutan extends Actor {

    isWalking = false;
    isGrounded = true;

    walkSpeed = 0.5;
    momentum = new Vector3D(0.7, 0.7, 1);
    gravity = 0.25;
    
    dir = new Vector3D(-1, 0, 0);
    vel = new Vector3D(0, 0, 0);

    closestNaan = null;
    maxDistance = 128;

    animationData = {
        idle: {
            asset: 'idle',
            width: 32,
            height: 48,
            xOffset: 0,
            frames: 6,
            speed: 14
        },
        walk: {
            asset: 'walk',
            width: 48,
            height: 48,
            xOffset: 0,
            frames: 6,
            speed: 8
        },
        jump: {
            asset: 'jump',
            width: 48,
            height: 48,
            xOffset: 8,
            frames: 1,
            speed: 1
        }
    }
    
    constructor(pos, size) {
        super(pos, size);
    }

    update = game => {
        const keys = game.keys;

        // Check target
        this.closestNaan = game.actors.find(actor => actor instanceof Naan) ? game.actors.filter(actor => actor instanceof Naan).reduce((a, b) => this.pos.distance(a.pos) < this.pos.distance(b.pos) ? a : b) : null;

        // Action
        this.isGrounded = !this.pos.z;
        this.isWalking = this.isGrounded && (keys.down !== keys.up || keys.left !== keys.right);

        // Velocity
        this.vel = this.vel.dot(this.momentum);
        this.vel = this.vel.plus(new Vector3D(
            this.walkSpeed * (keys.left === keys.right ? 0 : keys.left ? -1 : 1),
            this.walkSpeed * (keys.up === keys.down ? 0 : keys.up ? -1 : 1),
            -this.gravity
        ));
        // Jump & Gravity correction
        if (this.isGrounded) this.vel.z = keys.jump ? 4 : 0;

        // Direction
        this.dir = new Vector3D(
            keys.left === keys.right ? (keys.up === keys.down ? this.dir.x : 0) : (keys.left ? -1 : 1),
            keys.up === keys.down ? (keys.left === keys.right ? this.dir.y : 0) : (keys.up ? -1 : 1),
            0
        );

        // Position
        this.pos = this.pos.plus(this.vel);
        if (this.pos.z < 0) this.pos.z = 0;
        this.relPos = this.pos.dot(game.relAxis).round();
        
        this.actionIndex++;
    }

    display = (cx, assets, pos) => {

        const action = !this.isGrounded ? "jump" : this.isWalking ? "walk" : "idle";
        const animation = this.animationData[action];
        
        cx.drawImage(assets.images['shadow'], 0, 0, 32, 8, pos.x - 16, pos.y - 4, 32, 8);
        if (this.dir.x === -1) this.flipHorizontally(cx, pos.x);
        cx.drawImage(assets.images[action],
            Math.floor(this.actionIndex / animation.speed) % animation.frames * animation.width, 0,
            animation.width, animation.height,
            pos.x - animation.width / 2 + animation.xOffset, pos.y - pos.z - animation.height,
            animation.width, animation.height
        );
    }
    
    gameFilter = game => true;
}