import React, { Component } from "react";
import Header from "../../Home/Header";
import Menu from "../../Home/Menu";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DuesAdd extends Component {
  constructor() {
    super();

    this.state = {
      startDate: new Date(),
      operation_date: "",
      duesSelectyear: "Yıl Seçiniz.",
      duesSelectmonth: "Dönem Seçiniz.",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChangeCalendar = (date) => {
    var today =
      this.state.startDate.getDate() +
      "/" +
      parseInt(this.state.startDate.getMonth() + 1) +
      "/" +
      this.state.startDate.getFullYear();
    var selectday =
      date.getDate() +
      "/" +
      parseInt(date.getMonth() + 1) +
      "/" +
      date.getFullYear();
    console.log(today + " " + selectday);
  };

  componentDidMount(e) {
    const token = localStorage.usertoken;
    try {
      jwt_decode(token);
      axios.get("users/adminprofile").then((response) => {
        for (var i = 0; i < response.length; i++) {
          if (response[i].status == false) {
            this.setState({
              showMe: false,
              showUser: true,
            });
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
                    <div className="col-lg-6">
                      <div className="card card-primary">
                        <div className="card-header border-0">
                          <div className="d-flex justify-content-between">
                            <h3 className="card-title">Dönem Aidat Ekle</h3>
                          </div>
                        </div>
                        <div className="card-body">
                          <form
                            className="forms-sample"
                            onSubmit={this.onSubmit}
                          >
                            <div className="form-group row">
                              <label className="col-sm-5 col-form-label">
                                Aidat Yıl :
                              </label>
                              <div className="col-sm-4">
                                <select
                                  className="form-control"
                                  onChange={this.handleChangeBlockNumbers}
                                >
                                  <option> {this.state.duesSelectyear} </option>
                                  <option> 2020 </option>
                                  <option> 2021 </option>
                                  <option> 2022 </option>
                                  <option> 2023 </option>
                                  <option> 2024 </option>
                                  <option> 2025 </option>
                                  <option> 2026 </option>
                                  <option> 2027 </option>
                                  <option> 2028 </option>
                                  <option> 2029 </option>
                                  <option> 2030 </option>
                                </select>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-5 col-form-label">
                                Aidat Dönem :
                              </label>
                              <div className="col-sm-4">
                                <select
                                  className="form-control"
                                  onChange={this.handleChangeBlockNumbers}
                                >
                                  <option>{this.state.duesSelectmonth}</option>
                                  <option> Ocak </option>
                                  <option> Şubat </option>
                                  <option> Mart </option>
                                  <option> Nisan </option>
                                  <option> Mayıs </option>
                                  <option> Haziran </option>
                                  <option> Temmuz </option>
                                  <option> Ağustos </option>
                                  <option> Eylül </option>
                                  <option> Ekim </option>
                                  <option> Kasım </option>
                                  <option> Aralık </option>
                                </select>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-5 col-form-label">
                                Aidat Grubu :
                              </label>
                              <div className="col-sm-4">
                                <select
                                  className="form-control"
                                 
                                 
                                ><option>Grup Seçiniz.</option>
                                  <option>Daire</option>
                                  <option>Dükkan</option>
                                  
                                </select>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-5 col-form-label">
                                İşlem Tarihi :
                              </label>
                              <div className="col-sm-3">
                                <DatePicker
                                  className="form-control"
                                  selected={this.state.startDate}
                                  onChange={this.handleChangeCalendar}
                                  dateFormat="dd/MM/yyyy"
                                >
                                  {" "}
                                </DatePicker>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-5 col-form-label">
                                Son Ödeme Tarihi :
                              </label>
                              <div className="col-sm-3">
                                <DatePicker
                                  className="form-control"
                                  selected={this.state.startDate}
                                  onChange={this.handleChangeCalendar}
                                  dateFormat="dd/MM/yyyy"
                                >
                                  {" "}
                                </DatePicker>
                              </div>
                            </div>

                            <div className="form-group row">
                              <label className="col-sm-5 col-form-label">
                                Tutar :
                              </label>
                              <div className="col-sm-3">
                                <div class="input-group-prepend">
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="00.00"
                                  />

                                  <span class="input-group-text">₺</span>
                                </div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-5 col-form-label">
                                Aidat Karar :
                              </label>
                              <div className="col-sm-6">
                                <textarea
                                  rows="3"
                                  className="form-control"
                                  placeholder="Aidat Karar :"
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
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DuesAdd;
