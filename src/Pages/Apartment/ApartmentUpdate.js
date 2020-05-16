import React, { Component } from "react";
import Header from "../../Home/Header";
import Menu from "../../Home/Menu";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Modal from "react-awesome-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class ApartmentUpdate extends Component {
  constructor(props) {
    super(props);

    if (this.props.location.state != undefined) {
      const { foo } = this.props.location.state;

      this.state = {
        circlenumber: foo.circlenumber,
        host_name: foo.host_name,
        host_surname: foo.host_surname,
        host_phoneno: foo.host_phoneno,
        host_state: foo.host_state,
        host_email: foo.host_email,
        title_name: foo.circlenumber,
        sys_circlenumber: foo.circlenumber,
        car_numbers: foo.car_numbers,
        showMe: true,
        showUser: false,
        visible: false,
        status: false,
        locations: [],
      };
    } else {
      this.state = {
        circlenumber: "",
        host_name: "",
        host_surname: "",
        host_phoneno: "",
        host_state: "",
        title_name: "",
        car_numbers: "",
        showMe: true,
        showUser: false,
        visible: false,
        status: false,
        locations: [],
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
  //validation yapısı form
  handleValidation() {
    let host_phoneno = this.state.host_phoneno;
    let circlenumber = this.state.circlenumber;
    let host_name = this.state.host_name;
    let host_surname = this.state.host_surname;
    let host_email = this.state.host_email;
    let formIsValid = true;
    let host_state = this.state.host_state;
    let partternname = /[a-zA-Z0-9]/g;
    let resultCirclename = partternname.test(circlenumber);
    let partternhostname = /[a-zA-Z]/g;
    let resultHostname = partternhostname.test(host_name);
    let partternSurname = /[a-zA-Z0-9]/g;
    let resultSurname = partternSurname.test(host_surname);
    let patternemail = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    let resultemail = patternemail.test(host_email);
    let patternphone = /[0-9]{11}/g;
    let resultphone = patternphone.test(host_phoneno);

    //Boş mu kontrol?
    if (
      !circlenumber ||
      !host_phoneno ||
      !host_name ||
      !host_surname ||
      !host_email
    ) {
      formIsValid = false;
      toast.error("Boş Bırakmayınız!");
    }
    //Daire Durumu Kontrol
    else if (host_state === "Boş") {
      formIsValid = false;
      toast.warn("Lütfen Daire Durumu Seçiniz!");
    }
    //Daire adı için harf kontrol?
    else if (resultCirclename === false) {
      formIsValid = false;
      toast.warn("Sadece Harf veya Sayı Giriniz!");
    }
    //Daire ev sahibi adı için harf kontrol?
    else if (resultHostname === false) {
      formIsValid = false;
      toast.warn("Sadece Harf Giriniz!");
    }
    //Daire ev sahibi soyadı için harf kontrol?
    else if (resultSurname === false) {
      formIsValid = false;
      toast.warn("Sadece Harf Giriniz!");
    } //Telefon no
    else if (resultphone === false) {
      formIsValid = false;
      toast.warn("Geçerli Telefon Numarası Değil!");
    }
    //Email için uyumluluk kontrol?
    else if (resultemail === false) {
      formIsValid = false;
      toast.error("Eposta Geçerli Değil!");
    }

    return formIsValid;
  }
  //daire güüncelle
  updateApartmen() {
    var style_box = "small-box bg-danger";
    if (this.state.host_state == "Ev Sahibi") {
      style_box = "small-box bg-primary";
    } else if (this.state.host_state == "Kiracı") {
      style_box = "small-box bg-warning";
    }

    const newApartmenİnfo = {
      circlenumber: this.state.circlenumber,
      host_name: this.state.host_name,
      host_surname: this.state.host_surname,
      host_phoneno: this.state.host_phoneno,
      host_state: this.state.host_state,
      style_box: style_box,
      title_name: this.state.title_name,
      host_email: this.state.host_email,
      car_numbers: this.state.car_numbers,
    };
    axios.put("apartmens/apartmensupdate", newApartmenİnfo).then((response) => {
      const newUsers = {
        first_name: this.state.host_name,
        last_name: this.state.host_surname,
        password: this.state.host_phoneno,
        email: this.state.host_email,
        phone_no: this.state.host_phoneno,
        status: this.state.status,
      };

      axios.post("users/register", newUsers).then((response) => {
        if (response.request.response == "true") {
          this.openModal();
        } else if (response.request.response == "false") {
          toast.error("Hata!Kayıt Başarısız! ");
        } else if (response.request.response == "err") {
          toast.error("Hata! Eposta Sisteme Kayıtlı! ");
        }
      });
    });
  }
  //vt kontrol
  onSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      //vt aynı daite ile güncellemesin diye
      if (this.state.circlenumber != this.state.sys_circlenumber) {
        const sysApartmen = {
          circlenumber: this.state.circlenumber,
        };
        //daire adı kontrolü
        axios.post("apartmens/findapartmens", sysApartmen).then((res) => {
          if (res.request.response == "true") {
            this.updateApartmen();
          } else if (res.request.response == "false") {
            toast.error("Hata! Daire Adı Sisteme Kayıtlı!");
          }
        });
      } else {
        this.updateApartmen();
      }
    }
  }
  handleChangeHostState = (e) => {
    let index = e.nativeEvent.target.selectedIndex;

    this.setState({
      host_state: e.nativeEvent.target[index].text,
    });
  };
  handleChangeCar = (e) => {
    let index = e.nativeEvent.target.selectedIndex;

    this.setState({
      car_numbers: e.nativeEvent.target[index].text,
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
            if (this.state.car_numbers == "") {
              this.setState({
                car_numbers: "Araç Sayısı Seçiniz..",
              });
            }
            const res = [];
            for (var i = 1; i <= 5; i++) {
              res[i] = i;
            }
            this.setState({
              locations: res,
            });
          }
        }
      });
    } catch (error) {
      window.location.replace("/");
    }
  }

  render() {
    const carnumbers = this.state.locations.map((data) => (
      <option key={data}>{data}</option>
    ));
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
                            Daire {this.state.title_name} Bilgileri
                          </h3>
                        </div>

                        <form noValidate onSubmit={this.onSubmit}>
                          <div className="card-body">
                            <div className="form-group row">
                              <label className="col-sm-5 col-form-label">
                                Daire Adı :
                              </label>
                              <div className="col-sm-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Daire Adı:"
                                  name="circlenumber"
                                  value={this.state.circlenumber}
                                  onChange={this.onChange}
                                  required
                                />
                              </div>
                            </div>

                            <div className="form-group row">
                              <label className="col-sm-5 col-form-label">
                                Daire Durumu :
                              </label>
                              <div className="col-sm-6">
                                <select
                                  className="form-control"
                                  onChange={this.handleChangeHostState}
                                >
                                  <option>{this.state.host_state}</option>
                                  <option>Boş</option>
                                  <option> Ev Sahibi </option>
                                  <option> Kiracı </option>
                                </select>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-5 col-form-label">
                                Daire Sakini Adı :
                              </label>
                              <div className="col-sm-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Daire Sakini Adı:"
                                  name="host_name"
                                  value={this.state.host_name}
                                  onChange={this.onChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-5 col-form-label">
                                Daire Sakini Soyadı :
                              </label>
                              <div className="col-sm-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Daire Sakini Soyadı:"
                                  name="host_surname"
                                  value={this.state.host_surname}
                                  onChange={this.onChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-5 col-form-label">
                                Daire Sakini Telefon No :
                              </label>
                              <div className="col-sm-6">
                                <input
                                  type="text"
                                  className="form-control phone_no"
                                  name="host_phoneno"
                                  placeholder="Daire Sakini Telefon No:"
                                  maxLength="11"
                                  value={this.state.host_phoneno}
                                  onChange={this.onChange}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-5 col-form-label">
                                Daire Sakini Email Adresi :
                              </label>
                              <div className="col-sm-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder=" Daire Sakini Email Adresi:"
                                  name="host_email"
                                  value={this.state.host_email}
                                  onChange={this.onChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-5 col-form-label">
                                Daire Araç Sayısı:
                              </label>
                              <div className="col-sm-6">
                                <select
                                  className="form-control"
                                  onChange={this.handleChangeCar}
                                >
                                  <option>{this.state.car_numbers}</option>
                                  <option>Araç Yok</option>
                                  {carnumbers}
                                </select>
                              </div>
                            </div>
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
                              <p>Email : {this.state.host_email}</p>
                              <p>Şifre : {this.state.host_phoneno}</p>
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
export default ApartmentUpdate;
