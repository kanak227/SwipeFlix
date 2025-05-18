import { useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';

type Theme = 'light' | 'dark';

export default function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');
  const [mounted, setMounted] = useState(false);

  // This function will toggle the theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Set the class on the document element when theme changes
  useEffect(() => {
    if (!mounted) return;
    
    const root = window.document.documentElement;
    
    // Remove the previous theme class
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    // Add the current theme class
    root.classList.add(theme);
  }, [theme, mounted]);

  // Avoid hydration mismatch by only applying theme after component has mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  return { 
    theme, 
    toggleTheme,
    mounted
  };
}