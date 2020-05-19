import React, { Component } from "react";
import Header from "../../Home/Header";
import Menu from "../../Home/Menu";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Modal from "react-awesome-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class StoreUpdate extends Component {
  constructor(props) {
    super(props);

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
        sys_storenumber: storeinfo.storenumber,
        car_numbers: storeinfo.car_numbers,
        showMe: true,
        showUser: false,
        visible: false,
        status: false,
        locations: [],
      };
    } else {
      this.state = {
        storenumber: "",
        store_name: "",
        store_surname: "",
        store_phoneno: "",
        store_state: "",
        store_email: "",
        style_box: "",
        title_name:"",
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
    this.props.history.push("/storesetting");
  }
  //validation yapısı form
  handleValidation() {
    let store_phoneno = this.state.store_phoneno;
    let storenumber = this.state.storenumber;
    let store_name = this.state.store_name;
    let store_surname = this.state.store_surname;
    let store_email = this.state.store_email;
    let formIsValid = true;
    let store_state = this.state.store_state;
    let partternname = /[a-zA-Z0-9]/g;
    let resultStorename = partternname.test(storenumber);
    let partternstorename = /[a-zA-Z]/g;
    let resultStoreNumbername = partternstorename.test(store_name);
    let partternSurname = /[a-zA-Z0-9]/g;
    let resultSurname = partternSurname.test(store_surname);
    let patternemail = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    let resultemail = patternemail.test(store_email);
    let patternphone = /[0-9]{11}/g;
    let resultphone = patternphone.test(store_phoneno);

    //Boş mu kontrol?
    if (
      !storenumber ||
      !store_phoneno ||
      !store_name ||
      !store_surname ||
      !store_email
    ) {
      formIsValid = false;
      toast.error("Boş Bırakmayınız!");
    }
    //Dükkan Durumu Kontrol
    else if (store_state === "Boş") {
      formIsValid = false;
      toast.warn("Lütfen Dükkan Durumu Seçiniz!");
    }
    //Dükkan adı için harf kontrol?
    else if (resultStoreNumbername === false) {
      formIsValid = false;
      toast.warn("Sadece Harf veya Sayı Giriniz!");
    }
    //Daire ev sahibi adı için harf kontrol?
    else if (resultStorename === false) {
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
  //dükkan güüncelle
  updateStore() {
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
      car_numbers: this.state.car_numbers,
    };
    axios.put("stores/storesupdate", newStoreİnfo).then((response) => {
      const newUsers = {
        first_name: this.state.store_name,
        last_name: this.state.store_surname,
        password: this.state.store_phoneno,
        email: this.state.store_email,
        phone_no: this.state.store_phoneno,
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
      if (this.state.storenumber != this.state.sys_storenumber) {
        const sysStore = {
          storenumber: this.state.storenumber,
        };
        //dükkan adı kontrolü
        axios.post("stores/findstore", sysStore).then((res) => {
          if (res.request.response == "true") {
            this.updateStore();
          } else if (res.request.response == "false") {
            toast.error("Hata! Dükkan Adı Sisteme Kayıtlı!");
          }
        });
      } else {
        this.updateStore();
      }
    }
  }
  handleChangeHostState = (e) => {
    let index = e.nativeEvent.target.selectedIndex;

    this.setState({
      store_state: e.nativeEvent.target[index].text,
    });
  };
  handleChangeCar = (e) => {
    let index = e.nativeEvent.target.selectedIndex;

    this.setState({
      car_numbers: e.nativeEvent.target[index].text,
    });
    console.log(this.state.car_numbers)
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
        <div className="card-body">
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
                      <form noValidate onSubmit={this.onSubmit}>
                          <div className="card-body">
                            <div className="form-group row">
                              <label className="col-sm-5 col-form-label">
                              Dükkan Adı :
                              </label>
                              <div className="col-sm-6">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Dükkan No:"
                              name="storenumber"
                              value={this.state.storenumber}
                              onChange={this.onChange}
                              required
                            />
                              </div>
                            </div>

                            <div className="form-group row">
                              <label className="col-sm-5 col-form-label">
                                Dükkan Durumu :
                              </label>
                              <div className="col-sm-6">
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
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-5 col-form-label">
                              Dükkan Sahibi Adı :
                              </label>
                              <div className="col-sm-6">
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
                            <div className="form-group row">
                              <label className="col-sm-5 col-form-label">
                             Dükkan Sahibi Soyadı :
                              </label>
                              <div className="col-sm-6">
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
                            <div className="form-group row">
                              <label className="col-sm-5 col-form-label">
                              Dükkan Telefon No :
                              </label>
                              <div className="col-sm-6">
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
                            <div className="form-group row">
                              <label className="col-sm-5 col-form-label">
                              Dükkan Email Adresi :
                              </label>
                              <div className="col-sm-6">
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
                            <div className="form-group row">
                              <label className="col-sm-5 col-form-label">
                              Dükkan Araç Sayısı:
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
                      <ToastContainer />
                    </div>
                  ) : null}
                </div>
              </div>
            </section>
          </div>
          </div>
        </div>
      </div>
      {this.state.showUser ? this.props.history.push("/statuserror") : null}
    </div>
    );
  }
}
export default StoreUpdate;
