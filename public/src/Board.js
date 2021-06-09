import Square from "./Square.js";

import { config } from "../config.js";

export default class Board {
  #width;
  #height;
  #board; // Store the 2D array of square

  constructor() {
    this.#width = config.board.width;
    this.#height = config.board.height;
    this.#initialize();
  }

  // Each sence must call this function first to load img and setup #phaser
  preload(phaser) {
    // Load img of Square first
    phaser.load.spritesheet("square", "../assets/water.png", {
      frameWidth: 48,
      frameHeight: 48,
    });

    // Load anims for explosion when shoot
    phaser.load.spritesheet("hit", "../assets/explosion/hitShip.png", {
      frameWidth: 40,
      frameHeight: 32,
    });

    // Load anims for miss when shoot
    phaser.load.spritesheet("miss", "../assets/explosion/missShip.png", {
      frameWidth: 175,
      frameHeight: 175,
    });

    // Load anims for fire after hit
    phaser.load.spritesheet("fire", "../assets/explosion/Fire.png", {
      frameWidth: 35,
      frameHeight: 40,
    });

    // Setup sence for each square
    this.#board.map((row) => {
      return row.map((cell) => {
        return cell.preload(phaser);
      });
    });
  }

  // Create the 2D array of Square
  #initialize() {
    // Create 2D array
    this.#board = new Array(this.#width);

    for (let i = 0; i < this.#width; i++) {
      this.#board[i] = new Array(this.#height);
    }
    // Initialize Square
    for (var i = 0; i < this.#width; i++) {
      for (var j = 0; j < this.#height; j++) {
        this.#board[i][j] = new Square(i, j);
      }
    }
  }

  getWidth() {
    return this.#width;
  }

  getHeight() {
    return this.#height;
  }

  getBoard() {
    return this.#board;
  }

  getSquareSelecting() {
    var selectingSqr;
    this.#board.map((row) => {
      return row.map((cell) => {
        if (cell.getSelect()) return (selectingSqr = cell);
      });
    });
    return selectingSqr;
  }

  resetProba() {
    this.#board.map((row) => row.map((cell) => cell.resetProba()));
  }

  create(xStart, yStart, scene, player, swapTurn) {
    var xIncrease = 0;
    for (var i = 0; i < this.#width; i++) {
      var yIncrease = 0;
      for (var j = 0; j < this.#height; j++) {
        this.#board[i][j].create(
          xStart + xIncrease,
          yStart + yIncrease,
          scene,
          player,
          swapTurn
        );
        yIncrease += config.square.width;
      }
      xIncrease += config.square.width;
    }
  }

  update(scene) {
    for (var i = 0; i < this.#width; i++) {
      for (var j = 0; j < this.#height; j++) {
        // Render each square
        this.#board[i][j].update(scene);
      }
    }
  }
}
