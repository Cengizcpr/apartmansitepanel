import axios from "axios";

export const register = newUser => {
  return axios
    .post("users/register", {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
      phone_no: newUser.phone_no,
      company_name: newUser.company_name,
      adress: newUser.adress
    })
    .then(response => {
     // console.log("Registered");
    });
};

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
