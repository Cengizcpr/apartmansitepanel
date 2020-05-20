import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import register from "./component/Register";
import login from "./component/Login";
import Profile from "./Pages/User/Profile";
import Home from "./Home/Home";
import Notfound from "./component/Notfound";
import Users from "./Pages/User/UsersPage";
import BuildSetting from "./Pages/Build/BuildSetting";
import BuildUpdate from "./Pages/Build/BuildUpdate";
import BlockSetting from "./Pages/Block/BlockSetting";
import PersonalSetting from "./Pages/Personal/PersonalSetting";
import PersonalList from "./Pages/Personal/PersonalList";
import PersonalUpdate from "./Pages/Personal/PersonalUpdate";
import UsersList from "./Pages/User/UsersList";
import UserRegister from "./Pages/User/UserUpdate";
import StatusError from "./component/StatusError";
import ApartmentSetting from "./Pages/Apartment/ApartmentSetting";
import ApartmentUpdate from "./Pages/Apartment/ApartmentUpdate";
import StoreSetting from "./Pages/Store/StoreSetting";
import StoreUpdate from "./Pages/Store/StoreUpdate";
import CarPark from "./Pages/CarPark/CarPark";
import FaultRegister from "./Pages/Fault/FaultRegister";
import FaultList from "./Pages/Fault/FaultList";
import DuesAdd from "./Pages/Dues/DuesAdd";
import DuesPay from "./Pages/Dues/DuesPay";
import CrediPaymentTest from "./Pages/CrediCart/CrediPaymentTest";
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/duespayment" component={CrediPaymentTest}/>
          <Route exact path="/" component={login} />
          <Route exact path="/register" component={register} />
          <Route exact path="/adminprofile" component={Profile} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/userupdate" component={UserRegister}/>
          <Route exact path="/userslist" component={UsersList} />
          <Route exact path="/buildsetting" component={BuildSetting} />
          <Route exact path="/buildinfo" component={BuildUpdate} />
          <Route exact path="/blocksetting" component={BlockSetting} />
          <Route exact path="/personaladd" component={PersonalSetting} />
          <Route exact path="/personallist" component={PersonalList} />
          <Route exact path="/personalupdate" component={PersonalUpdate}/>
          <Route exact path="/statuserror" component={StatusError} />
          <Route exact path="/apartmentsetting" component={ApartmentSetting} />
          <Route exact path="/apartmentregister" component={ApartmentUpdate}  />
          <Route exact path="/storesetting" component={StoreSetting}/>
          <Route export path="/storeregister" component={StoreUpdate}/>
          <Route export path="/carpark" component={CarPark}/>
          <Route export path="/faultregister" component={FaultRegister}/>
          <Route export path="/faultlist" component={FaultList}/>
          <Route export path="/duesadd" component={DuesAdd}/>
          <Route export path="/duespay" component={DuesPay}/>

          <Route exact component={Notfound} />
        </Switch>
      </Router>
    );
  }
}
export default App;
