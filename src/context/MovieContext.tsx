import { createContext, useContext, ReactNode, useState, useEffect, useMemo } from 'react';
import { Movie, UserPreferences, SwipeDirection } from '../types/Movie';
import { getRandomMovies, getAllGenres } from '../utils/movieData';
import useLocalStorage from '../hooks/useLocalStorage';

interface MovieContextProps {
  currentMovies: Movie[];
  likedMovies: Movie[];
  dislikedMovies: Movie[];
  genrePreferences: Record<string, number>;
  handleSwipe: (movie: Movie, direction: SwipeDirection) => void;
  refreshMovies: () => void;
  getTopGenres: (count?: number) => {genre: string, count: number}[];
  clearHistory: () => void;
}

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

interface MovieProviderProps {
  children: ReactNode;
}

export function MovieProvider({ children }: MovieProviderProps) {
  // Load preferences from localStorage or initialize with defaults
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>('movie-preferences', {
    likedMovies: [],
    dislikedMovies: [],
    genrePreferences: {}
  });

  // The current deck of movies to swipe through
  const [currentMovies, setCurrentMovies] = useState<Movie[]>([]);

  // Initialize genre preferences if they don't exist
  useEffect(() => {
    if (Object.keys(preferences.genrePreferences).length === 0) {
      const genres = getAllGenres();
      const initialGenrePreferences: Record<string, number> = {};
      
      genres.forEach(genre => {
        initialGenrePreferences[genre] = 0;
      });
      
      setPreferences(prev => ({
        ...prev,
        genrePreferences: initialGenrePreferences
      }));
    }
  }, []);

  // Load initial movies
  useEffect(() => {
    if (currentMovies.length === 0) {
      refreshMovies();
    }
  }, []);

  // Get random movies for the deck, considering preferences
  const refreshMovies = () => {
    const excludeIds = [
      ...preferences.likedMovies.map(m => m.id),
      ...preferences.dislikedMovies.map(m => m.id)
    ];

    // Get top genres with positive preferences
    const topGenres = Object.entries(preferences.genrePreferences)
      .filter(([_, score]) => score > 0)
      .sort(([_, a], [__, b]) => b - a)
      .slice(0, 3)
      .map(([genre]) => genre);

    // Get random movies, prioritizing preferred genres
    const newMovies = getRandomMovies(10, excludeIds, topGenres);
    setCurrentMovies(newMovies);
  };

  // Handle a swipe action
  const handleSwipe = (movie: Movie, direction: SwipeDirection) => {
    if (direction === 'right') {
      // Like movie
      const updatedLikedMovies = [...preferences.likedMovies, movie];
      
      // Update genre preferences
      const updatedGenrePreferences = { ...preferences.genrePreferences };
      movie.genres.forEach(genre => {
        updatedGenrePreferences[genre] = (updatedGenrePreferences[genre] || 0) + 1;
      });
      
      setPreferences(prev => ({
        ...prev,
        likedMovies: updatedLikedMovies,
        genrePreferences: updatedGenrePreferences
      }));
    } 
    else if (direction === 'left') {
      // Dislike movie
      const updatedDislikedMovies = [...preferences.dislikedMovies, movie];
      
      // Update genre preferences
      const updatedGenrePreferences = { ...preferences.genrePreferences };
      movie.genres.forEach(genre => {
        updatedGenrePreferences[genre] = (updatedGenrePreferences[genre] || 0) - 0.5;
      });
      
      setPreferences(prev => ({
        ...prev,
        dislikedMovies: updatedDislikedMovies,
        genrePreferences: updatedGenrePreferences
      }));
    }
    
    // Remove the swiped movie from current deck
    setCurrentMovies(prev => prev.filter(m => m.id !== movie.id));
    
    // If we're running low on movies, refresh the deck
    if (currentMovies.length <= 3) {
      refreshMovies();
    }
  };

  // Get top N genres by preference score
  const getTopGenres = (count: number = 5) => {
    return Object.entries(preferences.genrePreferences)
      .filter(([_, score]) => score > 0)
      .sort(([_, a], [__, b]) => b - a)
      .slice(0, count)
      .map(([genre, count]) => ({ genre, count }));
  };

  // Clear all user history and preferences
  const clearHistory = () => {
    const genres = getAllGenres();
    const initialGenrePreferences: Record<string, number> = {};
    
    genres.forEach(genre => {
      initialGenrePreferences[genre] = 0;
    });
    
    setPreferences({
      likedMovies: [],
      dislikedMovies: [],
      genrePreferences: initialGenrePreferences
    });
    
    refreshMovies();
  };

  const value = {
    currentMovies,
    likedMovies: preferences.likedMovies,
    dislikedMovies: preferences.dislikedMovies,
    genrePreferences: preferences.genrePreferences,
    handleSwipe,
    refreshMovies,
    getTopGenres,
    clearHistory
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}

export function useMovies() {
  const context = useContext(MovieContext);
  
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  
  return context;
}