import { useState } from 'react';

const BookSpine = ({ book, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const bookColors = [
    '#002351', // Blue
    '#8E7ABB', // Purple
    '#00511B', // Green
    '#91974C', // Lime Green
    '#974C4C'  // Red
  ];

  const color = bookColors[index % bookColors.length];
  const title = book.title || 'Unknown Title';
  const author = book.authors?.[0] || 'Unknown Author';
  const fullTitle = `${title} by ${author}`;
  
  // Truncate title to fit on spine (max 20 characters)
  const truncatedTitle = title.length > 20 ? title.substring(0, 17) + '...' : title;

  return (
    <button
      className="relative group cursor-pointer transition-all duration-300 hover:scale-105 focus:scale-105 focus:outline-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      aria-label={`Select ${fullTitle} for reading`}
    >
      {/* Book Top */}
      <div className="absolute -top-1 left-0 w-full h-4 bg-gradient-to-b from-amber-600 to-amber-700 rounded-t-md shadow-md z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/50 to-transparent rounded-t-md"></div>
      </div>
      
      {/* Book Spine */}
      <div 
        className="relative w-12 h-60 rounded-l-md shadow-md transition-all duration-300"
        style={{ backgroundColor: color }}
      >
        {/* Book spine gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent rounded-l-md"></div>
        
        {/* Book title - rotated vertically */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 rotate-90 origin-top">
          <p className="text-white text-xs font-medium opacity-90 whitespace-nowrap">
            {truncatedTitle}
          </p>
        </div>

        {/* Hover effect */}
        {isHovered && (
          <div className="absolute inset-0 bg-white/10 rounded-l-md transition-opacity duration-300"></div>
        )}

        {/* Tooltip with full title */}
        {isHovered && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-amber-800 text-amber-50 px-3 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none z-20 shadow-lg">
            {fullTitle}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-amber-800"></div>
          </div>
        )}
      </div>

      {/* Book bottom shadow */}
      <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-t from-black/20 to-transparent rounded-b-md"></div>
    </button>
  );
};

export default BookSpine;
