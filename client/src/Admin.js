import React from "react";

import Calendar from './Calendar.js'
import Data from './Data.js'

class Admin extends React.Component {
    render() {
      return (
          <div>
              <Calendar/>
              <Data/>
          </div>
      );
    }
  }
  export default Admin;
  