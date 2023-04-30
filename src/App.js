import React, { useEffect } from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import HomePage from './layouts/HomePage'
import Profile from './components/profile'
import Connections from './components/connections';
import Login from './components/login';
import './App.css';
import SignUp from './components/Signup';
import Chat from '../src/common/custom-chat/index.js';
import Chat2 from '../src/common/custom-chat/index2.js';
import Middle from './components/feedBack/middle';
import Feedback from './components/feedBack/feedback';
import FeedBackList from './components/feedBack/feedBackList';
import FeedBackEditForm from './components/feedBack/feedBackEditForm';
import NotFound from './components/notfound';

const App = () => {

  // useEffect(() => {
  //   helper.checkLoggedIn()
  // }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <HomePage /> } />
          <Route exact path="/signup" element={ <SignUp /> } />
          <Route exact path="/login" element={ <Login /> } />
          <Route exact path="/profile" element={ <Profile /> } />

          <Route exact path="/feedbacks" element = {<Feedback />} />
          <Route exact path="/feedbacks/feedback" element = {<Middle />} />
          
          {/* use the below link in the navbar */}
          <Route exact path="/feedbackslist" element = {<FeedBackList />} /> 

          <Route exact path="/connections" element={ <Connections /> } />
          <Route exact path="/chat-1" element={<Chat 
            user1={'644406498781b6017e69fb98'}
            user2={'644406898781b6017e69fb99'}
          /> } />
          <Route exact path="/chat-2" element={<Chat2 
            user1={'644406898781b6017e69fb99'}
            user2={'644406498781b6017e69fb98'}
          /> } />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;