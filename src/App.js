import React, { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const getMockMessage = async () => {
      const response = await fetch('/mock')
      const responseJson = await response.json()
      setMsg(responseJson.message);
    }

    getMockMessage()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {msg}
        </a>
      </header>
    </div>
  );
}

export default App;
