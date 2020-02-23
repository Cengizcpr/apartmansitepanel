import React, { Component } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      emailkul:'',
      passwordkul:'',
      errors: {},
      adminresponse:'Admin oturumunuzu başlatmak giriş yapın',
      userresponse:'Kullanıcı oturumunuzu başlatmak giriş yapın',
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)


  }
 
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit2() {
  
    const user = {
      emailkul: this.state.emailkul,
      passwordkul: this.state.passwordkul
    }
    axios.post('userskul/userlogin', {
      emailkul: user.emailkul,
      passwordkul: user.passwordkul
    })
 .then(response => {
   
    localStorage.setItem('usertoken', response.data)
    
    if(response.data=="[object Object]"){
      console.log('şifre yanlıs')
       this.setState({
        email:"",
        password:"",
        userresponse:"Email adresi veya Şifre yanlış"
      })  
    }
    else{window.location.replace('/userhome')}
    })
    
  }
  onSubmit(e) {
    e.preventDefault()
    
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post('users/login', {
      email: user.email,
      password: user.password
    })
 .then(response => {
   
    localStorage.setItem('usertoken', response.data)
    
    if(response.data=="[object Object]"){
      this.setState({
        email:"",
        password:"",
        adminresponse:"Email adresi veya Şifre yanlış"
      }) 
    }
    else{this.props.history.push(`/home`)}
    })
    
  }

render(){

    return (
       <div className="login-box">
  <div className="login-logo">
    <Link to="/"><b>Admin</b>Giriş</Link>
  </div>
  <div className="card">
    <div className="card-body login-card-body">
      <h5 className="login-box-msg login-box-danger">{this.state.adminresponse}</h5>
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
  <div className="login-logo">
    <Link to="/"><b>Kullanıcı</b>Giriş</Link>
  </div>
  <div className="card">
    <div className="card-body login-card-body">
      <h5 className="login-box-msg login-box-danger">{this.state.userresponse}</h5>
      <form noValidate >
        <div className="input-group mb-3">
          <input type="email" className="form-control" name="emailkul" placeholder="Email adresi" value={this.state.emailkul} onChange={this.onChange} />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" name="passwordkul" placeholder="Şifre"  value={this.state.passwordkul}  onChange={this.onChange} />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="row">
          
        <div className="col-4">
            <button type="button" onClick={()=>this.onSubmit2()} className="btn btn-danger btn-block btn-flat">Giriş Yap</button>
          </div>
        </div>
      </form>
     
     
    </div>

  </div>
</div>

    )
    }
  
}
export default Login