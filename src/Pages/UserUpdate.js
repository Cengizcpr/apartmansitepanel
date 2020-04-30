import React, { Component } from "react";
import Header from "../Home/Header";
import Menu from "../Home/Menu";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Modal from "react-awesome-modal";

class UserRegister extends Component {
  constructor(props) {
    super(props);
    if (this.props.location.state != undefined) {
      const { userupdate } = this.props.location.state;
      this.state = {
        _id: userupdate._id,
        first_name: userupdate.first_name,
        last_name: userupdate.last_name,
        email: userupdate.email,
        phone_no: userupdate.phone_no,
        showMe: true,
        showUser: false,
        visible: false,
      };
    } else {
      this.state = {
        first_name: "",
        last_name: "",
        email: "",
        phone_no: "",
        showMe: true,
        showUser: false,
        visible: false,
      };
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    confirmAlert({
      title: "Kullanıcı Güncelle",
      message: "Kullanıcıyı güncellemek istediğinize emin misiniz?",
      buttons: [
        {
          label: "Evet",
          onClick: () =>
    axios
      .put("users/userupdate", updateUser)
      .then((response) => {
        this.props.history.push("/userslist");
      })
      .catch((error) => {
        console.log(error);
      }),
    },
    {
      label: "Hayır",
      onClick: () => this.props.history.push("/userupdate"),
    },
  ],
});
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
        <Menu />
        <div className="content-wrapper">
          <div className="card">
            <div className="container ">
              <section className="content ">
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    {this.state.showMe ? (
                      <div className="card card-primary">
                        <div className="card-header">
                          <h3 className="card-title">Kullanıcı Güncelle</h3>
                        </div>

                        <form noValidate onSubmit={this.onSubmit}>
                          <div className="card-body">
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Kullanıcı Adı
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Kullanıcı Adı:"
                                name="first_name"
                                value={this.state.first_name}
                                onChange={this.onChange}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Kullanıcı Soyadı
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Kullanıcı Soyadı:"
                                name="last_name"
                                value={this.state.last_name}
                                onChange={this.onChange}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Kullanıcı Eposta
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Kullanıcı Eposta:"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputFile">
                                Kullanıcı Telefon No
                              </label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Kullanıcı Telefon No:"
                                  name="phone_no"
                                  value={this.state.phone_no}
                                  onChange={this.onChange}
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <div className="card-footer">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={this.onSubmit}
                            >
                              Kaydet
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : null}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        {this.state.showUser ? this.props.history.push("/statuserror") : null}
      </div>
    );
  }
}
export default UserRegister;
