import React from "react";

import "./css/Select.css";

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxPeople: 0,
      rooms: null,
      amountPeople: 0
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.dateFrom !== prevProps.dateFrom ||
      this.props.dateTo !== prevProps.dateTo
    ) {
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
            maxPeople: data[0].max
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

  generateOption() {
    var arr = [];

    for (let i = 1; i <= this.state.maxPeople; i++) {
      arr.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return arr;
  }

  getRoom(e) {
    this.setState({
      amountPeople: e
    });
  }

  szukaj(rooms) {
    var arr = [];
    for (let room in rooms) {
      let temp = 0;
      for (let i = 0; i <= room; i++) {
        temp += rooms[i];
      }
      if (temp >= this.state.amountPeople) {
        arr.push(Number(room) + 1);
      }
    }
    return arr;
  }

  generateOption2() {
    var arr = [];

    if (this.state.rooms !== null && this.state.amountPeople !== 0) {
      let rooms = this.szukaj(
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

  render() {
    return (
      <div>
        <select
          id="how-people"
          onChange={e => {
            this.getRoom(e.target.value);
          }}
        >
          {this.generateOption()}
        </select>
        <select id="how-room">{this.generateOption2()}</select>
      </div>
    );
  }
}
export default Select;
