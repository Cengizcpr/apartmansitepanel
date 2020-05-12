import React, { Component } from "react";
import Header from "../../Home/Header";
import Menu from "../../Home/Menu";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class FaultList extends Component {
  constructor() {
    super();

    this.state = {
      fault_owner: "",
      fault_email: "",
      fault_name: "",
      fault_type: "",
      fault_priority: "",
      fault_comment: "",
      fault_locations: "",
      fault_state: "",
      fault_style: "",
      locationfaultlist:[],
      showMe: true,
      showUser: false,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
            axios.get("fault/faultlist").then((response) => {
             this.setState({
              locationfaultlist:response.data
             })
            });
          }
        }
      });
    } catch (error) {
      window.location.replace("/");
    }
  }

  render() {
    const faultlists = this.state.locationfaultlist.map((data) => (
      <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch" key={data._id}>
      <div className="card bg-light">
        <div className="card-header text-muted border-bottom-0">
          {data.fault_owner}{" "}
          {data.fault_locations}
        </div>
        <div className="card-body pt-0">
          <div className="row">
            <div className="col-7">
            <p className="text-muted text-sm">
                <b>
                  Arıza Adı :{" "}
                  {data.fault_name}
                </b>
              </p>
              <p className="text-muted text-sm">
                <b>Öncelik : </b>{" "}
                {data.fault_priority}
              </p>
              <p className="text-muted text-sm">
                <b>Durum : </b>{" "}
                {data.fault_state}
              </p>
              <p className="text-muted text-sm">
                <b>Arıza Açıklaması : </b>{" "}
                {data.fault_comment}
              </p>
          
            </div>
            <div className="col-5 text-center">
              <img
                src={require("../repair-icon.png")}
                className="img-circle img-fluid"
              />
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="text-right">
            
            <button
              
              className="btn btn-sm btn-primary"
            >
              <i className="fas fa-cog" />{" "}
              Arıza Detayları
            </button>
          </div>
        </div>
      </div>
    </div>
    ))
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
                        <div className="card card-danger">
                          <div className="card-header">
                            <h3 className="card-title">Arıza Listele</h3>
                          </div>
                          <div className="card-body">
                            <div className="main-panel">
                              <div>
                                <div className="row">
                                  <div className="col-md-12 grid-margin stretch-card mb-2">
                                    <div className="row d-flex align-items-stretch">
                                     {faultlists}
                                    </div>
                                  </div>
                                  <ToastContainer />
                             
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
export default FaultList;
