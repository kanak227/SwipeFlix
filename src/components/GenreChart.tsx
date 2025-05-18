import { useEffect, useRef } from 'react';
import { 
  Chart as ChartJS, 
  ArcElement, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions 
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { useMovies } from '../context/MovieContext';
import useTheme from '../hooks/useTheme';

// Register Chart.js components
ChartJS.register(
  ArcElement, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface GenreChartProps {
  type: 'pie' | 'bar';
}

const GenreChart = ({ type }: GenreChartProps) => {
  const { getTopGenres } = useMovies();
  const { theme } = useTheme();
  
  // Get color scheme based on theme
  const getColors = (count: number) => {
    const baseColors = {
      light: [
        'rgba(139, 92, 246, 0.8)', // primary-500
        'rgba(20, 184, 166, 0.8)',  // accent-500
        'rgba(249, 115, 22, 0.8)',  // orange-500
        'rgba(236, 72, 153, 0.8)',  // pink-500
        'rgba(59, 130, 246, 0.8)',  // blue-500
        'rgba(34, 197, 94, 0.8)',   // green-500
        'rgba(168, 85, 247, 0.8)',  // purple-500
        'rgba(234, 179, 8, 0.8)',   // yellow-500
      ],
      dark: [
        'rgba(167, 139, 250, 0.8)', // primary-400
        'rgba(45, 212, 191, 0.8)',  // accent-400
        'rgba(251, 146, 60, 0.8)',  // orange-400
        'rgba(244, 114, 182, 0.8)', // pink-400
        'rgba(96, 165, 250, 0.8)',  // blue-400
        'rgba(74, 222, 128, 0.8)',  // green-400
        'rgba(192, 132, 252, 0.8)', // purple-400
        'rgba(250, 204, 21, 0.8)',  // yellow-400
      ]
    };
    
    const colors = baseColors[theme === 'dark' ? 'dark' : 'light'];
    return colors.slice(0, count);
  };
  
  // Get chart data from movie preferences
  const getChartData = (): ChartData<'pie' | 'bar'> => {
    const topGenres = getTopGenres(8);
    const colors = getColors(topGenres.length);
    
    return {
      labels: topGenres.map(g => g.genre),
      datasets: [
        {
          data: topGenres.map(g => g.count),
          backgroundColor: colors,
          borderColor: theme === 'dark' 
            ? 'rgba(30, 41, 59, 0.8)' // slate-800
            : 'rgba(255, 255, 255, 0.8)',
          borderWidth: 1,
        },
      ],
    };
  };
  
  // Chart options
  const getChartOptions = (): ChartOptions<'pie' | 'bar'> => {
    const textColor = theme === 'dark' ? '#f1f5f9' : '#334155'; // slate-100 : slate-700
    
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom' as const,
          labels: {
            color: textColor,
            font: {
              family: 'Inter, sans-serif',
            },
          },
        },
        title: {
          display: true,
          text: 'Your Genre Preferences',
          color: textColor,
          font: {
            family: 'Inter, sans-serif',
            size: 16,
            weight: 'bold',
          },
        },
        tooltip: {
          backgroundColor: theme === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          titleColor: theme === 'dark' ? '#f1f5f9' : '#334155',
          bodyColor: theme === 'dark' ? '#f1f5f9' : '#334155',
          borderColor: theme === 'dark' ? 'rgba(51, 65, 85, 0.5)' : 'rgba(203, 213, 225, 0.5)',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: 'Inter, sans-serif',
            weight: 'bold',
          },
          bodyFont: {
            family: 'Inter, sans-serif',
          },
          callbacks: {
            label: function(context: any) {
              return `${context.label}: ${context.raw} likes`;
            }
          }
        }
      },
    };
    
    if (type === 'bar') {
      return {
        ...baseOptions,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: textColor,
              font: {
                family: 'Inter, sans-serif',
              }
            },
            grid: {
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            }
          },
          x: {
            ticks: {
              color: textColor,
              font: {
                family: 'Inter, sans-serif',
              }
            },
            grid: {
              display: false
            }
          }
        }
      };
    }
    
    return baseOptions;
  };
  
  // Get top genres
  const topGenres = getTopGenres(8);
  const hasData = topGenres.length > 0;
  
  if (!hasData) {
    return (
      <div className="glass-card h-64 flex items-center justify-center">
        <div className="text-center p-4">
          <h3 className="text-lg font-semibold mb-2">No Genre Data Yet</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Swipe right on some movies to see your genre preferences
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="glass-card p-4">
      <div className="h-64">
        {type === 'pie' ? (
          <Pie data={getChartData()} options={getChartOptions()} />
        ) : (
          <Bar data={getChartData()} options={getChartOptions()} />
        )}
      </div>
    </div>
  );
};

export default GenreChart;