import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import Header from "../Home/Header";
import Menu from "../Home/Menu";
import axios from "axios";
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      phone_no: "",
      status:'',
      errors: {}
    };
  }

  componentDidMount(e) {
    const token = localStorage.usertoken;
    try {
      jwt_decode(token);
      const decoded = jwt_decode(token);
      axios
        .get("users/adminprofile")
        .then(res => {
          var response = res.data;
          for (var i = 0; i < response.length; i++) {
         
            if (decoded.first_name === response[i].first_name) {
              console.log(res.data[i].status)
              if(res.data[i].status){
                this.setState({
                  first_name: response[i].first_name,
                  last_name: response[i].last_name,
                  phone_no: response[i].phone_no,
                  email: response[i].email,
                    status:"Yönetici"
                })
              }
              else{
              this.setState({
                first_name: response[i].first_name,
                last_name: response[i].last_name,
                phone_no: response[i].phone_no,
                email: response[i].email,
                status:"Kullanıcı"
              });
            }
            }
          }
        })
        .catch(err => {
          window.location.replace("/");
        });
    } catch (error) {
      window.location.replace("/");
    }
  }

  render() {
    return (
      <div>
        {" "}
        <Header />
        <Menu />
        <div className="container">
          <div className="content-header">
         <div className="card-body box-profile">
  <div className="text-center">
    <img className="profile-user-img img-fluid img-circle" src="../../dist/img/user2-160x160.jpg"  />
  </div>
  <h3 className="profile-username text-center">{this.state.first_name} {this.state.last_name}</h3>
  <p className="text-muted text-center">{this.state.status}</p>
  <ul className="list-group list-group-unbordered mb-3">
    <li className="list-group-item">
      <b>Email</b> <a className="float-right">{this.state.email}</a>
    </li>
    <li className="list-group-item">
      <b>Telefon No</b> <a className="float-right">{this.state.phone_no}</a>
    </li>
   
  </ul>
  
</div>

        </div>
      </div>
      </div>
    );
  }
}
export default Profile;
