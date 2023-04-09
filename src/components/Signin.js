import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { signInUser } from '../api/index'
import './Signin.css'

const Signin = (props) => {
  const [user, setUser] = React.useState({ email: '', password: '' });

  const onChangeOfEmail = (e) => {
    setUser({ ...user, email: e.target.value })
  }

  const onChangeOfPassword = (e) => {
    setUser({ ...user, password: e.target.value })
  }

  const onClickOfSignIn = (e) => { 
    e.preventDefault()
    // console.log(signInUser({ email, password }))
  }

  const validateEmail = (email) => {

  }

  const validatePassword = (password) => {
      
  }

  return (
    <div className="dialog">
        
    </div>
  );
}

export default Signin