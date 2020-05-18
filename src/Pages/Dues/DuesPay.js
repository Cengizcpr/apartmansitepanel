import React, { Component } from "react";
import Header from "../../Home/Header";
import Menu from "../../Home/Menu";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import UserMenu from "../../Home/UserMenu";

import "react-toastify/dist/ReactToastify.css";
class DuesPay extends Component {
  constructor() {
    super();

    this.state = {
      blockName: "",
      duesType: "",
      duesOwnername: "",
      locationsdues: [],
      amount: "",
      number: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleValidation() {
    /*   let formIsValid = true;
    let fault_locations = this.state.fault_locations;
    let fault_name = this.state.fault_name;
    let fault_owner = this.state.fault_owner;
    let fault_type = this.state.fault_type;
    let fault_priority = this.state.fault_priority;
    let fault_comment = this.state.fault_comment;

    //Boş mu kontrol?
    if (
      !fault_comment ||
      !fault_locations ||
      !fault_name ||
      !fault_owner ||
      !fault_type
    ) {
      formIsValid = false;
      toast.error("Boş Alan Bırakmayınız!");
    } else if (!fault_priority) {
      formIsValid = false;
      toast.warn("Lütfen Öncelik Durumu Seçiniz!");
    } else if (fault_priority == "Öncelik Durum Seçiniz..") {
      formIsValid = false;
      toast.warn("Lütfen Öncelik Durumu Seçiniz!");
    }
    return formIsValid; */
  }

  onSubmit(e) {
    e.preventDefault();
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
            if (res.data[i].status) {
              this.setState({
                showMe: true,
              });
            } else {
              this.setState({
                showMe: false,
              });
            }
          
            axios.get("apartmens/findapartmendues").then((res) => {
           
              for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].host_email == decoded.email) {
                  this.setState({
                    duesOwnername:
                    res.data[i].host_name + " " + res.data[i].host_surname,
                    duesType: "Daire " + res.data[i].circlenumber,
                    blockName: res.data[i].block_name,
                  });
                  axios
                    .post("dues/finddues", { duesGroup: "Daire" })
                    .then((response) => {
                      this.setState({
                        locationsdues: response.data,
                      });
                    });
                }
              }
            });              

            axios.get("stores/findstoredues").then((res) => {

              for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].store_email == decoded.email) {
            this.setState({
              duesOwnername:
              res.data[i].store_name + " " + res.data[i].store_surname,
            duesType: "Dükkan " + res.data[i].storenumber,
            blockName: res.data[i].block_name,
            })
                  axios
                    .post("dues/finddues", { duesGroup: "Dükkan" })
                    .then((response) => {
                      this.setState({
                        locationsdues: response.data,
                       
                      });
                    });
                }
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
    var partial;
    if (this.state.showMe === true) {
      partial = <Menu />;
    } else if (this.state.showMe === false) {
      partial = <UserMenu />;
    }
    const duesinfo = this.state.locationsdues.map((data) => (
      <div className="col-sm-3" key={data._id}>
        <div
          className="position-relative p-3 callout callout-info"
          style={{ height: 180 }}
        >
          <div className="ribbon-wrapper">
            <div className="ribbon bg-primary">
              <b>{data.duesMonth.slice(0, 2)}</b>
            </div>
          </div>
          <p className="ribbon-xl ribbon text-lg">
            {" "}
            <b>{data.duesMonth.slice(3)}</b>
          </p>
          <p className=" text-md">
            {" "}
            <b>Aidat Grubu : </b> {data.duesGroup} <b>Aidat Tutar :</b>{" "}
            {data.amount}
          </p>

          <p className=" text-md">
            <b> Son Ödeme Tarihi :</b> {data.payment_date}
          </p>

          <button type="button" class="btn btn-block btn-default btn-sm">
            Ödeme Yapmak İçin Tıklayınız.
          </button>
        </div>
      </div>
    ));
    return (
      <div>
        {" "}
        <Header />
        
            {partial}
        
        <div className="content-wrapper">
          <div className="card">
            <div className="card-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="card card-info">
                      <div className="card-header">
                        <h3 className="card-title">
                          Aidat Dönem {this.state.blockName} Blok  {this.state.duesType} {" "}{this.state.duesOwnername}
                          
                        </h3>
                      </div>
                      {/* /.card-header */}
                      <div className="card-body">
                        {" "}
                        <div className="row mt-4">{duesinfo}</div>{" "}
                      </div>
                      {/* /.card-body */}
                    </div>
                    {/* /.card */}
                  </div>
                  {/* /.col */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DuesPay;
