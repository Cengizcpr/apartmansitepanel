import React, { Component } from 'react'
import Header from "../Home/Header"
import Menu from "../Home/Menu"
import axios from 'axios'
import jwt_decode from 'jwt-decode'

 class UsersPage extends Component {
  constructor() {
    super()
   

    this.state = {
        first_name: '',
        last_name: '',
        phone_no: '',
        adress: '',
        password: '',
        email:''
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {this.setState({ [e.target.name]: e.target.value }) }

  onSubmit(e){
    e.preventDefault();
    const newUsers = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        password: this.state.password,
        email: this.state.email,
        phone_no: this.state.phone_no
    }

    axios.post('users/useradd', newUsers)
    .then((response) => {
        window.location.replace('/home')
    }).catch((error) => { 
        console.log('Kullanıcı eklenmedi.');
    });   
  }  

  

  componentDidMount(e) {
    const token = localStorage.usertoken
    try{
        jwt_decode(token)
    }catch(error){
        window.location.replace('/')
    }
  
  }
  
  render() { 
    return (

      <div>
      <Header/>
      <Menu/>
      <div className="content-wrapper"> 
      <div className='card'>
      <div  className="container ">  
      <section className='content '>
  <div className='row justify-content-center'>
          <div className="col-md-6">
  <div className="card card-primary">
    <div className="card-header">
      <h3 className="card-title">Kullanıcı Ekle</h3>
    </div>
   
    <form noValidate onSubmit={this.onSubmit}> 
      <div className="card-body">
      <div className="form-group">
          <label htmlFor="exampleInputEmail1">Kullanıcı Adı</label>
          <input type="text"  className="form-control" placeholder="Kullanıcı Adı:"  name="first_name"  value={this.state.first_name}  onChange={this.onChange} required /><br/>
        </div>
        
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Kullanıcı Soyadı</label>
          <input type="text"  className="form-control" placeholder="Kullanıcı Soyadı:"  name="last_name"  value={this.state.last_name}  onChange={this.onChange} required /><br/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Kullanıcı Email</label>
          <input type="text"  className="form-control" placeholder="Kullanıcı Email:"  name="email"  value={this.state.email}  onChange={this.onChange} required /><br/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Kullanıcı Şifresi</label>
          <input type="password"  className="form-control" placeholder="Kullanıcı Şifresi:"  name="password"  value={this.state.password}  onChange={this.onChange} required /><br/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Kullanıcı Telefon No</label>
          <input type="tel"  className="form-control" placeholder="Kullanıcı Telefon No:"  name="phone_no"  value={this.state.phone_no}  onChange={this.onChange} max={9999} required /><br/>
        </div>
      </div>
     
      <div className="card-footer">
        <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Kaydet</button>
      </div>
    </form>
  </div>

</div>

</div> 
 
  </section>


  </div>
  </div>
  </div>
</div>


    )
  }
}
export default UsersPage