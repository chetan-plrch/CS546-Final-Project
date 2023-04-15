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
import ErrorMessage from "../common/common-error";
import SuccessMessage from "../common/common-success";
import ProfileImage from "../common/common-profile";

const defaultUser = {
  username: "",
  firstName: "",
  lastName: "",
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
  const [apiStatus, setApiStatus] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [saving, setSaving] = React.useState(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => e.preventDefault();

  const onChangeOfValue = (key, value) => setUser({ ...user, [key]: value });

  const createUser = async () => {
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
  };

  const onBlur = () => setErrors(h.validator(user));

  return (
    <>
      <div className="dialog">
        <ProfileImage image={undefined} />
        <div className="input-dialog">
          <div className="dialog-header">Sign up here!</div>
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
            error={errors.firstName.helperText}
            helperText={errors.firstName.helperText}
            name="firstName"
            value={user.firstName}
            onChange={onChangeOfValue}
          />
          <CustomTextField
            onBlur={onBlur}
            error={errors.lastName.helperText}
            helperText={errors.lastName.helperText}
            name="lastName"
            value={user.lastName}
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
          <CustomSelect
            onBlur={onBlur}
            error={errors.gender.helperText}
            helperText={errors.gender.helperText}
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
        <div>
          {apiStatus.error && 
            <div className="profile-image-error">
              {apiStatus.message}
            </div>
          }
          {apiStatus.success && (
            <SuccessMessage>{apiStatus.message}</SuccessMessage>
          )}
          <Button
            onClick={createUser}
            variant={saving ? "outlined" : "contained"}
            color="success"
          >
            {saving ? (
              <CircularProgress size={25} color="success" />
            ) : (
              "Create account"
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
