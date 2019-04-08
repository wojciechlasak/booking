import React from "react";

import "./css/RoomMap.css";

import Map from "./Map.js";

class RoomMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      roomsAmount: this.props.roomsAmount,
      roomsAvailable: this.props.roomsAvailable,
      roomsAvailableNr: this.props.roomsAvailable.map(e => e.room_nr),
      highSeason: this.props.highSeason,
      roomSelected: null,
      roomsSelected: [],
      opinions: [],
      bookingButton: true
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.roomsAmount !== prevProps.roomsAmount ||
      this.props.roomsAvailable !== prevProps.roomsAvailable
    ) {
      this.setState(
        this.getInitialState(),
        this.props.callback(this.state.roomsSelected, true)
      );
    }
  }

  handleClickSVG = (value) => {
    if (this.state.roomsAvailableNr.includes(value)) {
      if (value === this.state.roomSelected) {
        this.setState({
          roomSelected: null
        });
      } else {
        this.setState(
          {
            roomSelected: value
          },
          () => {
            this.getOpinions(
              this.state.roomsAvailable.find(
                e => e.room_nr === this.state.roomSelected
              ).room_nr
            );
          }
        );
      }
    }
  }

  handleAddRemoveRoom(room) {

    if (this.state.roomsSelected.includes(room)) {
      let array = [...this.state.roomsSelected];
      let index = array.indexOf(room);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState(
          { roomsSelected: array, bookingButton: true },
          this.props.callback(this.state.roomsSelected, true),
          
        );
      }
    } else {
      this.setState(prevState => ({
        roomsSelected: [...prevState.roomsSelected, this.state.roomSelected]
      }));
    }
  }

  handleNextStage = () => {
    this.setState(prevState => ({
      bookingButton: !prevState.bookingButton
    }));
    this.props.callback(this.state.roomsSelected, false);
  };

  getOpinions(nr) {
    fetch("/opinions/room/" + nr, {
      method: "GET"
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(data => {
        this.setState({
          opinions: data
        });
      })
      .catch(err => {
        console.log("caught it!", err);
      });
  }

  renderOpinion() {
    let generateStars = stars => {
      let arr = [];
      for (let i = 0; i < 5; i++) {
        if (i < stars) {
          arr.push(<div key={i} className="star star-full" />);
        } else {
          arr.push(<div key={i} className="star star-empty" />);
        }
      }
      return arr;
    };
    let arr = [];
    const opinions = this.state.opinions;
    for (let opinion in opinions) {
      arr.push(
        <div key={opinion}>
          <div className="stars-container d-flex flex-row">
            {generateStars(opinions[opinion].stars)}
          </div>
          <p>{opinions[opinion].content}</p>
        </div>
      );
    }
    return arr;
  }

  renderRoom() {
    let room = this.state.roomsAvailable.find(
      e => e.room_nr === this.state.roomSelected
    );

    if (room !== undefined) {
      return (
        <div className=" room-box col-sm-8 col-lg-5">
          <div className="room-photo">
            <img
              src={require("./img/" + room.photoUrl)}
              alt="pokój"
              className="img-fluid"
            />
          </div>
          <div className="room-info">
            <div className="room-info-in d-flex justify-content-between align-items-center">
              <h2>Pokój {room.room_nr}</h2>
              <button
                className="button-add"
                disabled={
                  (this.state.roomsSelected.length >= this.state.roomsAmount && !this.state.roomsSelected.includes(room.room_nr))
                }
                onClick={() => this.handleAddRemoveRoom(room.room_nr)}
              >
                <div className="d-flex justify-content-center align-items-center">
                  {!this.state.roomsSelected.includes(room.room_nr) ? (
                    <>
                      <div className="button-icon button-plus" />
                      DODAJ POKÓJ
                    </>
                  ) : (
                    <>
                      <div className="button-icon button-x" />
                      USUŃ POKÓJ
                    </>
                  )}
                </div>
              </button>
            </div>

            {" " + room.description}
          </div>
          <div className="opinions-container">{this.renderOpinion()}</div>
        </div>
      );
    } else return null;
  }

  render() {
    return (
      <>
        <div className=" row justify-content-sm-center">
          <div id="svg-map" className="col-sm-6 col-lg-4 mr-lg-5 mb-sm-5">
            <Map roomsAvailableNr={this.state.roomsAvailableNr} roomsSelected={this.state.roomsSelected} roomSelected={this.state.roomSelected} callback={this.handleClickSVG}/>
          </div>
          {this.renderRoom()}
        </div>
        <div className="r" />
        {this.state.bookingButton ? (
          <div className="row justify-content-center">
            <div className="col-sm-8 col-lg-4 d-flex justify-content-center">
              <button
                className="button-booking"
                disabled={
                  this.state.roomsSelected.length < this.state.roomsAmount
                }
                onClick={this.handleNextStage}
              >
                REZERWUJ
              </button>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}
export default RoomMap;
