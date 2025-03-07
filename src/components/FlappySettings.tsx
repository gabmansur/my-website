import React from "react";

interface FlappySettingsProps {
  gravity: number;
  jumpStrength: number;
  pipeSpeed: number;
  pipeGap: number;
  onSettingsChange: (settings: {
    gravity: number;
    jumpStrength: number;
    pipeSpeed: number;
    pipeGap: number;
  }) => void;
}

const FlappySettings: React.FC<FlappySettingsProps> = ({
  gravity,
  jumpStrength,
  pipeSpeed,
  pipeGap,
  onSettingsChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onSettingsChange({
      gravity: name === "gravity" ? Number(value) : gravity,
      jumpStrength: name === "jumpStrength" ? Number(value) : jumpStrength,
      pipeSpeed: name === "pipeSpeed" ? Number(value) : pipeSpeed,
      pipeGap: name === "pipeGap" ? Number(value) : pipeGap,
    });
  };

  const resetToDefault = () => {
    onSettingsChange({
      gravity: 3,
      jumpStrength: 3,
      pipeSpeed: 2,
      pipeGap: 2,
    });
  };

  return (
    <div className="p-4 bg-gray-900 text-green-400 border-b-2 border-green-500 pixel-border">
      <h2 className="text-2xl mb-4 pixel-text">Game Settings</h2>
      <div className="space-y-3">
        <div>
          <label className="block pixel-text">Gravity: {gravity}</label>
          <input
            type="range"
            name="gravity"
            min="1"
            max="5"
            step="1"
            value={gravity}
            onChange={handleChange}
            className="w-full accent-green-500 pixel-slider"
          />
        </div>
        <div>
          <label className="block pixel-text">Jump Strength: {jumpStrength}</label>
          <input
            type="range"
            name="jumpStrength"
            min="1"
            max="5"
            step="1"
            value={jumpStrength}
            onChange={handleChange}
            className="w-full accent-green-500 pixel-slider"
          />
        </div>
        <div>
          <label className="block pixel-text">Pipe Speed: {pipeSpeed}</label>
          <input
            type="range"
            name="pipeSpeed"
            min="1"
            max="5"
            step="1"
            value={pipeSpeed}
            onChange={handleChange}
            className="w-full accent-green-500 pixel-slider"
          />
        </div>
        <div>
          <label className="block pixel-text">Pipe Gap: {pipeGap}</label>
          <input
            type="range"
            name="pipeGap"
            min="1"
            max="5"
            step="1"
            value={pipeGap}
            onChange={handleChange}
            className="w-full accent-green-500 pixel-slider"
          />
        </div>
        <button
          onClick={resetToDefault}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded pixel-button hover:bg-red-700 transition duration-200"
        >
          Reset to Default
        </button>
      </div>
    </div>
  );
};

export default FlappySettings;