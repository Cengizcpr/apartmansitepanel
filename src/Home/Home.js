import React, { Component } from "react";
import Header from "./Header";
import Menu from "./Menu";
import UserMenu from "./UserMenu";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default class Home extends Component {
  constructor() {
    super();

    this.state = {};
  }
  componentDidMount(e) {
    const token = localStorage.usertoken;
    try {
      jwt_decode(token);
      const decoded = jwt_decode(token);
      axios.get("users/adminprofile").then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          if (decoded._id === res.data[i]._id) {
            if (res.data[i].status) {
              this.setState({
                showMe: true,
              });
            } else {
              this.setState({
                showMe: false,
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
    var partial;
    if (this.state.showMe === true) {
      partial = <Menu />;
    } else if (this.state.showMe === false) {
      partial = <UserMenu />;
    }
    return (
      <div>
        <Header />
        {partial}

        <div className="content-wrapper">
          <section className="content">
            <div className="container-fluid"></div>
          </section>
        </div>
      </div>
    );
  }
}
