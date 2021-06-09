import Player from "./Player.js";
import Computer from "./Computer.js";

export default class Game {
  // Player
  #player;
  #computer;

  constructor() {
    // Create Player -> pass turn as param
    this.#player = new Player(true);
    this.#computer = new Computer(false);
  }

  swapTurn() {
    if (!this.#computer.lose() && !this.#player.lose()) {
      this.#player.swapTurn();
      this.#computer.swapTurn();
    }
  }

  preload(scene) {
    this.#player.preload(scene);
    this.#computer.preload(scene);
  }

  create(scene) {
    switch (scene) {
      case "SetupScene":
        this.#player.create(scene);
        break;
      case "ComputerScene":
        this.#computer.create(scene, () => this.swapTurn());
        break;
      case "PlayerScene":
        this.#player.create(scene, () => this.swapTurn());
        break;
    }
  }

  getPlayer() {
    return this.#player;
  }

  getComputer() {
    return this.#computer;
  }
}
