import { useState } from 'react';
import GenreChart from '../components/GenreChart';
import MovieGrid from '../components/MovieGrid';
import { useMovies } from '../context/MovieContext';
import { BarChartIcon as ChartBarIcon, PieChartIcon, RefreshCw } from 'lucide-react';

const DashboardPage = () => {
  const { likedMovies, clearHistory } = useMovies();
  const [chartType, setChartType] = useState<'pie' | 'bar'>('bar');
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  return (
    <div className="py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Your Movie Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {likedMovies.length > 0 
              ? `You've liked ${likedMovies.length} movies so far` 
              : "Start swiping to build your dashboard"}
          </p>
        </div>
        
        {likedMovies.length > 0 && (
          <div className="flex gap-2">
            <div className="flex p-1 glass-card rounded-full">
              <button 
                onClick={() => setChartType('bar')}
                className={`p-2 rounded-full transition-colors ${
                  chartType === 'bar' 
                    ? 'bg-primary-100 dark:bg-primary-900/60 text-primary-800 dark:text-primary-200' 
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
                aria-label="Bar chart"
              >
                <ChartBarIcon size={20} />
              </button>
              <button 
                onClick={() => setChartType('pie')}
                className={`p-2 rounded-full transition-colors ${
                  chartType === 'pie' 
                    ? 'bg-primary-100 dark:bg-primary-900/60 text-primary-800 dark:text-primary-200' 
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
                aria-label="Pie chart"
              >
                <PieChartIcon size={20} />
              </button>
            </div>
            
            <button 
              onClick={() => setShowConfirmation(true)}
              className="button-secondary flex items-center gap-1"
              aria-label="Reset preferences"
            >
              <RefreshCw size={16} />
              <span>Reset</span>
            </button>
          </div>
        )}
      </div>
      
      {likedMovies.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Genre Analysis</h2>
            <GenreChart type={chartType} />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Movies</h2>
            <div className="glass-card p-4 rounded-xl">
              <div className="mb-4">
                <div className="text-3xl font-bold">{likedMovies.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total liked movies</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="glass-card p-3">
                  <div className="text-xl font-semibold">
                    {Array.from(new Set(likedMovies.flatMap(m => m.genres))).length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Genres</div>
                </div>
                
                <div className="glass-card p-3">
                  <div className="text-xl font-semibold">
                    {Math.round(likedMovies.reduce((acc, m) => acc + m.rating, 0) / likedMovies.length * 10) / 10}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Avg Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Liked Movies</h2>
        <MovieGrid />
      </div>
      
      {/* Confirmation modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="glass-card max-w-md p-6">
            <h2 className="text-xl font-bold mb-2">Reset Preferences?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This will clear all your liked movies and preferences. This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowConfirmation(false)}
                className="button-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  clearHistory();
                  setShowConfirmation(false);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full shadow-md transition-all duration-200"
              >
                Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;