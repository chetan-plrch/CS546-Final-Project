const validUsername = (username) => {
    return /^(?=.{6,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username)
}

const isUsernameValid = (username) => {
    if(!username) return true;
    return validUsername(username)
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

    if (!isUsernameValid(user.firstname)) {
        errorObj.firstname.helperText = `firstname is invalid`
    }

    return errorObj
}

const helper = {
    capitalizeFirst,
    validator
}

export default helper

