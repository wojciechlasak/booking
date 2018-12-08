import React, { Component } from "react";

import Calendar from './Calendar.js'

import { Provider } from "react-redux";
import store from './store/store.js';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        users: []
    }
}

  componentDidMount() {
    let self = this;
    fetch('/users', {
        method: 'GET'
    }).then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    }).then(function(data) {
        self.setState({users: data});
    }).catch(err => {
    console.log('caught it!',err);
    })

    var data = {
      name: "Jan",
      surname: "Nowak",
      mail: "jacek@o2.pl",
      phone: "877622918"
    }

    fetch('/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    }).then(function(data) {
        self.setState({users: data});
    }).catch(err => {
    console.log('caught it!',err);
    })
  };


  render() {
    console.log(this.state.users)
    return (
      <Provider store={store}>
        <Calendar />
      </Provider>
    );
  }
}

export default App;
