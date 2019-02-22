import React from "react";
import ContentEditable from "react-contenteditable";

import "./css/Rooms.css";

import AuthHelperMethods from "./components/AuthHelperMethods";

class Rooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: null
    };
  }

  Auth = new AuthHelperMethods();

  componentDidMount() {
    fetch("/rooms", {
      method: "GET"
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          rooms: data
        });
      })
      .catch(err => {
        console.log("caught it!", err);
      });
  }

  handleChange = evt => {
    var data = {
      name: evt._targetInst.memoizedProps.name,
      value: evt.target.value
  };

  fetch(`/rooms/${evt._targetInst.memoizedProps.nr}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
  })
      .then(function (response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      })
      .then(function () {
          console.log("success");
      })
      .catch(function (err) {
          console.log(err);
      });
  };

  getRooms() {
    if (this.state.rooms !== null) {
      var arr = [];
      for (let room of this.state.rooms) {
        arr.push(
          <div className="room-box col-lg-5 mr-3 mb-3">
            <div className="room-photo">
              <img src={require("./img/"+room.photoUrl)} alt="pokój" className="img-fluid" />
            </div>
            <div className="room-info">
              Numer: {room.room_nr}
              <br />
              Opis:{" "}
              <ContentEditable
                innerRef={this.contentEditable}
                html={room.description}
                onChange={this.handleChange}
                className="room-edit"
                tagName="span"
                name="description"
                nr={room.room_nr}
              />
              <br />
              Cena niska:{" "}
              <ContentEditable
                innerRef={this.contentEditable}
                html={room.priceLow}
                onChange={this.handleChange}
                className="room-edit"
                tagName="span"
                name="priceLow"
                nr={room.room_nr}
              />
              <br />
              Cena średnia:{" "}
              <ContentEditable
                innerRef={this.contentEditable}
                html={room.priceMedium}
                onChange={this.handleChange}
                className="room-edit"
                tagName="span"
                name="priceMedium"
                nr={room.room_nr}
              />
              <br />
              Cena wysoka:{" "}
              <ContentEditable
                innerRef={this.contentEditable}
                html={room.priceHigh}
                onChange={this.handleChange}
                className="room-edit"
                tagName="span"
                name="priceHigh"
                nr={room.room_nr}
              />
              <br />
              Maksymalna ilość osób:{" "}
              <ContentEditable
                innerRef={this.contentEditable}
                html={room.peopleMax}
                onChange={this.handleChange}
                className="room-edit"
                tagName="span"
                name="peopleMax"
                nr={room.room_nr}
              />
            </div>
          </div>
        );
      }
      return arr;
    }
  }

  render() {
    return (
      <div id="rooms-container" className="container">
        <div className="row justify-content-md-center">{this.getRooms()}</div>
      </div>
    );
  }
}

export default Rooms;
