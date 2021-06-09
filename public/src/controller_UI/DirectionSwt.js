import { config } from "../../config.js";

const WIDTH = 54,
  HEIGHT = 54;
const NAME = "directionSwt";

export default class DirectionSwt {
  #direction; // true for vertical | false for horizontal
  #phaser;
  #img;

  constructor(phaser) {
    this.#phaser = phaser;
    this.#direction = false; // horizontal by default
    // load img
    this.#phaser.load.spritesheet(
      NAME,
      "../../assets/UI_Btn/directionSwt.png",
      {
        frameWidth: WIDTH,
        frameHeight: HEIGHT,
      }
    );
  }

  changeDirection(direction) {
    this.#direction = direction;
  }

  getDirection() {
    return this.#direction;
  }

  create() {
    this.#img = this.#phaser.add
      .sprite(
        config.phaser.width - config.ship.width / 2,
        config.phaser.height - HEIGHT / 1.5,
        NAME
      )
      .setInteractive()
      .setFrame(0);
    this.#img.on("pointerdown", () => {
      this.changeDirection(!this.#direction);
      this.#direction ? this.#img.setFrame(1) : this.#img.setFrame(0);
    });
  }
}
