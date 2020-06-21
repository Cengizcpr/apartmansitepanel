import React, { Component } from "react";
import { Link } from "react-router-dom";

class Menu extends Component {
  constructor() {
    super();
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
                          <Link to="/userhome" className="nav-link ">
                            <i className="nav-icon fas fa-tachometer-alt" />
                            <p className="text text-lg">Anasayfa</p>
                          </Link>
                        </li>{" "}
                        <li className="nav-item ">
                          <Link to="/faultregister" className="nav-link ">
                            <i className="nav-icon fas fa-tools" />
                            <p className="text text-lg">Arıza İşlemleri</p>
                          </Link>
                        </li> 
                        <li className="nav-item ">
                          <Link to="/duespay" className="nav-link ">
                            <i className="nav-icon fas fa-money-check" />
                            <p className="text text-lg">Aidat Ödeme</p>
                          </Link>
                        </li>
                        <li className="nav-item">
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
