class Vector3D {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    plus = other => new Vector3D(this.x + other.x, this.y + other.y, this.z + other.z);
    times = factor => new Vector3D(this.x * factor, this.y * factor, this.z * factor);
    dot = other => new Vector3D(this.x * other.x, this.y * other.y, this.z * other.z);
    equals = other => this.x === other.x && this.y === other.y && this.z === other.z;
    floor = () => new Vector3D(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z));
    round = () => new Vector3D(Math.round(this.x), Math.round(this.y), Math.round(this.z));
}