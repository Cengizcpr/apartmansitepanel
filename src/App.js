import React, { Component } from 'react'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import register from "./component/Register"
import login from "./component/Login" 
import AdminProfile from "./Pages/AdminProfile"
import UserProfile from "./Pages/UserProfile"
import AdminHome from "./Home/Home"
import UserHome from "./Home/UserHome"
import Notfound from "./component/Notfound"
import Users from "./Pages/UsersPage"
import BuildSetting from "./Pages/BuildSetting"
import BlockSetting from "./Pages/BlockSetting"
class App extends Component {
  render() {
    return (

      <Router>
       <Switch>
          <Route exact path="/" component={login}/>
          <Route exact path="/register" component={register}/>
          <Route exact path="/adminprofile" component={AdminProfile}/>
          <Route exact path="/userprofile" component={UserProfile}/>
          <Route exact path="/home" component={AdminHome}/>
          <Route exact path="/userhome" component={UserHome}/>
          <Route exact path="/users" component={Users}/>
          <Route exact path="/buildsetting" component={BuildSetting}/>
          <Route exact path="/blocksetting" component={BlockSetting}/>
          <Route exact  component={Notfound}/> 
          </Switch>
      </Router>
    )
  }
}
export default App;