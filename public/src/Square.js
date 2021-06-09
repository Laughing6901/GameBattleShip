export default class Square {
  #x;
  #y;
  #ship;
  #shoot;
  #phaser;
  #img;
  #select;
  #probability;
  #status; // MISS, HIT, UNVISITED

  constructor(x, y) {
    this.#ship = false;
    this.#shoot = false;
    this.#select = false;
    this.#status = "UNVISITED";
    this.#probability = 0;
    this.#x = x;
    this.#y = y;
  }

  // Each sence must call this function first to load img and setup #phaser
  preload(phaser) {
    this.#phaser = phaser;
  }

  // Setup ship in this square
  setShip(status) {
    this.#ship = status;
    if (!status) {
      this.#img.clearTint();
    }
  }

  setStatus(status) {
    this.#status = status;
  }

  getStatus() {
    return this.#status;
  }

  getShip() {
    return this.#ship;
  }

  // Select square
  setSelect(status) {
    this.#select = status;
  }

  getSelect() {
    return this.#select;
  }

  // Shot this square
  shoot() {
    this.#shoot = true;

    // check if hit a ship explosion
    if (this.#ship) {
      this.#status = "HIT";

      this.#img.play({ key: "hit" });

      setTimeout(() => {
        try {
          this.#img.setScale(1.4).play({ key: "fire", repeat: -1 });
        } catch (err) {}
      }, 1500);
    } else {
      this.#status = "MISS";

      this.#img.setScale(0.4).play({ key: "miss" });

      setTimeout(() => {
        try {
          this.#img.setScale(1).play({ key: "wave", repeat: -1 });
        } catch (err) {}
      }, 1100);
    }
  }

  // PROBABILITY
  getProba() {
    return this.#probability;
  }

  resetProba() {
    this.#probability = 0;
  }

  increaseProba(num) {
    this.#probability += num;
  }

  getShoot() {
    return this.#shoot;
  }

  getImg() {
    return this.#img;
  }

  getX() {
    return this.#x;
  }

  getY() {
    return this.#y;
  }

  // Render square
  create(xPos, yPos, scene, player, swapTurn) {
    // Create wave animation
    this.#phaser.anims.create({
      key: "wave",
      frames: this.#phaser.anims.generateFrameNumbers("square"),
      frameRate: 5,
    });

    // Create hit explosion animation
    this.#phaser.anims.create({
      key: "hit",
      frames: this.#phaser.anims.generateFrameNumbers("hit"),
      frameRate: 8,
    });

    // Create hit explosion animation
    this.#phaser.anims.create({
      key: "miss",
      frames: this.#phaser.anims.generateFrameNumbers("miss"),
      frameRate: 20,
    });

    // Create fire animation
    this.#phaser.anims.create({
      key: "fire",
      frames: this.#phaser.anims.generateFrameNumbers("fire"),
      frameRate: 10,
    });

    // Render square
    this.#img = this.#phaser.add
      .sprite(xPos, yPos, "square")
      .setInteractive({ cursor: "url(../assets/cursor/target.cur), pointer" });
    if (this.#ship && this.#shoot) {
      this.#img.setScale(1.4).play({ key: "fire", repeat: -1 });
    } else {
      this.#img.play({ key: "wave", repeat: -1 });
    }

    this.#img.on("pointerdown", () => {
      if (scene === "ComputerScene") {
        // If not computer turn => player turn => shoot
        if (!player.getTurn() && !this.#shoot) {
          this.shoot();
          swapTurn();
        }
      } else if (scene === "SetupScene") {
        this.setSelect(true);
      }
    });
    if (this.#ship && scene === "PlayerScene") {
      this.#img.setTint(0x229954);
    } else if (scene !== "PlayerScene") {
      this.#img.on("pointerover", () => {
        this.#img.setTint(0x44ff44);
      });
      this.#img.on("pointerout", () => {
        this.#img.clearTint();
      });
    }
  }

  update(scene) {
    switch (scene) {
      case "SetupScene":
        if (this.#ship) this.#img.setTint(0x229954);
        break;
      case "ComputerScene":
      case "PlayerScene":
        if (this.#shoot) {
          this.#img.clearTint();
          if (!this.#ship && this.#img.anims.currentAnim.key !== "miss") {
            this.#img.setTint(0x34495e);
          }
        }
        break;
    }
  }
}

