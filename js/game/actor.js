class Actor {
    actionIndex = 0;

    constructor(pos, size) {
        this.pos = pos;
        this.size = size;
    }

    update = game => {
        this.actionIndex++;
    }

    display = (cx, assets, pos) => {}

    displayAnimation = (cx, relAxis, animation, asset) => {
        const relPos = this.pos.dot(relAxis).round();
        if (this.dir.x === -1) game.flipHorizontally(this.relPos.x);
        cx.drawImage(asset,
            Math.floor(this.actionIndex / animation.speed) % animation.frames * animation.width, 0,
            animation.width, animation.height,
            relPos.x - animation.width / 2 + animation.xOffset, relPos.y - relPos.z - animation.height,
            animation.width, animation.height
        );
    }

    displayCollisionBox = (cx, relAxis) => {
        const relPos = this.pos.dot(relAxis).round();
        const relSize = this.size.dot(relAxis).round();
        cx.strokeStyle = "#00f";
        cx.strokeRect(relPos.x - relSize.x / 2, relPos.y - relSize.y - relPos.z, relSize.x, relSize.y);
        cx.fillStyle = "#00f4";
        cx.fillRect(relPos.x - relSize.x / 2, relPos.y - relSize.y - relPos.z, relSize.x, relSize.y);
        cx.strokeStyle = "#f00";
        cx.strokeRect(relPos.x - relSize.x / 2, relPos.y - relSize.y - relPos.z - relSize.z / 2, relSize.x, relSize.y);
        cx.fillStyle = "#f004";
        cx.fillRect(relPos.x - relSize.x / 2, relPos.y - relSize.y - relPos.z - relSize.z / 2, relSize.x, relSize.y);
    }
    
    flipHorizontally = (cx, around) => {
        cx.translate(around, 0);
        cx.scale(-1, 1);
        cx.translate(-around, 0);
    }
}