class Display {
    canvas = document.createElement('canvas');
    cx = this.canvas.getContext('2d');
    sectionSize = new Vector2D(10, 8);

    zoom = 3;

    constructor(assets) {
        this.assets = assets;
        this.resize();
        window.addEventListener('resize', this.resize);
        document.body.innerHTML = "";
        document.body.appendChild(this.canvas);
    }

    flipHorizontally = around => {
        this.cx.translate(around, 0);
        this.cx.scale(-1, 1);
        this.cx.translate(-around, 0);
    }

    drawOld = game => {
        this.cx.save();
        this.cx.scale(this.zoom, this.zoom);

        this.cx.drawImage(this.assets.images['road'], 0, 0, 512, 312);

        this.cx.drawImage(
            this.assets.images['shadow'],
            0, 0, 32, 8,
            64, 44,
            32, 8
        );
        this.cx.drawImage(
            this.assets.images['noeru'],
            Math.floor(game.actionIndex / 15) % 4 * 32,
            0, 32, 64,
            64, 0,
            32, 64
        );

        
        this.cx.drawImage(
            this.assets.images['shadow'],
            0, 0, 32, 8,
            Math.floor(game.pos.x * game.axisRel.x), Math.floor(game.pos.y * game.axisRel.y) + 44,
            32, 8
        );
        if (game.walk) {
            if (!game.dir) this.flipHorizontally(Math.floor(game.pos.x * game.axisRel.x) - 8 + 24);
            this.cx.drawImage(
                this.assets.images['furea2'],
                Math.floor(game.actionIndex / 8) % 6 * 48,
                0, 48, 48,
                Math.floor(game.pos.x * game.axisRel.x) - 8, Math.floor(game.pos.y * game.axisRel.y),
                48, 48
            );
        } else {
            if (!game.dir) this.flipHorizontally(Math.floor(game.pos.x * game.axisRel.x) + 16);
            this.cx.drawImage(
                this.assets.images['furea'],
                Math.floor(game.actionIndex / 15) % 4 * 32, 0,
                32, 48,
                Math.floor(game.pos.x * game.axisRel.x), Math.floor(game.pos.y * game.axisRel.y),
                32, 48
            );
        }

        this.cx.restore();
    }

    // Resize canvas
    resize = () => {
        this.size = Math.min(innerWidth, innerHeight);
        this.tileSize = this.size / 10;
        this.canvas.width = this.size;
        this.canvas.height = this.size;
        this.cx.imageSmoothingEnabled = false;
    }
}