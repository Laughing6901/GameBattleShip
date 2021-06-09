import { config } from "../config.js";
import Ship from "./Ship.js";
import Board from "./Board.js";

export default class Player {
  #ships;
  #board;
  #turn;

  constructor(turn) {
    this.#ships = [];
    this.#board = new Board();
    this.#turn = turn;
    this.#initializeShips();
  }

  #initializeShips() {
    // Create ships
    config.shipsArr.map((ship) => {
      const [key, value] = Object.entries(ship)[0];
      this.#ships.push(new Ship(key, value));
    });
  }

  preload(phaser) {
    //Preload panel for the setup screen
    this.#board.preload(phaser);
    this.#ships.map((ship) => ship.preload(phaser));
  }

  getShips() {
    return this.#ships;
  }

  getBoard() {
    return this.#board;
  }

  lose() {
    return !this.#ships.some((ship) => ship.sunk() === false);
  }

  setupShips(selectShip, selectSquare, direction) {
    const length = selectShip.getLength();
    const xStart = selectSquare.getX();
    const yStart = selectSquare.getY();

    // Remove the selected square before
    selectSquare.setSelect(false);
    var arrSquareSetup = [];

    if (direction) {
      // TODO: VERTICAL
      if (yStart + length <= config.board.height) {
        for (var i = yStart; i < yStart + length; i++) {
          arrSquareSetup.push(this.#board.getBoard()[xStart][i]);
        }
      }
    } else {
      // TODO: HORIZONTAL
      // Check valid in board first
      if (xStart + length <= config.board.width) {
        // Check the select square array valid
        for (var i = xStart; i < xStart + length; i++) {
          arrSquareSetup.push(this.#board.getBoard()[i][yStart]);
        }
      }
    }

    // Remove the position setted before
    selectShip.setPos(arrSquareSetup);
  }

  // Get the ship is selecting in setup screen
  getPanelSelecting() {
    var selectingShip;
    this.#ships.map((ship) => {
      if (ship.getPanel().getSelect()) return (selectingShip = ship);
    });
    return selectingShip;
  }

  // Setter-Getter for turn
  swapTurn() {
    this.#turn = !this.#turn;
  }

  getTurn() {
    return this.#turn;
  }

  // Create the img for ship panels
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
