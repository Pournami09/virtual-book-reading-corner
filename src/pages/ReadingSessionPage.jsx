import { useState, useEffect, useRef } from 'react';
import { X, Volume2, VolumeX, RotateCcw, Clock, Music } from 'lucide-react';
import RecordPlayer from '../components/RecordPlayer';

const ReadingSessionPage = ({ book, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [customTime, setCustomTime] = useState(30);
  
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  // Ambient music tracks
  const ambientTracks = [
    {
      id: 1,
      title: "Forest Rain",
      url: "https://www.soundjay.com/misc/sounds/rain-01.wav"
    },
    {
      id: 2,
      title: "Ocean Waves",
      url: "https://www.soundjay.com/misc/sounds/ocean-01.wav"
    },
    {
      id: 3,
      title: "Cafe Ambience",
      url: "https://www.soundjay.com/misc/sounds/cafe-01.wav"
    }
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
      onBack();
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
    <div className="min-h-screen">
      {/* Simple Header */}
      <div className="py-4 px-6">
        <div className="flex items-center justify-between">
          <h1 className="font-handwriting text-slate-800 text-xl">
            Reading Session
          </h1>
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors duration-200"
            aria-label="End reading session"
          >
            <X className="w-4 h-4" />
            End Reading Session
          </button>
        </div>
      </div>

      {/* Reading Session Content - Optimized for viewport */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
          {/* Book Cover - Compact */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative mb-4">
              {book.thumbnail ? (
                <img
                  src={book.thumbnail}
                  alt={`Cover of ${book.title}`}
                  className="w-48 h-64 object-cover rounded-lg shadow-xl"
                />
              ) : (
                <div className="w-48 h-64 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center shadow-xl">
                  <span className="text-slate-600 text-4xl">📚</span>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-slate-800 mb-1">
                {book.title}
              </h3>
              <p className="text-slate-600 text-sm">
                by {book.authors?.join(', ') || 'Unknown Author'}
              </p>
            </div>
          </div>

          {/* Music Player - Compact */}
          <div className="flex flex-col justify-center">
            {/* Record Player */}
            <div className="bg-slate-50/95 backdrop-blur-sm rounded-xl shadow-2xl p-4 border border-slate-600/30">
              <h3 className="text-base font-semibold text-slate-800 mb-3 text-center">
                Ambient Music
              </h3>
              
              {/* Interactive Record Player - Smaller */}
              <div className="flex justify-center mb-4">
                <div className="scale-75">
                  <RecordPlayer 
                    isPlaying={isPlaying}
                    onToggle={handleRecordPlayerToggle}
                  />
                </div>
              </div>
              
              {/* Volume Controls */}
              <div className="flex items-center gap-2 mb-3">
                <Volume2 className="w-4 h-4 text-slate-600" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  aria-label="Volume control"
                />
                <button
                  onClick={handleMuteToggle}
                  className="p-1 rounded hover:bg-slate-100"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-slate-600" /> : <Volume2 className="w-4 h-4 text-slate-600" />}
                </button>
              </div>

              {/* Track Selection */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-slate-700 mb-2">
                  Select Track:
                </label>
                <div className="space-y-1">
                  {ambientTracks.map((track, index) => (
                    <button
                      key={track.id}
                      onClick={() => setCurrentTrack(index)}
                      className={`w-full text-left px-2 py-1 rounded border transition-colors text-xs ${
                        currentTrack === index
                          ? 'bg-slate-600 text-white border-slate-600'
                          : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <Music className="w-3 h-3" />
                        {track.title}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Music Status */}
              <div className="text-center text-xs text-slate-600">
                {isPlaying ? `Now Playing: ${ambientTracks[currentTrack].title}` : 'Click the tonearm to start music'}
              </div>

              {/* Hidden audio element */}
              <audio
                ref={audioRef}
                src={ambientTracks[currentTrack].url}
                loop
                preload="none"
              />
            </div>
          </div>

          {/* Reading Timer - Compact */}
          <div className="flex flex-col justify-center">
            <div className="bg-slate-50/95 backdrop-blur-sm rounded-xl shadow-2xl p-4 border border-slate-600/30">
              <h3 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Reading Timer
              </h3>
              
              <div className="text-center mb-4">
                <div className="text-3xl font-mono font-bold text-slate-600 mb-2">
                  {formatTime(timeRemaining)}
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-slate-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${((customTime * 60 - timeRemaining) / (customTime * 60)) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={handleTimerToggle}
                  className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors text-sm ${
                    isTimerActive
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-slate-600 hover:bg-slate-700 text-white'
                  }`}
                >
                  {isTimerActive ? 'Pause' : 'Start'}
                </button>
                
                <button
                  onClick={handleResetTimer}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                  aria-label="Reset timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="custom-time" className="text-slate-700 text-xs">
                  Duration (min):
                </label>
                <input
                  id="custom-time"
                  type="number"
                  min="1"
                  max="120"
                  value={customTime}
                  onChange={handleCustomTimeChange}
                  className="w-16 px-2 py-1 border border-slate-300 rounded text-center text-xs"
                  disabled={isTimerActive}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingSessionPage;
