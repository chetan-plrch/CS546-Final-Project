import Cookies from 'js-cookie';
import validations from './validations'

const validateUsername = (username) => {
  try {
    validations.checkUsername(username);
  } catch(e) {
    return formatErrorMessage(e.toString());
  }
};

const validateFirstname = (firstName) => {
  try {
    validations.checkString(firstName, 'firstName');
  } catch(e) {
    return formatErrorMessage(e.toString());
  };
};

const validateLastname = (lastName) => {
  try {
    validations.checkString(lastName, 'lastName');
  } catch(e) {
    return formatErrorMessage(e.toString());
  }
};

const validateEmail = (email) => {
  try {
    validations.checkMailID(email);
  } catch (e) {
    return formatErrorMessage(e.toString());
  }
};

const validatePassword = (password) => {
  try {
    validations.checkPassword(password);
  } catch(e) {
    return formatErrorMessage(e.toString());
  }
};

const validateAge = (age) => {
  try {
    validations.checkAge(age);
  } catch(e) {
    return formatErrorMessage(e.toString());
  };
};

const validateCity = (city) => {
  try {
    validations.checkString(city, 'city');
  } catch(e) {
    return formatErrorMessage(e.toString());
  }
};

const capitalizeFirst = (str) => {
  return str ? str[0].toUpperCase() + str.slice(1, str.length) : '';
};

const validator = (user, field, err) => {
  const errorObj = {};

  Object.keys(user).forEach((attribute) => {
    errorObj[attribute] = { ...(err[attribute] || {}) };
  });

  switch (true) {
    case field === 'username':
      errorObj.username.helperText = validateUsername(user.username);
      break;
    case field === 'firstName':
      errorObj.firstName.helperText = validateFirstname(user.firstName);
      break;
    case field === 'lastName':
      errorObj.lastName.helperText = validateLastname(user.lastName);
      break;
    case field === 'email':
      errorObj.email.helperText = validateEmail(user.email);
      break;
    case field === 'password':
      errorObj.password.helperText = validatePassword(user.password);
      break;
    case field === 'confirmPassword':
      if (user.password !== user.confirmPassword) {
        errorObj.confirmPassword.helperText = "Passwords do not match";
      } else if (user.password) {
        errorObj.confirmPassword.helperText = "";
      };
      break;
    case field === 'age':
      errorObj.age.helperText = validateAge(user.age);
      break;
    case field === 'city':
      errorObj.city.helperText = validateCity(user.city);
      break;
    case field === 'state':
      errorObj.state.helperText = validateCity(user.state)
      break;
    case field === 'role' && user?.role:
    case field === 'gender' && user?.gender:
      errorObj.gender.helperText = '';
      break;
  };

  return errorObj;
};

export function initialPage() {
  const path = window.location.pathname;
  return path.includes("/login") || path.includes("/signup");
}

export function checkLoggedIn() {
  const userId = Cookies.get("userId");
  return userId && !initialPage()
}

export function checkLogInTrace() {
  const userId = Cookies.get('userId');
  return !!userId
}

// Returns the user id from the cookie
export const getUserId = () => {
  let userId = Cookies.get('userId');
  return userId;
};

export const getUserRole = () => {
    let userRole = Cookies.get('role');
    return userRole;
};

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const formatErrorMessage = (msg) => {
  return msg ? capitalizeFirst(msg.replace('Error: ', '')) : '';
}

const helper = {
  capitalizeFirst,
  validator,
  checkLoggedIn,
  initialPage,
};

export default helper;
