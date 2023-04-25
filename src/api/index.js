const constructResponse = (status, responseJson) => {
  console.log(status, responseJson)
  if (status === 200) {
    return [false, responseJson];
  } else if (status === 400) {
    return [true, formatErrorMessage(responseJson)]
  } else if (status === 404) {
    return [true, formatErrorMessage(responseJson)]
  } else {
    return [true, formatErrorMessage(responseJson)]
  }
}

const formatErrorMessage = (errorResponse) => {
  if (Array.isArray(errorResponse.errors)) {
    return errorResponse.errors.slice(0, 2)
  } else {
    return [errorResponse.error]
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
    return constructResponse(e.status, e)
  }
};

export { createUserAccount };
