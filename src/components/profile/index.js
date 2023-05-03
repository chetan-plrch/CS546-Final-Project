// import React, { useState, useEffect } from 'react';
// import './profile.css';
// import CustomCheckbox from "../../common/custom-checkbox";
// import Cookies from 'js-cookie';
// import TextField from '@mui/material/TextField';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import { useNavigate } from "react-router-dom"
// import Typography from '@mui/material/Typography';
// import axios from 'axios';
// import { getUserById } from '../../api';
// import ProfileImage from "../../common/custom-profile-picture"

// const Profile = () => {
//   const [profile, setProfile] = useState({
//     firstName: '',
//     lastName: '',
//     username: '',
//     isAnonymous: '',
//     email: '',
//     gender: '',
//     age: '',
//     city: '',
//     state: '',
//     role: ''
//   });

//   const navigate = useNavigate();
//   const [blockedUsers, setBlockedUsers] = useState([]);

//   useEffect(() => {
//  const FetchProfile = async() =>{

//   const response  =await getUserById()
//   const result = response.data
//   setProfile({
//     firstName: result.firstName,
//     lastName: result.lastName,
//     username: result.username,
//     isAnonymous: result.isAnonymous,
//     email: result.email,
//     password: '',
//     gender: result.gender,
//     age: result.age,
//     city: result.city,
//     state: result.state,
//     role: result.role
//   })

//  };
//  FetchProfile()
//  }, []);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setProfile({ ...profile, [name]: value });
//   };

//   const handleCheckboxChange = () => {
//     setProfile({ ...profile, isAnonymous: !profile.isAnonymous });
//   };

//   const handleAgeChange = (event, value) => {
//     setProfile({ ...profile, age: value });
//   };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//   };

//   const handleUnblockUser = (username) => {
//     const updatedBlockedUsers = blockedUsers.filter(user => user !== username);
//     setBlockedUsers(updatedBlockedUsers);
//   };

//   const handleDeleteProfile = () => {
// };

//   return (
//     <div>
//   <div className="profile- card">
//   <Card className="profile-container">
//   <CardContent>
//   <Typography variant="h4" component="h2">
//      My Profile
//   </Typography>
//   <ProfileImage  image={profile.profilePic} style={{marginRight: '20px', width: '150px', height: '150px'}} />
//   <form onSubmit={handleFormSubmit}>
//   <div className="form-group">
//   <TextField label="First Name" name="firstName" value={profile.firstName} onChange={handleInputChange} style={{marginBottom: '10px'}} />
//   </div>
//   <div className="form-group">
//   <TextField label="Last Name" name="lastName" value={profile.lastName} onChange={handleInputChange} style={{marginBottom: '10px'}} />
//   </div>
//   <div className="form-group">
//   <TextField label="Username" name="username" value={profile.username} onChange={handleInputChange} style={{marginBottom: '10px'}} />
//   </div>
//   <div className="form-group">
//   <TextField label="Email" name="email" value={profile.email} onChange={handleInputChange} style={{marginBottom: '10px'}} />
//   </div>
//   <div className="form-group">
//   <TextField label="Password" name="password" value={profile.password} onChange={handleInputChange} style={{marginBottom: '10px'}} />
//   </div>
//   <div className="form-group">
//   <TextField label="Gender" name="gender" value={profile.gender} onChange={handleInputChange} style={{marginBottom: '10px'}} />
//   </div>
//   <div className="form-group">
//   <TextField label="Age" type="number" name="age" value={profile.age} onChange={handleAgeChange} style={{marginBottom: '10px'}} />
//   </div>
//   <div className="form-group">
//   <TextField label="City" name="city" value={profile.city} onChange={handleInputChange} style={{marginBottom: '10px'}} />
//   </div>
//   <div className="form-group">
//   <TextField label="State" name="state" value={profile.state} onChange={handleInputChange} style={{marginBottom: '10px'}} />
//   </div>
//   {/* <div className="form-group">
//   <div style={{ display: 'flex', alignItems: 'center' }}>
//     <CustomCheckbox checked={profile.isAnonymous} onChange={handleCheckboxChange} style={{marginBottom: '10px'}} />
//     <label style={{ marginLeft: 10 }}>isAnonymous</label>
//   </div>
// </div> */}

//   <button type="submit" className="btn btn-primary">Update Profile</button>
//   <button type="button" className="btn btn-danger" onClick={handleDeleteProfile}>Delete Account</button>
//   </form>
//   </CardContent>
//   </Card>
//   </div>
//   <div>
//   <Card className= "blocked-users">
//     <CardContent>
//     <Typography variant = "h4" component = "h2">
//     Blocked Users
//     </Typography>
//     </CardContent>
//     </Card>
//   <ul>
//   {blockedUsers.map((blockedUser, index) => (
//   <li key={index}>{blockedUser} <button type="button" onClick={() => handleUnblockUser(blockedUser)}>Unblock</button></li>
//   ))}
//   </ul>
//   </div>
//   </div>
//   );
//   };

