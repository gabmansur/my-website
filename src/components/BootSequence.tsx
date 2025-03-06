"use client";

import { useState, useEffect } from "react";

const bootLines = [
  "[BOOT SEQUENCE INITIATED...]",
  "[LOADING KERNEL MODULES...]",
  "[MOUNTING FILESYSTEM...]",
  "[DECRYPTING SECURITY PROTOCOLS...]",
  "[AUTHORIZING USER: G4B1.exe]",
  "[ACCESS LEVEL: UNRESTRICTED]",
  "[LOADING SYSTEM CORE...]",
  "[SYSTEM STABILITY: █████░░░░░ 55%]",
  "[INITIALIZING AI MODULES...]",
  "[ESTABLISHING CONNECTION...]",
  "[ERROR: UNAUTHORIZED SIGNAL DETECTED...]",
  "[OVERRIDE ACCEPTED]",
  "█ G4B1-CORE SYSTEM INITIALIZING █"
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  useEffect(() => {
    // Attempt to play a silent sound on load to unlock autoplay
    const unlockAudio = () => {
      const audio = new Audio("/beep.mp3");
      audio.volume = 0.01; // Very low volume
      audio.play().then(() => {
        setAudioUnlocked(true);
      }).catch(() => {
        console.log("Waiting for user interaction to enable sound...");
      });
    };

    unlockAudio(); // ✅ Try unlocking sound immediately

    // As a backup, enable sound when user clicks anywhere
    const enableSound = () => {
      setAudioUnlocked(true);
      document.removeEventListener("click", enableSound);
    };
    document.addEventListener("click", enableSound);

    return () => document.removeEventListener("click", enableSound);
  }, []);

  const playBeep = () => {
    if (!audioUnlocked) return;
    const audio = new Audio("/beep.mp3");
    audio.volume = 0.2;
    audio.play().catch((err) => console.error("Audio failed:", err));
  };

  useEffect(() => {
    if (currentLine < bootLines.length) {
      const interval = setInterval(() => {
        setDisplayText((prev) => prev + bootLines[currentLine] + "\n");
        playBeep();
        setCurrentLine((prev) => prev + 1);
      }, 150);

      return () => clearInterval(interval);
    } else {
      setTimeout(() => onComplete(), 1000);
    }
  }, [currentLine, audioUnlocked]); // ✅ Sound only plays when unlocked

  return (
    <pre className="text-green-400 text-sm font-mono whitespace-pre-line leading-snug">
      {displayText}
    </pre>
  );
}
