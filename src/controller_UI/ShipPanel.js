import { config } from "../../config.js";

export default class ShipPanel {
  #name;
  #phaser;
  #panel;
  #select;
  #sunk;

  constructor(name, phaser) {
    this.#name = name;
    this.#phaser = phaser;
    this.#select = false;
    this.#sunk = false;
    this.#preloadImg();
  }

  #preloadImg() {
    var shipImg;
    switch (this.#name) {
      case "ship2":
        shipImg = "../../assets/ship/ship2.png";
        break;
      case "ship3":
        shipImg = "../../assets/ship/ship3.png";
        break;
      case "ship32":
        shipImg = "../../assets/ship/ship32.png";
        break;
      case "ship4":
        shipImg = "../../assets/ship/ship4.png";
        break;
      case "ship5":
        shipImg = "../../assets/ship/ship5.png";
        break;
    }
    this.#phaser.load.image("sunk", "../../assets/ship/sunk.png");

    this.#phaser.load.spritesheet(this.#name, shipImg, {
      frameWidth: config.ship.width,
      frameHeight: config.ship.height,
    });
  }

  