//   export default Profile;

import React, { useState, useEffect } from "react";
import "./profile.css";
import CustomCheckbox from "../../common/custom-checkbox";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { getUserById ,getBlockedUsers} from "../../api";
import ProfileImage from "../../common/custom-profile-picture";
import { editProfile, deleteProfile , UnblockProfile} from "../../api/index.js";
import { ToastContainer, toast } from "react-toastify/dist/react-toastify.js";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    username: "",
    isAnonymous: "",
    email: "",
    gender: "",
    age: "",
    city: "",
    state: "",
    role: "",
  });

  const navigate = useNavigate();
  const [blockedUsers, setBlockedUsers] = useState([]);

  useEffect(() => {
    const FetchProfile = async () => {
      try {
        const response = await getUserById();
        const result = response.data;
        setProfile({
          firstName: result.firstName,
          lastName: result.lastName,
          username: result.username,
          isAnonymous: result.isAnonymous,
          email: result.email,
          password: "",
          gender: result.gender,
          age: result.age,
          city: result.city,
          state: result.state,
          role: result.role,
        });
      } catch (error) {
      }
    };

    const fetchBlockedUsers = async() =>{
      try{
          const response = await getBlockedUsers();
          const result = response.data;
          console.log("I am result",result);
          setBlockedUsers(result);
      } catch(error){
        console.log(error);
      }
    }
    
    FetchProfile();
    fetchBlockedUsers();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const updatedProfile = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      username: profile.username,
      isAnonymous: profile.isAnonymous,
      email: profile.email,
      password: profile.password,
      gender: profile.gender,
      age: profile.age,
      city: profile.city,
      state: profile.state,
      role: profile.role,
    };
    const response = await editProfile(updatedProfile);

    if (response.status === 200) {
      toast.success("Profile Updated Successfully");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error("Error in updateing profile, try again");
    }
  };

  const handleDeleteProfile = async () => {
    const response = await deleteProfile();

    if (response.status === 200) {
      toast.success("Profile Deleted Successfully");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error("Error in deleting profile, try again");
    }
  };

  const handleUnblockProfile = async () =>{
    const response = await UnblockProfile();

    if (response.status === 200) {
      toast.success("Unblocked Successfully");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error("Error in Unblocking, try again");
    }
  }

  return (
    <div>
      <div className="profile- card">
        <Card className="profile-container">
          <CardContent>
            <Typography variant="h4" component="h2">
              My Profile
            </Typography>
            <ProfileImage
              image={profile.profilePic}
              style={{ marginRight: "20px", width: "150px", height: "150px" }}
            />
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <TextField
                  label="First Name"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  style={{ marginBottom: "10px" }}
                />
              </div>
              <div className="form-group">
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  style={{ marginBottom: "10px" }}
                />
              </div>
              <div className="form-group">
                <TextField
                  label="Username"
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  style={{ marginBottom: "10px" }}
                />
              </div>
              <div className="form-group">
                <TextField
                  label="Email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  style={{ marginBottom: "10px" }}
                />
              </div>
              <div className="form-group">
                <TextField
                  label="Password"
                  name="password"
                  value={profile.password}
                  onChange={handleChange}
                  style={{ marginBottom: "10px" }}
                />
              </div>
              <div className="form-group">
                <TextField
                  label="Gender"
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  style={{ marginBottom: "10px" }}
                />
              </div>
              <div className="form-group">
                <TextField
                  label="Age"
                  type="number"
                  name="age"
                  value={profile.age}
                  onChange={handleChange}
                  style={{ marginBottom: "10px" }}
                />
              </div>
              <div className="form-group">
                <TextField
                  label="City"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  style={{ marginBottom: "10px" }}
                />
              </div>
              <div className="form-group">
                <TextField
                  label="State"
                  name="state"
                  value={profile.state}
                  onChange={handleChange}
                  style={{ marginBottom: "10px" }}
                />
              </div>
              {/* <div className="form-group">
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <CustomCheckbox checked={profile.isAnonymous} onChange={handleCheckboxChange} style={{marginBottom: '10px'}} />
    <label style={{ marginLeft: 10 }}>isAnonymous</label>
  </div>
</div> */}

              <button type="submit" className="btn btn-primary"
              onClick={handleUpdate}>
                Update Profile
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteProfile}
              >
                Delete Account
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="blocked-users">
          <CardContent>
            <Typography variant="h4" component="h2">
              Blocked Users
            </Typography>
          </CardContent>
        </Card>
        {/* <ul>
          {blockedUsers.map((blockedUser, index) => (
            <li key={index}>
              {blockedUser}{" "}
              <button
                type="button"
                onClick={() => handleUnblockUser(blockedUser)}
              >
                Unblock
              </button>
            </li>
          ))}
        </ul> */}
        <button type="submit" className="btn btn-primary"
              onClick={handleUnblockProfile}>
                Unblock
              </button>
      </div>
    </div>
  );
};

export default Profile;
