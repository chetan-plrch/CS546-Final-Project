import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import HomePage from './layouts/HomePage'
import './App.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <HomePage/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
