import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [serverMessage, setServerMessage] = useState('Wait...');

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL || '')
      .then(res => setServerMessage(res.data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          Server message: {serverMessage}
        </div>
      </header>
    </div>
  );
}

export default App;
