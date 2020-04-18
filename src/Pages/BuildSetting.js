import React, { Component } from "react";
import Header from "../Home/Header";
import Menu from "../Home/Menu";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { confirmAlert } from "react-confirm-alert";

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
      showSave: true
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChangeBlockNumbers = e => {
    let index = e.nativeEvent.target.selectedIndex;

    this.setState({
      blocknumbers: e.nativeEvent.target[index].text
    });
  };

  onSubmit(e) {
    e.preventDefault();
    const newBuilds = {
      build_name: this.state.build_name,
      phone_no: this.state.phone_no,
      adress: this.state.adress,
      blocknumbers: this.state.blocknumbers
    };
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
      "U"
    ];
    const newBlocks = [];
    //site bilgileri getir
    axios.get("builds/buildslist").then(response => {
      if (response.data[0] != undefined) {
        confirmAlert({
          title: "Uyarı",
          message:
            "Blok sayısı güncellendiği takdirde tüm site detayları silinecektir.Yinede silmek istermisiniz?",
          buttons: [
            {
              label: "Evet",
              onClick: () =>
                axios.put("builds/buildsupdate", newBuilds).then(response => {
                  axios
                    .post("builds/buildsetting", newBuilds)
                    .then(response => {
                      //site bilgileri güncellenınce blokları sıl
                      axios.delete("blocks/blockdelete").then(res => {
                        for (var i = 1; i <= this.state.blocknumbers; i++) {
                          newBlocks[i] = {
                            block_name: alf[i],
                            circlenumber: "Girilmedi",
                            storenumber: "Girilmedi"
                          };
                        }
                        for (var i = 1; i <= this.state.blocknumbers; i++) {
                          //blok bılgılerını ekle

                          axios
                            .post("blocks/blocksetting", newBlocks[i])
                            .then(response => {
                              console.log(" eklendi.");
                            })
                            .catch(error => {
                              console.log("Blok bilgileri eklenmedi.");
                            });
                          // })
                        }
                        this.props.history.push("/blocksetting");
                      });
                    })
                    .catch(error => {
                      console.log("Site bilgileri eklenmedi.");
                    });
                })
            },
            {
              label: "Hayır",
              onClick: () => this.props.history.push("/buildsetting")
            }
          ]
        });
      } else {
        axios
          .post("builds/buildsetting", newBuilds)
          .then(response => {
            //site bilgileri güncellenınce blokları sıl
            axios.delete("blocks/blockdelete").then(res => {
              for (var i = 1; i <= this.state.blocknumbers; i++) {
                newBlocks[i] = {
                  block_name: alf[i],
                  circlenumber: "Girilmedi",
                  storenumber: "Girilmedi"
                };
              }
              for (var i = 1; i <= this.state.blocknumbers; i++) {
                //blok bılgılerını ekle

                axios
                  .post("blocks/blocksetting", newBlocks[i])
                  .then(response => {
                    console.log(" eklendi.");
                  })
                  .catch(error => {
                    console.log("Blok bilgileri eklenmedi.");
                  });
                // })
              }
              this.props.history.push("/blocksetting");
            });
          })
          .catch(error => {
            console.log("Site bilgileri eklenmedi.");
          });
      }
    });
    //site sayısı sıfır ıse ekle
  }

  componentDidMount(e) {
    const token = localStorage.usertoken;
    try {
      jwt_decode(token);
      axios.get("builds/buildslist").then(res => {
        if (res.data[0] == undefined) {
          this.setState({ blocknumbers: "Blok Sayısı Seçiniz.." });
        } else {
          this.setState({
            build_name: res.data[0].build_name,
            phone_no: res.data[0].phone_no,
            adress: res.data[0].adress,
            blocknumbers: res.data[0].blocknumbers,
            showSave: true
          });
        }
      });

      const res = [];
      for (var i = 1; i <= 20; i++) {
        res[i] = i;
      }
      this.setState({
        locations: res
      });
      const decoded = jwt_decode(token);
      axios.get("users/adminprofile").then(res => {
        var response = res.data;
        for (var i = 0; i < response.length; i++) {
          if (decoded.email === response[i].email) {
            if (response[i].status == false) {
              this.setState({
                showMe: false,
                showUser: true,
                blocknumbers: "Blok Sayısı Seçiniz.."
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
    const blocknumbers = this.state.locations.map(data => (
      <option key={data}>{data}</option>
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
                        <div className="card-header">
                          <h3 className="card-title">Site Bilgileri </h3>
                        </div>

                        <form noValidate onSubmit={this.onSubmit}>
                          <div className="card-body">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Site Adı
                              </label>
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
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Site Telefon No
                              </label>
                              <input
                                type="tel"
                                className="form-control"
                                placeholder="Site Telefon No:"
                                name="phone_no"
                                value={this.state.phone_no}
                                onChange={this.onChange}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputFile">
                                Site Adresi
                              </label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Site Adresi:"
                                  name="adress"
                                  value={this.state.adress}
                                  onChange={this.onChange}
                                  required
                                />
                              </div>
                            </div>

                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Blok Sayısı
                              </label>
                              <select
                                className="form-control"
                                onChange={this.handleChangeBlockNumbers}
                              >
                                <option> {this.state.blocknumbers} </option>
                                {blocknumbers}
                              </select>
                            </div>
                          </div>
                        </form>
                        {this.state.showSave ? (
                          <div className="card-footer">
                            <button
                              className="btn btn-primary"
                              onClick={this.onSubmit}
                            >
                              Kaydet
                            </button>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        {this.state.showUser ? this.props.history.push("/statuserror") : null}
      </div>
    );
  }
}
export default BuildSetting;
