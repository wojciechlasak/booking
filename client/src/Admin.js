import React from "react";

import Calendar from "./Calendar.js";
import CalendarAdmin from "./CalendarAdmin.js";
import ClientForm from "./ClientForm.js";
import Data from "./Data.js";

/* Once the 'Authservice' and 'withAuth' componenets are created, import them into App.js */
import AuthHelperMethods from "./components/AuthHelperMethods";

//Our higher order component
import withAuth from "./components/withAuth";

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      component: null
    };
  }

  /* Create a new instance of the 'AuthHelperMethods' compoenent*/
  Auth = new AuthHelperMethods();

  _handleLogout = () => {
    this.Auth.logout();
    this.props.history.replace("/");
  };

  componentChange = e => {
    this.setState({
      component: e.target.value
    });
  };
  componentRender() {
    switch (this.state.component) {
      case "clients":
        return <Data />;
      case "reservations":
        return <CalendarAdmin />;
      case "addReservations":
        return (
          <div>
            <Calendar />
            <ClientForm />
          </div>
        );
      default:
        return null;
    }
  }

  //Render the protected component
  render() {
    return (
      <div>
        <nav>
          <button value="clients" onClick={this.componentChange}>
            Przegląd klientów
          </button>
          <button value="addReservations" onClick={this.componentChange}>
            Dodaj rezerwacje
          </button>
          <button value="opinions" onClick={this.componentChange}>
            Przegląd Opinii
          </button>
          <button value="reservations" onClick={this.componentChange}>
            Przegląd rezerwacji
          </button>
          <button value="rooms" onClick={this.componentChange}>
            Przegląd pokoi
          </button>
          <button onClick={this._handleLogout}>LOGOUT</button>
        </nav>
        {this.componentRender()}
      </div>
    );
  }
}

//In order for this component to be protected, we must wrap it with what we call a 'Higher Order Component' or HOC.
export default withAuth(Admin);
