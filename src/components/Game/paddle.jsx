import { Component } from 'react'

export default class Paddle extends Component {
    constructor(props) {
        super();
        this.paddleObject = props;

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
        this.position += 0.025 * delta * (ballY - this.position);
    }

    rect() {
        return this.paddleObject.getBoundingClientRect();
    }
}
