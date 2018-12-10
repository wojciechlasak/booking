import React, { Component } from "react";
import ReactDOM from "react-dom";

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

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

export default App;
