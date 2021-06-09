import { config } from "./config.js";
import Game from "./src/Game.js";

import Background from "./src/Scenes/Background.js";
import SetupScene from "./src/Scenes/SetupScene.js";
import ComputerScene from "./src/Scenes/ComputerScene.js";
import PlayerScene from "./src/Scenes/PlayerScene.js";

var battleship = new Game();

var Setup = new SetupScene(battleship);
var Computer = new ComputerScene(battleship);
var Player = new PlayerScene(battleship);

var phaserConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: config.phaser.width,
    height: config.phaser.height,
  },
  scene: [Background, Setup, Computer, Player],
};

var game = new Phaser.Game(phaserConfig);
