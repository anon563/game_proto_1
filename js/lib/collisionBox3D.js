class CollisionBox3D {
    constructor(pos, size) {
        this.pos = pos;
        this.size = size;
    }
    center = () => new Vector2D(this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2);
    collidesWith = collisionBox => this.collidesWithInAxis(collisionBox, "x") && this.collidesWithInAxis(collisionBox, "y") && this.collidesWithInAxis(collisionBox, "z");
    collidesWithInAxis = (collisionBox, axis) => !(this.pos[axis] + this.size[axis] < collisionBox.pos[axis] || this.pos[axis] > collisionBox.pos[axis] + collisionBox.size[axis]);
    collidingCollisionBoxes = collisionBoxes => collisionBoxes.map(collisionBox => this.collidesWith(collisionBox));
    intersects = collisionBox => this.intersectsInAxis(collisionBox, "x") && this.intersectsInAxis(collisionBox, "y") && this.intersectsInAxis(collisionBox, "z");
    intersectsInAxis = (collisionBox, axis) => !(this.pos[axis] + this.size[axis] <= collisionBox.pos[axis] || this.pos[axis] >= collisionBox.pos[axis] + collisionBox.size[axis]);
    intersectingCollisionBoxes = collisionBoxes => collisionBoxes.map(collisionBox => this.intersects(collisionBox));
    includedIn = collisionBox => this.includedInAxis(collisionBox, "x") && this.includedInAxis(collisionBox, "y") && this.includedInAxis(collisionBox, "z");
    includedInAxis = (collisionBox, axis) => !(this.pos[axis] + this.size[axis] > collisionBox.pos[axis] + collisionBox.size[axis] || this.pos[axis] < collisionBox.pos[axis]);
    includingCollisionBoxes = collisionBoxes => collisionBoxes.map(collisionBox => this.includedIn(collisionBox));
}