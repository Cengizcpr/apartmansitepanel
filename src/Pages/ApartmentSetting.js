import React, { Component } from "react";
import Header from "../Home/Header";
import Menu from "../Home/Menu";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-awesome-modal";

class ApartmentSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMe: true,
      showUser: false,
      showApartment: false,
      locations: [],
      locationsApartment: [],
      block_name: "",
      visible: false

    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  openModal() {
    this.setState({
      visible: true
    });
  }

  closeModal() {
    this.setState({
      visible: false,
      showApartment: false
    });
  }
  onSubmit(e) {
    e.preventDefault();

    this.setState({
      showMe: true,
      showUser: false,
      showApartment: true,
      aparmentnumbers: ""
    });

    axios
      .post("apartmens/apartmenslist", {
        block_name: this.state.block_name
      })
      .then(response => {
     
          if (this.state.block_name == response.data[0].block_name) {
            this.setState({
              locationsApartment: response.data
            });
          } 
     
      })
      .catch(error => {   this.openModal();});
  }
  handleChangeBlockName = e => {
    let index = e.nativeEvent.target.selectedIndex;

    this.setState({
      block_name: e.nativeEvent.target[index].text
    });
  };
  componentDidMount(e) {
    const token = localStorage.usertoken;
    try {
      jwt_decode(token);
      const decoded = jwt_decode(token);
      axios.get("users/adminprofile").then(res => {
        var response = res.data;
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
      //Blok Sayısı
      axios
        .get("blocks/blockslist")
        .then(response => {
          if (response.data.length == 0) {
            this.openModal();
          }
          this.setState({
            locations: response.data
          });
        })
        .catch(error => {
          console.log("Blok listelenemedi.");
        });
    } catch (error) {
      window.location.replace("/");
    }
  }
  render() {
    const blocknumbers = this.state.locations.map(data => (
      <option key={data._id}>{data.block_name}</option>
    ));
    const aparmentnumbers = this.state.locationsApartment.map(data => (
      <div className="col-lg-3 col-6" key={data._id}>
        <div className="small-box bg-info">
          <div className="inner">
            <p>
              <h4>Daire {data.circlenumber} </h4>
            </p>
          </div>
          <Link
            onClick={() => this.onVisibleİnfo(data)}
            className="small-box-footer "
          >
            Daha fazla bilgi
            <i className="fas fa-arrow-circle-right" />
          </Link>
        </div>
      </div>
    ));
    return (
      <div>
        <Header />
        <Menu />
        <div className="content-wrapper">
          <div className="card">
            <div className="container ">
              <section className="content ">
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    {this.state.showMe ? (
                      <div className="card card-primary">
                              <section>
                  {/*Blok Uyarı Mesajı*/}
                  <Modal
                    visible={this.state.visible}
                    width="400"
                    height="300"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                  >
                    <div className="card-body">
                      <h3>Uyarı</h3>
                      <hr />
                      <p>Daire Sayısı Girilmemiştir.</p>
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
                        <div className="card-header">
                          <h3 className="card-title">Blok Seçiniz</h3>
                        </div>

                        <form noValidate onSubmit={this.onSubmit}>
                          <div className="card-body">
                            <div className="form-group">
                              <select
                                className="form-control"
                                onChange={this.handleChangeBlockName}
                              >
                                <option>Blok Seçiniz</option>
                                {blocknumbers}
                              </select>
                            </div>
                          </div>

                          <div className="card-footer">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={this.onSubmit}
                            >
                              Göster
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : null}
                  </div>
                </div>
              </section>
            </div>
            <div className="content-header">
              {this.state.showApartment ? (
                <div className="row">{aparmentnumbers}</div>
              ) : null}
            </div>
          </div>
        </div>
        {this.state.showUser ? this.props.history.push("/statuserror") : null}
      </div>
    );
  }
}
export default ApartmentSetting;
