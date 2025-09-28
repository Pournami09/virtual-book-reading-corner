import React from 'react';

const PlantDecoration = () => {
  return (
    <div className="w-[100px] h-[100px] flex items-center justify-center">
      {/* Container for the potted plant image */}
      <div className="w-full h-full flex items-center justify-center">
        {/* Potted plant image - light pink pot with green vining plants */}
        <div className="relative w-full h-full">
          {/* Plant pot - light pink with darker rim */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-pink-200 rounded-b-lg">
            {/* Pot rim - darker pink */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-pink-300 rounded-t-lg"></div>
            {/* Pot base shadow */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-pink-400 rounded-b-lg"></div>
          </div>
          
          {/* Left vine */}
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              {/* Main stem */}
              <div className="w-1.5 h-20 bg-green-600 transform rotate-12 origin-top"></div>
              {/* Leaves on left vine */}
              <div className="absolute top-3 left-0 w-4 h-5 bg-green-500 rounded-full transform rotate-45"></div>
              <div className="absolute top-8 left-1 w-4 h-5 bg-green-500 rounded-full transform rotate-30"></div>
              <div className="absolute top-13 left-0 w-4 h-5 bg-green-500 rounded-full transform rotate-60"></div>
              <div className="absolute top-18 left-1 w-4 h-5 bg-green-500 rounded-full transform rotate-45"></div>
            </div>
          </div>
          
          {/* Right vine */}
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              {/* Main stem */}
              <div className="w-1.5 h-20 bg-green-600 transform -rotate-12 origin-top"></div>
              {/* Leaves on right vine */}
              <div className="absolute top-3 right-0 w-4 h-5 bg-green-500 rounded-full transform -rotate-45"></div>
              <div className="absolute top-8 right-1 w-4 h-5 bg-green-500 rounded-full transform -rotate-30"></div>
              <div className="absolute top-13 right-0 w-4 h-5 bg-green-500 rounded-full transform -rotate-60"></div>
              <div className="absolute top-18 right-1 w-4 h-5 bg-green-500 rounded-full transform -rotate-45"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDecoration;