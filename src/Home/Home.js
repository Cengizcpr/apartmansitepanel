import React, { Component } from "react";
import Header from "./Header";
import Menu from "./Menu";
import UserMenu from "./UserMenu";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
class Home extends Component {
  constructor() {
    super();

    this.state = {
      style: "none",
      usernumber: "",
      personalnumber: "",
      faultnumber: "",
      duesnumber:"",
      buildName:"",
      blockNumber:"",
      storeNumber:"",
      apartmenNumber:"",
      showMe:true
    };
  }

  componentDidMount(e) {
    const token = localStorage.usertoken;
    try {
      jwt_decode(token);
      const decoded = jwt_decode(token);
      axios.get("users/adminprofile").then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          if (decoded._id === res.data[i]._id) {
            //Kullanıcılar Sayısı
            this.setState({
              usernumber: res.data.length,
            });
            //Personel Sayısı
            axios.get("personals/personallist").then((response) => {
              if(response.data.length!=0){
              this.setState({
                personalnumber: response.data.length,
                style5:"line-through"
              });
            }
            else{
              this.setState({
                personalnumber:0,
                style5:"none"
              });
            }
            });
            //Arıza Sayısı
            axios.get("fault/faultlist").then((response) => {
              this.setState({
                faultnumber: response.data.length
              });
            });
            //Kasa Miktarı
            axios.get("duesloan/dueshomelist").then((response) => {
             var toplam=0;
             if(response.data.length!=0){
              for(var i=0;i<response.data.length;i++){
               if(response.data[i].loanState==true){
                 toplam+=response.data[i].amount;
                this.setState({
                  duesnumber:toplam
                })
               }
              
             }
             }
             else{
              this.setState({
                duesnumber:0
              })
             }
            });
            //Bina Adı Blok Sayısı
            axios.get("builds/buildslist").then((response) => {
              if(response.data.length!=0){
              this.setState({
                buildName: response.data[0].build_name,
                blockNumber:response.data[0].blocknumbers,
              style1:"line-through",
              style2:"line-through"
              });
            }
            });
            //Daire Sayısı
            axios.get("apartmens/findapartmendues").then((response) => {
              if(response.data.length!=0){
              this.setState({
                apartmenNumber:response.data.length,
                style3:"line-through"
              });
            }
            });
             //Daire Sayısı
             axios.get("stores/findstoredues").then((response) => {
              if(response.data.length!=0){
              this.setState({
                storeNumber:response.data.length,
                style4:"line-through"
              });
            }
            });
            
            if (res.data[i].status) {
              this.setState({
                showMe: true,
              });
            } else {
              this.setState({
                showMe: false,
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
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h3>{this.state.personalnumber}</h3>
                      <p>Personeller</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-person" />
                    </div>
                    <Link to="personallist" className="small-box-footer">
                      Daha Fazla Bilgi{" "}
                      <i className="fas fa-arrow-circle-right" />
                    </Link>
                  </div>
                </div>

                <div className="col-lg-3 col-6">
                  <div className="small-box bg-success">
                    <div className="inner">
                      <h3>
                        {this.state.faultnumber}  </h3>
                        <p>Arızalar</p>
                    
                      <p></p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-stats-bars" />
                    </div>
                    <Link to="faultlist" className="small-box-footer">
                      Daha Fazla Bilgi{" "}
                      <i className="fas fa-arrow-circle-right" />
                    </Link>
                  </div>
                </div>

                <div className="col-lg-3 col-6">
                  <div className="small-box bg-warning">
                    <div className="inner">
                      <h3>{this.state.usernumber}</h3>
                      <p>Kullanıcılar</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-person-add" />
                    </div>
                    <Link to="/userslist" className="small-box-footer">
                      Daha Fazla Bilgi{" "}
                      <i className="fas fa-arrow-circle-right" />
                    </Link>
                  </div>
                </div>

                <div className="col-lg-3 col-6">
                  <div className="small-box bg-danger">
                    <div className="inner">
                      <h3>{this.state.duesnumber} ₺</h3>
                      <p>Kasa </p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-pie-graph" />
                    </div>
                    <Link to="/dueslist" className="small-box-footer">
                      Daha Fazla Bilgi{" "}
                      <i className="fas fa-arrow-circle-right" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="row">
                <section className="col-lg-8 connectedSortable ui-sortable">
                  <div className="card">
                    <div
                      className="card-header ui-sortable-handle"
                      style={{ cursor: "move" }}
                    >
                      <h1 className="card-title">
                        <i className="ion ion-clipboard mr-1" />
                        Uyarılar
                      </h1>
                    </div>

                    <div className="card-body">
                      <ul
                        className="todo-list ui-sortable"
                        data-widget="todo-list"
                      >
                        <li>
                          <div className="form-group row">
                          <span
                              className="text"
                          
                            >
                              !!!
                            </span>
                            <span
                              className="text"
                              style={{ textDecoration: this.state.style1 }}
                            >
                              Site Bilgileri Eklendi.
                            </span>
                          </div>
                        </li> 


                        <li>
                          <div className="form-group row">
                           <span
                              className="text"
                          
                            >
                              !!!
                            </span>
                            <span
                              className="text"
                              style={{ textDecoration: this.state.style2 }}
                            >
                              Bloklar Oluşturuldu.
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className="form-group row">
                          <span
                              className="text"
                          
                            >
                              !!!
                            </span>
                            <span
                              className="text"
                              style={{ textDecoration: this.state.style3 }}
                            >
                              Daireler Oluşturuldu.
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className="form-group row">
                          <span
                              className="text"
                          
                            >
                              !!!
                            </span>
                            <span
                              className="text"
                              style={{ textDecoration: this.state.style4 }}
                            >
                              Dükkanlar Oluşturuldu.
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className="form-group row">
                          <span
                              className="text"
                          
                            >
                              !!!
                            </span>
                            <span
                              className="text"
                              style={{ textDecoration: this.state.style5 }}
                            >
                              Personeller Tanımlandı.
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="col connectedSortable ui-sortable">
                  <div className="col-lg-12">
                    {/* Info Boxes Style 2 */}
                    <div className="info-box mb-3 bg-dark">
                      <span className="info-box-icon">
                        <i className="fas fa-tag" />
                      </span>
                      <div className="info-box-content">
                        <span className="info-box-text">Site Adı</span>
                        <span className="info-box-number">{this.state.buildName} </span>
                      </div>
                      {/* /.info-box-content */}
                    </div>
                    {/* /.info-box */}
                    <div className="info-box mb-3 bg-dark">
                      <span className="info-box-icon">
                        <i className="far fa-building" />
                      </span>
                      <div className="info-box-content">
                        <span className="info-box-text">Blok Sayısı</span>
                      <span className="info-box-number">{this.state.blockNumber}</span>
                      </div>
                      {/* /.info-box-content */}
                    </div>
                    {/* /.info-box */}
                    <div className="info-box mb-3 bg-dark">
                      <span className="info-box-icon">
                        <i className="fas fa-home" />
                      </span>
                      <div className="info-box-content">
                        <span className="info-box-text">Daire Sayısı</span>
                        <span className="info-box-number">{this.state.apartmenNumber}</span>
                      </div>
                      {/* /.info-box-content */}
                    </div>
                    {/* /.info-box */}
                    <div className="info-box mb-3 bg-dark">
                      <span className="info-box-icon">
                        <i className="fas fa-store" />
                      </span>
                      <div className="info-box-content">
                        <span className="info-box-text">Dükkan Sayısı</span>
                        <span className="info-box-number">{this.state.storeNumber}</span>
                      </div>
                      {/* /.info-box-content */}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default Home;
