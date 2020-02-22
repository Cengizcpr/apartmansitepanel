import React, { Component } from 'react'
import {Link} from "react-router-dom"
import { login } from './UserFunctions' 
class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {},
      cevap:'Oturumunuzu başlatmak giriş yapın',
      
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
 
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()
    
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    

    login(user).then(res => {
   
      if(res===false){
        console.log('başarısız')
        this.setState({
          email:"",
          password:"",
          cevap:"Email adresi veya Şifre yanlış"
        })
      }
      else{
        console.log('başarılı')
      this.props.history.push(`/home`)
      }
    })
  }

render(){

    return (
       <div className="login-box">
  <div className="login-logo">
    <Link to="/"><b>ApartmanSite</b>Panel</Link>
  </div>
  <div className="card">
    <div className="card-body login-card-body">
      <h5 className="login-box-msg login-box-danger">{this.state.cevap}</h5>
      <form noValidate onSubmit={this.onSubmit}>
        <div className="input-group mb-3">
          <input type="email" className="form-control" name="email" placeholder="Email adresi" value={this.state.email} onChange={this.onChange} />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" name="password" placeholder="Şifre"  value={this.state.password}  onChange={this.onChange} />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="row">
          
        <div className="col-4">
            <button type="submit" className="btn btn-primary btn-block btn-flat">Giriş Yap</button>
          </div>
        </div>
      </form>
      <Link to="/register" className="text-center">Yeni Üye Ol</Link>
     
     
    </div>

  </div>
</div>

    )
    }
  
}
export default Login