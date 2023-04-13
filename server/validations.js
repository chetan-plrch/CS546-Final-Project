//validation for authentication and user database helpers


const exportedMethods = {
  checkString(strVal, varName) {
    if (!strVal) throw "Error: All fields need to have valid values";
    if (typeof strVal !== "string") throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal.trim();
  },
  checkAge(age){
    if(!age){
        throw "All fields need to have valid values";
    }
    if(typeof parseInt(age) !== "number"){
        throw "Error: age should be number";
    }
    if(age < 13){
        throw "Error: under age";
    }
    return age
  },
  checkPassword(password){
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if(!passwordRegex.test(password)){
      throw "Error: password must contain at least one digit, one lowercase letter, one uppercase letter and minimum length of 8 characters";
    }
    return password.trim()
  },
  checkMailID(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex to validate email address
    if(!emailRegex.test(email)){
      throw "Error: Enter valid email ID";
    }
    return email.trim()
  },
  checkUsername(username){
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Regex to validate username
    if(!usernameRegex.test(username)){
      throw "Error: username can only contain alphanumeric characters and underscores and a length between 3 and 20 characters "
    }
    return username.trim()
  }
  
};

export {exportedMethods};







// validation 

export const validate = (username, firstName, lastName, email, password, gender, city, state, age, isAnonymous, role, profileUrl, connections, isActive) => {
  if (typeof username !== 'string' || !username.trim().length) {
    throw new Error('Username must be a non-empty string.');
  }
  
  if (typeof firstName !== 'string' || !firstName.trim().length) {
    throw new Error('First name must be a non-empty string.');
  }
  
  if (typeof lastName !== 'string' || !lastName.trim().length) {
    throw new Error('Last name must be a non-empty string.');
  }
  
  if (typeof email !== 'string' || !email.trim().length) {
    throw new Error('Email must be a non-empty string.');
  }
  
  if (typeof password !== 'string' || !password.trim().length) {
    throw new Error('Password must be a non-empty string.');
  }
  
  if (typeof gender !== 'string' || !gender.trim().length) {
    throw new Error('Gender must be a non-empty string.');
  }
  
  if (typeof city !== 'string' || !city.trim().length) {
    throw new Error('City must be a non-empty string.');
  }
  
  if (typeof state !== 'string' || !state.trim().length) {
    throw new Error('State must be a non-empty string.');
  }
  
  if (typeof age !== 'number' || age < 0) {
    throw new Error('Age must be a non-negative number.');
  }
  
  if (typeof isAnonymous !== 'boolean') {
    throw new Error('isAnonymous must be a boolean.');
  }
  
  if (typeof role !== 'string' || !role.trim().length) {
    throw new Error('Role must be a non-empty string.');
  }
  
  if (typeof profileUrl !== 'string' || !profileUrl.trim().length) {
    throw new Error('Profile URL must be a non-empty string.');
  }
  
  if (typeof connections !== 'object' || !connections.hasOwnProperty('blocked') || !connections.hasOwnProperty('active') || !Array.isArray(connections.blocked) || !Array.isArray(connections.active)) {
    throw new Error('Connections must be an object with "blocked" and "active" properties that are arrays.');
  }
  
  if (typeof isActive !== 'boolean') {
    throw new Error('isActive must be a boolean.');
  }
};



//helper for update function
export const compareAndUpdate = (newDoc, oldDoc) => {
  const oldDocKeys = Object.keys(oldDoc);
  const newDocKeys = Object.keys(newDoc);

  if (oldDocKeys.length !== newDocKeys.length) {
    return false;
  }

  for (let key of oldDocKeys) {
    if (!newDoc.hasOwnProperty(key)) {
      return false;
    }

    if (key === 'connections') {
      const oldConnections = oldDoc[key];
      const newConnections = newDoc[key];

      if (!oldConnections.hasOwnProperty('blocked') || !newConnections.hasOwnProperty('blocked') ||
          !oldConnections.hasOwnProperty('active') || !newConnections.hasOwnProperty('active')) {
        return false;
      }

      const oldBlocked = oldConnections.blocked;
      const newBlocked = newConnections.blocked;

      if (oldBlocked.length !== newBlocked.length) {
        return false;
      }

      for (let i = 0; i < oldBlocked.length; i++) {
        if (oldBlocked[i] !== newBlocked[i]) {
          return false;
        }
      }

      const oldActive = oldConnections.active;
      const newActive = newConnections.active;

      if (oldActive.length !== newActive.length) {
        return false;
      }

      for (let i = 0; i < oldActive.length; i++) {
        if (oldActive[i] !== newActive[i]) {
          return false;
        }
      }
    } else if (key === 'password') {
      if (newDoc[key] !== oldDoc[key]) {
        return false;
      }
    } else if (key === 'username' || key === 'firstName' || key === 'lastName' || key === 'email' || key === 'gender' || key === 'city' || key === 'state' || key === 'age' || key === 'isAnonymous' || key === 'role' || key === 'profileUrl') {
      if (newDoc[key] !== oldDoc[key]) {
        return false;
      }
    }
  }

  return true;
};
