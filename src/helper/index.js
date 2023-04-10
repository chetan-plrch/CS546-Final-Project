const validUsername = (username) => {
    return /^(?=.{6,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username)
}

const validFirstname = (firstname) => {
    return /^[a-zA-Z ]+$/.test(firstname)
}

const validLastname = (lastname) => {
    return validFirstname(lastname)
}

const validEmail = (email) => {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

const validPassword = (password) => {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)
}

const isUsernameValid = (username) => {
    if(!username) return true;
    return validUsername(username)
}

const isFirstnameValid = (firstname) => {
    if(!firstname) return true;
    return validFirstname(firstname)
}

const isLastnameValid = (lastname) => {
    if(!lastname) return true;
    return validLastname(lastname)
}

const isValidEmail = (email) => {
    if(!email) return true;
    return validEmail(email)
}

const isValidPassword = (password) => {
    if(!password) return true;
    return validPassword(password)
}

const capitalizeFirst = (str) => {
    if(!str) return '';
    return str[0].toUpperCase() + str.slice(1, str.length)
}

const validator = (user) => {
    const errorObj = {
        username: {
            helperText: undefined
        }
    }
    Object.keys(user).forEach((key) => {
        errorObj[key] = {}
        errorObj[key].helperText = undefined
    })

    if (!isUsernameValid(user.username)) {
        errorObj.username.helperText = `username is invalid`
    }

    if (!isFirstnameValid(user.firstname)) {
        errorObj.firstname.helperText = `firstname is invalid`
    }

    if (!isLastnameValid(user.lastname)) {
        errorObj.lastname.helperText = `lastname is invalid`
    }

    if (!isValidEmail(user.email)) {
        errorObj.email.helperText = `email is invalid`
    }

    if (!isValidPassword(user.password)) {
        errorObj.password.helperText = 'password is invalid'
    }

    return errorObj
}

const helper = {
    capitalizeFirst,
    validator
}

export default helper

