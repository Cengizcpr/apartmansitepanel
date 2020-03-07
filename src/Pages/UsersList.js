import React, { Component } from 'react'
import Header from "../Home/Header"
import Menu from "../Home/Menu"
import jwt_decode from 'jwt-decode'
import axios from "axios"
import {Link} from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css' 

 class UsersList extends Component {
  constructor() {
    super() 
    
    
    this.state = {
     
      locations:[],
      status:'',
      showMe:true,
      showUser:false

      };
  
  }

  deleteUser  (data)  {
    confirmAlert({
      title: 'Kullanıcı Sil',
      message: 'Kullanıcıyı silmek istediğinize emin misiniz?',
      buttons: [
        {
          label: 'Evet',
          onClick: () => axios.post('users/userdelete',{email:data.email} )
          .then(response=>{
        window.location.replace('/userslist')
        })  
        },
        {
          label: 'Hayır',
          onClick: () => this.props.history.push('/userslist')
        }
      ]
    })
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
        <td><input type="button" className="btn btn-primary btn-flat " value={'Güncelle'} onClick={()=>this.operation(data)}></input>&nbsp;&nbsp;&nbsp;<input type="button" className="btn btn-danger  btn-flat "  value="Sil"  onClick={()=>this.deleteUser(data)}></input></td> 

      </tr>
      
    ));  
    return ( 

      <div>
        <Header/>
        <Menu/>
        <div className="content-wrapper"> 
        {this.state.showMe? 
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
            :null}
            {this.state.showUser? 
  <div className="error-page">
  <h2 className="headline text-warning"> 404</h2>
  <div className="error-content">
    <h3><i className="fas fa-exclamation-triangle text-warning" /> Oops! Yetki alanı dışındasınız.</h3>
    <p>
   
    Sayın kullanıcı,<Link to='/home'>Anasayfaya </Link> bu buton üzerinden dönebilirsiniz.
    </p>
  </div>
</div>
  :null}
       </div>
    </div>


    )
  }
}

export default UsersList