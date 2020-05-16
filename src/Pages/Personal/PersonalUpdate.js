import React, { Component } from "react";
import Header from "../../Home/Header";
import Menu from "../../Home/Menu";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class PersonalUpdate extends Component {
  constructor(props) {
    super(props);
    if (this.props.location.state != undefined) {
      const { personalupdate } = this.props.location.state;
      this.state = {
        _id: personalupdate._id,
        first_name: personalupdate.first_name,
        last_name: personalupdate.last_name,
        adress: personalupdate.adress,
        phone_no: personalupdate.phone_no,
        departmans:personalupdate.departmans,
        sys_phoneno:personalupdate.phone_no,
        showMe: true,
        showUser: false,
        visible: false,
      };
    } else {
      this.state = {
        first_name: "",
        last_name: "",
        adress: "",
        departmans:"Departmanı Seçiniz..",
        phone_no: "",
        showMe: true,
        showUser: false,
        visible: false,
      };
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChangePersonalDepartment = (e) => {
    let index = e.nativeEvent.target.selectedIndex;

    this.setState({
      departmans: e.nativeEvent.target[index].text,
    });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  //validation yapısı form
  handleValidation() {
    let first_name = this.state.first_name;
    let last_name = this.state.last_name;
    let adress = this.state.adress;
    let phone_no = this.state.phone_no;
    let departmans = this.state.departmans;
    let formIsValid = true;
    let partternLastname = /[a-zA-Z]/g;
    let resultLastname = partternLastname.test(last_name);
    let partternname = /[a-zA-Z]/g;
    let resultname = partternname.test(first_name);
    let patternphone = /[0-9]{11}/g;
    let resultphone = patternphone.test(phone_no);

    //Boş mu kontrol?
    if (!first_name || !last_name || !phone_no || !adress) {
      formIsValid = false;
      toast.error("Boş Bırakmayınız!");
    } else if (departmans == "Departmanı Seçiniz..") {
      toast.warn("Lütfen Departmanı Seçiniz..");
      formIsValid = false;
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
    } else if (resultphone === false) {
      formIsValid = false;
      toast.error("Telefon Numarası Geçerli Değil!");
    }

    return formIsValid;
  }
  updatePersonal()
  {
    const update_personal = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      adress: this.state.adress,
      phone_no: this.state.phone_no,
      departmans:this.state.departmans,
      _id: this.state._id,
    };
    confirmAlert({
      title: "Personel Güncelle",
      message: "Personeli güncellemek istediğinize emin misiniz?",
      buttons: [
        {
          label: "Evet",
          onClick: () =>
    axios
      .put("personals/personalupdate", update_personal)
      .then((response) => {
        this.props.history.push("/personallist");
      })
      .catch((error) => {
        console.log(error);
      }),
    },
    {
      label: "Hayır",
      onClick: () => this.props.history.push("/personalupdate"),
    },
  ],
});
  }
  onSubmit(e) {
      
    e.preventDefault();
    if (this.handleValidation()) {
   
    if(this.state.phone_no!=this.state.sys_phoneno){
    const sysPhoneno ={
      phone_no:this.state.phone_no
    }
    //telefon no kontrolü
      axios.post("personals/findpersonal",sysPhoneno)
      .then((res)=>{
        if(res.request.response=="true"){
         this.updatePersonal();
        }
       else if(res.request.response=="false"){toast.error("Hata! Telefon Numarası Sisteme Kayıtlı!")}
      })
    }
    else{
      this.updatePersonal();
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
          <div className="card-body">
            <div className="container ">
              <section className="content ">
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    {this.state.showMe ? (
                      <div className="card card-primary">
                      <div className="card-header">
                        <h3 className="card-title">Personel Güncelle</h3>
                      </div>

                      <form noValidate onSubmit={this.onSubmit}>
                            <div className="card-body">
                              <div className="form-group row">
                                <label className="col-sm-5 col-form-label">
                                  Personel Adı :
                                </label>
                                <div className="col-sm-6">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Personel Adı:"
                                    name="first_name"
                                    value={this.state.first_name}
                                    onChange={this.onChange}
                                    required
                                  />
                                </div>
                              </div>

                              <div className="form-group row">
                                <label className="col-sm-5 col-form-label">
                                  Personel Soyadı :
                                </label>
                                <div className="col-sm-6">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Personel Soyadı:"
                                    name="last_name"
                                    value={this.state.last_name}
                                    onChange={this.onChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-5 col-form-label">
                                  Personel Telefon No :
                                </label>
                                <div className="col-sm-6">
                                  <input
                                    type="text"
                                    className="form-control phone_no"
                                    name="phone_no"
                                    placeholder="Personel Telefon No:"
                                    maxLength="11"
                                    value={this.state.phone_no}
                                    onChange={this.onChange}
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-5 col-form-label">
                                  Personel Departmanı :
                                </label>
                                <div className="col-sm-6">
                                  <select
                                    className="form-control"
                                    onChange={
                                      this.handleChangePersonalDepartment
                                    }
                                  >
                                    <option>{this.state.departmans}</option>
                                    <option>Kapıcı </option>
                                    <option>Teknik Servis </option>
                                    <option>Güvenlik </option>
                                    <option>Bahçıvan </option>
                                    <option>Temizlikçi </option>
                                  </select>
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-5 col-form-label">
                                  Personel Adresi :
                                </label>
                                <div className="col-sm-6">
                                  <textarea
                                    rows="3"
                                    className="form-control"
                                    placeholder="Personel Adresi:"
                                    name="adress"
                                    value={this.state.adress}
                                    onChange={this.onChange}
                                    required
                                  />
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
export default PersonalUpdate;
