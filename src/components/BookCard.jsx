import { useState } from 'react';
import { BookOpen, Star, Clock, Heart, Play } from 'lucide-react';

const BookCard = ({ book }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // Here you would integrate with your audio player
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="group relative bg-amber-50/10 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-amber-600/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-amber-500/20 hover:shadow-2xl hover:-translate-y-1">
      {/* Book Cover */}
      <div className="relative mb-4">
        <div className="w-full h-48 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg shadow-lg overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-amber-500/80 to-amber-700/80 flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-amber-100" />
          </div>
        </div>
        
        {/* Play Button Overlay */}
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
        >
          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg hover:bg-amber-400 transition-colors">
            <Play className="w-6 h-6 text-white ml-1" />
          </div>
        </button>

        {/* Like Button */}
        <button
          onClick={handleLike}
          className="absolute top-2 right-2 p-2 bg-black/30 rounded-full backdrop-blur-sm hover:bg-black/50 transition-colors"
        >
          <Heart 
            className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-white'}`} 
          />
        </button>
      </div>

      {/* Book Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-amber-100 text-lg line-clamp-2 group-hover:text-amber-50 transition-colors">
          {book.title}
        </h3>
        
        <p className="text-amber-300 text-sm line-clamp-2">
          by {book.author}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < book.rating ? 'text-amber-400 fill-current' : 'text-amber-600'
                }`}
              />
            ))}
          </div>
          <span className="text-amber-400 text-sm ml-1">
            {book.rating}.0
          </span>
        </div>

        {/* Duration */}
        <div className="flex items-center text-amber-400 text-sm">
          <Clock className="w-4 h-4 mr-1" />
          <span>{book.duration}</span>
        </div>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {book.genres.slice(0, 2).map((genre, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-amber-800/30 text-amber-200 text-xs rounded-full border border-amber-600/30"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      {/* Progress Bar (if book is in progress) */}
      {book.progress > 0 && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-amber-400 mb-1">
            <span>Progress</span>
            <span>{book.progress}%</span>
          </div>
          <div className="w-full bg-amber-800/30 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-amber-500 to-amber-400 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${book.progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCard;

