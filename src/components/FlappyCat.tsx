"use client";

import { useEffect, useRef } from "react";
import startGame from "@/game/FlappyCatGame"; // Import Phaser.js game

export default function FlappyCat() {
  const gameRef = useRef(null);

  useEffect(() => {
    if (!gameRef.current) {
      gameRef.current = startGame();
    }
  }, []);

  return <div id="game-container" className="border border-green-500 p-4"></div>;
}
