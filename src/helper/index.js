import Cookies from 'js-cookie';
import validations from '../validation.js'

const validUsername = (username) => {
  try {
    if (username) {
      validations.checkUsername(username)
    }
    return [true, '']
  } catch(e) {
    return [false, formatErrorMessage(e.toString())]
  }
};

const validFirstname = (firstName) => {
  try {
      if (firstName) {
        validations.checkString(firstName, 'firstName')
      }
      return [true, '']
  } catch(e) {
    return [false, formatErrorMessage(e.toString())]
  }
};

const validLastname = (lastName) => {
  try {
      if (lastName) {
        validations.checkString(lastName, 'lastName')
      }
      return [true, '']
  } catch(e) {
    return [false, formatErrorMessage(e.toString())]
  }
};

const validEmail = (email) => {
  try {
    if (email) {
      validations.checkMailID(email)
    }
    return [true, '']
  } catch (e) {
    return [false, formatErrorMessage(e.toString())]
  }
};

const validPassword = (password) => {
  try {
    if (password) {
      validations.checkPassword(password)
    }
    return [true, '']
  } catch(e) {
    return [false, formatErrorMessage(e.toString())]
  }
};

const validAge = (age) => {
  try {
    if (age) {
      validations.checkAge(age)
    }
    return [true, '']
  } catch(e) {
    return [false, formatErrorMessage(e.toString())]
  }
};

const validCity = (city) => {
  try {
    if (city) {
      validations.checkString(city, 'city')
    }
    return [true, '']
  } catch(e) {
    return [false, formatErrorMessage(e.toString())]
  }
};

const capitalizeFirst = (str) => {
  if (!str) return "";
  return str[0].toUpperCase() + str.slice(1, str.length);
};

const validator = (user, key, err) => {
  const errorObj = {};
  Object.keys(user).forEach((key) => {
    errorObj[key] = { ...(err[key] || {}) };
  });

  if ((key && key === "username") || !key) {
    const [isValid, errTxt] = validUsername(user.username)
    if (!isValid) {
      errorObj.username.helperText = errTxt;
    } else if (user.username) {
      errorObj.username.helperText = "";
    }
  }

  if ((key && key === "firstName") || !key) {
    const [isValid, errTxt] = validFirstname(user.firstName)
    if (!isValid) {
      errorObj.firstName.helperText = errTxt;
    } else if (user.firstName) {
      errorObj.firstName.helperText = "";
    }
  }

  if ((key && key === "lastName") || !key) {
    const [isValid, errTxt] = validLastname(user.lastName)
    if (!isValid) {
      errorObj.lastName.helperText = errTxt;
    } else if (user.lastName) {
      errorObj.lastName.helperText = "";
    }
  }

  if ((key && key === "email") || !key) {
    const [isValid, errTxt] = validEmail(user.email)
    if (!isValid) {
      errorObj.email.helperText = errTxt;
    } else if (user.email) {
      errorObj.email.helperText = "";
    }
  }

  if ((key && key === "password") || !key) {
    const [isValid, errTxt] = validPassword(user.password)
    if (!isValid) {
      errorObj.password.helperText = errTxt;
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
    const [isValid, errTxt] = validAge(user.age)
    if (!isValid) {
      errorObj.age.helperText = errTxt;
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
    const [isValid, errTxt] = validCity(user.city)
    if (!isValid) {
      errorObj.city.helperText = errTxt;
    } else if (user.city) {
      errorObj.city.helperText = "";
    }
  }

  if ((key && key === "state") || !key) {
    const [isValid, errTxt] = validCity(user.state)
    if (!isValid) {
      errorObj.state.helperText = errTxt;
    } else if (user.state) {
      errorObj.state.helperText = "";
    }
  }

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
  console.log('trace', userId)
  return !!userId
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

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const formatErrorMessage = (msg) => {
  if (msg) return capitalizeFirst(msg.replace('Error: ', ''))
  return ''
}

const helper = {
  capitalizeFirst,
  validator,
  checkLoggedIn,
  initialPage,
};

export default helper;
