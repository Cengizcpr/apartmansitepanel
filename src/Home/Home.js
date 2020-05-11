import React, { Component } from "react";
import Header from "./Header";
import Menu from "./Menu";
import UserMenu from "./UserMenu";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      showMe: true,
      showUser: false,
    };
  }
  componentDidMount(e) {
    const token = localStorage.usertoken;
    try {
      jwt_decode(token);
      const decoded = jwt_decode(token);
      axios.get("users/adminprofile").then((res) => {
        var response = res.data;
        for (var i = 0; i < response.length; i++) {
          if (decoded.email === response[i].email) {
            if (response[i].status == false) {
              this.setState({
                showMe: false,
                showUser: true,
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
        {this.state.showMe ? <Menu /> : this.props.history.push("/userhome")}

        <div className="content-wrapper">
          <section className="content">
            <div className="container-fluid"></div>
          </section>
        </div>
        {this.state.showUser ? this.props.history.push("/statuserror") : null}
      </div>
    );
  }
}
