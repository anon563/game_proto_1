class Kintsuba {
    actionIndex = 0;

    pos = new Vector3D(0, 0, 0);
    relPos = new Vector3D(0, 0, 0);
    target = new Vector3D(0, 0, 0);

    update = game => {
        const fuutanPos = game.actors.find(actor => actor instanceof Fuutan).pos;


        this.pos = new Vector3D(
            fuutanPos.x + Math.cos(this.actionIndex * 0.05) * 12,
            fuutanPos.y + Math.sin(this.actionIndex * 0.05) * 8,
            40 + Math.cos(this.actionIndex * 0.075) * 8
        )

        // if (this.keys.b) {
        //     this.target = game.fuutan.pos;
        // }

        this.relPos = this.pos.dot(game.relAxis).round();

        this.actionIndex++;
    }

    display = game => {
        const cx = game.cx;
        const assets = game.assets;
        
        cx.drawImage(
            assets.images['kintsuba'],
            0, 0, 24, 32,
            this.relPos.x - 12, this.relPos.y - this.relPos.z - 32, 24, 32
        );
    }
}