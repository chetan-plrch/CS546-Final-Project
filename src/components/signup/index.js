import * as React from "react";
import { createUserAccountAxios } from "../../api/index";
import "./signup.css";
import CustomTextField from "../../common/custom-textfield";
import helper from "../../helper/index";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CustomSelect from "../../common/custom-select";
import CustomCheckbox from "../../common/custom-checkbox";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ProfileImage from "../../common/custom-profile-picture";
import CommonMessage from "../../common/custom-message";
import { useNavigate, Link } from "react-router-dom";
import { Typography } from "@mui/material";
import {roles} from "../../helper/constants"


const defaultUser = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  age: "",
  role: "",
  profilePic: "",
  city: "",
  state: "",
  isAnonymous: false,
};

const SignUp = () => {
  const [user, setUser] = React.useState(defaultUser);
  const [errors, setErrors] = React.useState(defaultUser);
  const [apiStatus, setApiStatus] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [saving, setSaving] = React.useState(null);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (e) => e.preventDefault();

  const onChangeOfValue = (key, value) => {
    const updatedUser = { ...user, [key]: value };
    const error = helper.validator(updatedUser, key, errors);
    setErrors({ ...error });
    setUser(updatedUser);
  };

  const submissionValidation = () => {
    let valid = true;
    let allFields = new Set(Object.keys(defaultUser));
    allFields.delete("city");
    allFields.delete("state");
    allFields.delete("profilePic");
    allFields.delete("isAnonymous");
    let requiredFields = Array.from(allFields);

    let errorsObj = {};
    requiredFields?.forEach((key) => {
      if (!user[key]?.trim()) {
        errorsObj[key] = { ...(errors[key] || {}) };
        if (!errorsObj[key].helperText) {
          errorsObj[key].helperText = "*Field required";
        }
      }
    });

    if (Object.keys(errorsObj).length > 0) {
      setErrors(errorsObj);
      valid = false;
    }
    return valid;
  };

  const createUser = async () => {
    const valid = submissionValidation();

    if (valid) {
      setSaving(true);
      const response = await createUserAccountAxios(user);
      const [error, data] = response;
      if (error) {
        setApiStatus({
          error: true,
          success: false,
          message: data,
        });
        setSaving(false);
      } else {
        setApiStatus({
          error: false,
          success: true,
          message: ["Sign up successful! Redirecting..."],
        });
        setTimeout(() => {
          navigate("/login");
          setSaving(false);
        }, 2000);
      }
    }
  };

  const getHelperText = (key) => {
    if (errors[key]) {
      return errors[key].helperText;
    }
    return "";
  };

  return (
    <>
      <div className="container-dialog">
        <div className="dialog">
          <ProfileImage
            name="profilePic"
            image={user.profilePic}
            onChange={onChangeOfValue}
          />
          <div className="input-dialog">
            <div className="header-dialog">Sign up</div>
            <CustomTextField
             style={{color: "blue"}}
              className="my-custom-textfield"
              error={!!getHelperText("username")}
              helperText={getHelperText("username")}
              name="username"
              value={user.username}
              onChange={onChangeOfValue}
            />
            <CustomTextField
              error={!!getHelperText("firstName")}
              helperText={getHelperText("firstName")}
              name="firstName"
              label="first name"
              value={user.firstName}
              onChange={onChangeOfValue}
            />
            <CustomTextField
              error={!!getHelperText("lastName")}
              helperText={getHelperText("lastName")}
              name="lastName"
              label="last name"
              value={user.lastName}
              onChange={onChangeOfValue}  
              
            />
            <CustomTextField
              error={!!getHelperText("email")}
              helperText={getHelperText("email")}
              name="email"
              value={user.email}
              onChange={onChangeOfValue}
              
            />
            <CustomTextField
              error={!!getHelperText("password")}
              helperText={getHelperText("password")}
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
            <CustomTextField
              error={!!getHelperText("confirmPassword")}
              helperText={getHelperText("confirmPassword")}
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={user.confirmPassword}
              onChange={onChangeOfValue}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              
            />
            {
              user?.role !== roles.LISTENER ? (
                <CustomCheckbox
                className="anonymous-input"
                name="isAnonymous"
                checked={user.isAnonymous}
                onChange={onChangeOfValue}
                text={"Stay anonymous"}
              />
              ) : (
                null
              )
            }
          </div>
          <div className="input-dialog-2">
            <CustomTextField
              error={!!getHelperText("age")}
              helperText={getHelperText("age")}
              name="age"
              value={user.age}
              onChange={onChangeOfValue}
              
            />
            <CustomSelect
              error={!!getHelperText("gender")}
              helperText={getHelperText("gender")}
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
              error={!!getHelperText("role")}
              helperText={getHelperText("role")}
              name="role"
              value={user.role}
              onChange={onChangeOfValue}
              options={[
                {
                  label: "LISTENER",
                  value: roles.LISTENER,
                },
                {
                  label: "SEEKER",
                  value: roles.SEEKER,
                },
              ]}
            />
            <CustomTextField
              error={!!getHelperText("city")}
              helperText={getHelperText("city")}
              name="city"
              label="city (optional)"
              value={user.city}
              onChange={onChangeOfValue}
              
            />
            <CustomTextField
              error={!!getHelperText("state")}
              helperText={getHelperText("state")}
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
            styles={{ backgroundColor: "#00796b" }}
            className="signup-button"
          >
            {saving ? (
              <CircularProgress size={25} color="success" />
            ) : (
              "Create account"
            )}
          </Button>
        </div>
        <Link to="/login" style={{ textDecoration: "none" }}>
        <Typography variant="body2" align="center" sx={{ marginTop: 3 }}>
          Already have an account? Login
        </Typography>
      </Link>
      </div>
    </>
  );
};

export default SignUp;