import React, { Component } from "react";
import Header from "../Home/Header";
import Menu from "../Home/Menu";
class Test extends Component {
  constructor(props){
     super(props);

     this.state = {
         fields: {},
         errors: {}
     }
  }

  handleValidation(){
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      //Name
      if(!fields["name"]){
         formIsValid = false;
         errors["name"] = "Cannot be empty";
      }

      if(typeof fields["name"] !== "undefined"){
         if(!fields["name"].match(/^[a-zA-Z]+$/)){
            formIsValid = false;
            errors["name"] = "Only letters";
         }        
      }

      //Email
      if(!fields["email"]){
         formIsValid = false;
         errors["email"] = "Cannot be empty";
      }

      if(typeof fields["email"] !== "undefined"){
         let lastAtPos = fields["email"].lastIndexOf('@');
         let lastDotPos = fields["email"].lastIndexOf('.');

         if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
            formIsValid = false;
            errors["email"] = "Email is not valid";
          }
     }  

     this.setState({errors: errors});
     return formIsValid;
 }

 contactSubmit(e){
      e.preventDefault();

      if(this.handleValidation()){
         alert("Form submitted");
      }else{
         alert("Form has errors.")
      }

  }

  handleChange(field, e){         
      let fields = this.state.fields;
      fields[field] = e.target.value;        
      this.setState({fields});
  }

  render(){
      return (
          <div> 
  <div className="wrapper">
  {/* Navbar */}
  <nav className="main-header navbar navbar-expand navbar-white navbar-light">
    {/* Left navbar links */}
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars" /></a>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <a href="../../index3.html" className="nav-link">Home</a>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <a href="#" className="nav-link">Contact</a>
      </li>
    </ul>
    {/* SEARCH FORM */}
    <form className="form-inline ml-3">
      <div className="input-group input-group-sm">
        <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
        <div className="input-group-append">
          <button className="btn btn-navbar" type="submit">
            <i className="fas fa-search" />
          </button>
        </div>
      </div>
    </form>
    {/* Right navbar links */}
    <ul className="navbar-nav ml-auto">
      {/* Messages Dropdown Menu */}
      <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#">
          <i className="far fa-comments" />
          <span className="badge badge-danger navbar-badge">3</span>
        </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <a href="#" className="dropdown-item">
            {/* Message Start */}
            <div className="media">
              <img src="../../dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />
              <div className="media-body">
                <h3 className="dropdown-item-title">
                  Brad Diesel
                  <span className="float-right text-sm text-danger"><i className="fas fa-star" /></span>
                </h3>
                <p className="text-sm">Call me whenever you can...</p>
                <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
              </div>
            </div>
            {/* Message End */}
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item">
            {/* Message Start */}
            <div className="media">
              <img src="../../dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
              <div className="media-body">
                <h3 className="dropdown-item-title">
                  John Pierce
                  <span className="float-right text-sm text-muted"><i className="fas fa-star" /></span>
                </h3>
                <p className="text-sm">I got your message bro</p>
                <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
              </div>
            </div>
            {/* Message End */}
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item">
            {/* Message Start */}
          
            {/* Message End */}
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
        </div>
      </li>
      {/* Notifications Dropdown Menu */}
      <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#">
          <i className="far fa-bell" />
          <span className="badge badge-warning navbar-badge">15</span>
        </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span className="dropdown-item dropdown-header">15 Notifications</span>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item">
            <i className="fas fa-envelope mr-2" /> 4 new messages
            <span className="float-right text-muted text-sm">3 mins</span>
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item">
            <i className="fas fa-users mr-2" /> 8 friend requests
            <span className="float-right text-muted text-sm">12 hours</span>
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item">
            <i className="fas fa-file mr-2" /> 3 new reports
            <span className="float-right text-muted text-sm">2 days</span>
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
        </div>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#">
          <i className="fas fa-th-large" />
        </a>
      </li>
    </ul>
  </nav>
  {/* /.navbar */}
  {/* Main Sidebar Container */}
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    {/* Brand Logo */}
    <a href="../../index3.html" className="brand-link">
      <img src="../../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
      <span className="brand-text font-weight-light">AdminLTE 3</span>
    </a>
    {/* Sidebar */}
    <div className="sidebar">
      {/* Sidebar user (optional) */}
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src="../../dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
        </div>
        <div className="info">
          <a href="#" className="d-block">Alexander Pierce</a>
        </div>
      </div>
      {/* Sidebar Menu */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
          <li className="nav-item has-treeview">
            <a href="#" className="nav-link">
              <i className="nav-icon fas fa-tachometer-alt" />
              <p>
                Dashboard
                <i className="right fas fa-angle-left" />
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="../../index.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Dashboard v1</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../../index2.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Dashboard v2</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../../index3.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Dashboard v3</p>
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a href="../widgets.html" className="nav-link">
              <i className="nav-icon fas fa-th" />
              <p>
                Widgets
                <span className="right badge badge-danger">New</span>
              </p>
            </a>
          </li>
          <li className="nav-item has-treeview">
            <a href="#" className="nav-link">
              <i className="nav-icon fas fa-copy" />
              <p>
                Layout Options
                <i className="fas fa-angle-left right" />
                <span className="badge badge-info right">6</span>
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="../layout/top-nav.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Top Navigation</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../layout/boxed.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Boxed</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../layout/fixed-sidebar.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Fixed Sidebar</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../layout/fixed-topnav.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Fixed Navbar</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../layout/fixed-footer.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Fixed Footer</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../layout/collapsed-sidebar.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Collapsed Sidebar</p>
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item has-treeview">
            <a href="#" className="nav-link">
              <i className="nav-icon fas fa-chart-pie" />
              <p>
                Charts
                <i className="right fas fa-angle-left" />
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="../charts/chartjs.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>ChartJS</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../charts/flot.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Flot</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../charts/inline.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Inline</p>
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item has-treeview">
            <a href="#" className="nav-link">
              <i className="nav-icon fas fa-tree" />
              <p>
                UI Elements
                <i className="fas fa-angle-left right" />
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="../UI/general.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>General</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../UI/icons.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Icons</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../UI/buttons.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Buttons</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../UI/sliders.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Sliders</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../UI/modals.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Modals &amp; Alerts</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../UI/navbar.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Navbar &amp; Tabs</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../UI/timeline.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Timeline</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../UI/ribbons.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Ribbons</p>
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item has-treeview menu-open">
            <a href="#" className="nav-link active">
              <i className="nav-icon fas fa-edit" />
              <p>
                Forms
                <i className="fas fa-angle-left right" />
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="../forms/general.html" className="nav-link active">
                  <i className="far fa-circle nav-icon" />
                  <p>General Elements</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../forms/advanced.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Advanced Elements</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../forms/editors.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Editors</p>
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item has-treeview">
            <a href="#" className="nav-link">
              <i className="nav-icon fas fa-table" />
              <p>
                Tables
                <i className="fas fa-angle-left right" />
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="../tables/simple.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Simple Tables</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../tables/data.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>DataTables</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../tables/jsgrid.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>jsGrid</p>
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-header">EXAMPLES</li>
          <li className="nav-item">
            <a href="../calendar.html" className="nav-link">
              <i className="nav-icon far fa-calendar-alt" />
              <p>
                Calendar
                <span className="badge badge-info right">2</span>
              </p>
            </a>
          </li>
          <li className="nav-item">
            <a href="../gallery.html" className="nav-link">
              <i className="nav-icon far fa-image" />
              <p>
                Gallery
              </p>
            </a>
          </li>
          <li className="nav-item has-treeview">
            <a href="#" className="nav-link">
              <i className="nav-icon far fa-envelope" />
              <p>
                Mailbox
                <i className="fas fa-angle-left right" />
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="../mailbox/mailbox.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Inbox</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../mailbox/compose.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Compose</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../mailbox/read-mail.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Read</p>
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item has-treeview">
            <a href="#" className="nav-link">
              <i className="nav-icon fas fa-book" />
              <p>
                Pages
                <i className="fas fa-angle-left right" />
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="../examples/invoice.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Invoice</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../examples/profile.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Profile</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../examples/e_commerce.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>E-commerce</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../examples/projects.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Projects</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../examples/project_add.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Project Add</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../examples/project_edit.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Project Edit</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../examples/project_detail.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Project Detail</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../examples/contacts.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Contacts</p>
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item has-treeview">
            <a href="#" className="nav-link">
              <i className="nav-icon far fa-plus-square" />
              <p>
                Extras
                <i className="fas fa-angle-left right" />
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="../examples/login.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Login</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../examples/register.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Register</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="..examples/forgot-password.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Forgot Password</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="..examples/recover-password.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Recover Password</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../examples/lockscreen.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Lockscreen</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../examples/legacy-user-menu.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Legacy User Menu</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../examples/language-menu.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Language Menu</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../examples/404.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Error 404</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../examples/500.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Error 500</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../examples/pace.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Pace</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../examples/blank.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Blank Page</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="../../starter.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Starter Page</p>
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-header">MISCELLANEOUS</li>
          <li className="nav-item">
            <a href="https://adminlte.io/docs/3.0" className="nav-link">
              <i className="nav-icon fas fa-file" />
              <p>Documentation</p>
            </a>
          </li>
          <li className="nav-header">MULTI LEVEL EXAMPLE</li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <i className="fas fa-circle nav-icon" />
              <p>Level 1</p>
            </a>
          </li>
          <li className="nav-item has-treeview">
            <a href="#" className="nav-link">
              <i className="nav-icon fas fa-circle" />
              <p>
                Level 1
                <i className="right fas fa-angle-left" />
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Level 2</p>
                </a>
              </li>
              <li className="nav-item has-treeview">
                <a href="#" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>
                    Level 2
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="far fa-dot-circle nav-icon" />
                      <p>Level 3</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="far fa-dot-circle nav-icon" />
                      <p>Level 3</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="far fa-dot-circle nav-icon" />
                      <p>Level 3</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Level 2</p>
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <i className="fas fa-circle nav-icon" />
              <p>Level 1</p>
            </a>
          </li>
          <li className="nav-header">LABELS</li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <i className="nav-icon far fa-circle text-danger" />
              <p className="text">Important</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <i className="nav-icon far fa-circle text-warning" />
              <p>Warning</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <i className="nav-icon far fa-circle text-info" />
              <p>Informational</p>
            </a>
          </li>
        </ul>
      </nav>
      {/* /.sidebar-menu */}
    </div>
    {/* /.sidebar */}
  </aside>
  {/* Content Wrapper. Contains page content */}
  <div className="content-wrapper" style={{minHeight: '1202.21px'}}>
    {/* Content Header (Page header) */}
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>General Form</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">General Form</li>
            </ol>
          </div>
        </div>
      </div>{/* /.container-fluid */}
    </section>
    {/* Main content */}
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          {/* left column */}
          <div className="col-md-6">
            {/* general form elements */}
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Quick Example</h3>
              </div>
              {/* /.card-header */}
              {/* form start */}
              <form role="form">
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputFile">File input</label>
                    <div className="input-group">
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" id="exampleInputFile" />
                        <label className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                      </div>
                      <div className="input-group-append">
                        <span className="input-group-text" id>Upload</span>
                      </div>
                    </div>
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                  </div>
                </div>
                {/* /.card-body */}
                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
            {/* /.card */}
            {/* Form Element sizes */}
            <div className="card card-success">
              <div className="card-header">
                <h3 className="card-title">Different Height</h3>
              </div>
              <div className="card-body">
                <input className="form-control form-control-lg" type="text" placeholder=".form-control-lg" />
                <br />
                <input className="form-control" type="text" placeholder="Default input" />
                <br />
                <input className="form-control form-control-sm" type="text" placeholder=".form-control-sm" />
              </div>
              {/* /.card-body */}
            </div>
            {/* /.card */}
      
            {/* /.card */}
            {/* Input addon */}
            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Input Addon</h3>
              </div>
              <div className="card-body">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">@</span>
                  </div>
                  <input type="text" className="form-control" placeholder="Username" />
                </div>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" />
                  <div className="input-group-append">
                    <span className="input-group-text">.00</span>
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                  </div>
                  <input type="text" className="form-control" />
                  <div className="input-group-append">
                    <span className="input-group-text">.00</span>
                  </div>
                </div>
                <h4>With icons</h4>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-envelope" /></span>
                  </div>
                  <input type="email" className="form-control" placeholder="Email" />
                </div>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" />
                  <div className="input-group-append">
                    <span className="input-group-text"><i className="fas fa-check" /></span>
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-dollar-sign" />
                    </span>
                  </div>
                  <input type="text" className="form-control" />
                  <div className="input-group-append">
                    <div className="input-group-text"><i className="fas fa-ambulance" /></div>
                  </div>
                </div>
                <h5 className="mt-4 mb-2">With checkbox and radio inputs</h5>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <input type="checkbox" />
                        </span>
                      </div>
                      <input type="text" className="form-control" />
                    </div>
                    {/* /input-group */}
                  </div>
                  {/* /.col-lg-6 */}
                  <div className="col-lg-6">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><input type="radio" /></span>
                      </div>
                      <input type="text" className="form-control" />
                    </div>
                    {/* /input-group */}
                  </div>
                  {/* /.col-lg-6 */}
                </div>
                {/* /.row */}
                <h5 className="mt-4 mb-2">With buttons</h5>
                <p>Large: <code>.input-group.input-group-lg</code></p>
                <div className="input-group input-group-lg mb-3">
                  <div className="input-group-prepend">
                    <button type="button" className="btn btn-warning dropdown-toggle" data-toggle="dropdown">
                      Action
                    </button>
                    <ul className="dropdown-menu">
                      <li className="dropdown-item"><a href="#">Action</a></li>
                      <li className="dropdown-item"><a href="#">Another action</a></li>
                      <li className="dropdown-item"><a href="#">Something else here</a></li>
                      <li className="dropdown-divider" />
                      <li className="dropdown-item"><a href="#">Separated link</a></li>
                    </ul>
                  </div>
                  {/* /btn-group */}
                  <input type="text" className="form-control" />
                </div>
                {/* /input-group */}
                <p>Normal</p>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button type="button" className="btn btn-danger">Action</button>
                  </div>
                  {/* /btn-group */}
                  <input type="text" className="form-control" />
                </div>
                {/* /input-group */}
                <p>Small <code>.input-group.input-group-sm</code></p>
                <div className="input-group input-group-sm">
                  <input type="text" className="form-control" />
                  <span className="input-group-append">
                    <button type="button" className="btn btn-info btn-flat">Go!</button>
                  </span>
                </div>
                {/* /input-group */}
              </div>
              {/* /.card-body */}
            </div>
            {/* /.card */}
            {/* Horizontal Form */}
            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Horizontal Form</h3>
              </div>
              {/* /.card-header */}
              {/* form start */}
              <form className="form-horizontal">
                <div className="card-body">
                  <div className="form-group row">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                      <input type="email" className="form-control" id="inputEmail3" placeholder="Email" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                      <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="offset-sm-2 col-sm-10">
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck2" />
                        <label className="form-check-label" htmlFor="exampleCheck2">Remember me</label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /.card-body */}
                <div className="card-footer">
                  <button type="submit" className="btn btn-info">Sign in</button>
                  <button type="submit" className="btn btn-default float-right">Cancel</button>
                </div>
                {/* /.card-footer */}
              </form>
            </div>
            {/* /.card */}
          </div>
          {/*/.col (left) */}
          {/* right column */}
          <div className="col-md-6">
            {/* general form elements disabled */}
            <div className="card card-warning">
              <div className="card-header">
                <h3 className="card-title">General Elements</h3>
              </div>
              {/* /.card-header */}
              <div className="card-body">
                <form role="form">
                  <div className="row">
                    <div className="col-sm-6">
                      {/* text input */}
                      <div className="form-group">
                        <label>Text</label>
                        <input type="text" className="form-control" placeholder="Enter ..." />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Text Disabled</label>
                        <input type="text" className="form-control" placeholder="Enter ..." disabled />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      {/* textarea */}
                      <div className="form-group">
                        <label>Textarea</label>
                        <textarea className="form-control" rows={3} placeholder="Enter ..." defaultValue={""} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Textarea Disabled</label>
                        <textarea className="form-control" rows={3} placeholder="Enter ..." disabled defaultValue={""} />
                      </div>
                    </div>
                  </div>
                  {/* input states */}
                  <div className="form-group">
                    <label className="col-form-label" htmlFor="inputSuccess"><i className="fas fa-check" /> Input with
                      success</label>
                    <input type="text" className="form-control is-valid" id="inputSuccess" placeholder="Enter ..." />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label" htmlFor="inputWarning"><i className="far fa-bell" /> Input with
                      warning</label>
                    <input type="text" className="form-control is-warning" id="inputWarning" placeholder="Enter ..." />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label" htmlFor="inputError"><i className="far fa-times-circle" /> Input with
                      error</label>
                    <input type="text" className="form-control is-invalid" id="inputError" placeholder="Enter ..." />
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      {/* checkbox */}
                      <div className="form-group">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" />
                          <label className="form-check-label">Checkbox</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" defaultChecked />
                          <label className="form-check-label">Checkbox checked</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" disabled />
                          <label className="form-check-label">Checkbox disabled</label>
                        </div>
                      </div>
                    </div> 
                    <div className="col-sm-6">
                      {/* radio */}
                      <div className="form-group">
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="radio1" />
                          <label className="form-check-label">Radio</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="radio1" defaultChecked />
                          <label className="form-check-label">Radio checked</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" disabled />
                          <label className="form-check-label">Radio disabled</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      {/* select */}
                      <div className="form-group">
                        <label>Select</label>
                        <select className="form-control">
                          <option>option 1</option>
                          <option>option 2</option>
                          <option>option 3</option>
                          <option>option 4</option>
                          <option>option 5</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Select Disabled</label>
                        <select className="form-control" disabled>
                          <option>option 1</option>
                          <option>option 2</option>
                          <option>option 3</option>
                          <option>option 4</option>
                          <option>option 5</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      {/* Select multiple*/}
                      <div className="form-group">
                        <label>Select Multiple</label>
                        <select multiple className="form-control">
                          <option>option 1</option>
                          <option>option 2</option>
                          <option>option 3</option>
                          <option>option 4</option>
                          <option>option 5</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Select Multiple Disabled</label>
                        <select multiple className="form-control" disabled>
                          <option>option 1</option>
                          <option>option 2</option>
                          <option>option 3</option>
                          <option>option 4</option>
                          <option>option 5</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              {/* /.card-body */}
            </div>
            {/* /.card */}
            {/* general form elements disabled */}
            <div className="card card-secondary">
              <div className="card-header">
                <h3 className="card-title">Custom Elements</h3>
              </div>
              {/* /.card-header */}
              <div className="card-body">
                <form role="form">
                  <div className="row">
                    <div className="col-sm-6">
                      {/* checkbox */}
                      <div className="form-group">
                        <div className="custom-control custom-checkbox">
                          <input className="custom-control-input" type="checkbox" id="customCheckbox1" defaultValue="option1" />
                          <label htmlFor="customCheckbox1" className="custom-control-label">Custom Checkbox</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input className="custom-control-input" type="checkbox" id="customCheckbox2" defaultChecked />
                          <label htmlFor="customCheckbox2" className="custom-control-label">Custom Checkbox checked</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input className="custom-control-input" type="checkbox" id="customCheckbox3" disabled />
                          <label htmlFor="customCheckbox3" className="custom-control-label">Custom Checkbox disabled</label>
                        </div>
                      </div>
                    </div> 
                    <div className="col-sm-6">
                      {/* radio */}
                      <div className="form-group">
                        <div className="custom-control custom-radio">
                          <input className="custom-control-input" type="radio" id="customRadio1" name="customRadio" />
                          <label htmlFor="customRadio1" className="custom-control-label">Custom Radio</label>
                        </div>
                        <div className="custom-control custom-radio">
                          <input className="custom-control-input" type="radio" id="customRadio2" name="customRadio" defaultChecked />
                          <label htmlFor="customRadio2" className="custom-control-label">Custom Radio checked</label>
                        </div>
                        <div className="custom-control custom-radio">
                          <input className="custom-control-input" type="radio" id="customRadio3" disabled />
                          <label htmlFor="customRadio3" className="custom-control-label">Custom Radio disabled</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      {/* select */}
                      <div className="form-group">
                        <label>Custom Select</label>
                        <select className="custom-select">
                          <option>option 1</option>
                          <option>option 2</option>
                          <option>option 3</option>
                          <option>option 4</option>
                          <option>option 5</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Custom Select Disabled</label>
                        <select className="custom-select" disabled>
                          <option>option 1</option>
                          <option>option 2</option>
                          <option>option 3</option>
                          <option>option 4</option>
                          <option>option 5</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      {/* Select multiple*/}
                      <div className="form-group">
                        <label>Custom Select Multiple</label>
                        <select multiple className="custom-select">
                          <option>option 1</option>
                          <option>option 2</option>
                          <option>option 3</option>
                          <option>option 4</option>
                          <option>option 5</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Custom Select Multiple Disabled</label>
                        <select multiple className="custom-select" disabled>
                          <option>option 1</option>
                          <option>option 2</option>
                          <option>option 3</option>
                          <option>option 4</option>
                          <option>option 5</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-switch">
                      <input type="checkbox" className="custom-control-input" id="customSwitch1" />
                      <label className="custom-control-label" htmlFor="customSwitch1">Toggle this custom switch element</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                      <input type="checkbox" className="custom-control-input" id="customSwitch3" />
                      <label className="custom-control-label" htmlFor="customSwitch3">Toggle this custom switch element with custom colors danger/success</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-switch">
                      <input type="checkbox" className="custom-control-input" disabled id="customSwitch2" />
                      <label className="custom-control-label" htmlFor="customSwitch2">Disabled custom switch element</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="customRange1">Custom range</label>
                    <input type="range" className="custom-range" id="customRange1" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="customRange1">Custom range (custom-range-danger)</label>
                    <input type="range" className="custom-range custom-range-danger" id="customRange1" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="customRange1">Custom range (custom-range-teal)</label>
                    <input type="range" className="custom-range custom-range-teal" id="customRange1" />
                  </div>
                  <div className="form-group">
                    {/* <label for="customFile">Custom File</label> */}
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="customFile" />
                      <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                    </div>
                  </div>
                  <div className="form-group">
                  </div>
                </form>
              </div>
              {/* /.card-body */}
            </div>
            {/* /.card */}
          </div>
          {/*/.col (right) */}
        </div>
        {/* /.row */}
      </div>{/* /.container-fluid */}
    </section>
    {/* /.content */}
  </div>
  {/* /.content-wrapper */}
  <footer className="main-footer">
    <div className="float-right d-none d-sm-block">
      <b>Version</b> 3.0.0
    </div>
    <strong>Copyright © 2014-2019 <a href="http://adminlte.io">AdminLTE.io</a>.</strong> All rights
    reserved.
  </footer>
  {/* Control Sidebar */}
  <aside className="control-sidebar control-sidebar-dark">
    {/* Control sidebar content goes here */}
    <div className="p-3 control-sidebar-content"><h5>Customize AdminLTE</h5><hr className="mb-2" /><div className="mb-1"><input type="checkbox" defaultValue={1} className="mr-1" /><span>No Navbar border</span></div><div className="mb-1"><input type="checkbox" defaultValue={1} className="mr-1" /><span>Body small text</span></div><div className="mb-1"><input type="checkbox" defaultValue={1} className="mr-1" /><span>Navbar small text</span></div><div className="mb-1"><input type="checkbox" defaultValue={1} className="mr-1" /><span>Sidebar nav small text</span></div><div className="mb-1"><input type="checkbox" defaultValue={1} className="mr-1" /><span>Footer small text</span></div><div className="mb-1"><input type="checkbox" defaultValue={1} className="mr-1" /><span>Sidebar nav flat style</span></div><div className="mb-1"><input type="checkbox" defaultValue={1} className="mr-1" /><span>Sidebar nav legacy style</span></div><div className="mb-1"><input type="checkbox" defaultValue={1} className="mr-1" /><span>Sidebar nav compact</span></div><div className="mb-1"><input type="checkbox" defaultValue={1} className="mr-1" /><span>Sidebar nav child indent</span></div><div className="mb-1"><input type="checkbox" defaultValue={1} className="mr-1" /><span>Main Sidebar disable hover/focus auto expand</span></div><div className="mb-4"><input type="checkbox" defaultValue={1} className="mr-1" /><span>Brand small text</span></div><h6>Navbar Variants</h6><div className="d-flex"><div className="d-flex flex-wrap mb-3"><div className="bg-primary elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-secondary elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-info elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-success elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-danger elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-indigo elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-purple elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-pink elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-teal elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-cyan elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-dark elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-gray-dark elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-gray elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-light elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-warning elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-white elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-orange elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /></div></div><h6>Accent Color Variants</h6><div className="d-flex" /><div className="d-flex flex-wrap mb-3"><div className="bg-primary elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-warning elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-info elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-danger elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-success elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-indigo elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-navy elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-purple elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-fuchsia elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-pink elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-maroon elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-orange elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-lime elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-teal elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-olive elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /></div><h6>Dark Sidebar Variants</h6><div className="d-flex" /><div className="d-flex flex-wrap mb-3"><div className="bg-primary elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-warning elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-info elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-danger elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-success elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-indigo elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-navy elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-purple elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-fuchsia elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-pink elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-maroon elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-orange elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-lime elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-teal elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-olive elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /></div><h6>Light Sidebar Variants</h6><div className="d-flex" /><div className="d-flex flex-wrap mb-3"><div className="bg-primary elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-warning elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-info elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-danger elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-success elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-indigo elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-navy elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-purple elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-fuchsia elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-pink elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-maroon elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-orange elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-lime elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-teal elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-olive elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /></div><h6>Brand Logo Variants</h6><div className="d-flex" /><div className="d-flex flex-wrap mb-3"><div className="bg-primary elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-secondary elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-info elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-success elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-danger elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-indigo elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-purple elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-pink elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-teal elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-cyan elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-dark elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-gray-dark elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-gray elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-light elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-warning elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-white elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><div className="bg-orange elevation-2" style={{width: 40, height: 20, borderRadius: 25, marginRight: 10, marginBottom: 10, opacity: '0.8', cursor: 'pointer'}} /><a href="javascript:void(0)">clear</a></div></div></aside>
  {/* /.control-sidebar */}
  <div id="sidebar-overlay" /></div>

          </div>
    )
  }
}
export default Test