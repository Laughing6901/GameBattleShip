import StartBtn from "../controller_UI/StartBtn.js";

// PlayerScene in Computer's turn
export default class PlayerScene extends Phaser.Scene {
  #battleship;
  #name = "PlayerScene";
  #btn;

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

    if (player.lose()) return;

    player.update(this.#name);
    if (computer.getTurn()) this.#shoot(computer, player);
  }

  #shoot(computer, player) {
    computer.shoot(player);

    // After shoot change to player turn => change scene
    this.#battleship.swapTurn();
    this.#btn.setSetupDone(true);
    //setTimeout(() => this.scene.switch("ComputerScene"), 5000);
    //this.scene.pause();
  }
}