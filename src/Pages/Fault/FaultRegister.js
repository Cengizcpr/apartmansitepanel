import React, { Component } from "react";
import Header from "../../Home/Header";
import Menu from "../../Home/Menu";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class FaultRegister extends Component {
  constructor() {
    super();

    this.state = {
      fault_owner: "",
      fault_locations: "",
      fault_name: "",
      fault_type: "",
      fault_comment: "",
      fault_priority: "",
      locationsfault: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChangePriority = (e) => {
    let index = e.nativeEvent.target.selectedIndex;

    this.setState({
      fault_priority: e.nativeEvent.target[index].text,
    });
  };
  onSubmit(e) {
    e.preventDefault();
    const newFault = {
      fault_owner: this.state.fault_owner,
      fault_locations: this.state.fault_locations,
      fault_name: this.state.fault_name,
      fault_type: this.state.fault_type,
      fault_priority: this.state.fault_priority,
      fault_comment: this.state.fault_comment,
    };

    axios
      .post("fault/faultregister", newFault)
      .then((res) => {
        toast.success("Arıza Kayıt Başarılı!");
      })
      .catch((err) => {
        toast.error("Hata! Kayıt Başarısız!");
      });
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
            axios
              .post("users/findiduser", { _id: decoded._id })
              .then((res) => {
                this.setState({
                  fault_owner: res.data.first_name + " " + res.data.last_name,
                });
                //arıza listelenmesı
                axios.get("fault/faultlist").then((res) => {
                  const result = [];
                  for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].fault_owner == this.state.fault_owner) {
                      result[i] = res.data[i];
                    }
                  }
                  this.setState({
                    locationsfault: result,
                  });
                });
              })
              .catch((err) => {
                toast.error("Hata! Arıza Sahibi Listelenemedi!");
              });
          }
        }
      });
    } catch (error) {
      window.location.replace("/");
    }
  }

  render() {
    const faultinfo = this.state.locationsfault.map((data) => (
      <div className="alert alert-danger alert-dismissible" key={data._id}>
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-hidden="true"
        >
          ×
        </button>
        <h5>
          <i className="icon fas fa-exclamation-triangle"></i> Arıza
        </h5>
        <p>
          {" "}
          Arıza Yeri : {data.fault_locations} Arıza Adı : {data.fault_name}
        </p>
        <p>
          {" "}
          Arıza Cins : {data.fault_type} Öncelik : {data.fault_priority}{" "}
        </p>{" "}
        <p> Arıza Açıklaması :{data.fault_comment}</p>
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
                  <div className="content-header">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="card">
                          <div className="card-header border-0">
                            <div className="d-flex justify-content-between">
                              <h3 className="card-title">Arıza Talep Formu</h3>
                            </div>
                          </div>
                          <div className="card-body">
                            <form
                              className="forms-sample"
                              onSubmit={this.onSubmit}
                            >
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                  Arıza Sahibi :
                                </label>
                                <div className="col-sm-7">
                                  <label className="col-sm-7 col-form-label">
                                    {this.state.fault_owner}
                                  </label>
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                  Arıza Yeri :
                                </label>
                                <div className="col-sm-7">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Arıza Yeri:"
                                    name="fault_locations"
                                    value={this.state.fault_locations}
                                    onChange={this.onChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                  Arıza Adı :
                                </label>
                                <div className="col-sm-7">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Arıza Adı:"
                                    name="fault_name"
                                    value={this.state.fault_name}
                                    onChange={this.onChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                  Arıza Cins :
                                </label>
                                <div className="col-sm-7">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Arıza Cinsi:"
                                    name="fault_type"
                                    value={this.state.fault_type}
                                    onChange={this.onChange}
                                    required
                                  />
                                </div>
                              </div>

                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                  Öncelik :
                                </label>
                                <div className="col-sm-7">
                                  <select
                                    className="form-control"
                                    onChange={this.handleChangePriority}
                                  >
                                    <option> Öncelik Durumu Seçiniz.. </option>
                                    <option> Normal </option>
                                    <option> Orta </option>
                                    <option> Yüksek </option>
                                  </select>
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                  Arıza Açıklaması :
                                </label>
                                <div className="col-sm-7">
                                  <textarea
                                    rows="3"
                                    className="form-control"
                                    placeholder="Arıza Açıklaması :"
                                    name="fault_comment"
                                    value={this.state.fault_comment}
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
                        <div className="card">
                          <div className="card-header border-0">
                            <div className="d-flex justify-content-between">
                              <h3 className="card-title">Arızalar</h3>
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

                              <div class="col-12">{faultinfo}</div>
                            </div>
                            <div className="d-flex flex-row justify-content-end">
                              <span className="mr-2">
                                <i className="fas fa-square text-green" />{" "}
                                Tamamlandı
                              </span>
                              <span>
                                <i className="fas fa-square text-red" />{" "}
                                Bekleniyor
                              </span>
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
export default FaultRegister;
