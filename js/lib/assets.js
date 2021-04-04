class Assets {
    images = new Object;
    imageDataList = [
        { id: 'noeru', src: 'img/noeru.png' },
        { id: 'furea', src: 'img/furea.png' },
        { id: 'furea2', src: 'img/furea2.png' },
        { id: 'road', src: 'img/road.png' },
        { id: 'shadow', src: 'img/shadow.png' }
    ];
    
    constructor() {
        this.imageDataList.forEach(imageData => {
            this.images[imageData.id] = new Image;
            this.images[imageData.id].src = imageData.src;
        });
    }

    load = () => Promise.all(Object.keys(this.images).map(key => new Promise(resolve => this.images[key].onload = () => resolve())));
}