import React, { Component } from "react";
import Header from "../Home/Header";
import Menu from "../Home/Menu";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Modal from "react-awesome-modal";

class PersonalList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [],
      status: "",
      phone_no: "",
      showMe: true,
      showUser: false,
      visible: false
    };
  }

  deletePersonel(data) {
    confirmAlert({
      title: "Personel Sil",
      message: "Personeli silmek istediğinize emin misiniz?",
      buttons: [
        {
          label: "Evet",
          onClick: () =>
            axios
              .post("personals/personaldelete", { phone_no: data.phone_no })
              .then(response => {
                this.setState({
                  phone_no: data.phone_no
                });
                window.location.replace("/personallist");
              })
        },
        {
          label: "Hayır",
          onClick: () => this.props.history.push("/personallist")
        }
      ]
    });
  }
  openModal() {
    this.setState({
      visible: true
    });
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }

  componentDidMount(e) {
    const token = localStorage.usertoken;
    try {
      jwt_decode(token);
      const decoded = jwt_decode(token);
      axios.get("personals/personallist").then(response => {
        if (response.data.length == 0) {
          this.openModal();
        }
        this.setState({
          locations: response.data
        });
      });
      axios.get("users/adminprofile").then(resstatus => {
        var response = resstatus.data;
        for (var i = 0; i < response.length; i++) {
          if (decoded.email === response[i].email) {
            if (response[i].status == false) {
              this.setState({
                showMe: false,
                showUser: true
              });
            }
          }
        }
      });
    } catch (error) {
      window.location.replace("/");
    }
  }

  render() {
    const cities = this.state.locations.map(data => (
      <tr key={data._id}>
        <td>{data.departmans}</td>
        <td>{data.first_name}</td>
        <td>{data.last_name}</td>
        <td>{data.adress}</td>
        <td>{data.phone_no}</td>
        <td>
          <input
            type="button"
            className="btn btn-primary btn-flat "
            value={"Güncelle"}
            onClick={() => this.operation(data)}
          ></input>
          &nbsp;&nbsp;&nbsp;
          <button
            className="btn btn-danger btn-flat "
            onClick={() => this.deletePersonel(data)}
          >
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
          {" "}
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
                        <h6>Departman</h6>
                      </th>
                      <th>
                        <h6>Personel Adı</h6>
                      </th>
                      <th>
                        <h6>Personel Soyadı</h6>
                      </th>
                      <th>
                        <h6>Personel Adresi</h6>
                      </th>
                      <th>
                        <h6>Telefon No</h6>
                      </th>
                      <th>
                        <h6>Ayarlar </h6>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{cities}</tbody>
                </table>
              </div>
              <section>
                <Modal
                  visible={this.state.visible}
                  width="400"
                  height="300"
                  effect="fadeInUp"
                  onClickAway={() => this.closeModal()}
                >
                  <div className="card-body">
                    <h1>Uyarı</h1>
                    <hr />
                    <p>Personel Kayıtları Boş.</p>
                    <a
                      className="btn btn-primary btn-flat "
                      href="javascript:void(0);"
                      onClick={() => this.closeModal()}
                    >
                      Kapat
                    </a>
                  </div>
                </Modal>
              </section>
            </div>
          ) : null}
        </div>
        {this.state.showUser ? (
          <div className="error-page">
            <h2 className="headline text-warning"> 404</h2>
            <div className="error-content">
              <h3>
                <i className="fas fa-exclamation-triangle text-warning" /> Oops!
                Yetki alanı dışındasınız.
              </h3>
              <p>
                Sayın kullanıcı,<Link to="/home">Anasayfaya </Link> bu buton
                üzerinden dönebilirsiniz.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default PersonalList;
