import { Component } from 'react';
import Beat1 from "../../assets/audio/beat_1.mp3";
import Beat2 from "../../assets/audio/beat_2.mp3"

export default class Ball extends Component {
    constructor(props) {
        super();
        this.ballObject = props;
        this.reset();
    }
    get x() {
        return parseFloat(getComputedStyle(this.ballObject).getPropertyValue("--x"));
    }
    set x(value) {
        this.ballObject.style.setProperty("--x", value);
    }

    get y() {
        return parseFloat(getComputedStyle(this.ballObject).getPropertyValue("--y"));
    }
    set y(value) {
        this.ballObject.style.setProperty("--y", value);
    }
    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = { x: 0 }
        while (Math.abs(this.direction.x) <= 0.2 ||
            Math.abs(this.direction.x) >= 0.9
        ) {
            const heading = randomNumberBetween(0, 2 * Math.PI);
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
        }
        this.velocity = 0.025;
    }
    update(delta, paddleRects) {
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        this.velocity += 0.000001 * delta;
        const rect = this.rect();
        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1;
            this.soundBeat(2);
        }
        if (paddleRects.some(r => isCollision(r, rect))) {
            this.direction.x *= -1;
            if(this.direction.x < 0 ) {
                document.querySelector('.right').classList.add("beated");
                this.soundBeat(1);
                setInterval(() => {
                    document.querySelector('.right').classList.remove("beated");
                }, 500);
            } else {
                document.querySelector('.left').classList.add("beated");
                this.soundBeat(1);
                setInterval(() => {
                    document.querySelector('.left').classList.remove("beated");
                }, 500);
            }
        }
    }
    rect() {
        return this.ballObject.getBoundingClientRect();
    }
    soundBeat(n) {
        if(n === 1) {
            let beat1 = new Audio(Beat1);
            beat1.play();
        }
        if(n === 2) {
            let beat2 = new Audio(Beat2);
            beat2.play();
        }
    }
 }

function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min;

}

function isCollision(rect1, rect2) {
    return rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top
}
