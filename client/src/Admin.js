import React from "react";

import Calendar from "./Calendar.js";
import CalendarAdmin from "./CalendarAdmin.js";
import ClientForm from "./ClientForm.js";
import Clients from "./Clients.js";
import Opinions from "./Opinions.js";
import Rooms from "./Rooms.js";

import "./css/Admin.css";

import AuthHelperMethods from "./components/AuthHelperMethods";

//Our higher order component
import withAuth from "./components/withAuth";

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      from : null,
      to: null,
      component: null,
      burgerClick: true
    };
    
  }

  Auth = new AuthHelperMethods();

  _handleLogout = () => {
    this.Auth.logout();
    this.props.history.replace("/");
  };

  componentChange = value => {
    this.setState({
      component:value
    });
  };

  getDate = (param1,param2) => {
    this.setState({
      from : param1,
      to: param2,
      hide: false
    })
  }

  componentRender() {
    switch (this.state.component) {
      case "clients":
        return <Clients />;
      case "reservations":
        return <CalendarAdmin />;
      case "opinions":
        return <Opinions />;
      case "addReservations":
        return (
          <div>
            <Calendar callback={this.getDate}/>
            <ClientForm  dateFrom={this.state.from} dateTo={this.state.to}/>
          </div>
        );
      case "rooms":
         return  <Rooms />
      default:
        return null;
    }
  }

  handleBurgerClick = () => {
    this.setState(prevState => ({
      burgerClick: !prevState.burgerClick
    }));
  }

  //Render the protected component
  render() {
    return (
      <div id="admin-container">
        <div id="burger" className={this.state.burgerClick?"nav-show":""} onClick={this.handleBurgerClick}>
          <svg viewBox="0 0 100 100">
              <path d="M 10 20 L 90 20"/>
              <path d="M 10 50 L 90 50"/>
              <path d="M 10 80 L 90 80"/>
          </svg>
        </div>
        <nav id="admin-nav" className={this.state.burgerClick?"nav-show":""}>
          <div className="admin-nav-single d-flex align-items-center" onClick={()=> {this.componentChange("clients"); this.handleBurgerClick()}}>
            <span>Przegląd klientów</span><div className="admin-nav-icon"></div>
          </div>
          <div className="admin-nav-single d-flex align-items-center"  onClick={()=> {this.componentChange("addReservations"); this.handleBurgerClick()}}>
            <span>Dodaj rezerwacje</span><div className="admin-nav-icon"></div>
          </div>
          <div className="admin-nav-single d-flex align-items-center" onClick={()=> {this.componentChange("opinions"); this.handleBurgerClick()}}>
            <span>Przegląd Opinii</span><div className="admin-nav-icon"></div>
          </div>
          <div className="admin-nav-single d-flex align-items-center"  onClick={()=> {this.componentChange("reservations"); this.handleBurgerClick()}}>
            <span>Przegląd rezerwacji</span><div className="admin-nav-icon"></div>
          </div>
          <div className="admin-nav-single d-flex align-items-center" onClick={()=> {this.componentChange("rooms"); this.handleBurgerClick()}}>
            <span>Przegląd pokoi</span><div className="admin-nav-icon"></div>
          </div>
          <div className="admin-nav-single admin-nav-single-logout d-flex align-items-center" onClick={this._handleLogout}>
            <span>LOGOUT</span><div className="admin-nav-icon admin-nav-icon-logout"></div>
          </div>
        </nav>
        <div className="d-flex flex-column align-items-center container">
          <div className="r"/>
          {this.componentRender()}
        </div>
      </div>

    );
  }
}

//In order for this component to be protected, we must wrap it with what we call a 'Higher Order Component' or HOC.
export default withAuth(Admin);
