class Game {
    relAxis = new Vector3D(2, 1, 1);

    canvas = document.createElement('canvas');
    cx = this.canvas.getContext('2d');

    zoom = 3;

    actors = [
        new Fuutan(new Vector3D(32, 128, 0), new Vector3D(8, 8, 64)),
        new Noeru(new Vector3D(64, 64, 0), new Vector3D(8, 8, 64)),
        new Naan(new Vector3D(128, 64, 0), new Vector3D(10, 10, 32)),
        new Naan(new Vector3D(128, 128, 0), new Vector3D(10, 10, 32)),
        new Naan(new Vector3D(96, 192, 0), new Vector3D(10, 10, 32)),
        new Kintsuba(new Vector3D(32, 128, 0), new Vector3D(8, 8, 32))
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

    loop = () => {
        // Background
        this.cx.drawImage(this.assets.images['road'], 0, 0, 512, 312);
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

    resize = () => {
        const size = Math.min(innerWidth, innerHeight);
        this.canvas.width = size;
        this.canvas.height = size;
        this.cx.imageSmoothingEnabled = false;
        this.cx.scale(this.zoom, this.zoom);
    }
}