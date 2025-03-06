"use client"; // ✅ Forces this file to be a Client Component

import { useState } from "react";
import BootSequence from "@/components/BootSequence";
import Typewriter from "@/components/Typewriter";

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-green-400 text-center font-mono">
      {!bootComplete ? (
        <BootSequence onComplete={() => setBootComplete(true)} />
      ) : (
        <>
          <h1 className="text-4xl font-bold tracking-widest">
            <Typewriter text="G4B1-CORE SYSTEM INITIALIZING" speed={80} />
          </h1>
          <p className="mt-4 text-green-300">SELECT A FUNCTION:</p>
          <div className="mt-6 flex flex-col space-y-4">
            <a href="/pro" className="border border-green-500 px-6 py-3 text-lg block w-72 text-center hover:bg-green-900 hover:text-black transition-none">
              {'>>'}' SYSTEM FILES // [CLEARANCE LEVEL 1] <span className="animate-blink">_</span>
            </a>
            <a href="/portfolio" className="border border-red-500 px-6 py-3 text-lg block w-72 text-center hover:bg-red-900 hover:text-black transition-none">
              {'>>'} UNKNOWN SECTOR // [ENTER AT OWN RISK] <span className="animate-blink">_</span>
            </a>
          </div>
        </>
      )}
    </div>
  );
}