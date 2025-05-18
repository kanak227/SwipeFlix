import { useState } from 'react';
import { useMovies } from '../context/MovieContext';
import { Info, X, Star } from 'lucide-react';
import { Movie } from '../types/Movie';
import { AnimatePresence, motion } from 'framer-motion';

const MovieGrid = () => {
  const { likedMovies } = useMovies();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  // If no liked movies yet
  if (likedMovies.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <h3 className="text-xl font-medium mb-2">No liked movies yet</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Start swiping to build your collection!
        </p>
      </div>
    );
  }
  
  // Create stars array based on movie rating (0-5 scale)
  const getStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      const filled = i < Math.floor(rating);
      const halfFilled = !filled && i < Math.floor(rating + 0.5);
      return { filled, halfFilled };
    });
  };
  
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {likedMovies.map((movie) => (
          <motion.div
            key={movie.id}
            className="glass-card overflow-hidden relative group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <div
              className="aspect-[2/3] bg-cover bg-center"
              style={{ backgroundImage: `url(${movie.poster})` }}
            />
            
            <div className="p-3">
              <h3 className="font-medium text-sm truncate">{movie.title}</h3>
              <div className="flex items-center justify-between mt-1">
                <div className="text-xs text-gray-600 dark:text-gray-400">{movie.year}</div>
                <div className="flex">
                  {getStars(movie.rating).map((star, index) => (
                    <Star
                      key={index}
                      size={12}
                      className={star.filled ? 'text-yellow-400 fill-yellow-400' : star.halfFilled ? 'text-yellow-400 fill-yellow-400 [clip-path:inset(0_50%_0_0)]' : 'text-gray-400'}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <button
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setSelectedMovie(movie)}
              aria-label="Movie details"
            >
              <Info size={16} />
            </button>
          </motion.div>
        ))}
      </div>
      
      {/* Movie detail modal */}
      <AnimatePresence>
        {selectedMovie && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-card w-full max-w-lg max-h-[90vh] overflow-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="relative">
                <div 
                  className="h-56 sm:h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedMovie.poster})` }} 
                />
                <button
                  className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
                  onClick={() => setSelectedMovie(null)}
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h2 className="text-2xl font-bold">{selectedMovie.title}</h2>
                  <div className="flex-shrink-0 flex">
                    {getStars(selectedMovie.rating).map((star, index) => (
                      <Star
                        key={index}
                        size={16}
                        className={star.filled ? 'text-yellow-400 fill-yellow-400' : star.halfFilled ? 'text-yellow-400 fill-yellow-400 [clip-path:inset(0_50%_0_0)]' : 'text-gray-400'}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedMovie.genres.map((genre, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-200 text-xs rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="font-medium">Year</p>
                    <p className="text-gray-600 dark:text-gray-400">{selectedMovie.year}</p>
                  </div>
                  {selectedMovie.runtime && (
                    <div>
                      <p className="font-medium">Runtime</p>
                      <p className="text-gray-600 dark:text-gray-400">{selectedMovie.runtime} mins</p>
                    </div>
                  )}
                  {selectedMovie.director && (
                    <div>
                      <p className="font-medium">Director</p>
                      <p className="text-gray-600 dark:text-gray-400">{selectedMovie.director}</p>
                    </div>
                  )}
                </div>
                
                {selectedMovie.description && (
                  <div className="mb-4">
                    <p className="font-medium mb-1">Synopsis</p>
                    <p className="text-gray-600 dark:text-gray-400">{selectedMovie.description}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MovieGrid;