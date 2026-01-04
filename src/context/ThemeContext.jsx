import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({ isDark: true, toggleTheme: () => {} });

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) {
      const dark = saved === 'dark';
      setIsDark(dark);
      updateDocumentClass(dark);
    }
  }, []);

  const updateDocumentClass = (dark) => {
    if (dark) {
      document.documentElement.classList.remove('light-mode');
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('light-mode');
    }
  };

  useEffect(() => {
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    updateDocumentClass(isDark);
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context || { isDark: true, toggleTheme: () => {} };
};

export default ThemeContext;
