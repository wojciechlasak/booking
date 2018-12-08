import React, { Component } from "react";

import Calendar from './Calendar.js'

import { Provider } from "react-redux";
import store from './store/store.js';



class App extends Component { 
  render() {
    return (
      <Provider store={store}>
        <Calendar />
      </Provider>
    );
  }
}

export default App;
