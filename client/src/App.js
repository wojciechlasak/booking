import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Client from './Client.js'
import Login from './Login.js'
import Admin from './Admin.js'


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Client} />
          <Route path="/login" component= {Login} />
          <Route path="/admin" component= {Admin} />
        </div>
      </Router>
    );
  }
}
export default App;
