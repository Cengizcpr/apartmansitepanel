import React, { Component } from "react";
import Header from "../../Home/Header";
import Menu from "../../Home/Menu";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DuesAdd extends Component {
  constructor() {
    super();

    this.state = {
      showMe: true,
      showUser: false,
      startDate: new Date(),
      payment_date: "",
      operation_date: "",
      endDate: new Date(),
      duesComment: "",
      amount: "",
      duesGroup: "",
      duesYearMonth: "",
      duesSelectyear: "Yıl Seçiniz.",
      duesSelectmonth: "Dönem Seçiniz.",
      locationsinfo:[],
      locationsinfostore:[]
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  //aıdat yıl
  handleChangeSelectYear = (e) => {
    let index = e.nativeEvent.target.selectedIndex;

    this.setState({
      duesSelectyear: e.nativeEvent.target[index].text,
    });
  };
  //grup
  handleChangeSelectGroup = (e) => {
    let index = e.nativeEvent.target.selectedIndex;

    this.setState({
      duesGroup: e.nativeEvent.target[index].text,
    });
  };
  //dönem
  handleChangeSelectMonth = (e) => {
    let index = e.nativeEvent.target.selectedIndex;

    this.setState({
      duesSelectmonth: e.nativeEvent.target[index].text,
    });
  };
  //işlem tar
  handleChangeCalendar = (date) => {
    this.setState({
      startDate: date,
      operation_date:  date.getDate() +
      "/" +
        parseInt(date.getMonth() + 1) +
        "/" +
      
        date.getFullYear(),
    });
  };
  //son ödeme
  handleChangeCalendarEnd = (date) => {
    this.setState({
      endDate: date,
      payment_date:
      date.getDate() +
      "/" +
        parseInt(date.getMonth() + 1) +
        "/" +
      
        date.getFullYear(),
    });
  };
    //aidat validation
    handleValidation() {
      let operation_date = this.state.operation_date;
      let payment_date = this.state.payment_date;
      let amount = this.state.amount;
      let duesComment = this.state.duesComment;
      let duesGroup = this.state.duesGroup;
      let duesSelectyear = this.state.duesSelectyear;
      let duesSelectmonth = this.state.duesSelectmonth;

      let formIsValid = true;
  
      let partternamount = /[0-9]/g;
      let resultAmount = partternamount.test(amount);
      
      //Boş mu kontrol?
      if (!operation_date || !payment_date || !amount || !duesComment|| !duesGroup|| !duesSelectyear|| !duesSelectmonth) {
        formIsValid = false;
        toast.error("Boş Bırakmayınız!");
      }
      //Tutar  için sayı kontrol?
      else if (resultAmount === false) {
        formIsValid = false;
        toast.warn("Sadece Tutar Giriniz!");
      }

      return formIsValid;
    }
    circleDues(dataDues)
    {
      axios.get("apartmens/findapartmendues").then((res)=>{
        for (var i = 0; i < res.data.length; i++) {
          if(res.data[i].host_state!="Boş"){
          
            const duesLoanData={
              duesYearMonth: dataDues.duesYearMonth,
              duesMonth:dataDues.duesMonth,
              duesYear:dataDues.duesYearMonth.slice(0,4),
              duesGroup: dataDues.duesGroup,
              amount: dataDues.amount,
              loanPersonName: res.data[i].host_name+" "+res.data[i].host_surname,
              loanPersonPhoneno:res.data[i].host_phoneno,
              loanGroupName:res.data[i].block_name+res.data[i].circlenumber,
              loanState:false
            }
            axios
            .post("duesloan/duesloanadd", duesLoanData)
            .then((response) => {
              if (response.data == true) {
                 //aidat tanımlandı
              }
             else if (response.data == false) {
                toast.error("Hata!Aidat Tanımlanamamıştır!");
            }
            })
          
          
          }
          }
      
      })

    }
    storeDues(dataDues){
      axios.get("stores/findstoredues").then((res)=>{ 
        for (var i = 0; i < res.data.length; i++) {
          if(res.data[i].store_state!="Boş"){
            const duesLoanData={
              duesYearMonth: dataDues.duesYearMonth,
              duesMonth:dataDues.duesMonth,
              duesYear:dataDues.duesYearMonth.slice(0,4),
              duesGroup: dataDues.duesGroup,
              amount: dataDues.amount,
              loanPersonName: res.data[i].store_name+" "+res.data[i].store_surname,
              loanPersonPhoneno:res.data[i].store_phoneno,
              loanGroupName:res.data[i].block_name+res.data[i].storenumber,
              loanState:false
            }
            axios
            .post("duesloan/duesloanadd", duesLoanData)
            .then((response) => {
              if (response.data == true) {
                //  toast.success(duesLoanData.duesMonth.slice(3)+" Ayı Aidatları Tanımlanmıştır.");
              }  else if (response.data == false) {
                toast.error("Hata!Aidat Tanımlanamamıştır!");
            }
            })
            
          }
        }
      })
    }
  
  onSubmit(e) {
    e.preventDefault();
    if(this.handleValidation()){
   
   const duesAdds = {
        payment_date: this.state.payment_date,
        operation_date: this.state.operation_date,
        amount: this.state.amount,
        duesComment: this.state.duesComment,
        duesGroup: this.state.duesGroup,
        duesMonth:this.state.duesSelectmonth,
        duesYearMonth:
          this.state.duesSelectyear + "/"+ this.state.duesGroup+"/"+this.state.duesSelectmonth,
      };
   
    axios
      .post("dues/duesadd", duesAdds)
      .then((response) => {
        if (response.data == true) {
          if(duesAdds.duesGroup=="Daire"){
          this.circleDues(duesAdds);}
          else if(duesAdds.duesGroup=="Dükkan"){
          this.storeDues(duesAdds);}
          toast.success(duesAdds.duesYearMonth + "'a Ait Kayıt Başarılı!");
          setTimeout(function(){  window.location.replace("/duesadd")}.bind(this),3000)

        } else if (response.data == false) {
          toast.error("Hata! " + duesAdds.duesYearMonth + "'a Ait Kayıt Var!");
        }
      })
      .catch((error) => {
        toast.error("Hata!Bu Döneme Ait Kayıt Başarısız!");
      });
    }
  }
  deleteDues(data){
    axios
    .post("dues/duesdelete", { _id: data._id })
    .then((res) => {
      axios
    .post("duesloan/duesloandelete", { duesYearMonth: data.duesYearMonth })
    .then((res) => {
      toast.success(data.duesYearMonth+" Aidat Silindi!");

    })
     

    })
    .catch((err) => {
      toast.error("Hata! Aidat Silinemedi!");
    });
  }
  componentDidMount(e) {
    const token = localStorage.usertoken;
    try {
      jwt_decode(token);
      const decoded = jwt_decode(token);
      axios.get("users/adminprofile").then((res) => {
        var response = res.data;
        for (var i = 0; i < response.length; i++) {
          if (decoded._id === response[i]._id) {
            if (response[i].status == false) {
              this.setState({
                showMe: false,
                showUser: true,
              });
            }
                //aidat listelenmesı
                axios.get("dues/dueslist").then((res) => {
                  const resultcircle =[];
                  const resultstore =[];
                  for(var i=0;i<res.data.length;i++){
                    if(res.data[i].duesGroup=="Daire")
                  {
                    resultcircle[i]=res.data[i]
                  }
                else if(res.data[i].duesGroup=="Dükkan")
              {
                resultstore[i]=res.data[i]
              }}
                  
              
                  this.setState({
                    locationsinfo: resultcircle,
                    locationsinfostore:resultstore
                    
                  });
              

               
                })  
              
              .catch((err) => {
                toast.error("Hata! Aidat Dönem Listelenemedi!");
              });
          }
        }
      });
    } catch (error) {
      window.location.replace("/");
    }
  }

  render() {
        const duesinfo = this.state.locationsinfo.map((data) => (
   
         <div className="col-sm-4" key={data._id}>
         <div className="callout callout-info">
           <button type="button" className="close" onClick={()=>this.deleteDues(data)}>
             ×
           </button>
           <h6>
           <i className="icon fas fa-calendar-day"></i>   {data.duesYearMonth.slice(14)}
           </h6>
           </div>
         </div>
    ));
    const duesinfostore = this.state.locationsinfostore.map((data) => (
   
      <div className="col-sm-4" key={data._id}>
      <div className="callout callout-info">
        <button type="button" className="close" onClick={()=>this.deleteDues(data)}>
          ×
        </button>
        <h6>
        <i className="icon fas fa-calendar-day"></i>   {data.duesYearMonth.slice(15)}
        </h6>
        </div>
      </div>
 ));
    return (
      <div>
        <Header />
        <Menu />
        <div className="content-wrapper">
          <div className="card">
            <div className="card-body">
              <div className="container-fluid">
                {" "}
                {this.state.showMe ? (
                  <div className="container">
                    <div className="content-header">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="card card-primary">
                            <div className="card-header border-0">
                              <div className="d-flex justify-content-between">
                                <h3 className="card-title">Dönem Aidat Ekle</h3>
                              </div>
                            </div>
                            <div className="card-body">
                              <form
                                className="forms-sample"
                                onSubmit={this.onSubmit}
                              >
                                <div className="form-group row">
                                  <label className="col-sm-5 col-form-label">
                                    Aidat Yıl :
                                  </label>
                                  <div className="col-sm-4">
                                    <select
                                      className="form-control"
                                      onChange={this.handleChangeSelectYear}
                                    >
                                      <option>
                                        {" "}
                                        {this.state.duesSelectyear}{" "}
                                      </option>
                                      <option> 2020 </option>
                                      <option> 2021 </option>
                                      <option> 2022 </option>
                                      <option> 2023 </option>
                                      <option> 2024 </option>
                                      <option> 2025 </option>
                                      <option> 2026 </option>
                                      <option> 2027 </option>
                                      <option> 2028 </option>
                                      <option> 2029 </option>
                                      <option> 2030 </option>
                                    </select>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-5 col-form-label">
                                    Aidat Dönem :
                                  </label>
                                  <div className="col-sm-4">
                                    <select
                                      className="form-control"
                                      onChange={this.handleChangeSelectMonth}
                                    >
                                      <option>
                                        {this.state.duesSelectmonth}
                                      </option>
                                      <option> 01-OCAK </option>
                                      <option> 02-ŞUBAT </option>
                                      <option> 03-MART </option>
                                      <option> 04-NİSAN </option>
                                      <option> 05-MAYIS </option>
                                      <option> 06-HAZİRAN </option>
                                      <option> 07-TEMMUZ </option>
                                      <option> 08-AĞUSTOS </option>
                                      <option> 09-EYLÜL </option>
                                      <option> 10-EKİM </option>
                                      <option> 11-KASIM </option>
                                      <option> 12-ARALIK </option>
                                    </select>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-5 col-form-label">
                                    Aidat Grubu :
                                  </label>
                                  <div className="col-sm-4">
                                    <select
                                      className="form-control"
                                      onChange={this.handleChangeSelectGroup}
                                    >
                                      <option>Grup Seçiniz.</option>
                                      <option>Daire</option>
                                      <option>Dükkan</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-5 col-form-label">
                                    İşlem Tarihi :
                                  </label>
                                  <div className="col-sm-3">
                                    <DatePicker
                                      className="form-control"
                                      selected={this.state.startDate}
                                      onChange={this.handleChangeCalendar}
                                      dateFormat="dd/MM/yyyy"
                                    >
                                      {" "}
                                    </DatePicker>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-5 col-form-label">
                                    Son Ödeme Tarihi :
                                  </label>
                                  <div className="col-sm-3">
                                    <DatePicker
                                      className="form-control"
                                      selected={this.state.endDate}
                                      onChange={this.handleChangeCalendarEnd}
                                      dateFormat="dd/MM/yyyy"
                                    >
                                      {" "}
                                    </DatePicker>
                                  </div>
                                </div>

                                <div className="form-group row">
                                  <label className="col-sm-5 col-form-label">
                                    Tutar :
                                  </label>
                                  <div className="col-sm-3">
                                    <div class="input-group-prepend">
                                      <input
                                        type="text"
                                        name="amount"
                                        value={this.state.amount}
                                        class="form-control"
                                        placeholder="00.00"
                                        onChange={this.onChange}
                                      />

                                      <span class="input-group-text">₺</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-5 col-form-label">
                                    Aidat Karar :
                                  </label>
                                  <div className="col-sm-6">
                                    <textarea
                                      rows="3"
                                      className="form-control"
                                      placeholder="Aidat Karar :"
                                      name="duesComment"
                                      value={this.state.duesComment}
                                      onChange={this.onChange}
                                      maxLength="60"
                                      required
                                    />
                                  </div>
                                </div>
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  onClick={this.onSubmit}
                                >
                                  Kaydet
                                </button>
                              </form>{" "}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="card card-primary">
                            <div className="card-header border-0">
                              <div className="d-flex justify-content-between">
                                <h3 className="card-title">Aidat Dönem Daire</h3>
                              </div>
                            </div>
                            <div className="card-body">
                              <div className="position-relative mb-4">
                                <div className="chartjs-size-monitor">
                                  <div className="chartjs-size-monitor-expand">
                                    <div className />
                                  </div>
                                  <div className="chartjs-size-monitor-shrink"></div>
                                </div>

                                <div class="col-12">
                                  <div className="row">{duesinfo}
                               
                                 
                                  </div>
                                  
                                </div> 
                              </div>
                            </div>
                          </div>     <div className="card card-primary">
                            <div className="card-header border-0">
                              <div className="d-flex justify-content-between">
                                <h3 className="card-title">Aidat Dönem Dükkan</h3>
                              </div>
                            </div>
                            <div className="card-body">
                              <div className="position-relative mb-4">
                                <div className="chartjs-size-monitor">
                                  <div className="chartjs-size-monitor-expand">
                                    <div className />
                                  </div>
                                  <div className="chartjs-size-monitor-shrink"></div>
                                </div>

                                <div class="col-12">
                                  <div className="row">{duesinfostore}
                               
                                 
                                  </div>
                                  
                                </div> 
                              </div>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                    <ToastContainer />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {this.state.showUser ? this.props.history.push("/statuserror") : null}
        </div>
      </div>
    );
  }
}
export default DuesAdd;
