import { config } from "../../config.js";

const WIDTH = 300,
  HEIGHT = 110;

export default class StartBtn {
  #setupDone;
  #container;
  #phaser;

  constructor() {
    this.#setupDone = false;
  }

  setSetupDone(done) {
    this.#setupDone = done;
  }

  getSetupDone() {
    return this.#setupDone;
  }

  preload(phaser) {
    this.#phaser = phaser;
    this.#phaser.load.image(
      "btnBackground",
      "../../assets/UI_Btn/button-bg.png"
    );
    this.#phaser.load.image("btnText", "../../assets/UI_Btn/button-text.png");
  }

  create(scene) {
    var bg = this.#phaser.add.image(0, 0, "btnBackground").setScale(0.5);
    var text = this.#phaser.add.image(0, 0, "btnText").setScale(0.5);

    this.#container = this.#phaser.add
      .container(config.phaser.width / 2, config.phaser.height - HEIGHT / 3, [
        bg,
        text,
      ])
      .setSize(WIDTH / 2, HEIGHT / 2)
      .setInteractive();

    this.#container.on("pointerover", () => {
      if (this.#setupDone) bg.setTint(0x44ff44);
      else bg.setTint(0xff44ff);
    });

    this.#container.on("pointerout", function () {
      bg.clearTint();
    });

    this.#container.on("pointerdown", () => {
      if (this.#setupDone) {
        switch (scene) {
          case "SetupScene":
            this.#phaser.scene.start("ComputerScene");
            break;
          case "ComputerScene":
            this.#phaser.scene.start("PlayerScene");
            break;
          case "PlayerScene":
            this.#phaser.scene.start("ComputerScene");
            break;
        }
      }
    });
  }
}
