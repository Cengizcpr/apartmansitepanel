import React, { Component } from "react";
import Header from "../../Home/Header";
import Menu from "../../Home/Menu";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class BuildSetting extends Component {
  constructor() {
    super();

    this.state = {
      build_name: "",
      phone_no: "",
      adress: "",
      blocknumbers: "Blok Sayısı Seçiniz..",
      locations: [],
      showMe: true,
      showUser: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChangeBlockNumbers = (e) => {
    let index = e.nativeEvent.target.selectedIndex;

    this.setState({
      blocknumbers: e.nativeEvent.target[index].text,
    });
  };
  //validation yapısı form
  handleValidation() {
    let build_name = this.state.build_name;
    let phone_no = this.state.phone_no;
    let adress = this.state.adress;
    let blocknumbers = this.state.blocknumbers;
    let formIsValid = true;
    let partternBuildname = /[a-zA-Z0-9]/g;
    let resultBuildname = partternBuildname.test(build_name);

    let patternphone = /[0-9]{11}/g;
    let resultphone = patternphone.test(phone_no);

    //Boş mu kontrol?
    if (!build_name || !phone_no || !adress || !blocknumbers) {
      formIsValid = false;
      toast.error("Boş Bırakmayınız!");
    }
    //Site için harf kontrol?
    else if (resultBuildname === false) {
      formIsValid = false;
      toast.warn("Sadece Harf ve Sayı Giriniz!");
    }

    //Telefon için uyumluluk kontrol
    else if (resultphone === false) {
      formIsValid = false;
      toast.error("Telefon Numarası Geçerli Değil!");
    } else if (blocknumbers == "Blok Sayısı Seçiniz..") {
      formIsValid = false;
      toast.error("Lütfen Blok Sayısı Seçiniz!");
    }

    return formIsValid;
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      const alf = [
        "",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "R",
        "S",
        "T",
        "U",
      ];
      const newBlocks = [];
      //site bilgileri getir
      axios.get("builds/buildslist").then((response) => {
        if (response.data[0] != undefined) {
          const updateBuilds = {
            build_name: this.state.build_name,
            phone_no: this.state.phone_no,
            adress: this.state.adress,
            blocknumbers: this.state.blocknumbers,
            _id: response.data[0]._id,
          };

          axios.put("builds/buildsupdate", updateBuilds).then((response) => {
            axios
              .post("builds/buildsetting", updateBuilds)
              .then((response) => {
                //site bilgileri güncellenınce blokları sıl
                axios.delete("blocks/blockdelete").then((res) => {
                  for (var i = 1; i <= this.state.blocknumbers; i++) {
                    newBlocks[i] = {
                      block_name: alf[i],
                      circlenumber: "Girilmedi",
                      storenumber: "Girilmedi",
                    };
                  }
                  for (var i = 1; i <= this.state.blocknumbers; i++) {
                    //blok bılgılerını ekle

                    axios
                      .post("blocks/blocksetting", newBlocks[i])
                      .then((response) => {
                        //Blok eklendi
                      })
                      .catch((error) => {
                        //blok eklenmedi
                      });
                  }

                  toast.success("Site Bilgileri Eklendi !");
                });
              })
              .catch((error) => {
                toast.eror("Hata!Site Bilgileri Eklenmedi !");
              });
          });
        } else {
          const newBuilds = {
            build_name: this.state.build_name,
            phone_no: this.state.phone_no,
            adress: this.state.adress,
            blocknumbers: this.state.blocknumbers,
          };
          axios
            .post("builds/buildsetting", newBuilds)
            .then((response) => {
              //site bilgileri güncellenınce blokları sıl
              axios.delete("blocks/blockdelete").then((res) => {
                for (var i = 1; i <= this.state.blocknumbers; i++) {
                  newBlocks[i] = {
                    block_name: alf[i],
                    circlenumber: "Girilmedi",
                    storenumber: "Girilmedi",
                  };
                }
                for (var i = 1; i <= this.state.blocknumbers; i++) {
                  //blok bılgılerını ekle

                  axios
                    .post("blocks/blocksetting", newBlocks[i])
                    .then((response) => {
                      console.log(" eklendi.");
                    })
                    .catch((error) => {
                      console.log("Blok bilgileri eklenmedi.");
                    });
                }
                toast.success("Site Bilgileri Eklendi !");
                setTimeout(function(){ this.props.history.push("/buildinfo")}.bind(this),3000)

              });
            })
            .catch((error) => {
              toast.eror("Hata!Site Bilgileri Eklenmedi !");
            });
        }
      });
    }
  }

  componentDidMount(e) {
    const token = localStorage.usertoken;
    try {
      jwt_decode(token);
      axios.get("builds/buildslist").then((res) => {
        if (res.data[0] == undefined) {
          this.setState({ blocknumbers: "Blok Sayısı Seçiniz.." });
        } else {
          this.setState({
            build_name: res.data[0].build_name,
            phone_no: res.data[0].phone_no,
            adress: res.data[0].adress,
            blocknumbers: res.data[0].blocknumbers,
          });
        }
      });

      const res = [];
      for (var i = 1; i <= 20; i++) {
        res[i] = i;
      }
      this.setState({
        locations: res,
      });
      const decoded = jwt_decode(token);
      axios.get("users/adminprofile").then((res) => {
        var response = res.data;
        for (var i = 0; i < response.length; i++) {
          if (decoded.email === response[i].email) {
            if (response[i].status == false) {
              this.setState({
                showMe: false,
                showUser: true,
                blocknumbers: "Blok Sayısı Seçiniz..",
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
    const blocknumbers = this.state.locations.map((data) => (
      <option key={data}>{data}</option>
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
                        <div className="card card-primary">
                          <div className="card-header">
                            <h3 className="card-title">Site Bilgileri</h3>
                          </div>

                          <form noValidate onSubmit={this.onSubmit}>
                            <div className="card-body">
                              <div className="form-group row">
                                <label className="col-sm-5 col-form-label">
                                  Site Adı :
                                </label>
                                <div className="col-sm-6">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Site Adı:"
                                    name="build_name"
                                    value={this.state.build_name}
                                    onChange={this.onChange}
                                    required
                                  />
                                </div>
                              </div>

                              <div className="form-group row">
                                <label className="col-sm-5 col-form-label">
                                  Site Telefon No :
                                </label>
                                <div className="col-sm-6">
                                  <input
                                    type="text"
                                    className="form-control phone_no"
                                    name="phone_no"
                                    placeholder="Site Telefon No:"
                                    maxLength="11"
                                    value={this.state.phone_no}
                                    onChange={this.onChange}
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-5 col-form-label">
                                  Blok Sayısı :
                                </label>
                                <div className="col-sm-6">
                                  <select
                                    className="form-control"
                                    onChange={this.handleChangeBlockNumbers}
                                  >
                                    <option> {this.state.blocknumbers} </option>
                                    {blocknumbers}
                                  </select>
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-5 col-form-label">
                                  Site Adresi :
                                </label>
                                <div className="col-sm-6">
                                  <textarea
                                    rows="3"
                                    className="form-control"
                                    placeholder="Site Adresi:"
                                    name="adress"
                                    value={this.state.adress}
                                    onChange={this.onChange}
                                    required
                                  />
                                </div>
                              </div>
                              <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={this.onSubmit}
                              >
                                Kaydet
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
            </div>
          </div>
        </div>
        {this.state.showUser ? this.props.history.push("/statuserror") : null}
      </div>
    );
  }
}
export default BuildSetting;
