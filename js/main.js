window.onload = () => {
    const game = new Game(new Assets());
    game.assets.load().then(game.loop());
}