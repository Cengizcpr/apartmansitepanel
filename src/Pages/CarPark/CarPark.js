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
      _id: "",
      car_email: "",
      block_name: "",
      car_brand: "",
      car_color: "",
      car_plate: "",
      locationsnumbers: "Konum Seçiniz",
      car_owner: "",
      showMe: true,
      showUser: false,
      locationscar: [],
      locations: [],
      locationsApartment: [],
      locationscarlist: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  //Araba validation
  handleValidation() {
    let car_brand = this.state.car_brand;
    let car_color = this.state.car_color;
    let car_plate = this.state.car_plate;
    let car_owner = this.state.car_owner;
    let locationsnumbers = this.state.locationsnumbers;

    let formIsValid = true;

    let partterncolor = /[a-zA-Z]/g;
    let resultColor = partterncolor.test(car_color);
    let partternplate = /^(0[1-9]|[1-7][0-9]|8[01])([a-zA-Z]{1}[0-9]{4,5}|[a-zA-Z]{2}[0-9]{3,4}|[a-zA-Z]{3}[0-9]{2,3})/g; //Tr plaka "99 X 9999", "99 X 99999" "99 XX 999", "99 XX 9999" "99 XXX 99"
    let resultCarplate = partternplate.test(car_plate);
    let partternbrand = /[a-zA-Z0-9]/g;
    let resultCarbrand = partternbrand.test(car_brand);
    //Boş mu kontrol?
    if (!car_brand || !car_color || !car_plate || !car_owner) {
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
    else if (locationsnumbers === "Konum Seçiniz") {
      formIsValid = false;
      toast.error("Lütfen Konum Seçiniz!");
    }
    return formIsValid;
  }

  handleChangeLocations = (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    let locationsnum = e.nativeEvent.target[index].text;
    this.setState({
      locationsnumbers: locationsnum,
    });
  };
  handleChangeCircleNumbers = (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    var circlenumber = e.nativeEvent.target[index].text[6];

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
              car_email: result[i].host_email,
              car_owner: result[i].host_name + " " + result[i].host_surname,
            });
            const res = [];
            let carnum = result[i].car_numbers;
            for (var i = 1; i <= carnum; i++) {
              res[i] = this.state.block_name + circlenumber + "-" + i;
            }
            this.setState({
              locationscar: res,
            });
          } else {
            const res = [];
            toast.error("Araç Yok");
            this.setState({
              first_name: "",
              last_name: "",
              phone_no: "",
              email: "",
              car_owner: "",
              locationscar: res,
            });
          }
        }
      }
    }
  };
  handleChangeBlockName = (e) => {
    e.preventDefault();
    let index = e.nativeEvent.target.selectedIndex;

    var block_name = e.nativeEvent.target[index].text[0];

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
                this.setState({
                  block_name: res[i].block_name,
                });
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
  updateCar(data) {
    this.setState({
      car_brand: data.car_brand,
      car_owner: data.car_owner,
      car_plate: data.car_plate,
      locationsnumbers: data.locations,
      car_color: data.car_color,
      _id: data._id,
    });
  }
  deleteCar(data) {
    this.setState({
      _id: data._id,
    });
    console.log(this.state._id);
    axios
      .post("carpark/cardelete", {
        _id: data._id,
      })
      .then((response) => {
        toast.success("Araç Silindi!");
      })
      .catch((err) => {
        toast.error("Hata!Araç Silinemedi!");
      });
  }
  findCarSubmit(e) {
    e.preventDefault();
    axios
      .post("carpark/carfind", {
        car_email: this.state.car_email,
      })
      .then((response) => {
        if (this.state.car_owner == response.data[0].car_owner) {
          this.setState({
            locationscarlist: response.data,
          });
        }
      })
      .catch((error) => {
        toast.error("Araç Kayıtları Boş!");
      });
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      const newPark = {
        car_brand: this.state.car_brand,
        car_color: this.state.car_color,
        car_plate: this.state.car_plate,
        phone_no: this.state.phone_no,
        locations: this.state.locationsnumbers,
        car_owner: this.state.first_name + " " + this.state.last_name,
        car_email: this.state.car_email,
      };

      axios
        .post("carpark/locationfind", {
          locations: this.state.locationsnumbers,
        })
        .then((response) => {
          if (response.request.response == "true") {
            axios.put("carpark/carupdate", newPark).then((response) => {
              if (response.request.response == "true") {
                toast.success("Güncelleme Başarılı! ");
              } else if (response.request.response == "true") {
                toast.error("Hata! Güncelleme Başarısız! ");
              }
            });
          } else if (response.request.response == "false") {
            axios.post("carpark/carregister", newPark).then((response) => {
              if (response.request.response == "true") {
                toast.success("Kayıt Başarılı! ");
              } else if (response.request.response == "false") {
                toast.error("Hata!Kayıt Başarısız! ");
              } else if (response.request.response == "err") {
                toast.error("Hata! Konumda Araç Kayıtlı! ");
              }
            });
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
      <option key={data._id}>{data.block_name} Blok</option>
    ));
    const carlocations = this.state.locationscar.map((data) => (
      <option key={data}>{data}</option>
    ));
    const aparmentnumbers = this.state.locationsApartment.map((data) => (
      <option key={data._id}>Daire {data.circlenumber} </option>
    ));
    const carlist = this.state.locationscarlist.map((data) => (
      <tr key={data._id}>
        <td>{data.locations}</td>
        <td>{data.car_owner}</td>
        <td>{data.phone_no}</td>
        <td>{data.car_brand}</td>
        <td>{data.car_color}</td>
        <td>{data.car_plate} </td>
        <td>
          {" "}
          <button
            class="btn btn-success btn-sm rounded-0"
            type="button"
            data-toggle="tooltip"
            data-placement="top"
            onClick={() => this.updateCar(data)}
          >
            <i class="fa fa-edit"></i>
          </button>{" "}
          <button
            class="btn btn-danger btn-sm rounded-0"
            type="button"
            data-toggle="tooltip"
            data-placement="top"
            onClick={() => this.deleteCar(data)}
          >
            <i class="fa fa-trash"></i>
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        {" "}
        <Header />
        <Menu />
        <div className="content-wrapper">
          <div className="card">
            <div className="card-body">
              <div className="container-fluid">
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
                                        <form
                                          onSubmit={this.findCarSubmit.bind(
                                            this
                                          )}
                                        >
                                          <div className="form-group row">
                                            <label className="col-sm-6 col-form-label">
                                              Araç Sahibi Bilgileri
                                            </label>
                                          </div>
                                          <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">
                                              Blok Seçiniz:
                                            </label>
                                            <div className="col-sm-4">
                                              <select
                                                className="form-control"
                                                onChange={
                                                  this.handleChangeBlockName
                                                }
                                              >
                                                <option>Blok Seçiniz</option>
                                                {blocknumbers}
                                              </select>
                                            </div>
                                          </div>{" "}
                                          <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">
                                              Daire Seçiniz:
                                            </label>
                                            <div className="col-sm-4">
                                              <select
                                                className="form-control"
                                                onChange={
                                                  this.handleChangeCircleNumbers
                                                }
                                              >
                                                <option>Daire Seçiniz</option>
                                                {aparmentnumbers}
                                              </select>
                                            </div>
                                          </div>
                                          <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">
                                              Ad Soyad :
                                            </label>
                                            <div className="col-sm-9">
                                              <h3 className="col-sm-9 col-form-label">
                                                {this.state.first_name}{" "}
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
                                            <div className="col-5">
                                              <h3 className="col-sm-9 col-form-label">
                                                {this.state.phone_no}
                                              </h3>
                                            </div>
                                            <div className="col-sm-4">
                                              <div className="col-sm-9">
                                                <button
                                                  className="btn btn-warning mr-2"
                                                  onSubmit={this.findCarSubmit.bind(
                                                    this
                                                  )}
                                                >
                                                  <i class="fas fa-search"></i>{" "}
                                                  Bul
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </form>
                                        {/*      <div className="form-group row">
                                  <label className="col-sm-9 col-form-label">
                                   
                                  </label>
                                    <div className="col-sm-3">
                                      <button
                                        className="btn btn-warning mr-2"
                                        type="submit"
                                        onClick={this.onSubmit}
                                      >
                                        Araç Bul
                                      </button>
                                  
                                  </div>
                                </div> */}
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
                                            <label className="col-sm-3 col-form-label">
                                              Konum :
                                            </label>
                                            <div className="col-sm-5">
                                              <select
                                                className="form-control"
                                                onChange={
                                                  this.handleChangeLocations
                                                }
                                              >
                                                <option>
                                                  {this.state.locationsnumbers}
                                                </option>
                                                {carlocations}
                                              </select>
                                            </div>
                                          </div>
                                          <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">
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
                                            <label className="col-sm-3 col-form-label">
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
                                            <label className="col-sm-3 col-form-label">
                                              Plaka :
                                            </label>
                                            <div className="col-sm-7">
                                              <input
                                                type="text"
                                                className="form-control"
                                                name="car_plate"
                                                maxLength="8"
                                                placeholder="Araç Plaka Giriniz:"
                                                onChange={this.onChange}
                                                value={this.state.car_plate}
                                              />
                                            </div>
                                          </div>

                                          <div className="form-group row">
                                            <div className="col-sm-9">
                                              <button
                                                className="btn btn-primary mr-2"
                                                type="submit"
                                                onClick={this.onSubmit}
                                              >
                                                <i class="fas fa-save"></i>
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
                                        <th>Konum</th>
                                        <th>Ad Soyad</th>
                                        <th>Telefon No</th>
                                        <th>Marka</th>
                                        <th>Renk</th>
                                        <th>Plaka</th>
                                        <th>Ayarlar</th>
                                      </tr>
                                    </thead>
                                    <tbody>{carlist}</tbody>
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
              </div>
            </div>
          </div>
        </div>
        {this.state.showUser ? this.props.history.push("/statuserror") : null}
      </div>
    );
  }
}
export default CarPark;
