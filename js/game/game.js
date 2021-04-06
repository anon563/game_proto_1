class Game {
    actionIndex = 0;
    relAxis = new Vector3D(2, 1, 1);

    canvas = document.createElement('canvas');
    cx = this.canvas.getContext('2d');

    zoom = 3;

    actors = [
        new Fuutan(),
        new Noeru(),
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
        this.update();
        this.display();
        requestAnimationFrame(this.loop);
    }
    
    update = () => {
        this.actors.forEach(actor => actor.update(this));
        this.actionIndex++;
    }

    display = () => {
        this.cx.drawImage(this.assets.images['road'], 0, 0, 512, 312);
        this.actors.sort((a, b) => a.relPos.y - b.relPos.y).forEach(actor => {
            this.cx.save();
            actor.display(this);
            this.cx.restore();
        });
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