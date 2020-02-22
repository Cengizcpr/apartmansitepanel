import React, { Component } from 'react'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import register from "./component/Register"
import login from "./component/Login" 
import Profile from "./Home/Profile"
import Home from "./Home/Home"
import Notfound from "./component/Notfound"

class App extends Component {
  render() {
    return (

      <Router>
       <Switch>
          <Route exact path="/" component={login}/>
          <Route exact path="/register" component={register}/>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/home" component={Home}/>
          <Route exact  component={Notfound}/> 
          </Switch>
      </Router>
    )
  }
}
export default App;