const SPEED = 0.02;

export default class Paddle {
    constructor(paddleObject) {
        this.paddleObject = paddleObject;
        this.reset();
    }

    get position() {
        return parseFloat(getComputedStyle(this.paddleObject).getPropertyValue("--position"));
    }

    set position(value) {
        this.paddleObject.style.setProperty("--position", value);
    }

    reset() {
        this.position = 50;
    }

    update(delta, ballY) {
        this.position += SPEED * delta * (ballY - this.position);
    }

    rect() {
        return this.paddleObject.getBoundingClientRect();
    }
}