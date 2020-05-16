import React, { Component } from "react";
import Header from "../../Home/Header";
import Menu from "../../Home/Menu";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Modal from "react-awesome-modal";
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
      _id: "",
      locationfaultlist: [],
      showMe: true,
      showUser: false,
      visible: false,
      visiblefault: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleChangeFaultState = (e) => {
    e.preventDefault();
    let index = e.nativeEvent.target.selectedIndex;

    this.setState({
      fault_state: e.nativeEvent.target[index].text,
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
  openModalFault() {
    this.setState({
      visiblefault: true,
    });
  }

  closeModalFault() {
    this.setState({
      visiblefault: false,
    });
  }
  infoFault(data) {
    this.setState({
      fault_owner: data.fault_owner,
      fault_email: data.fault_email,
      fault_name: data.fault_name,
      fault_type: data.fault_type,
      fault_priority: data.fault_priority,
      fault_comment: data.fault_comment,
      fault_locations: data.fault_locations,
      fault_state: data.fault_state,
      fault_style: data.fault_style,
      _id: data._id,
    });
    this.openModalFault(); 
  }
  onSubmit(e) {
    e.preventDefault();
/*   mesaj özellıgı   const message={
      to:"+905530130692",
      body:this.state.fault_owner
    } 
    axios.post("/api/messages").then((res)=>{
      toast.success("okey")
    }).catch((err)=>{
      toast.error("asdas")
    }) */
     let style = "";
    if (this.state.fault_state == "Yapıldı") {
      style = "alert alert-success alert-dismissible";
    } else {
      style = "alert alert-danger alert-dismissible";
    }

     const faultData = {
      fault_owner: this.state.fault_owner,
      fault_email: this.state.fault_email,
      fault_locations: this.state.fault_locations,
      fault_name: this.state.fault_name,
      fault_type: this.state.fault_type,
      fault_priority: this.state.fault_priority,
      fault_comment: this.state.fault_comment,
      fault_state: this.state.fault_state,
      fault_style: style,
      _id: this.state._id,
    };
    axios.put("fault/faultupdate", faultData).then((response) => {
      if (response.request.response == "true") {
        this.closeModalFault();
        toast.success("Güncelleme Başarılı! ");
      } else if (response.request.response == "false") {
        this.closeModalFault();
        toast.error("Hata! Güncelleme Başarısız! ");
      }
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
            if (response[i].status == false) {
              this.setState({
                showMe: false,
                showUser: true,
              });
            }
            axios.get("fault/faultlist").then((response) => {
              if (response.data.length != 0) {
                this.setState({
                  locationfaultlist: response.data,
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
    const faultlists = this.state.locationfaultlist.map((data) => (
      <div
        className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch"
        key={data._id}
      >
        <div className="card bg-light">
          <div className="card-header text-muted border-bottom-0">
            {data.fault_owner} {data.fault_locations}
          </div>
          <div className="card-body pt-0">
            <div className="row">
              <div className="col-7">
                <p className="text-muted text-md">
                  <b>Arıza Adı :</b> {data.fault_name}
                </p>
                <p className="text-muted text-md">
                  <b>Arıza Tipi : </b> {data.fault_type}
                </p>
                <p className="text-muted text-md">
                  <b>Öncelik : </b> {data.fault_priority}
                </p>
                <p className="text-muted text-md">
                  <b>Durum : </b> {data.fault_state}
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
                onClick={() => this.infoFault(data)}
              >
                <i class="fas fa-cog"></i>
                Arıza Detayları
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
                                        <p>Arıza Kayıtları Boş.</p>
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
                                      visible={this.state.visiblefault}
                                      width="800"
                                      height="600"
                                      effect="fadeInUp"
                                      onClickAway={() => this.closeModalFault()}
                                    >
                                      <div className="modal-header">
                                        {" "}
                                        <h5>Arıza {this.state.fault_name}</h5>
                                        <button
                                          type="button"
                                          className="close"
                                          data-dismiss="modal"
                                          onClick={() => this.closeModalFault()}
                                        >
                                          &times;
                                        </button>
                                      </div>
                                      <div className="modal-body">
                                        <div className="form-group row justify-content-center">
                                          <label className="col-sm-3 col-form-label">
                                            Arıza Yeri :
                                          </label>
                                          <div className="col-sm-7">
                                            <h3 className="col-sm-7 col-form-label">
                                              {this.state.fault_locations}
                                            </h3>
                                          </div>
                                        </div>
                                        <div className="form-group row justify-content-center">
                                          <label className="col-sm-3 col-form-label">
                                            Arıza Sahibi Ad Soyad :
                                          </label>
                                          <div className="col-sm-7">
                                            <h3 className="col-sm-7 col-form-label">
                                              {this.state.fault_owner}
                                            </h3>
                                          </div>
                                        </div>
                                        <div className="form-group row justify-content-center">
                                          <label className="col-sm-3 col-form-label">
                                            Arıza Sahibi Email :
                                          </label>
                                          <div className="col-sm-7">
                                            <h3 className="col-sm-7 col-form-label">
                                              {this.state.fault_email}
                                            </h3>
                                          </div>
                                        </div>
                                        <div className="form-group row justify-content-center">
                                          <label className="col-sm-3 col-form-label">
                                            Arıza Tipi :
                                          </label>
                                          <div className="col-sm-7">
                                            <h3 className="col-sm-7 col-form-label">
                                              {this.state.fault_type}
                                            </h3>
                                          </div>
                                        </div>
                                        <div className="form-group row justify-content-center">
                                          <label className="col-sm-3 col-form-label">
                                            Arıza Öncelik :
                                          </label>
                                          <div className="col-sm-7">
                                            <h3 className="col-sm-7 col-form-label">
                                              {this.state.fault_priority}
                                            </h3>
                                          </div>
                                        </div>
                                        <div className="form-group row justify-content-center">
                                          <label className="col-sm-3 col-form-label">
                                            Arıza Açıklaması :
                                          </label>
                                          <div className="col-sm-7">
                                            <h3 className="col-sm-7 col-form-label">
                                              {this.state.fault_comment}
                                            </h3>
                                          </div>
                                        </div>
                                        <div className="form-group row justify-content-center">
                                          <label className="col-sm-3 col-form-label">
                                            Arıza Durum :
                                          </label>
                                          <div className="col-sm-7">
                                            <h3 className="col-sm-7 col-form-label">
                                              <select
                                                className="form-control"
                                                onChange={
                                                  this.handleChangeFaultState
                                                }
                                              >
                                                <option>
                                                  {this.state.fault_state}
                                                </option>
                                                <option>Beklemede</option>
                                                <option>Yapıldı</option>
                                              </select>
                                            </h3>
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
                                          onClick={() => this.closeModalFault()}
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
export default FaultList;
