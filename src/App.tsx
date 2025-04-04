import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10); // Update every 10ms
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const formatTime = (centiseconds: number) => {
    const hours = Math.floor(centiseconds / (100 * 60 * 60));
    const minutes = Math.floor((centiseconds % (100 * 60 * 60)) / (100 * 60));
    const seconds = Math.floor((centiseconds % (100 * 60)) / 100);
    const ms = centiseconds % 100;

    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(ms)}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-96">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Timer</h1>
        
        <div className="text-5xl font-mono text-center mb-8 text-gray-900 tabular-nums">
          {formatTime(time)}
        </div>
        
        <div className="flex justify-center gap-4">
          <button
            onClick={handleStartPause}
            className={`p-4 rounded-full ${
              isRunning 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
            } text-white transition-colors duration-200`}
          >
            {isRunning ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>
          
          <button
            onClick={handleReset}
            className="p-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
          >
            <RotateCcw className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;