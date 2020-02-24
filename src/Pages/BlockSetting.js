import React, { Component } from 'react'
import Header from "../Home/Header"
import Menu from "../Home/Menu"
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {Link} from "react-router-dom"

 class BlockSetting extends Component {
  constructor() {
    super()
    this.state = {
        locations:[],
        showMeBlock:true,
        showMeBlockİnfo:false,
        blok_name:''
    }
  }

  
  

  componentDidMount(e) {
    const token = localStorage.usertoken
    try{
        jwt_decode(token);
        const res =[];
        axios.get('builds/buildslist')
        .then((response) => {
            const numbers=response.data[0].blocknumbers
            for(var i=1;i<=numbers;i++){
                res[i]="Blok "+i;
            }
            this.setState({
                locations:res,
                blok_name:response.data[0].blok_name

            })
        }).catch((error) => { 
            console.log('Kullanıcı eklenmedi.');
        });   
       
        
            
    }catch(error){
        window.location.replace('/')
    }
  
  }
  onVisibleİnfo(data){
    this.setState({
      blok_name:data,
      showMeBlock:false,
      showMeBlockİnfo:true,
    })
  }
  render() { 
    
    

    const blocknumbers=this.state.locations.map(data => (
       
            <div className="col-lg-3 col-6" key={data}>
                    <div className="small-box bg-info">
                        <div className="inner">               
                        <p>   <h3>{data} </h3></p>
                        </div> 
                        <Link  onClick={()=>this.onVisibleİnfo(data)} className="small-box-footer ">Daha fazla bilgi
                        <i className="fas fa-arrow-circle-right"  /></Link>
                    </div>
                </div>
      ));
     
    return (

      <div>
       <Header/>
       <Menu/>
        <div className="content-wrapper">  
          {this.state.showMeBlock? 
            <div className="content-header">  
              <div className="row">
              {blocknumbers}
              </div>  
            </div>
          :null}
          {this.state.showMeBlockİnfo? 
          <div className='card'>
            <div  className="container">  
                <section className='content'>
                  <div className='row justify-content-center'>
                    <div className="col-md-6">
                      <div className="card card-primary">
                        <div className="card-header">
                        <h3 className="card-title">Blok Bilgileri</h3>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}> 
                          <div className="card-body">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Blok Adı</label>
                              <input type="text"  className="form-control" name="blok_name"  value={this.state.blok_name}  onChange={this.onChange} required /><br/>
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
          :null}  
        </div>
      </div>
    )
  }
}
export default BlockSetting