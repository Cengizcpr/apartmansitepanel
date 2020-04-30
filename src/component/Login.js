import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      adminresponse: "Oturumunuzu başlatmak giriş yapın"
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("users/login", {
        email: user.email,
        password: user.password
      })
      .then(response => {
        //token değerı yoksa email veya şifre yanlış
        localStorage.setItem("usertoken", response.data);
      
        console.log(response.data)
        if (response.data == "[object Object]") {
          this.setState({
            email: "",
            password: "",
            adminresponse: "Email adresi veya Şifre yanlış"
          });
        } else {
          //token değeri varsa üretilen toker değerinin statusune gore sayfalara yönlendirme
          const token = localStorage.usertoken;
          jwt_decode(token);
          const decoded = jwt_decode(token);
          axios.get("users/adminprofile").then(res => {
            var response = res.data;

            for (var i = 0; i < response.length; i++) {
              if (decoded.email === response[i].email) {
                if (response[i].status == true) {
                  this.props.history.push(`/home`);
                } else {
                  this.props.history.push(`/userhome`);
                }
              }
            }
          });
        }
      });
  }

  render() {
    return (
      <div className="login-box">
      <div className="login-logo">
        <Link to="/">
          <b>ApartmanSitePanel</b>Giriş
        </Link>
      </div>
      <div className="card">
        <div className="card-body login-card-body">
          <h5 className="login-box-msg login-box-danger">
            {this.state.adminresponse}
          </h5>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email adresi"
                value={this.state.email}
                onChange={this.onChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope" />
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Şifre"
                value={this.state.password}
                onChange={this.onChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-flat"
                >
                  Giriş Yap
                </button>
              </div>
            </div>
          </form>
          <Link to="/register" className="text-center">
            Yeni Üye Ol
          </Link>
        </div>
      </div>
    </div>


    );
  }
}
export default Login;
