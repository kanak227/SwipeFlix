import { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Film, BarChart2, Sun, Moon } from 'lucide-react';
import useTheme from '../hooks/useTheme';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { theme, toggleTheme, mounted } = useTheme();
  const location = useLocation();
  
  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-primary-500">Loading...</div>
    </div>;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="glass-card fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300 ease-in-out backdrop-blur-lg bg-white/80 dark:bg-gray-900/80">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Film className="w-6 h-6 text-primary-500" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-500 to-accent-400 bg-clip-text text-transparent">
              MovieMatch
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content with padding for header and nav */}
      <main className="flex-1 container mx-auto px-4 pt-20 pb-24">
        {children}
      </main>
      
      {/* Bottom navigation */}
      <nav className="glass-card fixed bottom-0 left-0 right-0 z-50 py-2 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80">
        <div className="container mx-auto flex justify-around">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
              }`
            }
          >
            <Film className="w-6 h-6" />
            <span className="text-xs mt-1">Swipe</span>
          </NavLink>
          
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
              }`
            }
          >
            <BarChart2 className="w-6 h-6" />
            <span className="text-xs mt-1">Dashboard</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Layout;