import React, { Component } from "react";
import Header from "../Home/Header";
import Menu from "../Home/Menu";
import axios from "axios";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

class ApartmentRegister extends Component {
  constructor(props) {
    super(props);
    const { foo } = this.props.location.state;

    this.state = {
      circlenumber: foo.circlenumber,
      host_name: foo.host_name,
      host_surname: foo.host_surname,
      host_phoneno: foo.host_phoneno,
      host_state: foo.host_state,
      style_box:foo.style_box,
      showMe: true,
      showUser: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.host_state)
    var a="small-box bg-danger"
    if(this.state.host_state=="Ev Sahibi"){

   a="small-box bg-primary"
   
    
     
   }
    else if(this.state.host_state=="Kiracı"){
  a= "small-box bg-warning"
    
  
   
   
   
  }
  console.log(a)
  const newApartmenİnfo = {
    circlenumber: this.state.circlenumber,
    host_name: this.state.host_name,
    host_surname: this.state.host_surname,
    host_phoneno: this.state.host_phoneno,
    host_state: this.state.host_state,
    style_box:a
  };
  axios.put("apartmens/apartmensupdate", newApartmenİnfo).then(response => {
    this.props.history.push("/home");
  }); 
}
  handleChangeHostState = e => {
    let index = e.nativeEvent.target.selectedIndex;

    this.setState({
      host_state: e.nativeEvent.target[index].text
    });
  };

  componentDidMount(e) {
    const token = localStorage.usertoken;
    try {
      jwt_decode(token);
      const decoded = jwt_decode(token);
      axios.get("users/adminprofile").then(res => {
        var response = res.data;
        for (var i = 0; i < response.length; i++) {
          if (decoded.email === response[i].email) {
            if (response[i].status == false) {
              this.setState({
                showMe: false,
                showUser: true
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
                          <h3 className="card-title" >Daire Bilgileri</h3>
                        </div>

                        <form noValidate>
                          <div className="card-body">
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Daire Adı
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Daire Adı:"
                                name="circlenumber"
                                value={this.state.circlenumber}
                                onChange={this.onChange}
                                required
                              ></input>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Daire Durumu
                              </label>
                              <select
                                className="form-control"
                                onChange={this.handleChangeHostState}
                              >
                                <option>{this.state.host_state}</option>
                                <option>Boş</option>
                                <option> Ev Sahibi </option>
                                <option> Kiracı </option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputFile">
                                Ev Sahibi Adı
                              </label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Ev Sahibi Adı:"
                                  name="host_name"
                                  value={this.state.host_name}
                                  onChange={this.onChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputFile">
                                Ev Sahibi Soyadı
                              </label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Ev Sahibi Adı:"
                                  name="host_surname"
                                  value={this.state.host_surname}
                                  onChange={this.onChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputFile">
                                Ev Sahibi Telefon No
                              </label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Ev Sahibi Telefon No:"
                                  name="host_phoneno"
                                  value={this.state.host_phoneno}
                                  onChange={this.onChange}
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <div className="card-footer">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={this.onSubmit}
                            >
                              Kaydet
                            </button>
                          </div>
                        </form>
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
export default ApartmentRegister;
