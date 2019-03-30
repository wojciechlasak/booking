import React from "react";

import "./css/CheckCode.css";

class CheckCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  getInitialState() {
    return {
      isOpen: false
    };
  }

  openLightbox = () =>{
    this.setState({
      isOpen: true,
    })
  }

  closeLightbox = () => {
    this.setState({
      isOpen: false,
    })
  }

  render() {
    return (
      <>
      <div
          className="code-nav-single d-flex align-items-center"
          onClick={this.openLightbox}
        >
          <span>Sprawdź rezerwację</span>
          <div className="code-nav-icon" />
      </div>
      <div id="reservation-lightbox-container" className={this.state.isOpen?"opened":" "}>
        <div id="reservation-lightbox-bg" onClick={this.closeLightbox}/>
        <div id="reservation-lightbox-in">
          <svg id="reservation-lightbox-close" onClick={this.closeLightbox} viewBox="0 0 100 100">
            <path d="M10 10L90 90" />
            <path d="M90 10L10 90" />
          </svg>
        </div>
      </div>
      </>
    );
  }
}
export default CheckCode;
