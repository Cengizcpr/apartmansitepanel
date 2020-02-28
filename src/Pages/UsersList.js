import React, { Component } from 'react'
import Header from "../Home/Header"
import Menu from "../Home/Menu"
import jwt_decode from 'jwt-decode'
import axios from "axios"

 class UsersList extends Component {
  constructor() {
    super() 
    
    
    this.state = {
     
      locations:[],
      status:''

      };
  
  }
 
  
 
  componentDidMount(e) {
    
    const token = localStorage.usertoken
  try{

    jwt_decode(token);
    axios.get('users/adminprofile')
    .then(res => {
      var response=res.data;
      for(var i=0;i<response.length;i++){
        console.log(response[i].status)
          if(response[i].status==true)
          { 
            this.setState({
                locations:response,
            
              })
           } 
    

        
        }
    })
  }catch(error){
window.location.replace('/')
  }
  
  }
  
 


  render() { 
    
     const cities=this.state.locations.map(data => (
        <tr key={data._id}>
        <td>{data.status?'Admin':'Kullanıcı'}</td>
        <td>{data.first_name}</td>
        <td>{data.last_name}</td> 
        <td>{data.email}</td> 
        <td>{data.phone_no}</td> 
        <td><input type="button" className="btn btn-primary btn-flat " value={'Güncelle'} onClick={()=>this.operation(data)}></input>&nbsp;&nbsp;&nbsp;<input type="button" className="btn btn-danger  btn-flat "  value="Sil"  onClick={()=>this.deletecustomer(data)}></input></td> 

      </tr>
      
    ));  
    return ( 

      <div>
        <Header/>
        <Menu/>
        <div className="content-wrapper"> 
            <div className="card">
                <div className="card-body">
                    <table id="students" className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th><h6>Ünvan</h6></th>
                                <th><h6>Kullanıcı Adı</h6></th>
                                <th><h6>Kullanıcı Soyadı</h6></th>
                                <th><h6>Kullanıcı Email</h6></th>
                                <th><h6>Telefon No</h6></th>
                                <th><h6>Ayarlar</h6></th>
                            </tr>
                        </thead>
                        <tbody>
                             {cities} 
                         </tbody>
                    </table>
                </div> 
            </div>
       </div>
    </div>


    )
  }
}

export default UsersList