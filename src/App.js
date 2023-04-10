import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import HomePage from './layouts/HomePage'
import Login from './components/login';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <HomePage/> } />
          <Route exact path="/user/login" element={ <Login/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
