import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import Header from "../../Home/Header";
import Menu from "../../Home/Menu";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class CarPark extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      phone_no: "",
      email: "",
      block_name: "",
      car_brand:"",
      car_color:"",
      car_plate:"",
      locations:"",
      car_owner:"",
      showMe: true,
      showUser: false,
      locations: [],
      locationsApartment: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  //Araba validation
  handleValidation(){
    
     let car_brand = this.state.car_brand;
    let car_color = this.state.car_color;
    let car_plate = this.state.car_plate;
    let car_owner = this.state.car_owner;
    let locations = this.state.locations;

    let formIsValid = true;
   
    let partterncolor = /[a-zA-Z]/g;
    let resultColor = partterncolor.test(car_color);
    let partternplate=  /[a-zA-Z0-9]/g/* /^(0[1-9]|[1-7][0-9]|8[01])([A-Z]{4,5})([0-9])/g */;
    let resultCarplate = partternplate.test(car_plate);
    let partternbrand = /[a-zA-Z0-9]/g;
    let resultCarbrand = partternbrand.test(car_brand);
   //Boş mu kontrol?
   if (
    !car_brand ||
    !car_color ||
    !car_plate ||
    !car_owner 
  ) {
    formIsValid = false;
    toast.error("Boş Bırakmayınız!");
  }
   //Renk  için harf kontrol?
   else if (resultColor === false) {
    formIsValid = false;
    toast.warn("Sadece Harf Giriniz!");
  }
   //Plaka  için harf kontrol?
   else if (resultCarplate === false) {
    formIsValid = false;
    toast.error("Plaka Geçerli Değil!");
  }
   //Marka  için harf kontrol?
   else if (resultCarbrand === false) {
    formIsValid = false;
    toast.error("Sadece Harf ve Sayı Giriniz!");
  }
  //Konum  için  kontrol?
  else if (locations === "Konum Seçiniz") {
    formIsValid = false;
    toast.error("Lütfen Konum Seçiniz!");
  }
  return formIsValid;
  }
  onSubmit(e) {
    e.preventDefault();
    if(this.handleValidation()){

    }
  }
  handleChangeCircleNumbers = (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    var circlenumber = e.nativeEvent.target[index].text;
    console.log(circlenumber);
    if (e.nativeEvent.target[index].text == "Daire Seçiniz") {
      toast.warn("Lütfen Daire Seçiniz!");
    } else {
      const result = [];

      for (var i = 0; i < this.state.locationsApartment.length; i++) {
        result[i] = this.state.locationsApartment[i];
        if (result[i].circlenumber == circlenumber) {
          if (result[i].car_numbers != "Araç Yok") {
            this.setState({
              first_name: result[i].host_name,
              last_name: result[i].host_surname,
              phone_no: result[i].host_phoneno,
              email: result[i].host_email,
              car_owner:result[i].host_name+" "+result[i].host_surname
            });
            toast.info("Araç Bilgileri Girebilirsiniz");
          } else {
            toast.error("Araç Yok");
          }
        }
      }
    }
  };
  handleChangeBlockName = (e) => {
    e.preventDefault();
    let index = e.nativeEvent.target.selectedIndex;

    let block_name = e.nativeEvent.target[index].text;

    if (e.nativeEvent.target[index].text == "Blok Seçiniz") {
      toast.warn("Lütfen Blok Seçiniz!");
    } else {
      //istenilen bloğa göre daitre bilgilerini getirir
      axios
        .post("apartmens/apartmenslist", {
          block_name: block_name,
        })
        .then((response) => {
          if (block_name == response.data[0].block_name) {
            const res = [];
            for (var i = 0; i < response.data.length; i++)
              if (response.data[i].host_name != "") {
                res[i] = response.data[i];
              }

            this.setState({
              locationsApartment: res,
            });
          }
        })
        .catch((err) => {
          toast.error("Daire Kayıtları Boş!");
        });
    }
  };

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
            //Blok Sayısı
            axios
              .get("blocks/blockslist")
              .then((response) => {
                if (response.data.length == 0) {
                  this.openModal();
                }
                this.setState({
                  locations: response.data,
                });
              })
              .catch((error) => {
                toast.error("Blok listelenemedi.");
              });
          }
        }
      });
    } catch (error) {
      window.location.replace("/");
    }
  }

  render() {
    const blocknumbers = this.state.locations.map((data) => (
      <option key={data._id}>{data.block_name}</option>
    ));
    const aparmentnumbers = this.state.locationsApartment.map((data) => (
      <option key={data._id}>{data.circlenumber} </option>
    ));
    return (
      <div>
        {" "}
        <Header />
        <Menu />
        <div className="container">
          {" "}
          {this.state.showMe ? (
            <div className="content-header">
              <div className="col-md-12">
                <div className="card card-warning">
                  <div className="card-header">
                    <h3 className="card-title">Otopark İşlemleri</h3>
                  </div>
                  <div className="card-body">
                    <div className="main-panel">
                      <div>
                        <div className="row">
                          <div className="col-md-6 grid-margin stretch-card mb-2">
                            <div className="card">
                              <div className="card-body">
                                <div className="form-group row">
                                  <label className="col-sm-6 col-form-label">
                                    Araç Sahibi Bilgileri
                                  </label>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-4 col-form-label">
                                    Blok Seçiniz :
                                  </label>
                                  <div className="col-sm-4">
                                    <select
                                      className="form-control"
                                      onChange={this.handleChangeBlockName}
                                    >
                                      <option>Blok Seçiniz</option>
                                      {blocknumbers}
                                    </select>
                                  </div>
                                </div>{" "}
                                <div className="form-group row">
                                  <label className="col-sm-4 col-form-label">
                                    Daire Seçiniz :
                                  </label>
                                  <div className="col-sm-4">
                                    <select
                                      className="form-control"
                                      onChange={this.handleChangeCircleNumbers}
                                    >
                                      <option>Daire Seçiniz</option>
                                      {aparmentnumbers}
                                    </select>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-3 col-form-label">
                                    Adı :
                                  </label>
                                  <div className="col-sm-9">
                                    <h3 className="col-sm-9 col-form-label">
                                      {this.state.first_name}
                                    </h3>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-3 col-form-label">
                                    Soyadı :
                                  </label>
                                  <div className="col-sm-9">
                                    <h3 className="col-sm-9 col-form-label">
                                      {this.state.last_name}
                                    </h3>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-3 col-form-label">
                                    Eposta :
                                  </label>
                                  <div className="col-sm-9">
                                    <h3 className="col-sm-9 col-form-label">
                                      {this.state.email}
                                    </h3>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-3 col-form-label">
                                    Telefon :
                                  </label>
                                  <div className="col-9">
                                    <h3 className="col-sm-9 col-form-label">
                                      {this.state.phone_no}
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <ToastContainer />

                          <div className="col-md-6 grid-margin stretch-card mb-2">
                            <div className="card">
                              <div className="card-body">
                                <form className="forms-sample">
                                {/*   <div className="form-group row">
                                    <label className="col-sm-2 col-form-label"></label>
                                    <div className="col-sm-5">
                                      <img
                                        src={require("../lfs-plaka.png")}
                                       
                                        className="pull-right"
                                      />
                                    </div>
                                  </div> */}
                                  <div className="form-group row">
                                    <label className="col-sm-6 col-form-label">
                                      Araç Bilgileri
                                    </label>
                                  </div>
                                  <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">
                                      Araç Marka :
                                    </label>
                                    <div className="col-sm-7">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="car_brand"
                                        placeholder="Araç Marka Giriniz:"
                                        onChange={this.onChange}
                                        value={this.state.car_brand}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">
                                      Renk :
                                    </label>
                                    <div className="col-sm-7">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="car_color"
                                        placeholder="Araç Renk Giriniz:"
                                        onChange={this.onChange}
                                        value={this.state.car_color}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">
                                      Plaka :
                                    </label> 
                                    <div className="col-sm-7">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="car_plate"
                                        placeholder="Araç Plaka Giriniz:"
                                        onChange={this.onChange}
                                        value={this.state.car_plate}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">
                                      Konum :
                                    </label>
                                    <div className="col-sm-7">
                                      <select
                                        className="form-control"
                                        /*                                 onChange={this.handleChangeBlockName}
                                         */
                                      >
                                        <option>A1</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="form-group row">
                                    <div className="col-sm-9">
                                      <button className="btn btn-primary mr-2"
                                      type="submit"
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
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-12">
                        <div className="card-body">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th style={{ width: 10 }}>ID</th>
                                <th>Konum</th>
                                <th>Ad Soyad</th>
                                <th>Telefon No</th>
                                <th>Marka</th>
                                <th>Renk</th>
                                <th>Plaka</th>
                              </tr>
                            </thead>
                            <tbody></tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        {this.state.showUser ? this.props.history.push("/statuserror") : null}
      </div>
    );
  }
}
export default CarPark;
