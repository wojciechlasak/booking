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
    this.mapRef = React.createRef()
    this.topRef = React.createRef()
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
    this.setState({
      peopleAmount: param1,
      roomsAvailable: param2,
      roomsAmount: param3,
      hideMap: hide,
      hideForm: true
    },
      ()=> {
        if(!hide){
          this.mapRef.current.scrollIntoView({ behavior: "smooth" });
        }
        else{
          this.topRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    );

  };
  getMap = (param, hide) => {
    this.setState({
      roomsChose: param,
      hideForm: hide
    },
    ()=> {
      if(hide){
        this.mapRef.current.scrollIntoView({ behavior: "smooth" });
      }
    });
  };


  render() {
    return (
      <div id="client" ref={this.topRef}>
        <div id="top">
          <div className="container">
            <div className="row justify-content-end">
              <div className="col-lg-8 text-right">
                <div className="r" />
                <Calendar callback={this.getDate} />
              </div>
            </div>
            <div className="row justify-content-end">
              <div className="col-lg-8 text-right">
                <div className="r" />
                <ClientSelect
                  callbackSelect={this.getSelect}
                  dateFrom={this.state.from}
                  dateTo={this.state.to}
                />
              </div>
            </div>
          </div>
          <div className="r"/>
          <div className="r"/>
        </div>
        {!this.state.hideMap ? (
          <div className="container" ref={this.mapRef}>
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
