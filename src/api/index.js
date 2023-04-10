const createUserAccount = async ({ email, password }) => {
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
