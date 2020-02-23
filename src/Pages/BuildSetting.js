import React, { Component } from 'react'
import Header from "../Home/Header"
import Menu from "../Home/AdminMenu"
import axios from 'axios'
import jwt_decode from 'jwt-decode'

 class BuildSetting extends Component {
  constructor() {
    super()
   

    this.state = {
        build_name: '',
        phone_no: '',
        adress: '',
        blocknumbers:''
      }
      
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {this.setState({ [e.target.name]: e.target.value }) }

  handleChangeBlockNumbers = (e) => {
    let index = e.nativeEvent.target.selectedIndex;
   
    this.setState({
    blocknumbers:e.nativeEvent.target[index].text
    })
    }

  onSubmit(e){
    e.preventDefault();
    const newBuilds = {
        build_name: this.state.build_name,
        phone_no: this.state.phone_no,
        adress:this.state.adress,
        blocknumbers:this.state.blocknumbers
    }

    axios.post('builds/buildsetting', newBuilds)
    .then((response) => {
        window.location.replace('/home')
    }).catch((error) => { 
        console.log('Kullanıcı eklenmedi.');
    });   
  }  

  

  componentDidMount(e) {
    const token = localStorage.usertoken
    try{
        jwt_decode(token);
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
      <div className='card'><div className="card-body"></div>
      <div  className="container ">  
      <section className='content '>
      <div className='row justify-content-center'>
        <div className="col-md-6">
        <div className="card card-primary">
        <div className="card-header">
      <h3 className="card-title">Site Bilgileri Ekle</h3>
    </div>
   
    <form noValidate onSubmit={this.onSubmit}> 
      <div className="card-body">
      <div className="form-group">
          <label htmlFor="exampleInputEmail1">Site Adı</label>
          <input type="text"  className="form-control" placeholder="Site Adı:"  name="build_name"  value={this.state.build_name}  onChange={this.onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Site Telefon No</label>
          <input type="tel"  className="form-control" placeholder="Site Telefon No:"  name="phone_no"  value={this.state.phone_no}  onChange={this.onChange} max={9999} required />
        </div>
    <div className="form-group">
        <label htmlFor="exampleInputFile">Site Adresi</label>
        <div className="input-group">
          <input type="text" maxLength={11} className="form-control" placeholder="Site Adresi:"  name="adress"  value={this.state.adress}  onChange={this.onChange} required />
        </div>
    </div>

    <div className="form-group">
        <label htmlFor="exampleInputPassword1">Blok Sayısı</label>
        <select className="form-control"  onChange={this.handleChangeBlockNumbers} >
            <option>Blok Sayısı Seçiniz.. </option>
            <option>1</option><option>2</option>
            <option>3</option><option>4</option>
            <option>5</option><option>6</option>
            <option>7</option><option>8</option>
            <option>9</option><option>10</option>
            <option>11</option><option>12</option>
            <option>13</option><option>14</option>
            <option>15</option><option>16</option>
        </select>
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
export default BuildSetting