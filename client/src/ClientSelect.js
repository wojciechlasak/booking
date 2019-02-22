import React from "react";

import "./css/Select.css";

class ClientSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      peopleMax: null,
      rooms: null,
      peopleAmount: null
    };
  }

  getInitialState() {
    return {
      peopleMax: null,
      rooms: null,
      peopleAmount: null
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

  generatePeople() {
    var arr = [];

    for (let i = 1; i <= this.state.peopleMax; i++) {
      arr.push(
        <option key={i} value={i}>
          {i}
        </option>
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

  handlePeopleChange = e => {
    if (e.target.value !== "") {
      this.setState(
        {
          peopleAmount: e.target.value
        },
        this.sendCallback(null, true)
      );
    }
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
      <div>
        <select onChange={this.handlePeopleChange}>
          <option value="">Wybierz ilość osób</option>
          {this.generatePeople()}
        </select>
        <select onChange={this.handleRoomsChange}>
          <option value="">Wybierz ilość pokoi</option>
          {this.generateRooms()}
        </select>
      </div>
    );
  }
}
export default ClientSelect;
