import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import Header from "./Header"
import Menu from "./Menu"
import {getProfile} from '../component/UserFunctions'
 
 class Profile extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      phone_no:'',
      errors: {}
    }
  }

  componentDidMount(e) {
    
    const token = localStorage.usertoken
  try{

    jwt_decode(token);
    const decoded = jwt_decode(token)
    
    getProfile().then(res =>{
    for(var i=0;i<res.length;i++){
    if(decoded.first_name===res[i].first_name)
    {this.setState({
        first_name:res[i].first_name,
        last_name:res[i].last_name,
        phone_no:res[i].phone_no,
        email:res[i].email
      })
    }
    }
    })



   

  }catch(error){
window.location.replace('/')
  }
  
  }
  
  render() { 
    return (

 <div>  <Header/>
 <Menu/>
  <div className="container">
  
    <div className="content-header">  
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFİL</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Adınız:</td>
                <td>{this.state.first_name}</td>
              </tr>
              <tr>
                <td>Soyadınız:</td>
                <td>{this.state.last_name}</td>
              </tr>
              <tr>
                <td>Email Adresiniz:</td>
                <td>{this.state.email}</td>
              </tr>
              <tr>
                <td>Telefon Numaranız:</td>
                <td>{this.state.phone_no}</td>
              </tr>
            
            </tbody>
          </table>
        
      </div>
  
   
  </div>
  
</div>


    )
  }
}
export default Profile