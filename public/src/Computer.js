import Board from "./Board.js";
import Ship from "./Ship.js";
import { config } from "../config.js";

export default class Computer {
  #ships;
  #board;
  #turn;
  #mode; // HUNT and TARGET
  #sqrTarget; // [Square, Square,...] store all the hit square but not sunk

  constructor(turn) {
    this.#ships = [];
    this.#sqrTarget = [];
    this.#board = new Board();
    this.#turn = turn;
    this.#initializeShips();
    this.#randomSetup();

    // first set mode to HUNT mode
    this.#mode = "HUNT";
  }

  #initializeShips() {
    // Create ships
    config.shipsArr.map((ship) => {
      const [key, value] = Object.entries(ship)[0];
      this.#ships.push(new Ship(key, value));
    });
  }

  #randomInt(max) {
    return Math.floor(Math.random() * max);
  }

  #randomSetup() {
    // Random the start square and direction -> then check valid
    const direction = ["HORIZONTAL", "VERTICAL"];
    const width = this.#board.getWidth();
    const height = this.#board.getHeight();

    this.#ships.map((ship) => {
      do {
        // Random direction
        const dir = direction[this.#randomInt(2)];
        var length = ship.getLength();
        var listOfSquares = [];
        let randomX, randomY;
        switch (dir) {
          case "HORIZONTAL":
            randomX = this.#randomInt(width + 1 - length);
            randomY = this.#randomInt(height);
            // Push the array to listOfSquares
            for (var i = randomX; i < randomX + length; i++) {
              listOfSquares.push(this.#board.getBoard()[i][randomY]);
            }
            break;
          case "VERTICAL":
            randomX = this.#randomInt(width);
            randomY = this.#randomInt(height + 1 - length);
            // Push the array to listOfSquares
            for (var i = randomY; i < randomY + length; i++) {
              listOfSquares.push(this.#board.getBoard()[randomX][i]);
            }
            break;
        }
      } while (!ship.setPos(listOfSquares));
    });
  }

  shoot() {}

  swapTurn() {
    this.#turn = !this.#turn;
  }

  getTurn() {
    return this.#turn;
  }

  getBoard() {
    return this.#board;
  }

  lose() {
    return !this.#ships.some((ship) => ship.sunk() === false);
  }

  preload(phaser) {
    this.#board.preload(phaser);
    this.#ships.map((ship) => ship.preload(phaser));
  }

  create(scene, swapTurn) {
    this.#board.create(40, 50, scene, this, swapTurn);
    var increaseHeight = 50;
    this.#ships.map((ship) => {
      ship.createPanel(
        this.#ships,
        config.phaser.width - config.ship.width / 2,
        increaseHeight,
        scene
      );
      increaseHeight += 40 + config.ship.height;
    });
  }

  update(scene) {
    this.#board.update(scene);
    this.#ships.map((ship) => ship.update());
  }
}
