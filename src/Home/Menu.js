import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

class Menu extends Component {
  constructor() {
    
    super();
    this.state = {
     
      showUserMenu: false,
      showBuildMenu: false,
      showFaultMenu: false,
      showPersonalMenu: false,
      showFaultMenuUser:true,
      showDuesMenu:false,
      showButton:true,
     
      menustyle: "right fas fa-angle-left",
    };
    axios.get("builds/buildslist").then((response) => {
      if (response.data[0] != undefined) {
        this.setState({
          locations: "/buildinfo",
        });
      } else {
        this.setState({
          locations: "/buildsetting",
        });
      }
    });

  }
  visibleUser() {
    if (this.state.showUserMenu == false) {
      this.setState({
        showUserMenu: true,
        menustyle: "right fas fa-angle-down",
      });
    } else {
      this.setState({
        showUserMenu: false,
        menustyle: "right fas fa-angle-left",
      });
    }
  }
  visibleBuild() {
    if (this.state.showBuildMenu == false) {
      this.setState({
        showBuildMenu: true,
        menustyle: "right fas fa-angle-down",
      });
    } else {
      this.setState({
        showBuildMenu: false,
        menustyle: "right fas fa-angle-left",
      });
    }
  }
  visibleFault() {
    if (this.state.showFaultMenu == false) {
      this.setState({
        showFaultMenu: true,
        menustyle: "right fas fa-angle-down",
      });
    } else {
      this.setState({
        showFaultMenu: false,
        menustyle: "right fas fa-angle-left",
      });
    }
  }
  visiblePersonal() {
    if (this.state.showPersonalMenu == false) {
      this.setState({
        showPersonalMenu: true,
        menustyle: "right fas fa-angle-down",
      });
    } else {
      this.setState({
        showPersonalMenu: false,
        menustyle: "right fas fa-angle-left",
      });
    }
  }
  visibleDues() {
    if (this.state.showDuesMenu == false) {
      this.setState({
        showDuesMenu: true,
        menustyle: "right fas fa-angle-down",
      });
    } else {
      this.setState({
        showDuesMenu: false,
        menustyle: "right fas fa-angle-left",
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

    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="row">
            <div className="col-lg-3 col-6">
             
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                  <Link to="/home" className="brand-link">
                    <img
                      src="dist/img/AdminLTELogo.png"
                      alt="AdminLTELogo"
                      className="brand-image img-circle elevation-3"
                      style={{ opacity: ".8" }}
                    />
                    <span className="brand-text font-weight-light">
                      Apartman Site Panel
                    </span>
                  </Link>

                  <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                      <div className="image">
                        <img
                          src="dist/img/user2-160x160.jpg"
                          className="img-circle elevation-2"
                          alt="UserImage"
                        />
                      </div>
                      <div className="info">
                        <Link to="/adminprofile" className="text text-lg">
                          Admin
                        </Link>
                      </div>
                    </div>

                    <nav className="mt-2">
                     <ul
                        className="nav nav-pills nav-sidebar flex-column "
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                        
                      >
                        <li className="nav-item ">
                          <Link to="/home" className="nav-link ">
                            <i className="nav-icon fas fa-home" />
                            <p className="text text-lg">Anasayfa</p>
                          </Link>
                        </li>
                        <li className="nav-item" >
                          <Link
                            onClick={() => this.visibleUser()}
                            className="nav-link "
                          >
                            <i className="nav-icon fas fa-users" />
                            <p className="text text-lg">Kullanıcılar</p>
                            <i className={this.state.menustyle}></i>
                          </Link>
                        </li>
 
                        <li className="nav-item ">
                          {this.state.showUserMenu ? (
                            <Link to="/users" className="nav-link ">
                              <i className="nav-icon fas fa-edit" />
                              <p>Kullanıcı Ekle</p>
                            </Link>
                          ) : null}
                        </li>
                        <li className="nav-item ">
                          {this.state.showUserMenu ? (
                            <Link to="/userslist" className="nav-link ">
                              <i className="nav-icon fas fa-address-card" />
                              <p>Kullanıcıları Listele</p>
                            </Link>
                          ) : null}
                        </li>
                        <li className="nav-item">
                          <Link
                            onClick={() => this.visiblePersonal()}
                            className="nav-link "
                          >
                            <i className="nav-icon fas fa-user-tie" />
                            <p className="text text-lg">Personeller</p>
                            <i className={this.state.menustyle}></i>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          {this.state.showPersonalMenu ? (
                            <Link to="/personaladd" className="nav-link ">
                              <i className="nav-icon fas fa-edit " />
                              <p>Personel Ekle</p>
                            </Link>
                          ) : null}
                        </li>
                        <li className="nav-item ">
                          {" "}
                          {this.state.showPersonalMenu ? (
                            <Link to="/personallist" className="nav-link ">
                              <i className="nav-icon fas fa-copy" />
                              <p>Personelleri Listele</p>
                            </Link>
                          ) : null}
                        </li>

                        <li className="nav-item">
                          <Link
                            onClick={() => this.visibleBuild()}
                            className="nav-link "
                          >
                            <i className="nav-icon fas fa-home" />
                            <p className="text text-lg">Site Ayarları</p>
                            <i className={this.state.menustyle}></i>
                          </Link>
                        </li>
                       
                            <li className="nav-item "> {this.state.showBuildMenu ? (
                              <Link
                                to={this.state.locations}
                                className="nav-link "
                              >
                                <i className="nav-icon fas fa-city" />
                                <p>Site Bilgileri</p>
                              </Link>) : null}
                            </li>
                            <li className="nav-item "> {this.state.showBuildMenu ? (
                              <Link to="/blocksetting" className="nav-link ">
                                <i className="nav-icon fas fa-building" />
                                <p>Blok Ayarları</p>
                              </Link>) : null}
                            </li>
                            <li className="nav-item "> {this.state.showBuildMenu ? (
                              <Link
                                to="/apartmentsetting"
                                className="nav-link "
                              >
                                <i className="nav-icon fas fa-address-card" />
                                <p>Daire Detayları</p>
                              </Link>) : null}
                            </li>
                            <li className="nav-item "> {this.state.showBuildMenu ? (
                              <Link to="/storesetting" className="nav-link ">
                                <i className="nav-icon fas fa-store" />
                                <p>Dükkan Detayları</p>
                              </Link>) : null}
                            </li>
                            <li className="nav-item "> {this.state.showBuildMenu ? (
                              <Link to="/carpark" className="nav-link ">
                                <i className="nav-icon fas fa-car" />
                                <p>Otopark İşlemleri</p>
                              </Link>) : null}
                            </li>
                         
                            {this.state.showFaultMenuUser ? (
                        <li className="nav-item">
                          <Link
                            onClick={() => this.visibleFault()}
                            className="nav-link "
                          >
                            <i className="nav-icon fas fa-tools" />
                            <p className="text text-lg">Arıza Takip</p>
                            <i className={this.state.menustyle}></i>
                          </Link>
                        </li>
                    ) : null}
                        <li className="nav-item ">
                          {" "}
                          {this.state.showFaultMenu ? (
                            <Link to="/faultregister" className="nav-link ">
                              <i className="nav-icon fas fa-wrench" />
                              <p>Arıza Ekle</p>
                            </Link>
                          ) : null}
                        </li>
                        <li className="nav-item ">
                          {" "}
                          {this.state.showFaultMenu ? (
                            <Link to="/faultlist" className="nav-link ">
                              <i class="nav-icon fas fa-list"></i>{" "}
                              <p>Arıza Listele</p>
                            </Link>
                          ) : null}
                        </li>
                        
                        <li className="nav-item">
                          <Link
                            onClick={() => this.visibleDues()}
                            className="nav-link "
                          >
                            <i className="nav-icon fas fa-lira-sign" />
                            <p className="text text-lg">Aidat İşlemleri</p>
                            <i className={this.state.menustyle}></i>
                          </Link>
                        </li>

                        <li className="nav-item ">
                          
                          {this.state.showDuesMenu ? (
                            <Link to="/duesadd" className="nav-link ">
                              <i className="nav-icon fas fa-plus" />
                              <p>Aidat Ekle</p>
                            </Link>
                          ) : null}
                        </li>
                      
                        <li className="nav-item ">
                          
                          {this.state.showDuesMenu ? (
                            <Link to="/dueslist" className="nav-link ">
                              <i class="nav-icon fas fa-coins"></i>{" "}
                              <p>Aidat Listele</p>
                            </Link>
                          ) : null}
                        </li>
                        <li className="nav-item" >
                          <Link
                            to="/adminprofile"
                            className="nav-link "
                          >
                            <i className="nav-icon fas fa-cogs" />
                            <p className="text text-lg">Ayarlar</p>
                            
                          </Link>
                        </li>
                      </ul>             

                    </nav>
                  </div>
                </aside>
           
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Menu;