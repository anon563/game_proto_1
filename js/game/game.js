class Game {
    relAxis = new Vector3D(2, 1, 1);

    canvas = document.createElement('canvas');
    cx = this.canvas.getContext('2d');

    zoom = 3;

    actors = [
        new Fuutan(this),
        new Noeru(),
        new Naan(this, new Vector3D(128, 64, 0)),
        new Naan(this, new Vector3D(128, 128, 0)),
        new Naan(this, new Vector3D(96, 192, 0)),
        new Kintsuba()
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
        this.actors.filter(actor => actor.gameFilter(this)).sort((a, b) => a.relPos.y - b.relPos.y).forEach(actor => {
            actor.update(this);
            this.cx.save();
            actor.display(this);
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

    flipHorizontally = around => {
        this.cx.translate(around, 0);
        this.cx.scale(-1, 1);
        this.cx.translate(-around, 0);
    }
}