import { useState, useEffect, useRef } from 'react';
import { X, Volume2, VolumeX, RotateCcw, Clock } from 'lucide-react';
import RecordPlayer from './RecordPlayer';

const ReadingMode = ({ book, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [customTime, setCustomTime] = useState(30);
  
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  // Ambient music tracks (placeholder URLs - in production, use actual royalty-free tracks)
  const ambientTracks = [
    'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder
    'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder
    'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder
  ];

  const [currentTrack, setCurrentTrack] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (isTimerActive && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsTimerActive(false);
            setIsPlaying(false);
            if (audioRef.current) {
              audioRef.current.pause();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isTimerActive, timeRemaining]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRecordPlayerToggle = () => {
    handlePlayPause();
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVolume;
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = !isMuted ? 0 : volume;
    }
  };

  const handleTimerToggle = () => {
    setIsTimerActive(!isTimerActive);
  };

  const handleResetTimer = () => {
    setTimeRemaining(customTime * 60);
    setIsTimerActive(false);
  };

  const handleCustomTimeChange = (e) => {
    const minutes = parseInt(e.target.value);
    setCustomTime(minutes);
    if (!isTimerActive) {
      setTimeRemaining(minutes * 60);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === ' ') {
      e.preventDefault();
      handleRecordPlayerToggle();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reading-mode-title"
    >
      <div className="bg-amber-50/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-amber-200">
          <h2 id="reading-mode-title" className="text-2xl font-handwriting text-amber-800">
            Reading Session
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-amber-100 transition-colors"
            aria-label="Close reading mode"
          >
            <X className="w-6 h-6 text-amber-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Book Cover */}
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                {book.thumbnail ? (
                  <img
                    src={book.thumbnail}
                    alt={`Cover of ${book.title}`}
                    className="w-64 h-80 object-cover rounded-lg shadow-xl"
                  />
                ) : (
                  <div className="w-64 h-80 bg-gradient-to-br from-amber-200 to-amber-300 rounded-lg flex items-center justify-center shadow-xl">
                    <span className="text-amber-600 text-6xl">📚</span>
                  </div>
                )}
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold text-amber-800 mb-2">
                  {book.title}
                </h3>
                <p className="text-amber-600 mb-4">
                  by {book.authors?.join(', ') || 'Unknown Author'}
                </p>
                {book.description && (
                  <p className="text-amber-700 text-sm line-clamp-4 max-w-sm">
                    {book.description}
                  </p>
                )}
              </div>
            </div>

            {/* Music Player and Timer */}
            <div className="space-y-6">
              {/* Record Player */}
              <div className="card">
                <h3 className="text-lg font-semibold text-amber-800 mb-4 text-center">
                  Ambient Music
                </h3>
                
                {/* Interactive Record Player */}
                <div className="flex justify-center mb-6">
                  <RecordPlayer 
                    isPlaying={isPlaying}
                    onToggle={handleRecordPlayerToggle}
                  />
                </div>
                
                {/* Volume Controls */}
                <div className="flex items-center gap-2 mb-4">
                  <Volume2 className="w-4 h-4 text-amber-600" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                    aria-label="Volume control"
                  />
                  <button
                    onClick={handleMuteToggle}
                    className="p-1 rounded hover:bg-amber-100"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-amber-600" /> : <Volume2 className="w-4 h-4 text-amber-600" />}
                  </button>
                </div>

                {/* Music Status */}
                <div className="text-center text-sm text-amber-600">
                  {isPlaying ? 'Now Playing: Ambient Reading Music' : 'Click the tonearm to start music'}
                </div>

                {/* Hidden audio element */}
                <audio
                  ref={audioRef}
                  src={ambientTracks[currentTrack]}
                  loop
                  preload="none"
                />
              </div>

              {/* Reading Timer */}
              <div className="card">
                <h3 className="text-lg font-semibold text-amber-800 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Reading Timer
                </h3>
                
                <div className="text-center mb-4">
                  <div className="text-4xl font-mono font-bold text-amber-600 mb-2">
                    {formatTime(timeRemaining)}
                  </div>
                  <div className="w-full bg-amber-200 rounded-full h-2">
                    <div
                      className="bg-amber-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${((customTime * 60 - timeRemaining) / (customTime * 60)) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={handleTimerToggle}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      isTimerActive
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-amber-600 hover:bg-amber-700 text-white'
                    }`}
                  >
                    {isTimerActive ? 'Pause Timer' : 'Start Timer'}
                  </button>
                  
                  <button
                    onClick={handleResetTimer}
                    className="p-2 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-600 transition-colors"
                    aria-label="Reset timer"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor="custom-time" className="text-amber-700 text-sm">
                    Duration (minutes):
                  </label>
                  <input
                    id="custom-time"
                    type="number"
                    min="1"
                    max="120"
                    value={customTime}
                    onChange={handleCustomTimeChange}
                    className="w-20 px-2 py-1 border border-amber-300 rounded text-center"
                    disabled={isTimerActive}
                  />
                </div>
              </div>

              {/* Reading Tips */}
              <div className="card">
                <h3 className="text-lg font-semibold text-amber-800 mb-3">
                  Reading Tips
                </h3>
                <ul className="text-sm text-amber-700 space-y-2">
                  <li>• Find a comfortable, well-lit spot</li>
                  <li>• Minimize distractions and notifications</li>
                  <li>• Take breaks every 25-30 minutes</li>
                  <li>• Click the tonearm to start ambient music</li>
                  <li>• Use the timer to track your reading sessions</li>
                  <li>• Press spacebar to play/pause music quickly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingMode;
