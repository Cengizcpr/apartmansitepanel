import axios from "axios";



export const login = user => {
  return axios
    .post("users/login", {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem("usertoken", response.data);

      if (response.data == "[object Object]") {
        return false;
      } else {
        return true;
      }
    })
    .catch(err => {
      return err;
    });
};

export const getProfile = user => {
  return axios

    .get("users/adminprofile")
    .then(response => {
      return response.data;
    })
    .catch(err => {
      localStorage.clear();
      console.log(err);
    });
};
