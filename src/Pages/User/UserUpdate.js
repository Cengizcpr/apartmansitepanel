import React, { Component } from "react";
import Header from "../../Home/Header";
import Menu from "../../Home/Menu";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        emails: userupdate.email,
        sys_email: userupdate.email,
        showMe: true,
        showUser: false,
        visible: false,
      };
    } else {
      this.state = {
        first_name: "",
        last_name: "",
        email: "",
        emails: "",
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
    if (!first_name || !last_name || !email || !phone_no) {
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
  updateUser() {
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
  onSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      //vt aynı email ile güncellemesin diye
      if (this.state.email != this.state.sys_email) {
        const sysEmail = {
          email: this.state.email
        };
        //telefon no kontrolü
        axios.post("users/finduser", sysEmail).then((res) => {
          if (res.request.response == "true") {
            this.updateUser();
          } else if (res.request.response == "false") {
            toast.error("Hata! Eposta Sisteme Kayıtlı!");
          }
        });
      } else {
        this.updateUser();
      }
    }
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
                                  className="form-control phone_no"
                                  placeholder="Kullanıcı Telefon No:"
                                  name="phone_no"
                                  maxLength="11"
                                  value={this.state.phone_no}
                                  onChange={this.onChange}
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
                        </form>{" "}
                        <ToastContainer />
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
