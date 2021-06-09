import ShipPanel from "./controller_UI/ShipPanel.js";

export default class Ship {
  #name;
  #length; // length of the board
  #phaser;
  #pos; // Array[Square, Square, ...]. The coordianate of ship is belong to this Square
  #panel; // the panel for user choose to setup ships

  constructor(name, length) {
    this.#name = name;
    this.#length = length;
    this.#pos = [];
  }

  preload(phaser) {
    this.#phaser = phaser;
    this.#panel = new ShipPanel(this.#name, this.#phaser);
  }

  #checkPosValid(listOfSquare) {
    var valid = true;
    listOfSquare.map((square) => {
      if (square.getShip() && !this.#pos.some((sqr) => sqr == square)) {
        // Not valid clear old pos and return false
        this.#pos = [];
        return (valid = false);
      }
    });
    return valid;
  }

  setPos(listOfSquare) {
    // Remove old setup
    this.#pos.map((sqr) => sqr.setShip(false));
    // Create new setup
    // Check listOfSquare valid or not
    if (this.#checkPosValid(listOfSquare)) {
      // Add pos to ship
      this.#pos = listOfSquare;
      // Add ship to square
      listOfSquare.map((sqr) => sqr.setShip(true));
      return true;
    }
    return false;
  }

  getPos() {
    return this.#pos;
  }

  getLength() {
    return this.#length;
  }

  getName() {
    return this.#name;
  }

  sunk() {
    return !this.#pos.some((sqr) => sqr.getShoot() === false);
  }

  // Panel for player setup ---------------------------------
  getPanel() {
    return this.#panel;
  }

  // Create in phaser
  createPanel(listOfShips, x, y, scene) {
    this.#panel.create(listOfShips, x, y, scene);
  }
  // --------------------------------------------------------

  update() {
    if (this.sunk()) {
      this.#panel.update(true);
    }
  }
}

