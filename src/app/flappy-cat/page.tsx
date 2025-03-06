import FlappyCat from "@/components/FlappyCat";

export default function FlappyCatPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl text-green-400 font-bold">🐱 Flappy Cat: Cosmic Dash 🚀</h1>
      <FlappyCat />
      <p className="mt-4 text-gray-400">Tap or click to make the cat flap!</p>
    </div>
  );
}
