class Display {
    canvas = document.createElement('canvas');
    cx = this.canvas.getContext('2d');

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

    drawNoeru = game => {
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
    }

    drawfurea = game => {
        this.cx.save();
        this.cx.drawImage(
            this.assets.images['shadow'],
            0, 0, 32, 8,
            game.pos.x, game.pos.y + 44,
            32, 8
        );
        if (game.pos.z !== 0) {
            if (!game.dir) this.flipHorizontally(game.pos.x + 16);
            this.cx.drawImage(
                this.assets.images['furea3'],
                0, 0, 48, 48,
                game.pos.x, game.pos.y - game.pos.z,
                48, 48
            );
        } else { 
            if (game.walk) {
                if (!game.dir) this.flipHorizontally(game.pos.x - 8 + 24);
                this.cx.drawImage(
                    this.assets.images['furea2'],
                    Math.floor(game.actionIndex / 8) % 6 * 48,
                    0, 48, 48,
                    game.pos.x - 8, game.pos.y,
                    48, 48
                );
            } else {
                if (!game.dir) this.flipHorizontally(game.pos.x + 16);
                this.cx.drawImage(
                    this.assets.images['furea'],
                    Math.floor(game.actionIndex / 14) % 6 * 32, 0,
                    32, 48,
                    game.pos.x, game.pos.y,
                    32, 48
                );
            }
        }
        this.cx.restore();
    }

    update = game => {
        this.cx.save();
        this.cx.scale(this.zoom, this.zoom);

        this.cx.drawImage(this.assets.images['road'], 0, 0, 512, 312);

        if (game.pos.y < 0) {
            this.drawfurea(game);
            this.drawNoeru(game);
        } else {
            this.drawNoeru(game);
            this.drawfurea(game);
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