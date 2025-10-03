'use client';

import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 5;
      if (current > 100) {
        clearInterval(interval);
      } else {
        setProgress(current);
      }
    }, 100); // updates every 100ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-50">
      <h1 className="text-white text-2xl font-bold mb-6">Loading...</h1>

      {/* Progress Bar Container */}
      <div className="w-3/4 max-w-md h-4 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-200 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-white mt-4 text-sm">{progress}%</p>
    </div>
  );
};

export default LoadingScreen;
