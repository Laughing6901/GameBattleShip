import StartBtn from "../controller_UI/StartBtn.js";

// ComputerScene in player's turn
export default class ComputerScene extends Phaser.Scene {
  #battleship;
  #name = "ComputerScene";
  #btn;

  constructor(battleship) {
    super("ComputerScene");
    this.#battleship = battleship;
    this.#btn = new StartBtn();
  }

  preload() {
    this.#battleship.preload(this);
    this.#btn.preload(this);
  }

  create() {
    this.#battleship.create(this.#name);
    this.#btn.create(this.#name);
  }

  update() {
    //this.#battleship.getComputer().getBoard().moveToBack();
    var computer = this.#battleship.getComputer();

    if (computer.lose()) return;

    computer.update(this.#name);
    // Switch screen
    if (computer.getTurn()) {
      this.#btn.setSetupDone(true);
      //setTimeout(() => this.scene.switch("PlayerScene"), 3000);
      //this.scene.pause();
    } else {
      this.#btn.setSetupDone(false);
    }
  }
}