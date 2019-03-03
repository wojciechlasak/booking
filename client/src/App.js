import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import Client from "./Client.js";
import Admin from "./Admin.js";
import Login from "./Login.js";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Client} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/login" component={Login} />
          </div>
      </Router>
    );
  }
}
export default App;
