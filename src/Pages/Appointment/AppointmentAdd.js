import React, { Component } from "react";
import Header from "../../Home/Header";
import Menu from "../../Home/Menu";
import UserMenu from "../../Home/UserMenu";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class AppointmentAdd extends Component {
  constructor() {
    super();

    this.state = {
      name_surname: "",
      appo_title: "",
      appo_subject: "",   
      appo_comment: "",
      _id: "",
      phone_no:"",
      
      appo_state:false,
      locationsappo: [],
      menuVisible:true
    
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleValidation() {
    let formIsValid = true;
    let appo_title = this.state.appo_title;
    let appo_subject = this.state.appo_subject;
    let name_surname = this.state.name_surname;
    let appo_comment = this.state.appo_comment;

    //Boş mu kontrol?
    if (
      !appo_comment ||
      !appo_title ||
      !appo_subject ||
      !name_surname 
     
    ) {
      formIsValid = false;
      toast.error("Boş Alan Bırakmayınız!");
    } 
    return formIsValid;
  }
  deleteAppo(data) {
    axios
      .post("appointment/appodelete", { _id: data._id })
      .then((res) => {
        toast.success("Randevu Silindi!");
        setTimeout(function(){  window.location.replace("/apporegister")}.bind(this),3000)


      })
      .catch((err) => {
        toast.error("Hata! Randevu Silinemedi!");
      });
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      const newAppointment = {
        name_surname: this.state.name_surname,
        appo_title: this.state.appo_title,
        appo_subject: this.state.appo_subject,
        appo_comment: this.state.appo_comment,
        phone_no:this.state.phone_no,
        appo_state:false
      };

      axios
        .post("appointment/apporegister", newAppointment)
        .then((res) => {
          toast.success("Randevu Talep Başarılı!");
          setTimeout(function(){  window.location.replace("/apporegister")}.bind(this),3000)
        })
        .catch((err) => {
          toast.error("Hata! Talep Başarısız!");
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
             if (response[i].status) {
              this.setState({
                showMe: true,
              });
            } 
            else{
              this.setState({
                showMe: false,
              });
            }
            axios
              .post("users/findiduser", { _id: decoded._id })
              .then((res) => {
                this.setState({
                    name_surname: res.data.first_name + " " + res.data.last_name,
                    phone_no:res.data.phone_no
                });
                
                //arıza listelenmesı
                axios.get("appointment/appolist").then((res) => {
                  const result = [];
                 
                    
                  for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].phone_no == this.state.phone_no) {
                      
                      result[i] = res.data[i];
                     
                     
                    }
                 
                  }if(res.data.length>0){
                  this.setState({
                    locationsappo: result,
                  });
                }
                else{
                  toast.info("Herhangi Randevu Talebiniz Bulunmamaktadır!")
                }
                })  
              })
              .catch((err) => {
                toast.error("Hata! Randevu Sahibi Listelenemedi!");
              });
          }
        
        }
      });
    } catch (error) {
      window.location.replace("/");
    }
  }

  render() {
    const appoinfo = this.state.locationsappo.map((data) => (
      <div className="alert alert-dark alert-dismissible" key={data._id}>
        <button
          type="button"
          className="close"
          onClick={() => this.deleteAppo(data)}
        >
          ×
        </button>
        <h5>
          <i className="icon fas fa-exclamation-triangle"></i> Randevu 
        </h5>
        <p>
          {" "}
        <b>  Başlık :</b> {data.appo_title} <b> Konusu : </b> {data.appo_subject} <p> <b>Randevu Durumu : </b>{data.appo_state ? "Beklemede" : "Kabul Edildi"}   <br/> <b>Açıklama : </b>  {data.appo_comment}</p>
      
        </p>
       
      </div>
    ));
    var partial;
    if (this.state.showMe === true) {
      partial = <Menu />;
    } else if (this.state.showMe === false) {
      partial = <UserMenu />;
    }
    return (
      <div>
        <Header />
       {partial}
        <div className="content-wrapper">
          <div className="card">
            <div className="card-body">
              <div className="container-fluid">
                <div className="container">
                  <div className="content-header">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="card card-dark">
                          <div className="card-header border-0">
                            <div className="d-flex justify-content-between">
                              <h3 className="card-title">Randevu Talep Formu</h3>
                            </div>
                          </div>
                          <div className="card-body">
                            <form
                              className="forms-sample"
                              onSubmit={this.onSubmit}
                            >
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                  Ad Soyad :
                                </label>
                                <div className="col-sm-9">
                                  <label className="col-sm-9 col-form-label">
                                    {this.state.name_surname}
                                  </label>
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                Telefon No :
                                </label>
                                <div className="col-sm-9">
                                  <label className="col-sm-9 col-form-label">
                                    {this.state.phone_no}
                                  </label>
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                  Başlık :
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Randevu Başlık:"
                                    name="appo_title"
                                    value={this.state.appo_title}
                                    onChange={this.onChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                  Konusu :
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder=" Randevu Konusu:"
                                    name="appo_subject"
                                    value={this.state.appo_subject}
                                    onChange={this.onChange}
                                    required
                                  />
                                </div>
                              </div>
                            

                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                  Açıklama :
                                </label>
                                <div className="col-sm-9">
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
                              <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={this.onSubmit}
                              >
                                Kaydet
                              </button>
                            </form>{" "}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="card card-dark">
                          <div className="card-header border-0">
                            <div className="d-flex justify-content-between">
                              <h3 className="card-title">Randevu Taleplerim</h3>
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="position-relative mb-4">
                              <div className="chartjs-size-monitor">
                                <div className="chartjs-size-monitor-expand">
                                  <div className />
                                </div>
                                <div className="chartjs-size-monitor-shrink"></div>
                              </div>

                              <div class="col-12">{appoinfo}</div>
                            </div>
                           
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AppointmentAdd;
