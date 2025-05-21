import React from 'react';
import { Download, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="w-full py-4 px-6 md:px-8 shadow-sm transition-colors duration-200 dark:bg-gray-800 bg-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Download className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-semibold dark:text-white">BEHZAD's Downloading</span>
        </div>
        
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;