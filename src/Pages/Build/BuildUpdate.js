import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import Header from "../../Home/Header";
import Menu from "../../Home/Menu";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class BuildUpdate extends Component {
  constructor() {
    super();
    this.state = {
      build_name: "",
      build_nameinp:"",
      phone_noinp:"",
      phone_no: "",
      adressinp:"",
      adress: "",
      blocknumbersinp:"Blok Sayısı Seçiniz",
      blocknumbers: "",
      locations: [],
      showMe: true,
      showUser: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChangeBlockNumbers = (e) => {
    let index = e.nativeEvent.target.selectedIndex;

    this.setState({
      blocknumbersinp: e.nativeEvent.target[index].text,
    });
  };
    //validation yapısı form
    handleValidation() {
        let build_name = this.state.build_nameinp;
        let phone_no = this.state.phone_noinp;
        let adress = this.state.adressinp;
        let blocknumbers = this.state.blocknumbersinp;
        let formIsValid = true;
        let partternBuildname = /[a-zA-Z0-9]/g;
        let resultBuildname = partternBuildname.test(build_name);
    
        let patternphone = /[0-9]{11}/g;
        let resultphone = patternphone.test(phone_no);
       
        //Boş mu kontrol?
        if (
          !build_name ||
          !phone_no ||
          !adress ||
          !blocknumbers 
          
        ) {
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
        }
        else if(blocknumbers=="Blok Sayısı Seçiniz.."){
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
          "U"
        ];
        const newBlocks = [];
        //site bilgileri getir
        axios.get("builds/buildslist").then(response => {
      
          if (response.data[0] != undefined) {
         
            const updateBuilds = {
              build_name: this.state.build_nameinp,
              phone_no: this.state.phone_noinp,
              adress: this.state.adressinp,
              blocknumbers: this.state.blocknumbersinp,
              _id:response.data[0]._id
            };
            
                    axios.put("builds/buildsupdate", updateBuilds).then(response => {
                      axios
                        .post("builds/buildsetting", updateBuilds)
                        .then(response => {
                          //site bilgileri güncellenınce blokları sıl
                          axios.delete("blocks/blockdelete").then(res => {
                            for (var i = 1; i <= this.state.blocknumbersinp; i++) {
                              newBlocks[i] = {
                                block_name: alf[i],
                                circlenumber: "Girilmedi",
                                storenumber: "Girilmedi"
                              };
                            }
                            for (var i = 1; i <= this.state.blocknumbersinp; i++) {
                              //blok bılgılerını ekle
    
                              axios
                                .post("blocks/blocksetting", newBlocks[i])
                                .then(response => {
                                  //Blok eklendi
                                })
                                .catch(error => {
                                  //blok eklenmedi
                                });
                              
                            }
                            
                          toast.success("Site Bilgileri Güncellendi !");
                        
                          });
                        })
                        .catch(error => {
                          toast.eror("Hata!Site Bilgileri Güncellenmedi !");
                        });
                    })
                
          } else {
            const newBuilds = {
              build_name: this.state.build_nameinp,
              phone_no: this.state.phone_noinp,
              adress: this.state.adressinp,
              blocknumbers: this.state.blocknumbersinp,
              
            };
            axios
              .post("builds/buildsetting", newBuilds)
              .then(response => {
                //site bilgileri güncellenınce blokları sıl
                axios.delete("blocks/blockdelete").then(res => {
                  for (var i = 1; i <= this.state.blocknumbersinp; i++) {
                    newBlocks[i] = {
                      block_name: alf[i],
                      circlenumber: "Girilmedi",
                      storenumber: "Girilmedi"
                    };
                  }
                  for (var i = 1; i <= this.state.blocknumbersinp; i++) {
                    //blok bılgılerını ekle
    
                    axios
                      .post("blocks/blocksetting", newBlocks[i])
                      .then(response => {
                      //  console.log(" eklendi.");
                      })
                      .catch(error => {
                       // console.log("Blok bilgileri eklenmedi.");
                      });
                    
                  }
                  toast.success("Site Bilgileri Güncellendi !");
              
                });
              })
              .catch(error => {
                toast.eror("Hata!Site Bilgileri Güncellenmedi !");
              });
          }
        });
      }
      }
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

            const res = [];
            for (var i = 1; i <= 20; i++) {
              res[i] = i;
            }
            this.setState({
              locations: res,
            });
            axios.get("builds/buildslist").then((response) => {
              if (response.data[0] != undefined) {
                this.setState({
                  build_nameinp: response.data[0].build_name,
                  phone_noinp: response.data[0].phone_no,
                  adressinp: response.data[0].adress,
                  blocknumbersinp: response.data[0].blocknumbers,
                  build_name: response.data[0].build_name,
                  phone_no: response.data[0].phone_no,
                  adress: response.data[0].adress,
                  blocknumbers: response.data[0].blocknumbers,
                  _id: response.data[0]._id,
                });
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
    const blocknumbers = this.state.locations.map((data) => (
      <option key={data}>{data}</option>
    ));
    return (
      <div>
        {" "}
        <Header />
        <Menu />
        <div className="container">
          <div className="content-header">
            {" "}
            {this.state.showMe ? (
              <div className="main-panel">
                <div>
                  <div>
                    <div>
                      <div className="d-flex align-items-center">
                        <h4 className="mb-0 font-weight-bold">
                          Site Bilgilerim
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 grid-margin stretch-card mb-2">
                      <div className="card">
                        <div className="card-body">
                          <div className="form-group row">
                            <label className="col-sm-5 col-form-label">
                              Site Adı:
                            </label>
                            <div className="col-sm-6">
                              <h3 className="col-sm-6 col-form-label">
                                {this.state.build_name}
                              </h3>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-5 col-form-label">
                              Site Telefon No:
                            </label>
                            <div className="col-sm-6">
                              <h3 className="col-sm-6 col-form-label">
                                {this.state.phone_no}
                              </h3>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-5 col-form-label">
                              Blok Sayısı:
                            </label>
                            <div className="col-sm-6">
                              <h3 className="col-sm-6 col-form-label">
                                {this.state.blocknumbers}
                              </h3>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-5 col-form-label">
                              Site Adresi:
                            </label>
                            <div className="col-6">
                              <h3 className="col-sm-9 col-form-label">
                                {this.state.adress}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ToastContainer />

                    <div className="col-md-6 grid-margin stretch-card mb-2">
                      <div className="card">
                        <div className="card-body">
                          <h4 className="card-title">
                            Site Bilgilerinizi Güncelleyin
                          </h4>
                          <p className="card-description">.</p>
                          <form
                            className="forms-sample"
                            onSubmit={this.onSubmit}
                          >
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">
                                Site Adı
                              </label>
                              <div className="col-sm-9">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Site Adı:"
                                  name="build_nameinp"
                                  value={this.state.build_nameinp}
                                  onChange={this.onChange}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">
                                Site Telefon No
                              </label>
                              <div className="col-sm-9">
                                <input
                                  type="text"
                                  className="form-control phone_no"
                                  name="phone_noinp"
                                  placeholder="Site Telefon No:"
                                  maxLength="11"
                                  value={this.state.phone_noinp}
                                  onChange={this.onChange}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">
                                Blok Sayısı
                              </label>
                              <div className="col-sm-9">
                                <select
                                  className="form-control"
                                  onChange={this.handleChangeBlockNumbers}
                                >
                                  <option> {this.state.blocknumbersinp} </option>
                                  {blocknumbers}
                                </select>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">
                                Site Adresi
                              </label>
                              <div className="col-sm-9">
                                <textarea
                                  rows="3"
                                  className="form-control"
                                  placeholder="Site Adresi:"
                                  name="adressinp"
                                  value={this.state.adressinp}
                                  onChange={this.onChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-sm-9">
                                <button
                                  className="btn btn-primary mr-2"
                                  onSubmit={this.onSubmit}
                                >
                                  Kaydet
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ToastContainer />
              </div>
            ) : null}
          </div>
        </div>
        {this.state.showUser ? this.props.history.push("/statuserror") : null}
      </div>
    );
  }
}
export default BuildUpdate;
