import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      showMe: true,
      showUser: false,
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
              {this.state.showMe ? (
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
                        <Link to="/adminprofile" className="d-block">
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
                            <p>Anasayfa</p>
                          </Link>
                        </li>

                        <li className="nav-item ">
                          <Link to={this.state.locations} className="nav-link ">
                            <i className="nav-icon fas fa-city" />
                            <p>Site Bilgileri</p>
                          </Link>
                        </li>

                        <li className="nav-item ">
                          <Link to="/users" className="nav-link ">
                            <i className="nav-icon fas fa-edit" />
                            <p>Kullanıcı Ekle</p>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link to="/userslist" className="nav-link ">
                            <i className="nav-icon fas fa-address-card" />
                            <p>Kullanıcıları Listele</p>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link to="/personaladd" className="nav-link ">
                            <i className="nav-icon fas fa-edit " />
                            <p>Personel Ekle</p>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link to="/personallist" className="nav-link ">
                            <i className="nav-icon fas fa-copy" />
                            <p>Personelleri Listele</p>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link to="/blocksetting" className="nav-link ">
                            <i className="nav-icon fas fa-building" />
                            <p>Blok Ayarları</p>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link to="/apartmentsetting" className="nav-link ">
                            <i className="nav-icon fas fa-address-card" />
                            <p>Daire Detayları</p>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link to="/storesetting" className="nav-link ">
                            <i className="nav-icon fas fa-store" />
                            <p>Dükkan Detayları</p>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link to="/carpark" className="nav-link ">
                            <i className="nav-icon fas fa-car" />
                            <p>Otopark İşlemleri</p>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </aside>
              ) : null}
              {this.state.showUser ? (
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
                        <Link to="/adminprofile" className="d-block">
                          Kullanıcı
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
                            <i className="nav-icon fas fa-tachometer-alt" />
                            <p>Anasayfa</p>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </aside>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Menu;
