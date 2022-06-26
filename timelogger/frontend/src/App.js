import logo from './assets/logo.png';
import './App.css';
import icon from './assets/favicon.ico';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const favicon = document.getElementById('favicon');
    favicon.setAttribute('href', icon);
}, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to time logger.
        </p>
      </header>
    </div>
  );
}

export default App;
