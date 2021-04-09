class KeyboardListener {
    keys = { left: false, up: false, right: false, down: false, focus: false, a: false, b: false, start: false }
    keyCodes = {
        ArrowLeft: "left", ArrowUp: "up", ArrowRight: "right", ArrowDown: "down", Shift:"focus",
        z: "shoot", Z: "shoot", w: "shoot", W: "shoot", x: "jump", X: "jump", Enter: "start" }

    constructor() {
        document.body.onkeydown = event => this.handler(event);
        document.body.onkeyup = event => this.handler(event);
    }

    handler = event => {
        event.preventDefault;
        if(event.key in this.keyCodes) this.keys[this.keyCodes[event.key]] = event.type === "keydown";
    }
}