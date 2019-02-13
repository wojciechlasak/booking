import React from "react";

import "./css/RoomMap.css";

class RoomMap extends React.Component {

  
  handleClickSVG() {
    alert("klikneli mnie!!!");
  }

  
  render() {
    return (
     <div id="svg-map"> 
       <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 237.84 193.04"
        >
          <g id="room5" onClick={() => this.handleClickSVG()}>
            <rect className="svg-rect-outer"width="237" height="192" />
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
