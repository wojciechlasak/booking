import React from "react";

import "./css/CheckCode.css";


class EndReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  getInitialState() {
    return {
      isOpen: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.isEnd !== prevProps.isEnd 
    ) {
      this.setState({
        isOpen:true
      });
    }
  }


  closeLightbox = () => {
    this.setState(this.getInitialState())
  }

  render() {
    return (
      <>
      <div  className={`lightbox-container ${this.state.isOpen?"opened":" "}`}>
        <div className="lightbox-bg" onClick={this.closeLightbox}/>
        <div className="lightbox-in d-flex justify-content-center end-lightbox">
          Twoja rezerwacja została pomyślnie zapisana. <br />
          Na maila została wysłana wiadomość ze wszystkimi informacjami.
          <svg className="lightbox-close" onClick={this.closeLightbox} viewBox="0 0 100 100">
            <path d="M10 10L90 90" />
            <path d="M90 10L10 90" />
          </svg>
        </div>
      </div>
      </>
    );
  }
}
export default EndReservation;
