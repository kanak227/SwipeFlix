import { useEffect } from 'react';
import SwipeDeck from '../components/SwipeDeck';
import { useMovies } from '../context/MovieContext';

const SwipePage = () => {
  const { likedMovies } = useMovies();
  
  // Track if the user has reached a match (liked 5+ of the same genre)
  useEffect(() => {
    // We'll implement confetti effect when a user reaches 5 likes
    if (likedMovies.length === 5) {
      import('canvas-confetti')
        .then(confetti => {
          confetti.default({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
          });
        })
        .catch(err => console.error('Could not load confetti:', err));
    }
  }, [likedMovies.length]);
  
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center py-8">
      <SwipeDeck />
    </div>
  );
};

export default SwipePage;