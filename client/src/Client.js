import React from "react";

import Calendar from "./Calendar.js";
import ClientForm from "./ClientForm.js";
import ClientSelect from "./ClientSelect.js";
import RoomMap from "./RoomMap.js";
import CheckCode from "./CheckCode.js";

import "./css/Client.css";

class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.mapRef = React.createRef();
    this.topRef = React.createRef();
  }
  getInitialState() {
    return {
      from: null,
      to: null,
      hideMap: true,
      hideForm: true,
      peopleAmount: null,
      roomsAvailable: null,
      roomsAmount: null,
      roomsChose: null,
      checkReservation: false
    };
  }

  getDate = (param1, param2, hide) => {
    this.setState({
      from: param1,
      to: param2,
      hideMap: hide,
      hideForm: hide
    });
  };

  getSelect = (param1, param2, param3, hide) => {
    this.setState(
      {
        peopleAmount: param1,
        roomsAvailable: param2,
        roomsAmount: param3,
        hideMap: hide,
        hideForm: true
      },
      () => {
        if (!hide) {
          this.mapRef.current.scrollIntoView({ behavior: "smooth" });
        } else {
          this.topRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    );
  };
  getMap = (param, hide) => {
    this.setState(
      {
        roomsChose: param,
        hideForm: hide
      },
      () => {
        if (hide) {
          this.mapRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    );
  };

  endReservation = () => {
    this.setState(this.getInitialState(), () => {
      this.topRef.current.scrollIntoView({ behavior: "smooth" });
    });
  };

  render() {
    return (
      <div id="client" ref={this.topRef}>
        <div
          className="code-nav-single d-flex align-items-center"
          onClick={() => {
            this.setState({
              checkReservation: true
            });
          }}
        >
          <span>Sprawdź rezerwację</span>
          <div className="code-nav-icon" />
        </div>
        {this.state.checkReservation ? <CheckCode callbackCheckCode={() => {
            this.setState({
              checkReservation: false
            });
          }}/> : null}
        <div id="top">
          <div className="container">
            <div className="row justify-content-lg-end justify-content-sm-center">
              <div className="col-sm-10 col-lg-8 text-right">
                <div className="r" />
                <Calendar callback={this.getDate} />
              </div>
            </div>
            <div className="row justify-content-lg-end">
              <div className="col-lg-8">
                <div className="r" />
                <ClientSelect
                  callbackSelect={this.getSelect}
                  dateFrom={this.state.from}
                  dateTo={this.state.to}
                />
              </div>
            </div>
          </div>
          <div className="r-768" />
          <div className="r-768" />
        </div>
        {!this.state.hideMap ? (
          <div className="container-fluid" ref={this.mapRef}>
            <div className="r" />
            <RoomMap
              roomsAmount={this.state.roomsAmount}
              roomsAvailable={this.state.roomsAvailable}
              callbackMap={this.getMap}
            />
          </div>
        ) : null}
        {!this.state.hideForm ? (
          <div id="client-summary">
            <ClientForm
              roomsChose={this.state.roomsChose}
              peopleAmount={this.state.peopleAmount}
              dateFrom={this.state.from}
              dateTo={this.state.to}
              callbackClientForm={this.endReservation}
            />
            <div className="r" />
          </div>
        ) : null}
      </div>
    );
  }
}
export default Client;
