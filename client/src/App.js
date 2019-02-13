import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import Client from "./Client.js";
import Admin from "./Admin.js";

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Client} />
          <Route path="/admin" component={Admin} />
          </div>
      </Router>
    );
  }
}
export default App;
