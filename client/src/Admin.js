import React from "react";

import Calendar from "./Calendar.js";
import Data from "./Data.js";
import Login from "./Login.js";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        isLoggedIn: false
    };
  }

  isAuth(param){
      this.setState({
          isLoggedIn: param
      })
  }

  isLogin() {
    if (this.state.isLoggedIn) {
    return (<div><Calendar /> 
    <Data /></div>);
    }
    return (<Login callback={this.isAuth.bind(this)}/>);
  }

  render() {
    return <div>{this.isLogin()}</div>;
  }
}
export default Admin;
