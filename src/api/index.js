const constructResponse = (response, responseJson) => {
  if (response.status === 200) {
    return [false, responseJson];
  } else if (response.status === 400) {
    return [true, formatErrorMessage(responseJson)]
  } else if (response.status === 404) {
    return [true, formatErrorMessage(responseJson)]
  } else {
    return [true, formatErrorMessage(responseJson)]
  }
}

const formatErrorMessage = (errorResponse) => {
  if (Array.isArray(errorResponse.errors)) {
    return errorResponse.errors.splice.slice(0, 2)
  } else {
    return [errorResponse.message]
  }
}

const createUserAccount = async (user) => {
  try {
    const response = await fetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const responseJson = await response.json();
    return constructResponse(response.status, responseJson)
  } catch (e) {
    console.log("error occurred", e);
    return [true, 'Some error occurred']
  }
};

const signUpUser = async ({ email, password }) => {
  try {
    const response = await fetch("https://lmel2.wiremockapi.cloud/json/1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (e) {
    console.log("error occurred", e);
    return false;
  }
};

export { createUserAccount, signUpUser };
