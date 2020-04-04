import React, { Component } from "react";
import Header from "./Header";
import UserMenu from "./UserMenu";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default class UserHome extends Component {
  constructor() {
    super();

    this.state = {
      showMe: true,
      showUser: false
    };
  }
  componentDidMount(e) {
    const token = localStorage.usertoken;
    try {
      jwt_decode(token);
      const decoded = jwt_decode(token);
      axios.get("users/adminprofile").then(res => {
        var response = res.data;
        for (var i = 0; i < response.length; i++) {
          if (decoded.email === response[i].email) {
            if (response[i].status == false) {
              this.setState({
                showMe: false,
                showUser: true
              });
            }
          }
        }
      });
    } catch (error) {
      window.location.replace("/");
    }
  }
  render() {
    return (
      <div>
        <Header />
        <UserMenu />
        <div className="content-wrapper">
          <div className="content-header">Hoşgeldiniz Kullanıcı</div>
        </div>
      </div>
    );
  }
}
