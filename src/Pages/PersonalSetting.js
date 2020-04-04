import React, { Component } from 'react'
import Header from "../Home/Header"
import Menu from "../Home/Menu"
import axios from 'axios'
import {Link} from 'react-router-dom'
import jwt_decode from 'jwt-decode'

 class PersonalSetting extends Component {
  constructor() {
    super()
   

    this.state = {
        first_name: '',
        last_name: '',
        phone_no: '',
        adress: '',
        departmans:'',
        showMe:true,
        showUser:false
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {this.setState({ [e.target.name]: e.target.value }) }

  handleChangePersonalDepartment = (e) => {
    let index = e.nativeEvent.target.selectedIndex;
   
    this.setState({
    departmans:e.nativeEvent.target[index].text
    })
  }

  onSubmit(e){
    e.preventDefault();
    const newPersonal = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        adress: this.state.adress,
        phone_no: this.state.phone_no,
        departmans:this.state.departmans
    }
    axios.post('personals/personaladd', newPersonal)
    .then((response) => {
      
      this.props.history.push('/personallist');
    }).catch((error) => { 
        console.log('Kullanıcı eklenmedi.');
    });   
  }  

  

  componentDidMount(e) {
    const token = localStorage.usertoken
    try{
        jwt_decode(token)
        const decoded = jwt_decode(token)
        axios.get('users/adminprofile')
        .then(res => {
          var response=res.data;
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
    return (

      <div>
      <Header/>
      <Menu/>
      <div className="content-wrapper"> 
      <div className='card'>
      <div  className="container ">  
      <section className='content '>
  <div className='row justify-content-center'>
          <div className="col-md-6">{this.state.showMe? 
  <div className="card card-primary">
    <div className="card-header">
      <h3 className="card-title">Personel Ekle</h3>
    </div>
   
    <form noValidate onSubmit={this.onSubmit}> 
      <div className="card-body">
      <div className="form-group">
          <label htmlFor="exampleInputEmail1">Personel Adı</label>
          <input type="text"  className="form-control" placeholder="Personel Adı:"  name="first_name"  value={this.state.first_name}  onChange={this.onChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Personel Soyadı</label>
          <input type="text"  className="form-control" placeholder="Personel Soyadı:"  name="last_name"  value={this.state.last_name}  onChange={this.onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Personel Adresi</label>
          <input type="text"  className="form-control" placeholder="Personel Adresi:"  name="adress"  value={this.state.adress}  onChange={this.onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Personel Telefon No</label>
          <input type="tel"  className="form-control" placeholder="Personel Telefon No:"  name="phone_no"  value={this.state.phone_no}  onChange={this.onChange}  required />
        </div>
        <div className="form-group">
        <label htmlFor="exampleInputPassword1">Personel Departmanı</label>
        <select className="form-control"  onChange={this.handleChangePersonalDepartment} >
            <option>Departmanı Seçiniz.. </option>
            <option>Kapıcı </option>
            <option>Teknik Servis </option>
            <option>Güvenlik </option>
            <option>Bahçıvan </option>
            <option>Temizlikçi </option>
        </select>
    </div>
      </div>
    
     
      <div className="card-footer">
        <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Kaydet</button>
      </div>
    </form>
  </div>
:null}

</div>

</div> 
 
  </section>


  </div>
  </div>
  </div>
  {this.state.showUser? this.props.history.push('/statuserror') :null}
</div>


    )
  }
}
export default PersonalSetting