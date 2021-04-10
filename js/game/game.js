class Game {
    relAxis = new Vector3D(2, 1, 1);

    canvas = document.createElement('canvas');
    cx = this.canvas.getContext('2d');
    width = 480;
    height = 270;

    actors = [
        new Fuutan(new Vector3D(142, 140, 0), new Vector3D(8, 8, 64)),
        new Noeru(new Vector3D(96, 130, 0), new Vector3D(8, 8, 64)),
        new Kintsuba(new Vector3D(142, 140, 0), new Vector3D(8, 8, 32))
    ];

    constructor(assets) {
        // Display
        this.assets = assets;
        this.resize();
        window.addEventListener('resize', this.resize);
        document.body.innerHTML = "";
        document.body.appendChild(this.canvas);

        // Keys
        this.keys = new KeyboardListener().keys;
    }

    addNaan = () => {
        const pos = Math.random() > 0.5
            ? new Vector3D(Math.random() > 0.5 ? 0 : 240, Math.round(Math.random() * 270), 0)
            : new Vector3D(Math.round(Math.random() * 240), Math.random() > 0.5 ? 0 : 270, 0);
        this.actors.push(new Naan(pos, new Vector3D(10, 10, 32)));
    }

    loop = () => {
        // Background
        this.cx.drawImage(this.assets.images['road'], 0, 0, 512, 312);

        if (Math.random() > 0.97) this.addNaan();
        // Actors
        this.actors = this.actors.filter(actor => actor.gameFilter(this));
        this.actors.sort((a, b) => a.pos.y - b.pos.y).forEach(actor => {
            actor.update(this);
            this.cx.save();
            actor.display(this.cx, this.assets, actor.pos.dot(this.relAxis).round());
            if (DEBUGMODE) actor.displayCollisionBox(this.cx, this.relAxis);
            this.cx.restore();
        });
        requestAnimationFrame(this.loop);
    }

    // Resize canvas
    resize = () => {
        this.zoom = Math.max(1, Math.min(Math.floor(innerWidth / this.width), Math.floor(innerHeight / this.height)));
        this.canvas.width = this.width * this.zoom;
        this.canvas.height = this.height * this.zoom;
        this.cx.imageSmoothingEnabled = false;
        this.cx.scale(this.zoom, this.zoom);
    }
}