import React, { Component } from "react";
import Header from "../../Home/Header";
import Menu from "../../Home/Menu";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-awesome-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class StoreSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMe: true,
      showUser: false,
      showStore: false,
      locations: [],
      locationsStore: [],
      block_name: "Blok Seçiniz",
      storenumber: "",
      visible: false,
   
     
      
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  openModal() {
    this.setState({
      visible: true,
      showStore: false,
    });
  }

  closeModal() {
    this.setState({
      visible: false,
      showStore: false,
    });
  }
 
  //daire göstermek için kullanılıyor
  onSubmit(e) {
    e.preventDefault();
    if (this.state.block_name == "Blok Seçiniz") {
      toast.warn("Lütfen Blok Seçiniz!");
    }
    else{
      this.setState({
        showMe: true,
        showUser: false,
        showStore: true,
       
      });
      //istenilen bloğa göre dükkan bilgilerini getirir
      axios
        .post("stores/storelist", {
          block_name: this.state.block_name,
        })
        .then((response) => {
          if (this.state.block_name == response.data[0].block_name) {
            this.setState({
              locationsStore: response.data,
            });
          }
        })
        .catch((error) => {
  
         toast.error("Dükkan Kayıtları Boş!")
          
        });
      }
  }

  handleChangeBlockName = (e) => {
    let index = e.nativeEvent.target.selectedIndex;

    this.setState({
      block_name: e.nativeEvent.target[index].text,
    });
  };
  componentDidMount(e) {
    const token = localStorage.usertoken;
    try {
      jwt_decode(token);
      const decoded = jwt_decode(token);
      axios.get("users/adminprofile").then((res) => {
        var response = res.data;
        for (var i = 0; i < response.length; i++) {
          if (decoded.email === response[i].email) {
            if (response[i].status == false) {
              this.setState({
                showMe: false,
                showUser: true,
              });
            }
          }
        }
      });
      //Blok Sayısı
      axios
        .get("blocks/blockslist")
        .then((response) => {
          if (response.data.length == 0) {
            this.openModal();
          }
          this.setState({
            locations: response.data,
          });
        })
        .catch((error) => {
         toast.error("Blok listelenemedi.");
        });
    } catch (error) {
      window.location.replace("/");
    }
  }
  render() {
    const blocknumbers = this.state.locations.map((data) => (
      <option key={data._id}>{data.block_name}</option>
    ));
    const storenumbers = this.state.locationsStore.map(data => (
      <div className="col-lg-3 col-6" key={data._id}>
        <div className={data.style_box}>
          <div className="inner">
            <p>
              <h5>Dükkan {data.storenumber} </h5>
              <h6>Durum : {data.store_state}</h6>
              <h6>
                Dükkan Sahibi : {data.store_name} {data.store_surname}
              </h6>
              <h6>Dükkan Telefon : {data.store_phoneno}</h6>
            </p>
          </div>
          <Link
            to={{ pathname: "/storeregister" , state: { storeinfo: data }  }}
            className="small-box-footer "
          >
            {" "}
            Dükkan Sahibi Ata
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
        <div className="card-body">
          <div className="container ">
            <section className="content ">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  {this.state.showMe ? (
                    <div className="card card-warning">
                      <section>
                        {/*Blok Uyarı Mesajı*/}
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
                    <p>Dükkan Kayıtları Boş.</p>
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
                      </section>
                      <div className="card-header">
                        <h3 className="card-title">Blok(Dükkan) Seçiniz</h3>
                      </div>

                      <form noValidate onSubmit={this.onSubmit}>
                        <div className="card-body">
                          <div className="form-group">
                            <select
                              className="form-control"
                              onChange={this.handleChangeBlockName}
                            >
                                <option>{this.state.block_name}</option>
                              {blocknumbers}
                            </select>
                          </div>
                        </div>

                        <div className="card-footer">
                          <button
                            type="submit"
                            className="btn btn-warning"
                            // onClick={() => this.onApartmentİnfo()}
                            onClick={this.onSubmit}
                          >
                            Göster
                          </button>
                        </div>
                      </form>
                      <ToastContainer />
                    </div>
                  ) : null}
                </div>
              </div>
            </section>
          </div>
          <div className="content-header">
            {this.state.showStore ? (
              <div className="row">{storenumbers}</div>
            ) : null}
          </div>
        </div>
      </div>
      </div>
      {this.state.showUser ? this.props.history.push("/statuserror") : null}
    </div>
    );
  }
}
export default StoreSetting;