import React, { Component } from "react";
import Header from "../Home/Header";
import Menu from "../Home/Menu";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import Modal from "react-awesome-modal";

class BlockSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      locationscircle: [],
      locationsstore: [],
      showMeBlock: true,
      showMeBlockİnfo: false,
      block_name: "",
      showMe: true,
      showUser: false,
      circlenumber: "",
      storenumber: "",
      visible: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
  onSubmit(e) {
    e.preventDefault();
    const newBlocks = {
      block_name: this.state.block_name,
      circlenumber: this.state.circlenumber,
      storenumber: this.state.storenumber
    };
    
    axios
      .put("blocks/blockupdate", newBlocks)
      .then(response => {
        console.log(this.state.circlenumber)
        const newApartmens = [];
        for (var i = 1; i <= this.state.circlenumber; i++) {
          newApartmens[i] = {
            block_name: this.state.block_name,
            circlenumber: this.state.block_name+i,
           
          };
        }
        for (var i = 1; i <= this.state.circlenumber; i++) {
         
         
           axios
            .post("apartmens/apartmensetting", newApartmens[i])
            .then(response => {
              console.log(" eklendi.");
            })
            .catch(error => {
              console.log("Blok bilgileri eklenmedi.");
            }); 
        }
        this.props.history.push("/home"); 
     })
      .catch(error => {
        console.log("Site bilgileri eklenmedi.");
      });

  }
  handleChangeCircleNumbers = e => {
    let index = e.nativeEvent.target.selectedIndex;

    this.setState({
      circlenumber: e.nativeEvent.target[index].text
    });
  };
  handleChangeStoreNumbers = e => {
    let index = e.nativeEvent.target.selectedIndex;

    this.setState({
      storenumber: e.nativeEvent.target[index].text
    });
  };

  componentDidMount(e) {
    const token = localStorage.usertoken;
    try {
      jwt_decode(token);
      //Daire Sayısı
      const rescircle = [];
      for (var i = 1; i <= 30; i++) {
        rescircle[i] = i;
      }
      this.setState({
        locationscircle: rescircle
      });
      //Dükkan Sayısı
      const resstore = [];
      for (var i = 1; i <= 5; i++) {
        resstore[i] = i;
      }
      this.setState({
        locationsstore: resstore
      });
      //Blok Sayısı
      axios
        .get("blocks/blockslist")
        .then(response => {
          if (response.data.length == 0) {
            this.openModal();
          }
          this.setState({
            locations: response.data,
            block_name: response.data[0].blok_name
          });
        })
        .catch(error => {
          console.log("Blok listelenemedi.");
        });
      //Yetki kontrol
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
    } catch (error) {
      window.location.replace("/");
    }
  }
  onVisibleİnfo(data) {
    this.setState({
      block_name: data.block_name,
      showMeBlock: false,
      showMeBlockİnfo: true
    });
  }
  render() {
    const blocknumbers = this.state.locations.map(data => (
      <div className="col-lg-3 col-6" key={data._id}>
        <div className="small-box bg-info">
          <div className="inner">
            <p>
              <h4>{data.block_name} Blok </h4>
              <h7>Daire Sayısı : {data.circlenumber}</h7>
              <br />
              <h7>Dükkan Sayısı : {data.storenumber}</h7>
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

    const circlenumbers = this.state.locationscircle.map(data => (
      <option key={data}>{data}</option>
    ));

    const storenumbers = this.state.locationsstore.map(data => (
      <option key={data}>{data}</option>
    ));

    return (
      <div>
        <Header />
        <Menu />
        {this.state.showMe ? (
          <div className="content-wrapper">
            {this.state.showMeBlock ? (
              <div className="content-header">
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
                      <p>Blok Kayıtları Boş.</p>
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
                <div className="row">{blocknumbers}</div>
              </div>
            ) : null}
            {this.state.showMeBlockİnfo ? (
              <div className="card">
                <div className="container">
                  <section className="content">
                    <div className="row justify-content-center">
                      <div className="col-md-6">
                        <div className="card card-primary">
                          <div className="card-header">
                            <h3 className="card-title">
                              {this.state.block_name} Blok Bilgileri
                            </h3>
                          </div>
                          <form noValidate onSubmit={this.onSubmit}>
                            <div className="card-body">
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  Blok Adı
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="block_name"
                                  value={this.state.block_name}
                                  onChange={this.onChange}
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="exampleInputPassword1">
                                  Daire Sayısı
                                </label>
                                <select
                                  className="form-control"
                                  onChange={this.handleChangeCircleNumbers}
                                >
                                  <option>Daire Sayısı Seçiniz.. </option>
                                  {circlenumbers}
                                </select>
                              </div>
                              <div className="form-group">
                                <label htmlFor="exampleInputPassword1">
                                  Dükkan Sayısı
                                </label>
                                <select
                                  className="form-control"
                                  onChange={this.handleChangeStoreNumbers}
                                >
                                  <option>Dükkan Sayısı Seçiniz.. </option>
                                  {storenumbers}
                                </select>
                              </div>
                            </div>
                            <div className="card-footer">
                              <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={this.onSubmit}
                              >
                                Kaydet
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
        {this.state.showUser ? this.props.history.push("/statuserror") : null}
      </div>
    );
  }
}
export default BlockSetting;
