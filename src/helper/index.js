import Cookies from 'js-cookie';

const validUsername = (username) => {
  return /^(?=.{6,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(
    username
  );
};

const validFirstname = (firstName) => {
  return /^[a-zA-Z ]+$/.test(firstName);
};

const validLastname = (lastName) => {
  return validFirstname(lastName);
};

const validEmail = (email) => {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

const validPassword = (password) => {
  return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
    password
  );
};

const validAge = (age) => {
  const n = Number(age);
  if (Number.isNaN(n)) {
    return false;
  } else if (n <= 0 || n > 120) {
    return false;
  }
  return true;
};

const validCity = (city) => {
  return /^[a-zA-Z ]+$/.test(city);
};

const isUsernameValid = (username) => {
  if (!username) return true;
  return validUsername(username);
};

const isFirstnameValid = (firstName) => {
  if (!firstName) return true;
  return validFirstname(firstName);
};

const isLastnameValid = (lastName) => {
  if (!lastName) return true;
  return validLastname(lastName);
};

const isValidEmail = (email) => {
  if (!email) return true;
  return validEmail(email);
};

const isValidPassword = (password) => {
  if (!password) return true;
  return validPassword(password);
};

const isValidAge = (age) => {
  if (!age) return true;
  return validAge(age);
};

const isValidCity = (city) => {
  if (!city) return true;
  if (city.length > 50) return false;
  return validCity(city);
};

const capitalizeFirst = (str) => {
  if (!str) return "";
  return str[0].toUpperCase() + str.slice(1, str.length);
};

const validator = (user, key, err) => {
  console.log("validator", key);
  const errorObj = {};
  Object.keys(user).forEach((key) => {
    errorObj[key] = { ...(err[key] || {}) };
  });

  if ((key && key === "username") || !key) {
    if (!isUsernameValid(user.username)) {
      errorObj.username.helperText = `Username is invalid`;
    } else if (user.username) {
      errorObj.username.helperText = "";
    }
  }

  if ((key && key === "firstName") || !key) {
    if (!isFirstnameValid(user.firstName)) {
      errorObj.firstName.helperText = `Firstname is invalid`;
    } else if (user.firstName) {
      errorObj.firstName.helperText = "";
    }
  }

  if ((key && key === "lastName") || !key) {
    if (!isLastnameValid(user.lastName)) {
      errorObj.lastName.helperText = `Lastname is invalid`;
    } else if (user.lastName) {
      errorObj.lastName.helperText = "";
    }
  }

  if ((key && key === "email") || !key) {
    if (!isValidEmail(user.email)) {
      errorObj.email.helperText = `Email is invalid`;
    } else if (user.email) {
      errorObj.email.helperText = "";
    }
  }

  if ((key && key === "password") || !key) {
    if (!isValidPassword(user.password)) {
      errorObj.password.helperText = "Password is invalid";
    } else if (user.password) {
      errorObj.password.helperText = "";
    }
  }

  if ((key && key === "confirmPassword") || !key) {
    if (user.password !== user.confirmPassword) {
      errorObj.confirmPassword.helperText = "Password's do not match";
    } else if (user.password) {
      errorObj.confirmPassword.helperText = "";
    }
  }

  if ((key && key === "age") || !key) {
    if (!isValidAge(user.age)) {
      errorObj.age.helperText = "Age is invalid";
    } else if (user.age) {
      errorObj.age.helperText = "";
    }
  }

  if ((key && key === "gender") || !key) {
    if (user.gender) {
      errorObj.gender.helperText = "";
    }
  }

  if ((key && key === "role") || !key) {
    if (user.role) {
      errorObj.role.helperText = "";
    }
  }

  if ((key && key === "city") || !key) {
    if (!isValidCity(user.city)) {
      errorObj.city.helperText = "City is invalid";
    } else if (user.city) {
      errorObj.city.helperText = "";
    }
  }

  if ((key && key === "state") || !key) {
    if (!isValidCity(user.state)) {
      errorObj.state.helperText = "State is invalid";
    } else if (user.state) {
      errorObj.state.helperText = "";
    }
  }

  return errorObj;
};

function initialPage() {
  const path = window.location.pathname;
  return path === "/login" || path.includes("/signup");
}

function checkLoggedIn() {
  console.log("hitting");
  const userId = Cookies.get("userId");
  const token = Cookies.get("token");
  console.log(userId);
  console.log(token);
  console.log(initialPage());
  if (!userId && !token && !initialPage()) {
    window.location = "/login";
  }
}

// Returns the user id from the cookie
export const getUserId = () => {
    let userId = Cookies.get('userId');
    userId = userId?.split(':')?.[1];
    userId = userId?.replace(/"/g, "")
    return userId;
};

export const getUserRole = () => {
    let userRole = Cookies.get('role');
    return userRole;
};

const helper = {
  capitalizeFirst,
  validator,
  checkLoggedIn,
  initialPage,
};

export default helper;
