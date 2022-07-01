import logo from './assets/logo.png';
import './App.css';
import icon from './assets/favicon.ico';
import { useEffect } from 'react';
import Addtime from './components/Addtime';
import Tables from './components/Tables';

function App() {
  useEffect(() => {
    const favicon = document.getElementById('favicon');
    favicon.setAttribute('href', icon);
}, []);

  return (
    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Enactus DCU Time Logger.
        </p>
      </header>
      <Addtime/>
      <Tables/>
    </div>
  );
}

export default App;
