const Phaser = await import("phaser");

export default class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private pipes!: Phaser.Physics.Arcade.Group;
  private scoreText!: Phaser.GameObjects.Text;
  private score: number = 0;
  private pipeSpeed: number = -200;
  private pipeGap: number = 120;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("tom", "/images/tom.png");
  }

  create() {
    this.cameras.main.setBackgroundColor("#87CEEB");

    this.player = this.physics.add.sprite(150, 300, "tom").setScale(0.3);
    this.player.setGravityY(600);

    this.pipes = this.physics.add.group();

    this.scoreText = this.add.text(20, 20, "Score: 0", {
      fontSize: "20px",
      fontFamily: "'PressStart2P', sans-serif",
      fill: "#ffffff",
    });

    this.input.on("pointerdown", () => this.player.setVelocityY(-250));

    this.time.addEvent({
      delay: 1500,
      callback: this.addPipes,
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(this.player, this.pipes, this.gameOver, undefined, this);
  }

  update() {
    if (this.player.y > this.cameras.main.height) {
      this.gameOver();
    }
  }

  addPipes() {
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;
    const pipeX = screenWidth + 50;

    const pipeHeight = 200;
    const randomY = Phaser.Math.Between(100, screenHeight - 200);

    const topPipe = this.add.rectangle(pipeX, randomY - this.pipeGap, 50, pipeHeight, 0x228b22);
    this.physics.add.existing(topPipe);
    (topPipe.body as Phaser.Physics.Arcade.Body).setVelocityX(this.pipeSpeed);
    this.pipes.add(topPipe);

    const bottomPipe = this.add.rectangle(pipeX, randomY + this.pipeGap, 50, pipeHeight, 0x228b22);
    this.physics.add.existing(bottomPipe);
    (bottomPipe.body as Phaser.Physics.Arcade.Body).setVelocityX(this.pipeSpeed);
    this.pipes.add(bottomPipe);

    this.time.delayedCall(3000, () => {
      this.score += 1;
      this.scoreText.setText("Score: " + this.score);
    });
  }

  gameOver() {
    this.scene.restart();
    this.score = 0;
  }
}
