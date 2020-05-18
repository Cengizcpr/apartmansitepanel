import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      adminresponse: "Oturumunuzu başlatmak giriş yapın",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  //validation yapısı form
  handleValidation() {
    let email = this.state.email;
    let password = this.state.password;
    let formIsValid = true;
    let patternemail = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    let resultemail = patternemail.test(email);

    //Boş mu kontrol?
    if (!email || !password) {
      formIsValid = false;
      toast.error("Boş Bırakmayınız!");
    }
    //İsim için harf kontrol?

    //Email için uyumluluk kontrol?
    else if (resultemail === false) {
      formIsValid = false;
      toast.error("Eposta Geçerli Değil!");
    }

    return formIsValid;
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {

    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("users/login", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        //token değerı yoksa email veya şifre yanlış
        localStorage.setItem("usertoken", response.data);

        if (response.data == "[object Object]") {
          this.setState({
            email: "",
            password: ""
          });
          toast.error("Hata!Email Adresi Veya Şifre Yanlış!")
        } else {
          //token değeri varsa üretilen toker değerinin statusune gore sayfalara yönlendirme
          const token = localStorage.usertoken;
          jwt_decode(token);
          const decoded = jwt_decode(token);
          axios.get("users/adminprofile").then((res) => {
            var response = res.data;

            for (var i = 0; i < response.length; i++) {
              if (decoded.email === response[i].email) {
               
                  this.props.history.push(`/home`);
               
              }
            }
          });
        }
      });
    }
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
            <ToastContainer />

          </div>
        </div>
      </div>
    );
  }
}
export default Login;
