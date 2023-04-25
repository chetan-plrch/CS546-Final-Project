import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import HomePage from './layouts/HomePage'
import Login from './components/login';
import Profile from './components/profile'
import Connections from './components/connections';
import Users from './components/users';
import './App.css';
import SignUp from './components/Signup';
import Chat from '../src/common/custom-chat/index.js';
import Chat2 from '../src/common/custom-chat/index2.js';
import Feedback from './components/feedBack/feedback';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <HomePage /> } />
          <Route exact path="/user/signup" element={ <SignUp /> } />
          <Route exact path="/user/login" element={ <Login /> } />
          <Route exact path="/user/profile" element={ <Profile /> } />
          <Route exact path="/feedbacks" element = {<Feedback />} />
          <Route exact path="/user/connections" element={ <Connections /> } />
          {/* Logged in user can only search for experts */}
          <Route exact path="/experts" element={ <Users /> } />
          <Route exact path="/chat-1" element={<Chat 
            user1={'644406498781b6017e69fb98'}
            user2={'644406898781b6017e69fb99'}
          /> } />
          <Route exact path="/chat-2" element={<Chat2 
            user1={'644406898781b6017e69fb99'}
            user2={'644406498781b6017e69fb98'}
          /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;