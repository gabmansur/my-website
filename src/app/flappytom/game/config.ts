import * as Phaser from "phaser";

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: { gravity: { y: 300 }, debug: false },
  },
  scene: {
    preload: function () {
      this.load.image("player", "/images/tom.png"); // Adjusted Tom's image
    },
    create: function () {
      this.cameras.main.setBackgroundColor("#87CEEB");
      const player = this.physics.add.sprite(200, 300, "player").setScale(0.5);
      player.setGravityY(300);

      this.input.on("pointerdown", () => player.setVelocityY(-200));
    },
  },
};
