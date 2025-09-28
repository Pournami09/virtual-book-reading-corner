import React from 'react';

const PlantDecoration = () => {
  return (
    <div className="relative w-20 h-24 flex items-end justify-center">
      {/* New potted plant design - light pink pot with green vining plants */}
      <div className="relative w-full h-full">
        {/* Plant pot - light pink with darker rim */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-16 bg-pink-200 rounded-b-lg">
          {/* Pot rim - darker pink */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-pink-300 rounded-t-lg"></div>
          {/* Pot base shadow */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-pink-400 rounded-b-lg"></div>
        </div>
        
        {/* Left vine */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            {/* Main stem */}
            <div className="w-1 h-16 bg-green-600 transform rotate-12 origin-top"></div>
            {/* Leaves on left vine */}
            <div className="absolute top-2 left-0 w-3 h-4 bg-green-500 rounded-full transform rotate-45"></div>
            <div className="absolute top-6 left-1 w-3 h-4 bg-green-500 rounded-full transform rotate-30"></div>
            <div className="absolute top-10 left-0 w-3 h-4 bg-green-500 rounded-full transform rotate-60"></div>
            <div className="absolute top-14 left-1 w-3 h-4 bg-green-500 rounded-full transform rotate-45"></div>
          </div>
        </div>
        
        {/* Right vine */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            {/* Main stem */}
            <div className="w-1 h-16 bg-green-600 transform -rotate-12 origin-top"></div>
            {/* Leaves on right vine */}
            <div className="absolute top-2 right-0 w-3 h-4 bg-green-500 rounded-full transform -rotate-45"></div>
            <div className="absolute top-6 right-1 w-3 h-4 bg-green-500 rounded-full transform -rotate-30"></div>
            <div className="absolute top-10 right-0 w-3 h-4 bg-green-500 rounded-full transform -rotate-60"></div>
            <div className="absolute top-14 right-1 w-3 h-4 bg-green-500 rounded-full transform -rotate-45"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDecoration;