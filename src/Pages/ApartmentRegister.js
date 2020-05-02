import React, { Component } from "react";
import Header from "../Home/Header";
import Menu from "../Home/Menu";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Modal from "react-awesome-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class ApartmentRegister extends Component {
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
      title_name:foo.circlenumber,
      showMe: true,
      showUser: false,
      visible: false,
      status:false
    };
  }else
  {
    this.state = {
      circlenumber: "",
      host_name:"" ,
      host_surname:"" ,
      host_phoneno:"",
      host_state:"Boş" ,
      title_name:"",
      showMe: true,
      showUser: false,
      visible: false
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
    this.props.history.push('/apartmentsetting')
  }
  //validation yapısı form
  handleValidation() {
    let host_phoneno = this.state.host_phoneno;
    let circlenumber = this.state.circlenumber;
    let host_name = this.state.host_name;
    let host_surname = this.state.host_surname;
    let host_email = this.state.host_email;
    let formIsValid = true;
   
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
    if (!circlenumber || !host_phoneno || !host_name || !host_surname || !host_email ) {
      formIsValid = false;
      toast.error("Boş Bırakmayınız!");
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
  onSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {

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
      title_name:this.state.title_name,
      host_email: this.state.host_email,
    };
    axios.put("apartmens/apartmensupdate", newApartmenİnfo).then((response) => {
      const newUsers = {
        first_name: this.state.host_name,
        last_name: this.state.host_surname,
        password: this.state.host_phoneno,
        email: this.state.host_email,
        phone_no: this.state.host_phoneno,
        status:this.state.status
      };

      axios
        .post("users/register", newUsers)
        .then((response) => {
           this.openModal(); 
        
        })
        .catch((error) => {
          toast.error("Kullanıcı eklenmedi.");
         
        });
    });
  }
  }
  handleChangeHostState = (e) => {
    let index = e.nativeEvent.target.selectedIndex;

    this.setState({
      host_state: e.nativeEvent.target[index].text,
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
                          <h3 className="card-title">{this.state.title_name} Daire Bilgileri</h3>
                        </div>

                        <form noValidate>
                          <div className="card-body">
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Daire Adı
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Daire Adı:"
                                name="circlenumber"
                                value={this.state.circlenumber}
                                onChange={this.onChange}
                                required
                              ></input>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Daire Durumu
                              </label>
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
                            <div className="form-group">
                              <label htmlFor="exampleInputFile">
                                Ev Sahibi Adı
                              </label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Ev Sahibi Adı:"
                                  name="host_name"
                                  value={this.state.host_name}
                                  onChange={this.onChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputFile">
                                Ev Sahibi Soyadı
                              </label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Ev Sahibi Adı:"
                                  name="host_surname"
                                  value={this.state.host_surname}
                                  onChange={this.onChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputFile">
                                Ev Sahibi Telefon No
                              </label>
                              <div className="input-group">
                              <input
                                type="text"
                                className="form-control phone_no"
                                name="host_phoneno"
                                placeholder="Ev Sahibi Telefon No:"
                                maxLength="11"
                                value={this.state.host_phoneno}
                                onChange={this.onChange}
                              />
                              </div>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputFile">
                                Ev Sahibi Email Adresi
                              </label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Ev Sahibi Email Adresi:"
                                  name="host_email"
                                  value={this.state.host_email}
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
                              <p>Kullanıcı kayıt işlemi başarıyla oluşturulmuştur.</p>
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
export default ApartmentRegister;
