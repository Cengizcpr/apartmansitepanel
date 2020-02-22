import React, { Component } from 'react'
import {Link} from "react-router-dom"
export default class Header extends Component {
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    console.log('token silindi')
   window.location.replace('/')
  }

  render() {
    return (
 <div>
  <nav className="main-header navbar navbar-expand navbar-white navbar-light">
   
    <ul className="navbar-nav">
      <li className="nav-item">
      
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <Link to="/home" className="nav-link">Anasayfa</Link>
      </li>
      
    </ul>
   
    <ul className="navbar-nav ml-auto">
     
      <li className="nav-item dropdown">  <Link to="/" className="nav-link" onClick={this.logOut.bind(this)}>
            Çıkış Yap
          </Link>
        </li>
        </ul>
  </nav>
</div>

    )
  }
}
