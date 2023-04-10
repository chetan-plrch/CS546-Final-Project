import * as React from "react";
import { signUpUser } from "../api/index";
import "./Signup.css";
import CustomTextField from "./CustomTextField";
import h from '../helper/index';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CustomSelect from "./CustomSelect";


const defaultUser = {
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  gender: "",
  age: "",
  role: "",
  city: "",
  state: "",
};

const SignUp = (props) => {
  const [user, setUser] = React.useState(defaultUser);
  const [errors, setErrors] = React.useState(defaultUser);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => e.preventDefault();

  const onChangeOfValue = (key, value) => setUser({ ...user, [key]: value });

  const onBlur = () => setErrors(h.validator(user))

  return (
    <div className="dialog">
        <div className="dialog-header">
          Sign up here!
        </div>
      <CustomTextField
        onBlur={onBlur}
        error={errors.username.helperText}
        helperText={errors.username.helperText}
        name="username"
        value={user.username}
        onChange={onChangeOfValue}
      />
      <CustomTextField
        onBlur={onBlur}
        error={errors.firstname.helperText}
        helperText={errors.firstname.helperText}
        name="firstname"
        value={user.firstname}
        onChange={onChangeOfValue}
      />
      <CustomTextField
        onBlur={onBlur}
        error={errors.lastname.helperText}
        helperText={errors.lastname.helperText}
        name="lastname"
        value={user.lastname}
        onChange={onChangeOfValue}
      />
      <CustomTextField
        onBlur={onBlur}
        error={errors.email.helperText}
        helperText={errors.email.helperText}
        name="email"
        value={user.email}
        onChange={onChangeOfValue}
      />
      <CustomTextField
        onBlur={onBlur}
        error={errors.password.helperText}
        helperText={errors.password.helperText}
        name="password"
        type={showPassword ? "text" : "password"}
        value={user.password}
        onChange={onChangeOfValue}
        inputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
        }}
      />
      <CustomSelect 
        onBlur={onBlur}
        error={errors.gender.helperText}
        helperText={errors.gender.helperText}
        name="gender"
        value={user.gender}
        onChange={onChangeOfValue}
        options={[{
            label: 'MALE',
            value: 'MALE'
        }, {
            label: 'FEMALE',
            value: 'FEMALE'
        }, {
            label: 'OTHER',
            value: 'OTHER'
        }]}
      />
      <CustomTextField 
        onBlur={onBlur}
        error={errors.age.helperText}
        helperText={errors.age.helperText}
        name="age" 
        value={user.age} 
        onChange={onChangeOfValue}
    />
      <CustomSelect 
        onBlur={onBlur}
        error={errors.role.helperText}
        helperText={errors.role.helperText}
        name="role"
        value={user.role}
        onChange={onChangeOfValue}
        options={[{
            label: 'LISTENER',
            value: 'LISTENER'
        }, {
            label: 'SEEKER',
            value: 'SEEKER'
        }]}
      />
      <CustomTextField
        onBlur={onBlur}
        error={errors.city.helperText}
        helperText={errors.city.helperText}
        name="city"
        value={user.city}
        onChange={onChangeOfValue}
      />
      <CustomTextField
        onBlur={onBlur}
        error={errors.state.helperText}
        helperText={errors.state.helperText}
        name="state"
        value={user.state}
        onChange={onChangeOfValue}
      />
    </div>
  );
};

export default SignUp;
