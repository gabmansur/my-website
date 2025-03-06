"use client";

import { useState, useEffect } from "react";

export default function Typewriter({ text, speed = 100 }: { text: string; speed?: number }) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1)); // ✅ Fix: Only add valid characters
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayText}
      {!isTyping && <span className="animate-blink">█</span>}
    </span>
  );
}