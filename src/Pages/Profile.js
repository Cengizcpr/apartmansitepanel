import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import Header from "../Home/Header";
import Menu from "../Home/Menu";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      phone_no: "",
      _id: "",
      status: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
/*     this.onSubmitPassword = this.onSubmit.bind(this);
 */
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

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
      })
      .catch((error) => {
        console.log(error);
      });
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
            if (decoded.first_name === response[i].first_name) {
              console.log(res.data[i].status);
              if (res.data[i].status) {
                this.setState({
                  first_name: response[i].first_name,
                  last_name: response[i].last_name,
                  phone_no: response[i].phone_no,
                  email: response[i].email,
                  _id: response[i]._id,
                  status: "Yönetici",
                });
              } else {
                this.setState({
                  first_name: response[i].first_name,
                  last_name: response[i].last_name,
                  phone_no: response[i].phone_no,
                  email: response[i].email,
                  _id: response[i]._id,
                  status: "Kullanıcı",
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
    return (
      <div>
        {" "}
        <Header />
        <Menu />
        <div className="container">
          <div className="content-header">
            <div className="main-panel">
              <div>
                <div>
                  <div>
                    <div className="d-flex align-items-center">
                      <h4 className="mb-0 font-weight-bold">Bilgilerim</h4>
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
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control phone_no"
                                name="phone_no"
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
                        <form className="forms-sample" >
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Mevcut Şifre
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="password"
                                className="form-control"
                                name="current_password
                                "
                                onChange={this.onChange}

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
                                name="new_password"
                                onChange={this.onChange}

                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-sm-9">
                              <button
                                type="submit"
                                className="btn btn-primary mr-2"
                                /* onClick={this.onSubmit} */

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
