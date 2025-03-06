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

  useEffect(() => {
    if (currentLine < bootLines.length) {
      const interval = setTimeout(() => {
        setDisplayText((prev) => prev + bootLines[currentLine] + "\n");
        setCurrentLine((prev) => prev + 1);
      }, 150); // Adjust speed if needed

      return () => clearTimeout(interval);
    } else {
      setTimeout(() => onComplete(), 1000); // Small delay before completing
    }
  }, [currentLine, onComplete]);

  return (
    <pre className="text-green-400 text-sm font-mono whitespace-pre-line leading-snug">
      {displayText}
    </pre>
  );
}
