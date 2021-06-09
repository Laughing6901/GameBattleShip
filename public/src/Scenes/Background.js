//import background from "url:../../assets/sky.png";
import { config } from "../../config.js";

export default class Background extends Phaser.Scene {
  constructor() {
    super("Background");
  }

  preload() {
    this.load.image("background", "../../assets/background/sky.png");
  }

  create() {
    // Render background img
    this.add.image(
      config.phaser.width / 2,
      config.phaser.height / 2,
      "background"
    );
    this.input.setDefaultCursor("url(../../assets/cursor/blue.cur), pointer");
  }
}
