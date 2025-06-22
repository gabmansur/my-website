"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Phaser to prevent SSR issues
const PhaserLib = dynamic(() => import("phaser"), { ssr: false });

export default function FlappyTom() {
  const gameRef = useRef<HTMLDivElement>(null);
  const [game, setGame] = useState<any>(null);

  useEffect(() => {
    if (!gameRef.current || game) return;

    // Ensure Phaser is loaded
    PhaserLib.then((Phaser) => {
      if (!Phaser) {
        console.error("Failed to load Phaser");
        return;
      }

      class FlappyGame extends Phaser.Scene {
        constructor() {
          super("FlappyGame");
        }

        preload() {
          this.load.image("tom", "/images/tom.png");
        }

        create() {
          this.cameras.main.setBackgroundColor("#87CEEB");

          const player = this.physics.add.sprite(150, 300, "tom").setScale(0.3);
          player.setGravityY(600);

          this.input.on("pointerdown", () => {
            player.setVelocityY(-250);
          });
        }
      }

      const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: gameRef.current,
        physics: { default: "arcade", arcade: { gravity: { y: 600 } } },
        scene: FlappyGame,
      };

      const newGame = new Phaser.Game(config);
      setGame(newGame);

      return () => newGame.destroy(true);
    });
  }, [game]);

  return <div ref={gameRef} className="w-full h-screen bg-black" />;
}
