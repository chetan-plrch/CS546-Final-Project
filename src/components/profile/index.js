import React, { useState } from 'react';

import './profile.css'
import CustomCheckbox from "../../common/custom-checkbox";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Wick',
    username: 'myBeagleDaisy',
    isAnonymous: true,
    email: 'wickjohn@continental.org',
    gender: 'M',
    age: 50,
    city: 'New York',
    state: 'New York',
    role: 'Seeker'
  });

  return (
    <div className='container'>
      <h1>User: {profile.username}</h1>
      <div className='input-container'>
        <label className='label'>Username</label>
        <input
          className="input-box"
          type="text"
          placeholder="Username"
          value={profile.username}
          onChange={(e) => console.log('do something')}
        />
      </div>

      <div className='input-container'>
        <label className='label'>First Name</label>
        <input
          className="input-box"
          type="text"
          placeholder="First Name"
          value={profile.firstName}
          onChange={(e) => console.log('do something')}
        />     
      </div>

      <div className='input-container'>
        <label className='label'>Last Name</label>
        <input
          className="input-box"
          type="text"
          placeholder="Last Name"
          value={profile.lastName}
          onChange={(e) => console.log('do something')}
        />
      </div>

      <div className='input-container'>
        <label className='label'>Email</label>
        <input
          className="input-box"
          type="text"
          placeholder="Last Name"
          value={profile.email}
          onChange={(e) => console.log('do something')}
        />
      </div>

      <div className='input-container'>
        <label className='label'>Gender</label>
        <input
          className="input-box"
          type="text"
          placeholder="Last Name"
          value={profile.gender === 'M' ? 'Male' : 'Female'}
          onChange={(e) => console.log('do something')}
        />
      </div>


      <div className='input-container'>
        <label className='label'>Age</label>
        <input
          className="input-box"
          type="text"
          placeholder="Last Name"
          value={profile.age}
          onChange={(e) => console.log('do something')}
        />
      </div>

      <div className='input-container'>
        <label className='label'>City</label>
        <input
          className="input-box"
          type="text"
          placeholder="Last Name"
          value={profile.city}
          onChange={(e) => console.log('do something')}
        />
      </div>

      <div className='input-container'>
        <label className='label'>State</label>
        <input
          className="input-box"
          type="text"
          placeholder="Last Name"
          value={profile.state}
          onChange={(e) => console.log('do something')}
        />
      </div>

      <div className='input-container'>
        <label className='label'>Role</label>
        <input
          className="input-box"
          type="text"
          placeholder="Last Name"
          value={profile.role}
          onChange={(e) => console.log('do something')}
          readOnly
        />
      </div>
      
      <CustomCheckbox
        className="anonymous-input"
        name="isAnonymous"
        checked={profile.isAnonymous}
        onChange={() => {console.log('do something')}}
        text={"Anonymous"}
      />
    </div>
  );
};

export default Profile;
