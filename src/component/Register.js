import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      phone_no: "",
      email: "",
      password: "",
      replay_password: "",
      status:true
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  //validation yapısı form
  handleValidation() {
    let first_name = this.state.first_name;
    let last_name = this.state.last_name;
    let email = this.state.email;
    let phone_no = this.state.phone_no;
    let password = this.state.password;
    let replay_password = this.state.replay_password;
    let formIsValid = true;
    let partternLastname = /[a-zA-Z]/g;
    let resultLastname = partternLastname.test(last_name);
    let partternname = /[a-zA-Z]/g;
    let resultname = partternname.test(first_name);
    let patternemail = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    let resultemail = patternemail.test(email);
    let patternphone = /[0-9]{11}/g;
    let resultphone = patternphone.test(phone_no);

    //Boş mu kontrol?
    if (
      !first_name ||
      !last_name ||
      !email ||
      !phone_no ||
      !password ||
      !replay_password
    ) {
      formIsValid = false;
      toast.error("Boş Bırakmayınız!");
    }
    //İsim için harf kontrol?

    if (resultname === false) {
      formIsValid = false;
      toast.warn("Sadece Harf Giriniz!");
    }
    //Soyadı için harf kontrol
    else if (resultLastname === false) {
      formIsValid = false;
      toast.warn("Sadece Harf Giriniz!");
    }
    //Email için uyumluluk kontrol?
    else if (resultemail === false) {
      formIsValid = false;
      toast.error("Eposta Geçerli Değil!");
    } else if (resultphone === false) {
      formIsValid = false;
      toast.error("Telefon Numarası Geçerli Değil!");
    }

    return formIsValid;
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      if (this.state.password == this.state.replay_password) {
        const newUser = {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          password: this.state.password,
          phone_no: this.state.phone_no,
          status:this.state.status
         
        };

        axios
          .post("users/register", newUser
           
          )
          .then((response) => {
            if (response.request.response == "true") {
              toast.success("Kayıt Başarılı! ");
              setTimeout(function(){ this.props.history.push("/")}.bind(this),3000)

            } else if (response.request.response == "false") {
              toast.error("Hata!Kayıt Başarısız! ");
            }
            else if (response.request.response == "err") {
              toast.error("Hata! Eposta Sisteme Kayıtlı! ");
            }
          })
         
      } else {
        toast.error("Hata!Şifreler Uyuşmuyor !");
      }
    }
  }
  render() {
    return (
      <div className="register-box">
        <div className="register-logo">
          <Link to="/register">
            <b>ApartmanSite</b>Panel
          </Link>
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            <form noValidate onSubmit={this.onSubmit}>
              {" "}
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ad"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.onChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Soyad"
                  name="last_name"
                  value={this.state.last_name}
                  onChange={this.onChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email adresi"
                  name="email"
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
                  placeholder="Şifre"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Şifre Tekrar"
                  name="replay_password"
                  value={this.state.replay_password}
                  onChange={this.onChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control phone_no"
                  name="phone_no"
                  maxLength="11"
                  placeholder="Telefon No"
                  value={this.state.phone_no}
                  onChange={this.onChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-phone" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-flat"
                  >
                    Kayıt Ol
                  </button>
                </div>
              </div>
            </form>

            <Link to="/" className="text-center">
              Bir hesabım var{" "}
            </Link>
            <ToastContainer />
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
