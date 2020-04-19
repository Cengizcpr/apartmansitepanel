import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import register from "./component/Register";
import login from "./component/Login";
import Profile from "./Pages/Profile";
import Home from "./Home/Home";
import Notfound from "./component/Notfound";
import Users from "./Pages/UsersPage";
import BuildSetting from "./Pages/BuildSetting";
import BlockSetting from "./Pages/BlockSetting";
import PersonalSetting from "./Pages/PersonalSetting";
import PersonalList from "./Pages/PersonalList";
import UsersList from "./Pages/UsersList";
import StatusError from "./Pages/StatusError";
import UserHome from "./Home/UserHome";
import ApartmentSetting from "./Pages/ApartmentSetting";
import ApartmentRegister from "./Pages/ApartmentRegister";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={login} />
          <Route exact path="/register" component={register} />
          <Route exact path="/adminprofile" component={Profile} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/userslist" component={UsersList} />
          <Route exact path="/buildsetting" component={BuildSetting} />
          <Route exact path="/blocksetting" component={BlockSetting} />
          <Route exact path="/personaladd" component={PersonalSetting} />
          <Route exact path="/personallist" component={PersonalList} />
          <Route exact path="/statuserror" component={StatusError} />
          <Route exact path="/userhome" component={UserHome} />
          <Route exact path="/apartmentsetting" component={ApartmentSetting} />
          <Route
            exact
            path="/apartmentregister"
            component={ApartmentRegister}
          />

          <Route exact component={Notfound} />
        </Switch>
      </Router>
    );
  }
}
export default App;
