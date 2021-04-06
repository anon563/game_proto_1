class Assets {
    images = new Object;
    imageDataList = [
        { id: 'noeru', src: 'img/noeru_alt.png' },
        { id: 'furea', src: 'img/furea_alt.png' },
        { id: 'furea2', src: 'img/furea2_alt.png' },
        { id: 'furea3', src: 'img/furea3.png' },
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