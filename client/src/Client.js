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
      roomsChosen: null,
      highSeason:null,
    };
  }

  getStatesCalendar = (param1, param2, hide, high) => {
    this.setState({
      from: param1,
      to: param2,
      hideMap: hide,
      hideForm: hide,
      highSeason:high
    });
  };

  getStatesSelect = (param1, param2, param3, hide) => {
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
  getStatesRoomMap = (param, hide) => {
    this.setState(
      {
        roomsChosen: param,
        hideForm: hide
      },
      () => {
        if (hide) {
          this.mapRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    );
  };

  reservationDone = () => {
    this.setState(this.getInitialState(), () => {
      this.topRef.current.scrollIntoView({ behavior: "smooth" });
    });
  };

  render() {
    return (
      <div id="client" ref={this.topRef}>
        <CheckCode/>
        <div id="top">
          <div className="container">
            <div className="row justify-content-lg-end justify-content-sm-center">
              <div className="col-sm-10 col-lg-8 text-right">
                <div className="r" />
                <Calendar callback={this.getStatesCalendar} />
              </div>
            </div>
            <div className="row justify-content-lg-end">
              <div className="col-lg-8">
                <div className="r" />
                <ClientSelect
                  callback={this.getStatesSelect}
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
              callback={this.getStatesRoomMap}
            />
          </div>
        ) : null}
        {!this.state.hideForm ? (
          <div id="client-summary" className="container">
            <ClientForm
              roomsChosen={this.state.roomsChosen}
              peopleAmount={this.state.peopleAmount}
              dateFrom={this.state.from}
              dateTo={this.state.to}
              highSeason={this.state.highSeason}
              callback={this.reservationDone}
            />
            <div className="r" />
          </div>
        ) : null}
      </div>
    );
  }
}
export default Client;
