import React from "react";

import Calendar from "./Calendar.js";
import ClientForm from "./ClientForm.js";
import ClientSelect from "./ClientSelect.js";
import RoomMap from "./RoomMap.js";

import "./css/Client.css";

class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: null,
      to: null,
      hideMap: true,
      hideForm: true,
      peopleAmount: null,
      roomsAvailable: null,
      roomsAmount: null,
      roomsChose: null
    };

    this.getDate = this.getDate.bind(this);
    this.getSelect = this.getSelect.bind(this);
    this.getMap = this.getMap.bind(this);
  }
  getDate(param1, param2) {
    this.setState({
      from: param1,
      to: param2
    });
  }

  getSelect(param1, param2, param3) {
    this.setState({
      peopleAmount: param1,
      roomsAvailable: param2,
      roomsAmount: param3,
      hideMap: false
    });
  }
  getMap(param) {
    this.setState({
      roomsChose: param,
      hideForm: false
    });
    
  }

  render() {
    return (
      <div id="client">
        <div id="top">
          <Calendar callback={this.getDate} />
          <ClientSelect
            callbackSelect={this.getSelect}
            dateFrom={this.state.from}
            dateTo={this.state.to}
          />
        </div>
        {!this.state.hideMap ? (
          <div id="map">
            <RoomMap
              roomsAmount={this.state.roomsAmount}
              roomsAvailable={this.state.roomsAvailable}
              callbackMap={this.getMap}
            />
          </div>
        ) : null}
        {!this.state.hideForm ? (
          <ClientForm
            roomsChose={this.state.roomsChose}
            peopleAmount={this.state.peopleAmount}
            dateFrom={this.state.from}
            dateTo={this.state.to}
          />
        ) : null}
      </div>
    );
  }
}
export default Client;
