import React, { Component } from "react";
import Header from "../../Home/Header";
import Menu from "../../Home/Menu";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Modal from "react-awesome-modal";

class DuesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [],
      status: "",
      showMe: true,
      showUser: false,
      visible: false,
      first_name: "",
      last_name: "",
      email: "",
      phone_no: "",
      status: "",
      _id: "",
    };
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


  componentDidMount(e) {
    const token = localStorage.usertoken;
    try {
      jwt_decode(token);
      const decoded = jwt_decode(token);
      axios.get("users/adminprofile").then((res) => {
        var response = res.data;

        if (response.length == 0) {
          this.openModal();
        }
        for (var i = 0; i < response.length; i++) {
          if (decoded.email === response[i].email) {
            axios.get("duesloan/dueshomelist").then((ress) => {
              if(ress.data.length!=0){
                for (var i = 0; i < ress.data.length; i++) {
                    this.setState({
                        locations: ress.data
                      });
                }
              }
              else{
                this.openModal()
              }
  
            }) 
           
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
      this.props.history.push("/");
    }
  }

  render() {
    const cities = this.state.locations.map((data) => (
      <tr key={data._id}>
        
        <td>{data.duesGroup}</td>
        <td>{data.loanGroupName}</td>
        <td>{data.duesYearMonth}</td>
        <td>{data.loanPersonName}</td>
        <td>{data.loanPersonPhoneno}</td>
        <td>{data.loanState ? "Ödendi" : "Ödenmedi"}</td>
      </tr>
    ));
    return (
      <div>
        <Header />
        <Menu />
        <div className="content-wrapper">
          {this.state.showMe ? (
            <div className="card">
              <div className="card-body">
                <table
                  
                  className="table table-bordered table-striped"
                >
                  <thead>
                    <tr>
                      <th>
                        <h6>Aidat Türü</h6>
                      </th>
                      <th>
                        <h6>İkamet Yeri</h6>
                      </th>
                      <th>
                        <h6>Aidat Yıl-Ay</h6>
                      </th>
                      <th>
                        <h6>Ad Soyad</h6>
                      </th>
                      <th>
                        <h6>Telefon No</h6>
                      </th>
                      <th>
                        <h6>Borç Durumu</h6>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{cities}</tbody>
                </table>
                <section>
                  <Modal
                    visible={this.state.visible}
                    width="600"
                    height="200"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                  >
                    <div class="modal-header">
                      {" "}
                      <h5>Uyarı</h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        onClick={() => this.closeModal()}
                      >
                        &times;
                      </button>
                    </div>
                    <div class="modal-body">
                      <p>Aidat Kayıtları Boş.</p>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-default"
                        data-dismiss="modal"
                        onClick={() => this.closeModal()}
                      >
                        Kapat
                      </button>
                    </div>
                  </Modal>
                </section>
              </div>
            </div>
          ) : null}

          {this.state.showUser ? this.props.history.push("/statuserror") : null}
        </div>
      </div>
    );
  }
}

export default DuesList;
