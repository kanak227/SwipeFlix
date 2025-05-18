export interface Movie {
  id: number;
  title: string;
  poster: string;
  genres: string[];
  rating: number;
  year: number;
  runtime?: number;
  director?: string;
  description?: string;
}

export interface UserPreferences {
  likedMovies: Movie[];
  dislikedMovies: Movie[];
  genrePreferences: Record<string, number>;
}

export type SwipeDirection = 'left' | 'right' | 'up' | 'down';