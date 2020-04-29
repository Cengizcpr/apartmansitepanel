import React, { Component } from "react";
import Header from "../Home/Header";
import Menu from "../Home/Menu";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Modal from "react-awesome-modal";

class StoreRegister extends Component {
  constructor(props) {
    super(props);
    //storeregister kontrol
    if (this.props.location.state != undefined) {
      const { storeinfo } = this.props.location.state;
      this.state = {
        storenumber: storeinfo.storenumber,
        store_name: storeinfo.store_name,
        store_surname: storeinfo.store_surname,
        store_phoneno: storeinfo.store_phoneno,
        store_state: storeinfo.store_state,
        store_email: storeinfo.store_email,
        style_box: storeinfo.style_box,
        title_name: storeinfo.storenumber,
        showMe: true,
        showUser: false,
        visible: false,
      };
    } else {
      this.state = {
        storenumber: "",
        store_name: "",
        store_surname: "",
        store_phoneno: "",
        store_state: "Boş",
        store_email: "",
        title_name: "",
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
  openModal() {
    this.setState({
      visible: true,
    });
  }

  closeModal() {
    this.setState({
      visible: false,
    });
    this.props.history.push("/apartmentsetting");
  }
  onSubmit(e) {
    e.preventDefault();
    var style_box = "small-box bg-danger";
    if (this.state.store_state == "Ev Sahibi") {
      style_box = "small-box bg-primary";
    } else if (this.state.store_state == "Kiracı") {
      style_box = "small-box bg-warning";
    }

    const newStoreİnfo = {
      storenumber: this.state.storenumber,
      store_name: this.state.store_name,
      store_surname: this.state.store_surname,
      store_phoneno: this.state.store_phoneno,
      store_state: this.state.store_state,
      style_box: style_box,
      store_email: this.state.store_email,
      title_name: this.state.title_name,
    };
    axios.put("stores/storesupdate", newStoreİnfo).then((response) => {
      const newUsers = {
        first_name: this.state.store_name,
        last_name: this.state.store_surname,
        password: this.state.store_phoneno,
        email: this.state.store_email,
        phone_no: this.state.store_phoneno,
      };

      axios
        .post("users/useradd", newUsers)
        .then((response) => {
          this.openModal();
        })
        .catch((error) => {
          console.log("Kullanıcı eklenmedi.");
        });
    });
  }
  handleChangeHostState = (e) => {
    let index = e.nativeEvent.target.selectedIndex;

    this.setState({
      store_state: e.nativeEvent.target[index].text,
    });
  };

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
                          <h3 className="card-title">
                            {this.state.title_name} Dükkan Bilgileri
                          </h3>
                        </div>

                        <form noValidate>
                          <div className="card-body">
                       
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Dükkan Adı
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Dükkan Adı:"
                                name="storenumber"
                                value={this.state.storenumber}
                                onChange={this.onChange}
                                required
                              ></input>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Dükkan Durumu
                              </label>
                              <select
                                className="form-control"
                                onChange={this.handleChangeHostState}
                              >
                                <option>{this.state.store_state}</option>
                                <option>Boş</option>
                                <option> Ev Sahibi </option>
                                <option> Kiracı </option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputFile">
                                Dükkan Sahibi Adı
                              </label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Dükkan Sahibi Adı:"
                                  name="store_name"
                                  value={this.state.store_name}
                                  onChange={this.onChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputFile">
                                Dükkan Sahibi Soyadı
                              </label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Dükkan Sahibi Soyadı:"
                                  name="store_surname"
                                  value={this.state.store_surname}
                                  onChange={this.onChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputFile">
                                Dükkan Telefon No
                              </label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Dükkan Telefon No:"
                                  name="store_phoneno"
                                  value={this.state.store_phoneno}
                                  onChange={this.onChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputFile">
                                Dükkan Email Adresi
                              </label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Dükkan Email Adresi:"
                                  name="store_email"
                                  value={this.state.store_email}
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
                        <section>
                          <Modal
                            visible={this.state.visible}
                            width="600"
                            height="300"
                            effect="fadeInUp"
                            onClickAway={() => this.closeModal()}
                          >
                            <div className="modal-header">
                              {" "}
                              <h5>Bilgilendirme</h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                onClick={() => this.closeModal()}
                              >
                                &times;
                              </button>
                            </div>
                            <div className="modal-body">
                              <p>
                                Kullanıcı kayıt işlemi başarıyla
                                oluşturulmuştur.
                              </p>
                              <p>Email : {this.state.store_email}</p>
                              <p>Şifre : {this.state.store_phoneno}</p>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-default"
                                data-dismiss="modal"
                                onClick={() => this.closeModal()}
                              >
                                Kapat
                              </button>
                            </div>
                          </Modal>
                        </section>
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
export default StoreRegister;
