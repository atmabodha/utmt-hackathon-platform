import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa'; // Import icons from react-icons
import '../../index.css';
const ThemeButton = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Load the saved theme from local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkTheme(savedTheme === 'dark');
      setCSSVariables(savedTheme);
    }
  }, []);

  const setCSSVariables = (theme) => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.style.setProperty('--background-color', '#0D1117');
      root.style.setProperty('--text-color', '#e0e0e0');
      root.style.setProperty('--primary-color', '#1E90FF');
      root.style.setProperty('--secondary-color', '#2D333B');
      root.style.setProperty('--border-color', '#58A6FF');
    } else {
      root.style.setProperty('--background-color', '#FFFFFF');
      root.style.setProperty('--text-color', '#000000');
      root.style.setProperty('--primary-color', '#007ACC');
      root.style.setProperty('--secondary-color', '#D1D5DA');
      root.style.setProperty('--border-color', '#1F6FEB');
    }
  };

  const toggleTheme = () => {
    const newTheme = isDarkTheme ? 'light' : 'dark';
    setIsDarkTheme(!isDarkTheme);
    setCSSVariables(newTheme);
    localStorage.setItem('theme', newTheme); // Save the theme to local storage
  };

  return (
    <div>
      <button 
        onClick={toggleTheme}
        aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
        style={{ background: 'transparent', border: 'none', cursor: 'pointer', paddingTop: "5px", paddingLeft: "0px", color: "var(--text-color)"}}
      >Theme &nbsp;
        {isDarkTheme 
          ? <FaSun size={20} style={{ color: '#D3D3D3' }} /> // Light gray for dark mode
          : <FaMoon size={20} style={{ color: '#000000' }} /> // Black for light mode
        }
        
      </button>
    </div>
  );
};

export default ThemeButton;
