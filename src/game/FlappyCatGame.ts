import Phaser from "phaser";

class FlappyCatScene extends Phaser.Scene {
  constructor() {
    super({ key: "FlappyCatScene" });
  }

  preload() {
    this.load.image("cat", "/game/assets/cat.png"); // Your cat sprite
    this.load.image("background", "/game/assets/background.png");
    this.load.image("obstacle", "/game/assets/asteroid.png");
  }

  create() {
    this.add.tileSprite(400, 300, 800, 600, "background");

    this.cat = this.physics.add.sprite(200, 300, "cat").setScale(0.8);
    this.cat.setGravityY(800); // Gravity effect

    this.input.on("pointerdown", () => {
      this.cat.setVelocityY(-300); // Flaps up
    });

    this.obstacles = this.physics.add.group();
    this.time.addEvent({
      delay: 1500,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(this.cat, this.obstacles, this.gameOver, null, this);
  }

  spawnObstacle() {
    let obstacle = this.obstacles.create(800, Phaser.Math.Between(100, 500), "obstacle");
    obstacle.setVelocityX(-200); // Moves left
  }

  gameOver() {
    this.scene.restart(); // Restart game on collision
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: { default: "arcade", arcade: { gravity: { y: 0 }, debug: false } },
  scene: FlappyCatScene,
};

export default function startGame() {
  return new Phaser.Game(config);
}
