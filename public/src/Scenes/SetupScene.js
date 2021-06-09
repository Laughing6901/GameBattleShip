import DirectionSwt from "../controller_UI/DirectionSwt.js";
import StartBtn from "../controller_UI/StartBtn.js";

export default class SetupScene extends Phaser.Scene {
  #battleship;
  // Control UI
  #directionSwt;
  #startBtn;
  #name = "SetupScene";

  constructor(battleship) {
    super({ key: "SetupScene", active: true });
    this.#battleship = battleship;
    this.#startBtn = new StartBtn();
  }

  preload() {
    this.#battleship.preload(this);

    // Preload Control UI
    this.#directionSwt = new DirectionSwt(this);
    this.#startBtn.preload(this);
  }

  create() {
    // create game
    this.#battleship.create(this.#name);

    this.#directionSwt.create();
    this.#startBtn.create(this.#name);
  }

  update() {
    var player = this.#battleship.getPlayer();
    var board = player.getBoard();

    var selectingShip = player.getPanelSelecting();
    var selectingSqr = board.getSquareSelecting();
    // Handle when select square before select ship
    if (selectingSqr && !selectingShip) {
      selectingSqr.setSelect(false);
    }

    //board.getBoard().map(row => {row.map(cell => ce)})
    board.update(this.#name);

    // Handle all thing setup board
    if (selectingShip && selectingSqr) {
      player.setupShips(
        selectingShip,
        selectingSqr,
        this.#directionSwt.getDirection()
      );
      // Check setup done or not
      player.getShips().some((ship) => ship.getPos().length === 0)
        ? this.#startBtn.setSetupDone(false)
        : this.#startBtn.setSetupDone(true);
    }
  }
}
