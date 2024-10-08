import React, { useState, useEffect } from 'react';
import Darkmode from 'darkmode-js';

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const darkmode = new Darkmode();
    setDarkMode(darkmode.isActivated());
  }, []);

  const toggleDarkMode = () => {
    const darkmode = new Darkmode();
    darkmode.toggle();
    setDarkMode(darkmode.isActivated());
  };

  return (
    <div className={`darkmode ${darkMode ? 'dark-mode' : ''}`}>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}
      </button>
    </div>
  );
};

export default DarkMode;
