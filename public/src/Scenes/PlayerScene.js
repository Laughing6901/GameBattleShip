import StartBtn from "../controller_UI/StartBtn.js";

// PlayerScene in Computer's turn
export default class PlayerScene extends Phaser.Scene {
  #battleship;
  #name = "PlayerScene";
  #btn;
  #sceneDone = false;

  constructor(battleship) {
    super("PlayerScene");
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
    var player = this.#battleship.getPlayer();
    var computer = this.#battleship.getComputer();

    if (player.lose()) {
      if (!this.#sceneDone) {
        this.#sceneDone = true;
        setTimeout(() => {
          this.scene.start("ResultScene", { message: "Computer" });
        }, 6000);
      }
    }
    player.update(this.#name);
    if (computer.getTurn()) this.#shoot(computer, player);
  }

  #shoot(computer, player) {
    computer.shoot(player);

    // After shoot change to player turn => change scene
    this.#battleship.swapTurn();
    player.getTurn()
      ? this.#btn.setSetupDone(true)
      : this.#btn.setSetupDone(false);
    //setTimeout(() => this.scene.switch("ComputerScene"), 5000);
    //this.scene.pause();
  }
}
