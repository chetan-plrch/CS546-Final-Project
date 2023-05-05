const errorType = {
    BAD_INPUT: 'BAD_INPUT',
    UNAUTHORIZED: 'UNAUTHORIZED',
    NOT_FOUND: 'NOT_FOUND'
}

const errorObject = (type, msg) => {
    const e = new Error(msg)
    e.type = type
    return e
}

const exportedMethods = {
  checkString(strVal, varName) {
    if (!strVal) 
      throw errorObject(errorType.BAD_INPUT, `Error: ${varName} field needs to have valid values`)
    if (typeof strVal !== "string") 
      throw errorObject(errorType.BAD_INPUT, `Error: ${varName} must be a string!`)
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw errorObject(errorType.BAD_INPUT, `Error: ${varName} cannot be an empty string or string with just spaces`)
    if (!isNaN(strVal))
      throw errorObject(errorType.BAD_INPUT, `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`)
    return strVal.trim();
  },
  checkAge(age) {
    if (!age) {
      throw errorObject(errorType.BAD_INPUT, `Error: age fields need to have valid values`)
    }
    if (typeof parseInt(age) !== "number") {
      throw errorObject(errorType.BAD_INPUT, "Error: age should be number")
    }
    if (age < 13) {
      throw errorObject(errorType.BAD_INPUT, "Error: under age")
    }
    if(age > 100){
      throw errorObject(errorType.BAD_INPUT, "Error: above age")
    }
    return age;
  },
  checkPassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      throw errorObject(errorType.BAD_INPUT, "Error: password must contain at least one digit, one lowercase letter, one uppercase letter and minimum length of 8 characters")
    }
    return password.trim();
  },
  checkMailID(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex to validate email address
    if (!emailRegex.test(email)) {
      throw errorObject(errorType.BAD_INPUT, "Error: Enter valid email ID")
    }
    return email.trim().toLowerCase();
  },
  checkUsername(username) {
    username = this.checkString(username, "username");
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Regex to validate username
    if (!usernameRegex.test(username)) {
      throw errorObject(errorType.BAD_INPUT, "Error: username can only contain alphanumeric characters and underscores and a length between 3 and 20 characters")
    }
    return username.trim().toLowerCase();
  },
  checkGender(gender) {
    const allowedGenders = ["M", "F", "male", "female", "m", "f", "other"];
    if (!allowedGenders.includes(gender.toLowerCase())) {
      throw errorObject(errorType.BAD_INPUT, "Error: Enter valid gender")
    }
    return gender.toLowerCase();
  },
  checkRole(role) {
    const allowedRole = ["listener", "seeker"];
    if (!allowedRole.includes(role.toLowerCase())) {
      throw errorObject(errorType.BAD_INPUT, "Error: Enter valid role")
    }
    return role.toLowerCase();
  },
  checkId(id, varName) {
    if (!id) 
      throw errorObject(errorType.BAD_INPUT, `Error : ${varName} need to have valid values`)

    if (typeof id !== "string") 
      throw errorObject(errorType.BAD_INPUT, `Error:${varName} must be a string`)
    id = id.trim();
    if (id.length === 0)
      throw errorObject(errorType.BAD_INPUT, `Error: ${varName} cannot be an empty string or just spaces`)
    return id.trim();
  },
  checkRating(rate, varName) {
    if (!rate) {
      throw errorObject(errorType.BAD_INPUT, `${varName} needs to have a value`)
    }
    if (isNaN(parseInt(rate))) {
      throw errorObject(errorType.BAD_INPUT, `${varName} must be a number`)
    }
    rate = parseInt(rate);
    if (rate > 5 || rate < 0) {
      throw errorObject(errorType.BAD_INPUT, `${varName} must be between 1 and 5`)
    }
    return rate;
  },
  checkBoolean(val, varName){
    if(typeof val !== "boolean") {
      throw errorObject(errorType.BAD_INPUT, `Type of ${varName} must be boolean`)
    }
    return val;
  }
};

export default exportedMethods;
