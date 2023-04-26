import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import HomePage from './layouts/HomePage'
import Login from './components/login';
import Profile from './components/profile'
import Connections from './components/connections';
import './App.css';
import SignUp from './components/Signup';
import Chat from '../src/common/custom-chat/index.js';
import Chat2 from '../src/common/custom-chat/index2.js';
import Feedback from './components/feedBack/feedback';
import FeedBackEditForm from './components/feedBack/feedBackEditForm';

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
          <Route exact path="/feedbacks/feedback" element = {<FeedBackEditForm />} />
          
          <Route exact path="/user/connections" element={ <Connections /> } />
          <Route exact path="/chat-1" element={<Chat 
            user1={'6438d7ac8e1c21e45686e198'}
            user2={'6439851768f667131bd19b4a'}
          /> } />
          <Route exact path="/chat-2" element={<Chat2 
            user1={'6439851768f667131bd19b4a'}
            user2={'6438d7ac8e1c21e45686e198'}
          /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;