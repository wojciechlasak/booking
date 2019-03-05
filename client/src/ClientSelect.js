import React from "react";

import "./css/Select.css";

class ClientSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      peopleMax: null,
      rooms: null,
      peopleAmount: null,
      peopleOpen: false
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.dateFrom !== prevProps.dateFrom ||
      this.props.dateTo !== prevProps.dateTo
    ) {
      this.setState(this.getInitialState());
      fetch(
        `/rooms/free/max?dateFrom=${this.props.dateFrom}&dateTo=${
          this.props.dateTo
        }`,
        {
          method: "GET"
        }
      )
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then(data => {
          this.setState({
            peopleMax: data[0].max
          });
        })
        .catch(err => {
          console.log("caught it!", err);
        });

      fetch(
        `/rooms/free/info?dateFrom=${this.props.dateFrom}&dateTo=${
          this.props.dateTo
        }`,
        {
          method: "GET"
        }
      )
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then(data => {
          this.setState({
            rooms: data
          });
        })
        .catch(err => {
          console.log("caught it!", err);
        });
    }
  }

  generatePeopleIcon() {
    var arr = [];
    if (this.state.peopleAmount !== null) {
      for (let i = 1; i <= this.state.peopleAmount; i++) {
        arr.push(<div key={i} className="client-select-person-icon" />);
      }
    }
    return arr;
  }

  generatePeople() {
    var arr = [];

    for (let i = 1; i <= this.state.peopleMax; i++) {
      arr.push(
        <>
          <input
            type="radio"
            name="person"
            key={i}
            id={i}
            onChange={this.handlePeopleChange}
          />
          <label
            className={this.state.peopleAmount !== null ? "" : "icon-gray"}
            htmlFor={i}
          />
        </>
      );
    }

    return arr;
  }

  generateRooms() {
    var arr = [];

    if (this.state.rooms !== null && this.state.peopleAmount !== null) {
      let rooms = this.roomConfig(
        this.state.rooms
          .map(e => e.peopleMax)
          .sort()
          .reverse()
      );
      for (let i in rooms) {
        arr.push(
          <option key={i} value={rooms[i]}>
            {rooms[i] === 1
              ? rooms[i] + " pokój"
              : rooms[i] <= 4
              ? rooms[i] + " pokoje"
              : rooms[i] + " pokoi"}
          </option>
        );
      }
    }

    return arr;
  }

  roomConfig(rooms) {
    var arr = [];
    for (let room in rooms) {
      let temp = 0;
      for (let i = 0; i <= room; i++) {
        temp += rooms[i];
      }
      if (temp >= this.state.peopleAmount) {
        arr.push(Number(room) + 1);
      }
    }
    return arr;
  }

  handlePeopleClick = () => {
    this.setState(prevState => ({
      peopleOpen: !prevState.peopleOpen
    }));
  };

  handlePeopleMouseLeave = () => {
    this.setState({
      peopleOpen: false
    });
  };

  handlePeopleChange = e => {
    this.setState(
      {
        peopleAmount: e.target.id,
        peopleOpen: false,
        peopleSelect: true
      },
      this.sendCallback(null, true)
    );
  };
  handleRoomsChange = e => {
    this.sendCallback(e.target.value, e.target.value !== "" ? false : true);
  };

  sendCallback(value, hide) {
    this.props.callbackSelect(
      this.state.peopleAmount,
      this.state.rooms,
      value,
      hide
    );
  }

  render() {
    return (
      <div className="row justify-content-end">
        <div
          onMouseLeave={this.handlePeopleMouseLeave}
          className="col-sm-4 d-flex flex-column"
        >
          <div className="client-select-title">Ilość osób:</div>
          <div
            onClick={this.handlePeopleClick}
            className="client-select-person d-flex flex-row flex-wrap justify-content-start"
          >
            {this.generatePeopleIcon()}
            <div
              className={
                "client-select-person-arrow" +
                (this.state.peopleOpen ? " rotate-90" : "")
              }
            />
          </div>

          <div
            className={
              "client-select-person border-top border-secondary d-flex flex-row flex-wrap justify-content-start" +
              (this.state.peopleOpen ? " show" : " hidden")
            }
          >
            {this.generatePeople()}
          </div>
        </div>
        <div className="sm-ml-3 col-sm-4 d-flex flex-column">
          <div className="client-select-title">Ilość pokoi:</div>
          <select
            onChange={this.handleRoomsChange}
            className="client-select-room"
          >
            <option value="" />
            {this.generateRooms()}
          </select>
        </div>
      </div>
    );
  }
}
export default ClientSelect;
