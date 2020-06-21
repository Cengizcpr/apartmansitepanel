import React, { Component } from "react";
import Header from "../../Home/Header";
import Menu from "../../Home/Menu";
import UserMenu from "../../Home/UserMenu";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentCard from "react-payment-card-component";
import Modal from "react-awesome-modal";

class CrediPaymentTest extends Component {
  constructor(props) {
    super(props);
    if (this.props.location.state != undefined) {
      const { cardinfo } = this.props.location.state;
      this.state = {
        duesGroup: cardinfo.duesGroup,
        amount: cardinfo.amount,
        _id: cardinfo._id,
        cart_numbers: "",
        cvv: "",
        cartexpiration: "",
        cartowner_name: "",
        cart_month: "",
        cart_year: "",
        locationsmonth: [],
        locationsyear: [],
        visiblecard: true,
        flipped: false,
        showMe: false,
        visiblecardresult: false,
        visiblecardresulterror: false,
       
      };
    } else {
      this.state = {
        cart_numbers: "",
        _id: "",
        duesGroup: "",
        amount: "",
        cvv: "",
        cartexpiration: "",
        cartowner_name: "",
        cart_month: "",
        cart_year: "",
        locationsmonth: [],
        locationsyear: [],
        visiblecard: true,
        visiblecardresult: false,
        visiblecardresulterror: false,
        flipped: false,
        showMe: false,
   
      };
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleChangeCartMonth = (e) => {
    let index = e.nativeEvent.target.selectedIndex;

    this.setState({
      cart_month: e.nativeEvent.target[index].text,
    });
  };
  handleChangeCartYear = (e) => {
    let index = e.nativeEvent.target.selectedIndex;

    this.setState({
      cart_year: e.nativeEvent.target[index].text,
    });
  };
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value, flipped: false });
  }
  onChangeCvv(e) {
    this.setState({ [e.target.name]: e.target.value, flipped: true });
  }
  closeModal() {
    this.setState({
      visiblecard: false,
    });
    this.props.history.push("/duespay");
  }
  openModalResult() {
    this.setState({
      visiblecardresult: true,
      visiblecard: false,
    });
  }
  closeModalResult() {
    this.setState({
      visiblecardresult: false,
    });
    this.props.history.push("/duespay");
  }
  openModalResultError() {
    this.setState({
      visiblecardresulterror: true,
      visiblecard: false,
      visiblecardresult:false
    });
  }
  closeModalResultError() {
    this.setState({
      visiblecardresulterror: false,
    });
    this.props.history.push("/duespay");
  }

  onSubmit(e) {
    e.preventDefault();
    const cartPay = {
      cart_numbers: this.state.cart_numbers,
      cvv: this.state.cvv,
      cartowner_name: this.state.cartowner_name,
      cart_month: this.state.cart_month,
      cart_year: this.state.cart_year,
      amount: this.state.amount,
    };
   
    axios.post("/pay/iyzipay", cartPay).then((res) => {
      const duesState = {
        _id: this.state._id,
        loanState: "true",
        style_box:"btn btn-block btn-success disabled btn-sm"
      };
      if (res.data.status == "success") {
        axios.put("/duesloan/duesupdate", duesState).then((res) => {
             this.openModalResult();

        
         
        });
      } else if (res.data.status == "failure") {
        this.openModalResultError();
        
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
            if (res.data[i].status) {
              this.setState({
                showMe: true,
              });
            } else {
              this.setState({
                showMe: false,
              });
            }
            const resmonth = [];
            for (var i = 1; i <= 12; i++) {
              resmonth[i] = i;
            }
            this.setState({
              locationsmonth: resmonth,
            });
            const resyear = [];
            for (var i = 2020; i <= 2050; i++) {
              resyear[i] = i;
            }
            this.setState({
              locationsyear: resyear,
            });
          }
        }
      });
    } catch (error) {
      window.location.replace("/");
    }
  }

  render() {
    const cartmonth = this.state.locationsmonth.map((data) => (
      <option key={data}>{data}</option>
    ));
    const cartyear = this.state.locationsyear.map((data) => (
      <option key={data}>{data}</option>
    ));
    var partial;
    if (this.state.showMe === true) {
      partial = <Menu />;
    } else if (this.state.showMe === false) {
      partial = <UserMenu />;
    }
    return (
      <div>
        <Header />
        {partial}
        <div className="content-wrapper">
          <div className="card">
            <div className="card-body">
              <div className="container ">
                <section className="content ">
                  <div className="row justify-content-center">
                    <div className="col-md-6">
                      {/* ÖDEME SONUCU BAŞARISIZ */}
                      <Modal
                        visible={this.state.visiblecardresulterror}
                        width="800"
                        height="300"
                        effect="fadeInUp"
                        onClickAway={() => this.closeModalResultError()}
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <p className="heading lead">Ödeme Sonucu</p>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              onClick={() => this.closeModalResultError()}
                            >
                              &times;
                            </button>
                          </div>

                          <div className="modal-body">
                            <div className="text-center">
                              <i
                                className="fas fa-times-circle fa-6x "
                                style={{ color: "red" }}
                              />
                              <div className="form-group row justify-content-center">
                                <label className="col-sm-5 col-form-label">
                                  Ödeme Sonucu Başarısız.
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="modal-footer justify-content-center">
                            <button
                              type="button"
                              className="btn btn-outline-danger waves-effect"
                              data-dismiss="modal"
                              onClick={() => this.closeModalResultError()}
                            >
                              Kapat
                            </button>
                          </div>
                        </div>
                      </Modal>
                       {/* ÖDEME SONUCU BAŞARILI */}
                      <Modal
                        visible={this.state.visiblecardresult}
                        width="800"
                        height="300"
                        effect="fadeInUp"
                        onClickAway={() => this.closeModalResult()}
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <p className="heading lead">Ödeme Sonucu</p>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              onClick={() => this.closeModalResult()}
                            >
                              &times;
                            </button>
                          </div>

                          <div className="modal-body">
                            <div className="text-center">
                              <i
                                className="fas fa-check-circle fa-6x "
                                style={{ color: "green" }}
                              />
                              <div className="form-group row justify-content-center">
                                <label className="col-sm-5 col-form-label">
                                  Ödeme Başarı İle Tamamlanmıştır.
                                </label>
                              </div>
                            </div>
                         
                          </div>
                          <div className="modal-footer justify-content-center">
                              <button
                                type="button"
                                className="btn btn-outline-success waves-effect"
                                data-dismiss="modal"
                                onClick={() => this.closeModalResult()}
                              >
                                Kapat
                              </button>
                            </div>
                        </div>
                      </Modal>
                       {/* ÖDEME EKRANI*/}
                      <Modal
                        visible={this.state.visiblecard}
                        width="800"
                        height="650"
                        effect="fadeInUp"
                        onClickAway={() => this.closeModal()}
                      >
                        <div className="modal-header">
                          {" "}
                          <h5>Ödeme Ekranı </h5>
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
                          <div className="row justify-content-center">
                            <PaymentCard
                              type="black"
                              brand="mastercard"
                              number={this.state.cart_numbers}
                              cvv={this.state.cvv}
                              holderName={this.state.cartowner_name}
                              expiration={this.state.cartexpiration}
                              flipped={this.state.flipped}
                            />
                          </div>
                          <br />
                          <div className="form-group row justify-content-center">
                            <label className="col-sm-3 col-form-label">
                              Kart No :
                            </label>
                            <div className="col-sm-5">
                              <input
                                type="text"
                                placeholder="Kart No"
                                maxLength="16"
                                className="form-control"
                                name="cart_numbers"
                                onChange={this.onChange}
                                value={this.state.cart_numbers}
                              />
                            </div>
                          </div>
                          <div className="form-group row justify-content-center">
                            <label className="col-sm-3 col-form-label">
                              Kart Üzerindeki İsim :
                            </label>
                            <div className="col-sm-5">
                              <input
                                type="text"
                                maxLength="20"
                                placeholder="Kart Üzerindeki İsim"
                                className="form-control"
                                name="cartowner_name"
                                onChange={this.onChange}
                                value={this.state.cartowner_name}
                              />
                            </div>
                          </div>
                          <div className="form-group row justify-content-center">
                            <label className="col-sm-3 col-form-label">
                              Son Kullanma Tarihi :
                            </label>
                            <div className="col-sm-5">
                              <div className="form-group row">
                                <div className="col-sm-4">
                                  <select
                                    className="form-control"
                                    onChange={this.handleChangeCartMonth}
                                  >
                                    <option>AY</option>
                                    {cartmonth}
                                  </select>
                                </div>
                                <div className="col-sm-4">
                                  <select
                                    className="form-control"
                                    onChange={this.handleChangeCartYear}
                                  >
                                    <option>YIL</option>
                                    {cartyear}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-group row justify-content-center">
                            <label className="col-sm-3 col-form-label">
                              CVV :
                            </label>
                            <div className="col-sm-5">
                              <div className="col-sm-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="cvv"
                                  placeholder="CVV"
                                  maxLength="3"
                                  onChange={this.onChangeCvv.bind(this)}
                                  value={this.state.cvv}
                                />
                              </div>
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
                            onClick={() => this.closeModal()}
                          >
                            Kapat
                          </button>
                        </div>
                      </Modal>
                      <ToastContainer />
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
export default CrediPaymentTest;
