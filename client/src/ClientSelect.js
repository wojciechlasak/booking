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
      roomSelected: null,
      peopleOpen: false,
      roomOpen: false
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
            var error = new Error(response.statusText)
            error.response = response
            throw error
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
            var error = new Error(response.statusText)
            error.response = response
            throw error
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
            id={`person${i}`}
            onChange={this.handlePeopleChange}
          />
          <label
            className={this.state.peopleAmount !== null ? "" : "icon-gray"}
            htmlFor={`person${i}`}
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
          <>
            <input
              type="radio"
              name="room"
              key={i}
              id={`room${rooms[i]}`}
              onChange={this.handleRoomChange}
              checked={this.state.roomSelected!==null && this.state.roomSelected===rooms[i]}
            />
            <label htmlFor={`room${rooms[i]}`}>
              {rooms[i] === 1
                ? rooms[i] + " pokój"
                : rooms[i] <= 4
                ? rooms[i] + " pokoje"
                : rooms[i] + " pokoi"}
            </label>
          </>
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
        peopleAmount: Number(e.target.id.replace( /^\D+/g, '')),
        peopleOpen: false,
        peopleSelect: true,
        roomSelected: null
      },
      this.sendCallback(null, true)
    );
  };

  handleRoomClick = () => {
    this.setState(prevState => ({
      roomOpen: !prevState.roomOpen
    }));
  };

  handleRoomMouseLeave = () => {
    this.setState({
      roomOpen: false
    });
  };

  handleRoomChange = e => {
    this.setState(
      {
        roomSelected: Number(e.target.id.replace( /^\D+/g, '')),
        roomOpen: false,
        peopleSelect: true
      },
      this.sendCallback( Number(e.target.id.replace( /^\D+/g, '')),false)
    );
  };

  sendCallback( value, hide) {
    this.props.callback(
      this.state.peopleAmount,
      this.state.rooms,
      value,
      hide
    );
  }

  render() {
    return (
      <div className="row justify-content-lg-end justify-content-sm-center">
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
                "client-select-arrow" +
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
        <div
          onMouseLeave={this.handleRoomMouseLeave}
          className=" sm-ml-3 col-sm-4 d-flex flex-column"
        >
          <div className="client-select-title">Ilość osób:</div>
          <div
            onClick={this.handleRoomClick}
            className="client-select-room d-flex flex-row flex-wrap justify-content-start pl-2 pt-2"
          >
            {this.state.roomSelected === null
              ? ""
              : this.state.roomSelected === 1
              ? this.state.roomSelected + " pokój"
              : this.state.roomSelected <= 4
              ? this.state.roomSelected + " pokoje"
              : this.state.roomSelected + " pokoi"}
            <div
              className={
                "client-select-arrow" +
                (this.state.roomOpen ? " rotate-90" : "")
              }
            />
          </div>

          <div
            className={
              "client-select-room border-top border-secondary d-flex flex-column justify-content-start" +
              (this.state.roomOpen ? " show" : " hidden")
            }
          >
            {this.generateRooms()}
          </div>
        </div>
      </div>
    );
  }
}
export default ClientSelect;
