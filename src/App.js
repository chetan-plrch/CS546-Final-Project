import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import HomePage from './layouts/HomePage'
import Login from './components/login';
import Profile from './components/profile'
import Connections from './components/connections';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <HomePage /> } />
          <Route exact path="/user/login" element={ <Login /> } />
          <Route exact path="/user/profile" element={ <Profile /> } />
          <Route exact path="/user/connections" element={ <Connections /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
