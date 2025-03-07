"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import FlappySettings from "@/components/FlappySettings";

// Dynamically import Phaser with a specific path to avoid ESM issues
const PhaserLib = dynamic(() => import("phaser/dist/phaser.js"), { ssr: false });

interface GameSettings {
  gravity: number;
  jumpStrength: number;
  pipeSpeed: number;
  pipeGap: number;
}

export default function FlappyTom() {
  const gameRef = useRef<HTMLDivElement>(null);
  const [game, setGame] = useState<any>(null);
  const [isPhaserLoaded, setIsPhaserLoaded] = useState(false);
  const [settings, setSettings] = useState<GameSettings>({
    gravity: 3,
    jumpStrength: 3,
    pipeSpeed: 2,
    pipeGap: 2,
  });

  // Check if Phaser is loaded
  useEffect(() => {
    if (typeof PhaserLib === "undefined" || !PhaserLib || !PhaserLib.Scene) {
      console.log("Phaser or Phaser.Scene is not yet loaded");
      return;
    }
    console.log("Phaser loaded successfully");
    setIsPhaserLoaded(true);
  }, [PhaserLib]);

  // Initialize game only when Phaser is loaded
  useEffect(() => {
    if (!isPhaserLoaded || !gameRef.current || game) return;

    // Define the game scene class
    class FlappyTomGame extends PhaserLib.Scene {
      player!: PhaserLib.Physics.Arcade.Sprite;
      pipes!: PhaserLib.Physics.Arcade.Group;
      score = 0;
      scoreText!: PhaserLib.GameObjects.Text;

      constructor() {
        super("FlappyTomGame");
      }

      preload() {
        this.load.image("tom", "/images/tom.png");
        this.load.image("pipe", "/images/pipe.png");
      }

      create() {
        this.cameras.main.setBackgroundColor("#87CEEB");
        this.player = this.physics.add.sprite(100, 300, "tom").setScale(0.5);
        this.player.setGravityY(settings.gravity * 100);

        this.input.on("pointerdown", () => {
          this.player.setVelocityY(-settings.jumpStrength * 50);
        });

        this.pipes = this.physics.add.group();
        this.time.addEvent({
          delay: 1500,
          callback: this.spawnPipes,
          callbackScope: this,
          loop: true,
        });

        this.scoreText = this.add.text(20, 20, `Score: 0`, {
          fontSize: "16px",
          color: "#fff",
          fontFamily: "PixelFont",
        });

        this.physics.add.collider(this.player, this.pipes, this.gameOver, null, this);
      }

      spawnPipes() {
        const pipeHeight = PhaserLib.Math.Between(100, 400);
        const topPipeY = pipeHeight - (settings.pipeGap * 50);
        const bottomPipeY = pipeHeight + (settings.pipeGap * 50);

        const topPipe = this.physics.add.image(800, topPipeY, "pipe").setImmovable(true);
        const bottomPipe = this.physics.add.image(800, bottomPipeY, "pipe").setImmovable(true);

        this.pipes.add(topPipe);
        this.pipes.add(bottomPipe);

        topPipe.body.velocity.x = -(settings.pipeSpeed * 50);
        bottomPipe.body.velocity.x = -(settings.pipeSpeed * 50);

        this.time.addEvent({
          delay: 5000,
          callback: () => {
            if (topPipe.active) topPipe.destroy();
            if (bottomPipe.active) bottomPipe.destroy();
          },
          callbackScope: this,
        });

        this.score++;
        this.scoreText.setText(`Score: ${this.score}`);
      }

      gameOver() {
        this.scene.restart();
        this.score = 0;
      }

      updateSettings(settings: GameSettings) {
        this.player.body.gravity.y = settings.gravity * 100;
        this.player.setVelocityY(-settings.jumpStrength * 50);
        this.pipes.getChildren().forEach((pipe) => {
          (pipe.body as PhaserLib.Physics.Arcade.Body).velocity.x = -settings.pipeSpeed * 50;
        });
      }
    }

    const config: PhaserLib.Types.Core.GameConfig = {
      type: PhaserLib.AUTO,
      width: 800,
      height: 600,
      parent: gameRef.current,
      physics: { default: "arcade", arcade: { gravity: { y: settings.gravity * 100 } } },
      scene: FlappyTomGame,
    };

    const newGame = new PhaserLib.Game(config);
    setGame(newGame);

    return () => {
      newGame.destroy(true);
    };
  }, [isPhaserLoaded, game, settings.gravity]);

  const handleSettingsChange = (newSettings: GameSettings) => {
    setSettings(newSettings);
    if (game) {
      const scene = game.scene.getScenes()[0] as FlappyTomGame;
      scene.updateSettings(newSettings);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-black text-green-400 pixel-art">
      <FlappySettings
        gravity={settings.gravity}
        jumpStrength={settings.jumpStrength}
        pipeSpeed={settings.pipeSpeed}
        pipeGap={settings.pipeGap}
        onSettingsChange={handleSettingsChange}
      />
      <div ref={gameRef} className="flex-1" />
    </div>
  );
}