import React from "react";

import "./css/RoomMap.css";


class RoomMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomsAmount:this.props.roomsAmount,
      roomsAvailable :this.props.roomsAvailable
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.roomsAmount !== prevProps.roomsAmount ||
      this.props.roomsAvailable !== prevProps.roomsAvailable
    ) {
      this.setState({
        roomsAmount:this.props.roomsAmount,
      roomsAvailable :this.props.roomsAvailable
      });
    }
  }


  handleClickSVG() {
    this.props.callbackMap([4]);
  }

  render() {
    return (
      <div id="svg-map">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 237.84 193.04">
          <g id="room5" onClick={() => this.handleClickSVG()}>
            <rect className="svg-rect-outer" width="237" height="192" />
            <rect className="svg-rect" x="7" y="6" width="224" height="179" />
            <text
              className="svg-text"
              transform="translate(39.16 83.71) rotate(-0.25)"
            >
              <tspan>POKÓJ NR 5</tspan>
              <tspan className="svg-text-small" x="25.14" y="45.6">
                4 OSOBOWY
              </tspan>
            </text>
          </g>
        </svg>
      </div>
    );
  }
}
export default RoomMap;
