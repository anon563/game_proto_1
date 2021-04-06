class KeyboardListener {
    keys = { left: false, up: false, right: false, down: false, a: false, b: false, start: false }
    keyCodes = { ArrowLeft: "left", ArrowUp: "up", ArrowRight: "right", ArrowDown: "down", z: "a", x: "b", Enter: "start" }

    constructor() {
        document.body.onkeydown = event => this.handler(event);
        document.body.onkeyup = event => this.handler(event);
    }

    handler = event => event.key in this.keyCodes ? this.keys[this.keyCodes[event.key]] = event.type === "keydown" : event.preventDefault;
}