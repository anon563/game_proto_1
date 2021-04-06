class Fuutan {
    actionIndex = 0;

    isWalking = false;
    isGrounded = true;

    walkSpeed = 0.5;
    momentum = new Vector3D(0.7, 0.7, 1);
    gravity = 0.25;
    
    dir = new Vector3D(1, 0, 0);
    vel = new Vector3D(0, 0, 0);
    pos = new Vector3D(32, 128, 0);
    relPos = new Vector3D(0, 0, 0);

    animationData = {
        idle: {
            width: 32,
            height: 48,
            xOffset: 0,
            frames: 6,
            speed: 14
        },
        walk: {
            width: 48,
            height: 48,
            xOffset: 0,
            frames: 6,
            speed: 8
        },
        jump: {
            width: 48,
            height: 48,
            xOffset: 8,
            frames: 1,
            speed: 1
        }
    }

    update = game => {
        const keys = game.keys;

        // Action
        this.isGrounded = !this.pos.z;
        this.isWalking = this.isGrounded && (keys.down || keys.up || keys.left || keys.right);

        // Velocity
        this.vel = this.vel.dot(this.momentum);
        this.vel = this.vel.plus(new Vector3D(
            this.walkSpeed * (keys.left === keys.right ? 0 : keys.left ? -1 : 1),
            this.walkSpeed * (keys.up === keys.down ? 0 : keys.up ? -1 : 1),
            -this.gravity
        ));
        // Jump & Gravity correction
        if (this.isGrounded) this.vel.z = keys.a ? 4 : 0;

        // Direction
        this.dir = new Vector3D(
            keys.left === keys.right ? this.dir.x : keys.left ? -1 : 1,
            keys.up === keys.down ? this.dir.y : keys.up ? -1 : 1,
            0
        );

        // Position
        this.pos = this.pos.plus(this.vel);
        if (this.pos.z < 0) this.pos.z = 0;
        this.relPos = this.pos.dot(game.relAxis).round();
        
        this.actionIndex++;
    }

    display = game => {
        const cx = game.cx;
        const assets = game.assets;

        const action = !this.isGrounded ? "jump" : this.isWalking ? "walk" : "idle";
        const animation = this.animationData[action];
        
        cx.drawImage(assets.images['shadow'], 0, 0, 32, 8, this.relPos.x - 16, this.relPos.y - 4, 32, 8);
        if (this.dir.x === -1) game.flipHorizontally(this.relPos.x);
        cx.drawImage(assets.images[action],
            Math.floor(this.actionIndex / animation.speed) % animation.frames * animation.width, 0,
            animation.width, animation.height,
            this.relPos.x - animation.width / 2 + animation.xOffset, this.relPos.y - this.relPos.z - animation.height,
            animation.width, animation.height
        );
    }
}