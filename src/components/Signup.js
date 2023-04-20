import * as React from "react";
import { createUserAccount } from "../api/index";
import "./Signup.css";
import CustomTextField from "../common/custom-textfield";
import h from "../helper/index";
// import "../../public/luffy.jpeg"
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CustomSelect from "../common/custom-select";
import CustomCheckbox from "../common/custom-checkbox";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ProfileImage from "../common/custom-profile-picture";
import CommonMessage from "../common/custom-message";
import io from 'socket.io-client'
const s = io("http://localhost:3002")

const defaultUser = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  gender: "",
  age: "",
  role: "",
  profileUrl: "",
  city: "",
  state: "",
};

const SignUp = (props) => {
  const [user, setUser] = React.useState(defaultUser);
  const [errors, setErrors] = React.useState(defaultUser);
  const [apiStatus, setApiStatus] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [saving, setSaving] = React.useState(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => e.preventDefault();

  const onChangeOfValue = (key, value) => setUser({ ...user, [key]: value });

  const submissionValidation = () => {
    let valid = true;
    let allFields = new Set(Object.keys(defaultUser))
    allFields.delete('city')
    allFields.delete('state')
    allFields.delete('profileUrl')
    let requiredFields = Array.from(allFields)
    
    let errorsObj = {}
    requiredFields.forEach(key => {
      if ((user[key] === '') || (user[key].trim() === '')) {
        errorsObj[key] = { ...(errors[key] || {}) }
        if (!errorsObj[key].helperText) {
          errorsObj[key].helperText = '*Field required'
        }
      }
    })
    
    if(Object.keys(errorsObj).length > 0) {
      setErrors(errorsObj)
      valid = false
    }
    return valid
  }

  const createUser = async () => {
    const valid = submissionValidation()

    if (valid) {
      setSaving(true);
      const response = await createUserAccount(user);
      const [error, data] = response;
      if (error) {
        setApiStatus({
          error: true,
          success: false,
          message: data,
        });
      } else {
        setApiStatus({
          error: false,
          success: true,
          message: "Sign up successful!",
        });
      }
      setSaving(false);
    }
  };

  const onBlur = () => {
    setErrors(h.validator(user, errors))
  };

  const getHelperText = (key) => {
    if (errors[key]) {
      return errors[key].helperText
    }
    return ''
  }

  console.log('user', user)
  return (
    <div className="container-dialog">
      <div className="dialog">
        <ProfileImage name='profileUrl' image={user.profileUrl} onChange={onChangeOfValue} />
        <div className="input-dialog">
          <div className="header-dialog">Sign up here!</div>
          <CustomTextField
            onBlur={onBlur}
            error={getHelperText('username')}
            helperText={getHelperText('username')}
            name="username"
            value={user.username}
            onChange={onChangeOfValue}
          />
          <CustomTextField
            onBlur={onBlur}
            error={getHelperText('firstName')}
            helperText={getHelperText('firstName')}
            name="firstName"
            label="first name"
            value={user.firstName}
            onChange={onChangeOfValue}
          />
          <CustomTextField
            onBlur={onBlur}
            error={getHelperText('lastName')}
            helperText={getHelperText('lastName')}
            name="lastName"
            label="last name"
            value={user.lastName}
            onChange={onChangeOfValue}
          />
          <CustomTextField
            onBlur={onBlur}
            error={getHelperText('email')}
            helperText={getHelperText('email')}
            name="email"
            value={user.email}
            onChange={onChangeOfValue}
          />
          <CustomTextField
            onBlur={onBlur}
            error={getHelperText('password')}
            helperText={getHelperText('password')}
            name="password"
            type={showPassword ? "text" : "password"}
            value={user.password}
            onChange={onChangeOfValue}
            inputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <CustomCheckbox
            className="anonymous-input"
            name="isAnonymous"
            checked={user.isAnonymous}
            onChange={onChangeOfValue}
            text={"Stay anonymous"}
          />
        </div>
        <div className="input-dialog-2">
          <CustomTextField
            onBlur={onBlur}
            error={getHelperText('age')}
            helperText={getHelperText('age')}
            name="age"
            value={user.age}
            onChange={onChangeOfValue}
          />
          <CustomSelect
            onBlur={onBlur}
            error={getHelperText('gender')}
            helperText={getHelperText('gender')}
            name="gender"
            value={user.gender}
            onChange={onChangeOfValue}
            placeholder={"Gender"}
            options={[
              {
                label: "MALE",
                value: "MALE",
              },
              {
                label: "FEMALE",
                value: "FEMALE",
              },
              {
                label: "OTHER",
                value: "OTHER",
              },
            ]}
          />
          <CustomSelect
            onBlur={onBlur}
            error={getHelperText('role')}
            helperText={getHelperText('role')}
            name="role"
            value={user.role}
            onChange={onChangeOfValue}
            options={[
              {
                label: "LISTENER",
                value: "LISTENER",
              },
              {
                label: "SEEKER",
                value: "SEEKER",
              },
            ]}
          />
          <CustomTextField
            onBlur={onBlur}
            error={getHelperText('city')}
            helperText={getHelperText('city')}
            name="city"
            label="city (optional)"
            value={user.city}
            onChange={onChangeOfValue}
          />
          <CustomTextField
            onBlur={onBlur}
            error={getHelperText('state')}
            helperText={getHelperText('state')}
            name="state"
            label="state (optional)"
            value={user.state}
            onChange={onChangeOfValue}
          />
        </div>
      </div>
      <div>
          <CommonMessage 
            success={apiStatus.success}
            error={apiStatus.error}
            message={apiStatus.message}
          />
          <Button
            onClick={createUser}
            variant={saving ? "outlined" : "contained"}
            color="success"
            className="signup-button"
          >
            {saving ? (
              <CircularProgress size={25} color="success" />
            ) : (
              "Create account"
            )}
          </Button>
        </div>
    </div>
  );
};

export default SignUp;
