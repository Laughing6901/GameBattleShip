import StartBtn from "../controller_UI/StartBtn.js";

// ComputerScene in player's turn
export default class ComputerScene extends Phaser.Scene {
  #battleship;
  #name = "ComputerScene";
  #btn;
  #sceneDone = false;

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

    if (computer.lose()) {
      // Congratulation
      computer
        .getBoard()
        .getBoard()
        [Math.floor(Math.random() * 10)][
          Math.floor(Math.random() * 10)
        ].shoot();

      if (!this.#sceneDone) {
        this.#sceneDone = true;
        setTimeout(() => {
          this.scene.start("ResultScene", { message: "Player" });
        }, 6000);
      }
    }
    computer.update(this.#name);
    // Switch screen
    computer.getTurn()
      ? this.#btn.setSetupDone(true)
      : this.#btn.setSetupDone(false);
  }
}
