import { config } from "../../config.js";

export default class ShipPanel {
  #name;
  #phaser;
  #panel;
  #select;
  #sunk;

  constructor(name, phaser) {
    this.#name = name;
    this.#phaser = phaser;
    this.#select = false;
    this.#sunk = false;
    this.#preloadImg();
  }

  #preloadImg() {
    var shipImg;
    switch (this.#name) {
      case "ship2":
        shipImg = "../../assets/ship/ship2.png";
        break;
      case "ship3":
        shipImg = "../../assets/ship/ship3.png";
        break;
      case "ship32":
        shipImg = "../../assets/ship/ship32.png";
        break;
      case "ship4":
        shipImg = "../../assets/ship/ship4.png";
        break;
      case "ship5":
        shipImg = "../../assets/ship/ship5.png";
        break;
    }
    this.#phaser.load.image("sunk", "../../assets/ship/sunk.png");

    this.#phaser.load.spritesheet(this.#name, shipImg, {
      frameWidth: config.ship.width,
      frameHeight: config.ship.height,
    });
  }
  
  getImg() {
    return this.#panel;
  }

  setSelect(status) {
    this.#select = status;
  }

  getSelect() {
    return this.#select;
  }

  // Create in phaser
  create(listOfShips, x, y, scene) {
    this.#panel = this.#phaser.add
      .sprite(x, y, this.#name)
      .setInteractive()
      .setFrame(1);
    this.#sunk = this.#phaser.add.sprite(x, y, "sunk").setScale(0.25);
    this.#sunk.visible = false;
    if (scene === "SetupScene") {
      this.#panel.on("pointerdown", () => {
        // ships are not selected must be setSelect to false
        var selectingShip;
        listOfShips.map((ship) => {
          if (ship.getPanel().getSelect()) return (selectingShip = ship);
        });

        if (selectingShip && selectingShip.getName() !== this.#name) {
          selectingShip.getPanel().getImg().setFrame(1);
          selectingShip.getPanel().setSelect(false);
        }

        this.setSelect(true);
        this.#panel.setFrame(2);
      });
    }
    this.#panel.on("pointerout", () => {
      if (!this.#select) {
        this.#panel.setFrame(1);
      }
    });
    this.#panel.on("pointerover", () => {
      if (!this.#select) {
        this.#panel.setFrame(0);
      }
    });
  }

  update(sunk) {
    if (sunk) this.#sunk.visible = true;
  }
}

  