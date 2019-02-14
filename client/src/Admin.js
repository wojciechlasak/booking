import React from "react";

import Calendar from "./Calendar.js";
import Data from "./Data.js";

/* Once the 'Authservice' and 'withAuth' componenets are created, import them into App.js */
import AuthHelperMethods from "./components/AuthHelperMethods";

//Our higher order component
import withAuth from "./components/withAuth";

class Admin extends React.Component {
  /* Create a new instance of the 'AuthHelperMethods' compoenent*/
  Auth = new AuthHelperMethods();

  _handleLogout = () => {
    this.Auth.logout();
    this.props.history.replace("/");
  };

  //Render the protected component
  render() {
    return (
      <div>
        <Calendar />
        <button onClick={this._handleLogout}>LOGOUT</button>
        <Data />
      </div>
    );
  }
}

//In order for this component to be protected, we must wrap it with what we call a 'Higher Order Component' or HOC.
export default withAuth(Admin);
