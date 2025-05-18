import { useRef, useState, useEffect } from 'react';
import SwipeCard from './SwipeCard';
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import { Movie, SwipeDirection } from '../types/Movie';
import { useMovies } from '../context/MovieContext';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const SwipeDeck = () => {
  const { currentMovies, handleSwipe, refreshMovies, clearHistory } = useMovies();
  const [showMatch, setShowMatch] = useState(false);
  // Track swipe progress for glow effect
  const [swipeProgress, setSwipeProgress] = useState(0);

  // Handler for swipe actions
  const onSwipe = (movie: Movie, direction: SwipeDirection) => {
    setSwipeProgress(0);
    handleSwipe(movie, direction);
  };

  // Button controls for swiping
  const handleButtonSwipe = (direction: SwipeDirection) => {
    if (currentMovies.length > 0) {
      onSwipe(currentMovies[0], direction);
    }
  };

  // Handle refresh button
  const handleRefresh = () => {
    clearHistory();
  };

  // Show match overlay and trigger confetti
  useEffect(() => {
    if (currentMovies.length === 5) {
      setShowMatch(true);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
      setTimeout(() => setShowMatch(false), 3000);
    }
    // confetti is a stable import, so it's fine to omit from deps
    // eslint-disable-next-line
  }, [currentMovies.length]);

  // Render swipe buttons on left/right of card
  const renderSideButtons = () => (
    <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
      <button
        onClick={() => handleButtonSwipe('left')}
        className="p-4 text-white transition-colors rounded-full shadow-lg pointer-events-auto bg-red-500/80 hover:bg-red-600/90"
        aria-label="Dislike"
        style={{ marginLeft: '-4.5rem' }} // increased from -2.5rem to -4.5rem
      >
        <ArrowLeft size={28} />
      </button>
      <button
        onClick={() => handleButtonSwipe('right')}
        className="p-4 text-white transition-colors rounded-full shadow-lg pointer-events-auto bg-green-500/80 hover:bg-green-600/90"
        aria-label="Like"
        style={{ marginRight: '-4.5rem' }} // increased from -2.5rem to -4.5rem
      >
        <ArrowRight size={28} />
      </button>
    </div>
  );

  return (
    <div className="relative flex flex-col items-center justify-center pt-4">
      <h2 className="mb-6 text-2xl font-bold text-center">
        Find Your Next Favorite Movie
      </h2>
      <div className="relative flex items-center justify-center swipe-card-container">
        {/* Glowy swipe background effect */}
        <AnimatePresence>
          {swipeProgress !== 0 && (
            <motion.div
              key="swipe-glow"
              initial={{ opacity: 0 }}
              animate={{ opacity: Math.min(Math.abs(swipeProgress) / 100, 0.7) }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: swipeProgress > 0
                  ? 'radial-gradient(circle at 80% 50%, rgba(34,197,94,0.4), transparent 70%)'
                  : 'radial-gradient(circle at 20% 50%, rgba(239,68,68,0.4), transparent 70%)',
                filter: 'blur(32px)',
                transition: 'background 0.2s'
              }}
            />
          )}
        </AnimatePresence>
        {/* Side swipe buttons */}
        {currentMovies.length > 0 && renderSideButtons()}
        {/* Cards */}
        {currentMovies.length > 0 ? (
          currentMovies.slice(0, 3).map((movie, index) => (
            <SwipeCard
              key={movie.id}
              movie={movie}
              onSwipe={(direction) => onSwipe(movie, direction)}
              isTop={index === 0}
              setSwipeProgress={index === 0 ? setSwipeProgress : undefined}
            />
          ))
        ) : (
          <div className="glass-card flex items-center justify-center h-full min-h-[400px] min-w-[300px]">
            <div className="p-8 text-center">
              <RefreshCw className="w-12 h-12 mx-auto mb-4 text-gray-400 animate-spin" />
              <h3 className="mb-2 text-xl font-medium">No more movies!</h3>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                You've gone through all our recommendations.
              </p>
              <button 
                onClick={handleRefresh}
                className="button-primary"
              >
                Reset & Start Over
              </button>
            </div>
          </div>
        )}
        {/* Match overlay */}
        <AnimatePresence>
          {showMatch && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <div className="p-8 text-center bg-white shadow-2xl dark:bg-gray-800 rounded-2xl">
                <h3 className="mb-2 text-3xl font-bold">It's a Match! 🎉</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You're on a roll! Keep swiping to discover more movies.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Queue info */}
      <AnimatePresence>
        {currentMovies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400"
          >
            <p>Swipe right to like, left to dislike</p>
            <p className="mt-1">
              {currentMovies.length > 1 
                ? `${currentMovies.length} movies in queue` 
                : "Last movie in queue"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SwipeDeck;