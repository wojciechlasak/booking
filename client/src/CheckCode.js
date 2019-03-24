import React from "react";


import "./css/CheckCode.css";

class CheckCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  getInitialState() {
    return {
      
    };
  }

  render() {
    return (
      <div id="reservation-lightbox-container">
        <div id="reservation-lightbox-close"></div>
        <div id="reservation-lightbox-in">
        </div>
      </div>
    );
  }
}
export default CheckCode;
