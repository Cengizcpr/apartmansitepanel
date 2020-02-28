import React, { Component } from 'react'
import Header from "../Home/Header"
import Menu from "../Home/Menu"
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {Link} from 'react-router-dom'

 class BuildSetting extends Component {
  constructor() {
    super()
   

    this.state = {
        build_name: '',
        phone_no: '',
        adress: '',
        blocknumbers:'',
        locations:[],
        showMe:true,
        showUser:false
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
  
      const alf=["","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","R","S","T","U"]
      for(var i=1;i<=this.state.blocknumbers;i++){
       
      }const newBlocks=[]
      for(var i=1;i<=this.state.blocknumbers;i++){
         newBlocks[i] = {
          block_name:alf[i],
          circlenumber:"Girilmedi",
          storenumber:"Girilmedi"
        }
      }
        for(var i=1;i<=this.state.blocknumbers;i++){

        console.log(newBlocks.block_name)
         axios.post('blocks/blocksetting', newBlocks[i])
          .then((response) => {
            console.log(' eklendi.');
          }).catch((error) => { 
            console.log('Blok bilgileri eklenmedi.');
        }); 
        
      }
      this.props.history.push('/home')
    }).catch((error) => { 
        console.log('Site bilgileri eklenmedi.');
    });   
  }  
  componentDidMount(e) {
    const token = localStorage.usertoken
    try{
        jwt_decode(token)
        const res =[];
        for(var i=1;i<=20;i++){
          res[i]=i;
        }
        this.setState({
          locations:res,
        })
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
    const blocknumbers=this.state.locations.map(data => (
       
      <option key={data}>{data}</option>

    ));
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
        {this.state.showMe? 
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
          <input type="text" className="form-control" placeholder="Site Adresi:"  name="adress"  value={this.state.adress}  onChange={this.onChange} required />
        </div>
    </div>

    <div className="form-group">
        <label htmlFor="exampleInputPassword1">Blok Sayısı</label>
        <select className="form-control"  onChange={this.handleChangeBlockNumbers} >
            <option>Blok Sayısı Seçiniz.. </option>
            {blocknumbers}
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
export default BuildSetting