import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import Header from "../../Home/Header";
import Menu from "../../Home/Menu";
import UserMenu from "../../Home/UserMenu";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      new_password: "",
      current_password: "",
      replay_password: "",
      system_pas: "",
      email: "",
      phone_no: "",
      _id: "",
      
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
   
  }
  //Şifre değiştirme
  passwordSubmit(e) {
    e.preventDefault();
    if (this.handleValidationPassword()) {
      if (this.state.new_password != this.state.replay_password) {
        toast.error("Şifreler Uyuşmuyor!");
      } else {
        const updatePassword = {
          current_password: this.state.current_password,
          _id: this.state._id,
          new_password: this.state.new_password,
          system_pas: this.state.system_pas,
        };
        axios.post("users/controlpassword", updatePassword).then((response) => {
          if (response.request.response == "true") {
            axios.put("users/newpassword", updatePassword).then((response) => {
              if (response.request.response == "true") {
                toast.success("Şifreniz Değiştirilmiştir!");
                setTimeout(function(){  window.location.replace("/adminprofile")}.bind(this),3000)

              } else if (response.request.response == "false") {
                toast.error("Hata!Şifreniz Değiştirilemedi!");
              }
            });
          } else if (response.request.response == "false") {
            toast.error("Mevcut şifre yanlış !");
          }
        });
      }
    }
  }
  //Şifre değiştirme validation
  handleValidationPassword(){
    let current_password = this.state.current_password;
    let new_password = this.state.new_password;
    let replay_password = this.state.replay_password;
    let formIsValid = true;
    
    if(!current_password ||
      !new_password ||
      !replay_password)
      {
        formIsValid = false;
        toast.error("Boş Bırakmayınız!");
      }
      return formIsValid;

  }
  //validation yapısı form
  handleValidation() {
    let first_name = this.state.first_name;
    let last_name = this.state.last_name;
    let email = this.state.email;
    let phone_no = this.state.phone_no;
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
      !phone_no 
      
    ) {
      formIsValid = false;
      toast.error("Boş Bırakmayınız!");
    }
    //İsim için harf kontrol?
    else if (resultname === false) {
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
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      const updateUser = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        phone_no: this.state.phone_no,
        _id: this.state._id,
      };

      axios
        .put("users/userupdate", updateUser)
        .then((response) => {
          toast.success("Güncelleme Başarılı !");
          setTimeout(function(){  window.location.replace("/adminprofile")}.bind(this),3000)

        })
        .catch((error) => {
          toast.error("Güncelleme Başarısız !");
        });
    }
  }
  componentDidMount(e) {
    const token = localStorage.usertoken;
    try {
      jwt_decode(token);
      const decoded = jwt_decode(token);
      axios
        .get("users/adminprofile")
        .then((res) => {
          var response = res.data;
          for (var i = 0; i < response.length; i++) {
            if (decoded._id === response[i]._id) {
              if (res.data[i].status) {
                this.setState({
                  first_name: response[i].first_name,
                  last_name: response[i].last_name,
                  phone_no: response[i].phone_no,
                  email: response[i].email,
                  _id: response[i]._id,
                  system_pas: response[i].password,
                 
                  showMe: true,
                });
              } else {
                this.setState({
                  first_name: response[i].first_name,
                  last_name: response[i].last_name,
                  phone_no: response[i].phone_no,
                  email: response[i].email,
                  _id: response[i]._id,
                  system_pas: response[i].password,
                  showMe: false,
                });
              }
            }
          }
        })
        .catch((err) => {
          window.location.replace("/");
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
        {" "}
        <Header />
        {partial}
        <div className="container">
          <div className="content-header">
            <div className="main-panel">
              <div>
                <div>
                  <div>
                    <div className="d-flex align-items-center">
                      <h4 className="mb-0 font-weight-bold">
                        Bilgilerim
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 grid-margin stretch-card mb-2">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title">
                          Bilgilerinizi Güncelleyin
                        </h4>
                        <p className="card-description">.</p>
                        <form
                          className="forms-sample"
                          noValidate
                          onSubmit={this.onSubmit}
                        >
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Adı
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                name="first_name"
                                value={this.state.first_name}
                                onChange={this.onChange}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Soyadı
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                name="last_name"
                                value={this.state.last_name}
                                onChange={this.onChange}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Eposta
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Telefon
                            </label>
                            <div className="col-9">
                              <input
                                type="text"
                                className="form-control phone_no"
                                name="phone_no"
                                maxLength="11"
                                value={this.state.phone_no}
                                onChange={this.onChange}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-sm-9">
                              <button
                                type="submit"
                                className="btn btn-primary mr-2"
                                name="kaydet"
                                value="true"
                                onClick={this.onSubmit}
                              >
                                Kaydet
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <ToastContainer />

                  <div className="col-md-6 grid-margin stretch-card mb-2">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title">Şifrenizi Değiştirin</h4>
                        <p className="card-description">.</p>
                        <form
                          className="forms-sample"
                          onSubmit={this.passwordSubmit.bind(this)}
                        >
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Mevcut Şifre
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="password"
                                className="form-control"
                                name="current_password"
                                onChange={this.onChange}
                                value={this.state.current_password}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Şifre
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="password"
                                className="form-control"
                                name="new_password"
                                onChange={this.onChange}
                                value={this.state.new_password}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Şifre - Tekrar
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="password"
                                className="form-control"
                                name="replay_password"
                                onChange={this.onChange}
                                value={this.state.replay_password}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-sm-9">
                              <button
                                className="btn btn-primary mr-2"
                                onSubmit={this.passwordSubmit.bind(this)}
                              >
                                Kaydet
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
