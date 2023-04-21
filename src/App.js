import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import HomePage from './layouts/HomePage'
import Login from './components/login';
import Profile from './components/profile'
import Connections from './components/connections';
import './App.css';
import SignUp from './components/Signup';
import Socket from '../src/common/common-socket/index.js';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <HomePage /> } />
          <Route exact path="/user/signup" element={ <SignUp /> } />
          <Route exact path="/user/login" element={ <Login /> } />
          <Route exact path="/user/profile" element={ <Profile /> } />
          <Route exact path="/user/connections" element={ <Connections /> } />
          <Route exact path="/socket" element={<Socket /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
