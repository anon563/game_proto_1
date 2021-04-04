window.onload = () => {
    const assets = new Assets();
    assets.load().then(() => new Game(assets).update());
}