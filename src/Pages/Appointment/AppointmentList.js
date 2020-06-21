import React, { Component } from "react";
import Header from "../../Home/Header";
import Menu from "../../Home/Menu";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Modal from "react-awesome-modal";
class AppointmentList extends Component {
  constructor() {
    super();

    this.state = {
      name_surname: "",
      phone_no: "",
      appo_title: "",
      appo_subject: "", 
      appo_comment: "",
      appo_state: "", 
      _id: "",
      locationappolist: [],
      showMe: true,
      showUser: false,
      visible: false,
      visibleappo: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleChangeAppoState = (e) => {
    e.preventDefault();
    let index = e.nativeEvent.target.selectedIndex;

    this.setState({
      appo_state: e.nativeEvent.target[index].text,
    });
  };

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
  }
  openModalAppointment() {
    this.setState({
      visibleappo: true,
    });
  }

  closeModalAppointment() {
    this.setState({
      visibleappo: false,
    });
  }
  infoAppo(data) {
    this.setState({
      name_surname: data.name_surname,
      appo_title: data.appo_title,
      appo_subject: data.appo_subject,
      appo_comment: data.appo_comment,
      phone_no:data.phone_no,
      appo_state:data.appo_state,
      _id: data._id,
    });
    this.openModalAppointment(); 
  }
  onSubmit(e) {
    e.preventDefault();

  
    if(this.state.appo_state=="Kabul Edildi"){
   const appoData = {
        name_surname: this.state.name_surname,
        appo_title: this.state.appo_title,
        appo_subject: this.state.appo_subject,
        appo_comment: this.state.appo_comment,
        phone_no:this.state.phone_no,
        appo_state:true,
        _id: this.state._id,
      };

    axios.put("appointment/appoupdate", appoData).then((response) => {
      if (response.request.response == "true") {
        this.closeModalAppointment();
       
     const message={
      to:"+9"+this.state.phone_no,
      body:"Randevu Kabul Edildi."
    } 
    axios.post("/api/messages",message).then((res)=>{
      toast.success("Güncelleme Başarılı! ");
      setTimeout(function(){  window.location.replace("/appointmentlist")}.bind(this),1000)
    }).catch((err)=>{
      toast.error("Hata! Güncelleme Başarısız! ");
    })
       

      } else if (response.request.response == "false") {
        this.closeModalAppointment();
        toast.error("Hata! Güncelleme Başarısız! ");
      }
    }); 
    }
    else if(this.state.appo_state=="Beklemede"){
      const  appoData = {
        name_surname: this.state.name_surname,
        appo_title: this.state.appo_title,
        appo_subject: this.state.appo_subject,
        appo_comment: this.state.appo_comment,
        phone_no:this.state.phone_no,
        appo_state:false,
        _id: this.state._id,
      };

    axios.put("appointment/appoupdate", appoData).then((response) => {
      if (response.request.response == "true") {
        this.closeModalAppointment();
       
 
      toast.success("Güncelleme Başarılı! ");
      setTimeout(function(){  window.location.replace("/appointmentlist")}.bind(this),1000)
   

      } else if (response.request.response == "false") {
        this.closeModalAppointment();
        toast.error("Hata! Güncelleme Başarısız! ");
      }
    }); 
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
          if (decoded._id === response[i]._id) {
            if (response[i].status == false) {
              this.setState({
                showMe: false,
                showUser: true,
              });
            }
            axios.get("appointment/appolist").then((response) => {
              if (response.data.length != 0) {
                this.setState({
                  locationappolist: response.data,
                });
              } else {
                this.openModal();
              }
            });
          }
        }
      });
    } catch (error) {
      window.location.replace("/");
    }
  }

  render() {
    const appolists = this.state.locationappolist.map((data) => (
      <div
        className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch"
        key={data._id}
      >
        <div className="card bg-light">
          <div className="card-header text-muted border-bottom-0">
            {data.name_surname}
          </div>
          <div className="card-body pt-0">
            <div className="row">
              <div className="col-7">
                <p className="text-muted text-md">
                  <b>Randevu Başlık :</b> {data.appo_title}
                </p>
                <p className="text-muted text-md">
                  <b> Konusu: </b> {data.appo_subject}
                </p>
                
                <p className="text-muted text-md">
                  <b>Durum : </b> {data.appo_state?"Kabul Edildi": "Beklemede"  }
                </p>
              </div>
              <div className="col-5 text-center">
                <img
                  src={require("../appointment.png")}
                  className="img-circle img-fluid"
                />
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="text-right">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => this.infoAppo(data)}
              >
                <i class="fas fa-cog"></i>
                Randevu Detayları
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        <Header />
        <Menu />

        <div className="content-wrapper">
          <div className="card">
            <div className="card-body">
              <div className="container-fluid">
                <div className="container">
                  {this.state.showMe ? (
                    <div className="content-header">
                      <div className="col-md-12">
                        <div className="card card-dark">
                          <div className="card-header">
                            <h3 className="card-title">Randevu Listele</h3>
                          </div>
                          <div className="card-body">
                            <div className="main-panel">
                              <div>
                                <div className="row">
                                  <div className="col-md-12 grid-margin stretch-card mb-2">
                                    <div className="row d-flex align-items-stretch">
                                      {appolists}
                                    </div>
                                  </div>
                                  <ToastContainer />
                                  <section>
                                    <Modal
                                      visible={this.state.visible}
                                      width="600"
                                      height="200"
                                      effect="fadeInUp"
                                      onClickAway={() => this.closeModal()}
                                    >
                                      <div className="modal-header">
                                        {" "}
                                        <h5>Uyarı</h5>
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
                                        <p>Randevu Listesi Boş.</p>
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
                                    <Modal
                                      visible={this.state.visibleappo}
                                      width="800"
                                      height="600"
                                      effect="fadeInUp"
                                      onClickAway={() => this.closeModalAppointment()}
                                    >
                                      <div className="modal-header">
                                        {" "}
                                        <h5>Randevu </h5>
                                        <button
                                          type="button"
                                          className="close"
                                          data-dismiss="modal"
                                          onClick={() => this.closeModalAppointment()}
                                        >
                                          &times;
                                        </button>
                                      </div>
                                      <div className="modal-body">
                                      
                                        <div className="form-group row justify-content-center">
                                          <label className="col-sm-3 col-form-label">
                                            Ad Soyad :
                                          </label>
                                          <div className="col-sm-7">
                                            <h3 className="col-sm-7 col-form-label">
                                              {this.state.name_surname}
                                            </h3>
                                          </div>
                                        </div>
                                        <div className="form-group row justify-content-center">
                                          <label className="col-sm-3 col-form-label">
                                           Telefon No :
                                          </label>
                                          <div className="col-sm-7">
                                            <h3 className="col-sm-7 col-form-label">
                                              {this.state.phone_no}
                                            </h3>
                                          </div>
                                        </div>
                                        <div className="form-group row justify-content-center">
                                          <label className="col-sm-3 col-form-label">
                                            Randevu Başlık :
                                          </label>
                                          <div className="col-sm-7">
                                            <h3 className="col-sm-7 col-form-label">
                                              {this.state.appo_title}
                                            </h3>
                                          </div>
                                        </div>
                                        <div className="form-group row justify-content-center">
                                          <label className="col-sm-3 col-form-label">
                                          Randevu Konusu :
                                          </label>
                                          <div className="col-sm-7">
                                            <h3 className="col-sm-7 col-form-label">
                                              {this.state.appo_subject}
                                            </h3>
                                          </div>
                                        </div>
                                        <div className="form-group row justify-content-center">
                                          <label className="col-sm-3 col-form-label">
                                            Randevu Durum :
                                          </label>
                                          <div className="col-sm-7">
                                            <h3 className="col-sm-7 col-form-label">
                                              <select
                                                className="form-control"
                                                onChange={
                                                  this.handleChangeAppoState
                                                }
                                              >
                                                <option>
                                                  {this.state.appo_state ?"Kabul Edildi": "Beklemede" }
                                                </option> <option>Beklemede</option>
                                                <option>Kabul Edildi</option>
                                               
                                              </select>
                                            </h3>
                                          </div>
                                        </div>
                                        <div className="form-group row justify-content-center">
                                          <label className="col-sm-3 col-form-label">
                                            Randevu Açıklaması :
                                          </label>
                                          <div className="col-sm-7">
                                          <textarea
                                    rows="3"
                                    className="form-control"
                                    placeholder="Randevu Açıklaması :"
                                    name="appo_comment"
                                    value={this.state.appo_comment}
                                    onChange={this.onChange}
                                    maxLength="60"
                                    required
                                  />
                                          </div>
                                        </div>
                                      
                                      </div>
                                      <div className="modal-footer">
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                          onClick={this.onSubmit}
                                        >
                                          Kaydet
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn-danger"
                                          data-dismiss="modal"
                                          onClick={() => this.closeModalAppointment()}
                                        >
                                          Kapat
                                        </button>
                                      </div>
                                    </Modal>
                                  </section>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.state.showUser ? this.props.history.push("/statuserror") : null}
      </div>
    );
  }
}
export default AppointmentList;
