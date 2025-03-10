import TodoList from "./TodoList";
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : true;
  });
  
 
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [darkMode]);
  
 
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>React TODO App</h1>
        <button 
          className="theme-toggle" 
          onClick={handleToggleDarkMode}
        >
          {darkMode ? 'Light' : 'Dark'}
        </button>
      </div>
      <TodoList darkMode={darkMode} />
    </div>
  );
}

export default App;

