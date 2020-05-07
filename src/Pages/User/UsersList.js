import React, { Component } from "react";
import Header from "../../Home/Header";
import Menu from "../../Home/Menu";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Modal from "react-awesome-modal";

class UsersList extends Component {
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
  deleteUser(data) {
    confirmAlert({
      title: "Kullanıcı Sil",
      message: "Kullanıcıyı silmek istediğinize emin misiniz?",
      buttons: [
        {
          label: "Evet",
          onClick: () =>
            axios
              .post("users/userdelete", { _id: data._id })
              .then((response) => {
                window.location.replace("/userslist");
              }),
        },
        {
          label: "Hayır",
          onClick: () => this.props.history.push("/userslist"),
        },
      ],
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
            this.setState({
              locations: response,
            });
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
        <td>{data.status ? "Admin" : "Kullanıcı"}</td>
        <td>{data.first_name}</td>
        <td>{data.last_name}</td>
        <td>{data.email}</td>
        <td>{data.phone_no}</td>
        <td>
          <Link
            to={{ pathname: "/userupdate", state: { userupdate: data } }}
            className="btn btn-primary btn-md "
          >
            <i class="fas fa-pencil-alt"></i> Güncelle
          </Link>
          &nbsp;&nbsp;&nbsp;
          <button
            className="btn btn-danger  btn-md "
            onClick={() => this.deleteUser(data)}
          >
            <i class="fas fa-trash"></i>
            Sil
          </button>
        </td>
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
                  id="students"
                  className="table table-bordered table-striped"
                >
                  <thead>
                    <tr>
                      <th>
                        <h6>Ünvan</h6>
                      </th>
                      <th>
                        <h6>Kullanıcı Adı</h6>
                      </th>
                      <th>
                        <h6>Kullanıcı Soyadı</h6>
                      </th>
                      <th>
                        <h6>Kullanıcı Eposta</h6>
                      </th>
                      <th>
                        <h6>Telefon No</h6>
                      </th>
                      <th>
                        <h6>Ayarlar</h6>
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
                      <p>Kullanıcı Kayıtları Boş.</p>
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

export default UsersList;
