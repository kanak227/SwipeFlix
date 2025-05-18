import { Movie } from '../types/Movie';

// Sample movie data with high-quality posters
export const movies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    poster: "https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    genres: ["Sci-Fi", "Action", "Thriller"],
    rating: 4.8,
    year: 2010,
    runtime: 148,
    director: "Christopher Nolan",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    poster: "https://images.pexels.com/photos/2831794/pexels-photo-2831794.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    genres: ["Drama", "Crime"],
    rating: 4.9,
    year: 1994,
    runtime: 142,
    director: "Frank Darabont",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster: "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    genres: ["Action", "Crime", "Drama"],
    rating: 4.7,
    year: 2008,
    runtime: 152,
    director: "Christopher Nolan",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
  },
  {
    id: 4,
    title: "Pulp Fiction",
    poster: "https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    genres: ["Crime", "Drama"],
    rating: 4.6,
    year: 1994,
    runtime: 154,
    director: "Quentin Tarantino",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
  },
  {
    id: 5,
    title: "Forrest Gump",
    poster: "https://images.pexels.com/photos/1251832/pexels-photo-1251832.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    genres: ["Drama", "Romance"],
    rating: 4.5,
    year: 1994,
    runtime: 142,
    director: "Robert Zemeckis",
    description: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart."
  },
  {
    id: 6,
    title: "The Matrix",
    poster: "https://images.pexels.com/photos/2157253/pexels-photo-2157253.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    genres: ["Action", "Sci-Fi"],
    rating: 4.4,
    year: 1999,
    runtime: 136,
    director: "Lana Wachowski, Lilly Wachowski",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
  },
  {
    id: 7,
    title: "Jurassic Park",
    poster: "https://images.pexels.com/photos/1477166/pexels-photo-1477166.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    genres: ["Adventure", "Sci-Fi", "Thriller"],
    rating: 4.3,
    year: 1993,
    runtime: 127,
    director: "Steven Spielberg",
    description: "A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose."
  },
  {
    id: 8,
    title: "The Godfather",
    poster: "https://images.pexels.com/photos/5137664/pexels-photo-5137664.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    genres: ["Crime", "Drama"],
    rating: 4.9,
    year: 1972,
    runtime: 175,
    director: "Francis Ford Coppola",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
  },
  {
    id: 9,
    title: "Fight Club",
    poster: "https://images.pexels.com/photos/675764/pexels-photo-675764.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    genres: ["Drama", "Thriller"],
    rating: 4.5,
    year: 1999,
    runtime: 139,
    director: "David Fincher",
    description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more."
  },
  {
    id: 10,
    title: "The Silence of the Lambs",
    poster: "https://images.pexels.com/photos/6011918/pexels-photo-6011918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    genres: ["Crime", "Drama", "Thriller"],
    rating: 4.6,
    year: 1991,
    runtime: 118,
    director: "Jonathan Demme",
    description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims."
  },
  {
    id: 11,
    title: "Eternal Sunshine of the Spotless Mind",
    poster: "https://images.pexels.com/photos/2114014/pexels-photo-2114014.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    genres: ["Drama", "Romance", "Sci-Fi"],
    rating: 4.4,
    year: 2004,
    runtime: 108,
    director: "Michel Gondry",
    description: "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories."
  },
  {
    id: 12,
    title: "The Grand Budapest Hotel",
    poster: "https://images.pexels.com/photos/6784855/pexels-photo-6784855.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    genres: ["Adventure", "Comedy", "Crime"],
    rating: 4.3,
    year: 2014,
    runtime: 99,
    director: "Wes Anderson",
    description: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge."
  },
  {
    id: 13,
    title: "Blade Runner 2049",
    poster: "https://images.pexels.com/photos/6753525/pexels-photo-6753525.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    genres: ["Action", "Drama", "Sci-Fi"],
    rating: 4.5,
    year: 2017,
    runtime: 164,
    director: "Denis Villeneuve",
    description: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years."
  },
  {
    id: 14,
    title: "La La Land",
    poster: "https://images.pexels.com/photos/3737836/pexels-photo-3737836.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    genres: ["Comedy", "Drama", "Music"],
    rating: 4.2,
    year: 2016,
    runtime: 128,
    director: "Damien Chazelle",
    description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future."
  },
  {
    id: 15,
    title: "Interstellar",
    poster: "https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    genres: ["Adventure", "Drama", "Sci-Fi"],
    rating: 4.7,
    year: 2014,
    runtime: 169,
    director: "Christopher Nolan",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
  }
];

// Get all unique genres from the movie data
export const getAllGenres = (): string[] => {
  const genreSet = new Set<string>();
  
  movies.forEach(movie => {
    movie.genres.forEach(genre => {
      genreSet.add(genre);
    });
  });
  
  return Array.from(genreSet);
};

// Get random movies with optional filter
export const getRandomMovies = (
  count: number, 
  excludeIds: number[] = [], 
  preferredGenres: string[] = []
): Movie[] => {
  // Filter out movies that have been seen already
  const availableMovies = movies.filter(movie => !excludeIds.includes(movie.id));
  
  if (availableMovies.length === 0) return [];
  
  // If we have preferred genres, prioritize movies with those genres
  if (preferredGenres.length > 0) {
    // Sort by how many preferred genres the movie has
    availableMovies.sort((a, b) => {
      const aMatches = a.genres.filter(genre => preferredGenres.includes(genre)).length;
      const bMatches = b.genres.filter(genre => preferredGenres.includes(genre)).length;
      return bMatches - aMatches;
    });
    
    // Take top 70% of movies that match preferences, then randomize the results
    const preferenceCount = Math.max(Math.ceil(count * 0.7), 1);
    const preferredMovies = availableMovies.slice(0, preferenceCount);
    
    // Take remaining count randomly from the rest
    const remainingCount = count - preferredMovies.length;
    const remainingMovies = availableMovies
      .slice(preferredMovies.length)
      .sort(() => Math.random() - 0.5)
      .slice(0, remainingCount);
    
    return [...preferredMovies, ...remainingMovies]
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  }
  
  // If no preferred genres, just return random movies
  return [...availableMovies]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
};