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

  shoot(player) {
    var opponentBoard = player.getBoard();
    var opponentShips = player.getShips();

    // Store the highest proba and the array of squares have this proba
    var highestProba = 0;
    var highestSqr = [];

    // Reset probability before calculate new proba
    opponentBoard.resetProba();

    if (this.#mode === "HUNT") {
      //console.log("HUNT MODE");
      // Calculate proba
      opponentShips.map((ship) => {
        // Don't check ship sunk
        if (ship.sunk()) return;
        opponentBoard.getBoard().map((row) => {
          row.map((cell) => {
            // TODO: HORIZONTAL
            // Check if ship placed valid with the width of board first
            if (cell.getX() + ship.getLength() <= opponentBoard.getWidth()) {
              // Check all the squares which place ship valid
              let checkValid = true;
              for (let i = 0; i < ship.getLength(); i++) {
                if (
                  opponentBoard
                    .getBoard()
                    [cell.getX() + i][cell.getY()].getShoot()
                ) {
                  checkValid = false;
                  break;
                }
              }
              // Valid => then increase proba in each square
              if (checkValid) {
                for (let i = 0; i < ship.getLength(); i++) {
                  opponentBoard
                    .getBoard()
                    [cell.getX() + i][cell.getY()].increaseProba(1);
                }
              }
            }
            // TODO: VERTICAL
            if (cell.getY() + ship.getLength() <= opponentBoard.getHeight()) {
              // Check all the squares which place ship valid
              let checkValid = true;
              for (let i = 0; i < ship.getLength(); i++) {
                if (
                  opponentBoard
                    .getBoard()
                    [cell.getX()][cell.getY() + i].getShoot()
                ) {
                  checkValid = false;
                  break;
                }
              }
              // Valid => then increase proba in each square
              if (checkValid) {
                for (let i = 0; i < ship.getLength(); i++) {
                  opponentBoard
                    .getBoard()
                    [cell.getX()][cell.getY() + i].increaseProba(1);
                }
              }
            }
          });
        });
      });

      // Generate more random for hunt mode
      opponentBoard.getBoard().map((row) => {
        row.map((cell) => {
          if (cell.getShoot()) return;

          cell.increaseProba(this.#randomInt(4));

          // Find the highest proba
          if (cell.getProba() > highestProba) {
            highestProba = cell.getProba();
          }
        });
      });
    }
  }

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
