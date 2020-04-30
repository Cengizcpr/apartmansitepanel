import React, { Component } from 'react'

export default class asd extends Component {
  render() {
    return (
        <div class="lockscreen-wrapper">
        <div class="lockscreen-logo">
          <a href="../../index2.html"><b>Admin</b>LTE</a>
        </div>
        <!-- User name -->
        <div class="lockscreen-name">John Doe</div>
      
        <!-- START LOCK SCREEN ITEM -->
        <div class="lockscreen-item">
          <!-- lockscreen image -->
          <div class="lockscreen-image">
            <img src="../../dist/img/user1-128x128.jpg" alt="User Image">
          </div>
          <!-- /.lockscreen-image -->
      
          <!-- lockscreen credentials (contains the form) -->
          <form class="lockscreen-credentials">
            <div class="input-group">
            <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email adresi"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Şifre"
                  value={this.state.password}
                  onChange={this.onChange}
                />      
              <div class="input-group-append">
                <button type="button" class="btn"><i class="fas fa-arrow-right text-muted"></i></button>
              </div>
            </div>
          </form>
          <!-- /.lockscreen credentials -->
      
        </div>
        <!-- /.lockscreen-item -->
        <div class="help-block text-center">
          Enter your password to retrieve your session
        </div>
        <div class="text-center">
          <a href="login.html">Or sign in as a different user</a>
        </div>
        <div class="lockscreen-footer text-center">
          Copyright © 2014-2019 <b><a href="http://adminlte.io" class="text-black">AdminLTE.io</a></b><br>
          All rights reserved
        </div>
      </div>








      <div className="login-box">
        <div className="login-logo">
          <Link to="/">
            <b>ApartmanSitePanel</b>Giriş
          </Link>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <h5 className="login-box-msg login-box-danger">
              {this.state.adminresponse}
            </h5>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email adresi"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Şifre"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-flat"
                  >
                    Giriş Yap
                  </button>
                </div>
              </div>
            </form>
            <Link to="/register" className="text-center">
              Yeni Üye Ol
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

