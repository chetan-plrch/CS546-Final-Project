import * as React from "react";
import {
  editProfile,
  getUserById,
  unblockProfile,
  getBlockedUsers,
  deleteProfile,
} from "../../api/index";
import "../signup/index";
import CustomTextField from "../../common/custom-textfield";
import h, { delay } from "../../helper/index";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CustomCheckbox from "../../common/custom-checkbox";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ProfileImage from "../../common/custom-profile-picture";
import CommonMessage from "../../common/custom-message";
import { roles } from "../../constant";
import { toast, ToastContainer } from "react-toastify/dist/react-toastify.js";
import { useNavigate } from "react-router-dom";

const defaultUser = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  age: "",
  profilePic: "",
  city: "",
  state: "",
  isAnonymous: false,
};

const Profile = () => {
  const [user, setUser] = React.useState(defaultUser);
  const [blockedUsers, setBlockedUsers] = React.useState([]);
  const [errors, setErrors] = React.useState(defaultUser);
  const [apiStatus, setApiStatus] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [anonymousDisabled, setAnonymousDisabled] = React.useState(false);
  const [saving, setSaving] = React.useState(null);
  const navigate = useNavigate()

  React.useEffect(() => {
    async function getProfileDetails() {
      const user = await getUserById();
      if (user) {
        setAnonymousDisabled(user.role === roles.LISTENER);
      }
      setUser(user);
    }

    async function getBlocked() {
      const blockedUsersData = await getBlockedUsers();
      setBlockedUsers(blockedUsersData);
    }

    getProfileDetails();
    getBlocked();
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => e.preventDefault();

  const onChangeOfValue = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const submissionValidation = () => {
    let valid = true;
    let allFields = new Set(Object.keys(defaultUser));
    allFields.delete("password");
    allFields.delete("profilePic");
    allFields.delete("isAnonymous");
    allFields.delete("city");
    allFields.delete("state");
    let requiredFields = Array.from(allFields);

    let errorsObj = {};
    requiredFields.forEach((key) => {
      if (user[key] === "" || user[key].trim() === "") {
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

  const updateUser = async () => {
    const valid = submissionValidation();

    if (valid) {
      setSaving(true);
      const response = await editProfile(user);
      const [error, data] = response;
      if (error) {
        setApiStatus({ error: true, success: false, message: data });
        setSaving(false);
      } else {
        toast.success("Update successful!");
      }
      setSaving(false);
    }
  };

  const deleteAccount = async ({ permanent, isActive }) => {
    const deleted = await deleteProfile({ permanent, isActive });
    if (deleted) {
      if (permanent) {
        toast.success("Profile Deleted Successfully");
        await delay(1500);
        navigate('/login')
      } else {
        toast.success(`Profile ${isActive ? 'Activated' : 'Deactivated'} Successfully`);
        await delay(1500);
        navigate('/login')
      }
    } else {
      if (permanent) {
        toast.error("Error in deleting profile, try again later");
      } else {
        toast.error("Error in deactivating profile, try again later");
      }
    }
  }

  const onBlur = (name) => {
    const err = h.validator(user, name, errors);
    setErrors({ ...err });
  };

  const getHelperText = (key) => {
    if (errors[key]) {
      return errors[key].helperText;
    }
    return "";
  };

  const unblockUserProfile = async (userId) => {
    const unblocked = await unblockProfile(userId);

    if (unblocked) {
      const updatedList = blockedUsers.reduce((acc, user) => {
        if (user._id === userId) return acc;
        return [...acc, user];
      }, []);
      setBlockedUsers(updatedList);
      toast.success("Unblocked Successfully");
    } else {
      toast.error("Failed to unblock the user");
    }
  };

  return (
    <>
      <div className="update-container-dialog">
        <ToastContainer />
        <div className="dialog">
          <ProfileImage
            name="profilePic"
            image={user.profilePic}
            onChange={onChangeOfValue}
          />
          <div className="input-dialog">
            <div className="header-dialog">Update profile</div>
            <CustomTextField
              styles={{ width: 15 }}
              onBlur={onBlur}
              error={getHelperText("username")}
              helperText={getHelperText("username")}
              name="username"
              value={user.username}
              onChange={onChangeOfValue}
              required={true}
            />
            <CustomTextField
              styles={{ width: 15 }}
              onBlur={onBlur}
              error={getHelperText("firstName")}
              helperText={getHelperText("firstName")}
              name="firstName"
              label="first name"
              value={user.firstName}
              onChange={onChangeOfValue}
              required={true}
            />
            <CustomTextField
              styles={{ width: 15 }}
              onBlur={onBlur}
              error={getHelperText("lastName")}
              helperText={getHelperText("lastName")}
              name="lastName"
              label="last name"
              value={user.lastName}
              onChange={onChangeOfValue}
              required={true}
            />
            <CustomTextField
              styles={{ width: 15 }}
              onBlur={onBlur}
              error={getHelperText("email")}
              helperText={getHelperText("email")}
              name="email"
              value={user.email}
              onChange={onChangeOfValue}
              required={true}
            />
            <CustomTextField
              styles={{ width: 15 }}
              onBlur={onBlur}
              error={getHelperText("password")}
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
              required={true}
            />
            <CustomTextField
              styles={{ width: 15 }}
              onBlur={onBlur}
              error={getHelperText("age")}
              helperText={getHelperText("age")}
              name="age"
              value={user.age}
              onChange={onChangeOfValue}
              required={true}
            />
            <CustomTextField
              styles={{ width: 15 }}
              onBlur={onBlur}
              error={getHelperText("city")}
              helperText={getHelperText("city")}
              name="city"
              label="city (optional)"
              value={user.city}
              onChange={onChangeOfValue}
              required={true}
            />
            <CustomTextField
              styles={{ width: 15 }}
              onBlur={onBlur}
              error={getHelperText("state")}
              helperText={getHelperText("state")}
              name="state"
              label="state (optional)"
              value={user.state}
              onChange={onChangeOfValue}
              required={true}
            />
            {anonymousDisabled ? null : (
              <CustomCheckbox
                disabled={anonymousDisabled}
                className="anonymous-input"
                name="isAnonymous"
                checked={user.isAnonymous}
                onChange={onChangeOfValue}
                text={"Stay anonymous"}
              />
            )}
          </div>
        </div>
        <div>
          <CommonMessage
            success={apiStatus.success}
            error={apiStatus.error}
            message={apiStatus.message}
          />
          <Button
            onClick={updateUser}
            variant={saving ? "outlined" : "contained"}
            styles={{ backgroundColor: "#00796b" }}
            className="signup-button"
          >
            {saving ? (
              <CircularProgress size={25} color="success" />
            ) : (
              "Update profile"
            )}
          </Button>
          <Button
            onClick={() => deleteAccount({ isActive: !user.isActive })}
            variant={saving ? "outlined" : "contained"}
            styles={{ backgroundColor: "#000000" }}
            color={user.isActive ? "error" : "success"}
            className="signup-button"
          >
            {user.isActive ? 'Deativate account' : 'Activate account'}
          </Button>
          <Button
            onClick={() => deleteAccount({ permanent: true })}
            variant={saving ? "outlined" : "contained"}
            styles={{ backgroundColor: "#000000" }}
            color="error"
            className="signup-button"
          >
            Permanently delete Account
          </Button>
        </div>
        <div className="blocked-list">
          <div className="blocked-title">Blocked users</div>
          {blockedUsers.length <= 0 ? (
            <div className="empty-blocked-list">No blocked users</div>
          ) : (
            blockedUsers.map((user) => {
              return (
                <div className="blocked-item">
                  <div className="blocked-username">{user.firstName}</div>
                  <Button
                    onClick={() => unblockUserProfile(user._id)}
                    variant={"outlined"}
                    styles={{ backgroundColor: "#000000" }}
                    className="signup-button"
                    color="error"
                  >
                    Unblock
                  </Button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
