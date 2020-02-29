import React, { Component } from 'react'
import Header from "../Home/Header"
import Menu from "../Home/Menu"
import jwt_decode from 'jwt-decode'
import axios from "axios"
import {Link} from 'react-router-dom'

 class PersonalList extends Component {
  constructor() {
    super() 
    
    
    this.state = {
     
      locations:[],
      status:'',
      showMe:true,
      showUser:false

      };
  
  }
 
  
 
  componentDidMount(e) {
    
    const token = localStorage.usertoken
  try{

    jwt_decode(token);
    const decoded = jwt_decode(token)
    axios.get('personals/personallist')
    .then(response => {
          this.setState({
              locations:response.data,

          })
     
    })
    axios.get('users/adminprofile')
    .then(resstatus => {
     
      var response=resstatus.data;
      for(var i=0;i<response.length;i++){
        if(decoded.email===response[i].email)
        {
          if(response[i].status==false)
          {
            this.setState({
              showMe:false,
              showUser:true
            })
          }    
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
        <td>{data.departmans}</td>
        <td>{data.first_name}</td>
        <td>{data.last_name}</td> 
        <td>{data.adress}</td> 
        <td>{data.phone_no}</td> 
        <td><input type="button" className="btn btn-primary btn-flat " value={'Güncelle'} onClick={()=>this.operation(data)}></input>&nbsp;&nbsp;&nbsp;<input type="button" className="btn btn-danger  btn-flat "  value="Sil"  onClick={()=>this.deletecustomer(data)}></input></td> 

      </tr>
      
    ));  
    return ( 

      <div>
        <Header/>
        <Menu/>
        <div className="content-wrapper">  {this.state.showMe? 
            <div className="card">
                <div className="card-body">
                    <table id="students" className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th><h6>Departman</h6></th>
                                <th><h6>Personel Adı</h6></th>
                                <th><h6>Personel Soyadı</h6></th>
                                <th><h6>Personel Adresi</h6></th>
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
       </div>
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


    )
  }
}

export default PersonalList