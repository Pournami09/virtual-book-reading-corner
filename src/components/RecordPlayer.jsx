import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RecordPlayer = ({ isPlaying, onToggle, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const recordRef = useRef(null);

  // Tonearm rotation angles based on Figma design
  const tonearmAnglePlaying = 358.905; // Playing state angle
  const tonearmAngleNotPlaying = 331.369; // Not playing state angle

  // Record spinning animation
  useEffect(() => {
    if (recordRef.current) {
      if (isPlaying) {
        recordRef.current.style.animation = 'spin 3s linear infinite';
      } else {
        recordRef.current.style.animation = 'none';
      }
    }
  }, [isPlaying]);

  const handleTonearmClick = (e) => {
    e.stopPropagation();
    onToggle?.();
  };

  return (
    <div className={`relative w-80 h-80 mx-auto ${className}`}>
      {/* Record Player Base */}
      <div className="relative w-full h-full">
        {/* Vinyl Record */}
        <motion.div
          ref={recordRef}
          className="absolute inset-0 w-full h-full"
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={isPlaying ? { duration: 3, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
        >
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border-8 border-gray-700 shadow-2xl vinyl-texture">
            {/* Record grooves */}
            <div className="absolute inset-4 border-2 border-gray-600 rounded-full"></div>
            <div className="absolute inset-8 border border-gray-600 rounded-full"></div>
            <div className="absolute inset-12 border border-gray-600 rounded-full"></div>
            <div className="absolute inset-16 border border-gray-600 rounded-full"></div>
            <div className="absolute inset-20 border border-gray-600 rounded-full"></div>
            
            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tonearm */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 origin-bottom"
          animate={{ 
            rotate: isPlaying ? tonearmAnglePlaying : tonearmAngleNotPlaying 
          }}
          transition={{ 
            duration: 0.6, 
            ease: "easeInOut",
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          style={{ 
            transformOrigin: '50% 100%',
            zIndex: 10
          }}
        >
          <button
            onClick={handleTonearmClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group focus:outline-none"
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            {/* Tonearm */}
            <div className="relative">
              {/* Tonearm body */}
              <div className="w-32 h-2 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full shadow-lg transform -translate-x-16 -translate-y-1">
                {/* Tonearm tip */}
                <div className="absolute -right-1 -top-1 w-4 h-4 bg-gray-900 rounded-full border-2 border-gray-700"></div>
              </div>
              
              {/* Tonearm pivot point */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600 shadow-lg"></div>
            </div>

            {/* Hover effect */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-amber-800 text-amber-50 px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none"
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>

        {/* Player Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
          {/* Speed indicator */}
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-amber-500' : 'bg-gray-400'}`}></div>
            <span className="text-xs text-amber-700 font-medium">
              {isPlaying ? '33 RPM' : 'Stopped'}
            </span>
          </div>
        </div>

        {/* Vinyl texture overlay */}
        <div className="absolute inset-0 rounded-full opacity-10 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-br from-transparent via-white to-transparent rounded-full"></div>
        </div>

        {/* Playing glow effect */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow: '0 0 20px rgba(245, 158, 11, 0.3), 0 0 40px rgba(245, 158, 11, 0.2)'
            }}
          />
        )}
      </div>

      {/* CSS for record spinning animation */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default RecordPlayer;
