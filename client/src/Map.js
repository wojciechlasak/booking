import React from "react";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  isdisabled(value) {
    return this.props.roomsAvailableNr.includes(value) ? "" : "disabled";
  }

  isSelected(value) {
    return this.props.roomsSelected.includes(value)
      ? "selected"
      : this.props.roomSelected === value
      ? "active"
      : "";
  }
  render() {
    return (
      <>
        <svg
          id="map"
          data-name="map"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="10 0 278.49 333.5"
        >
          <defs>
            <clipPath id="clip-path" transform="translate(-487.26 -54.25)">
              <rect
                className="cls-1"
                x="517.59"
                y="284.91"
                width="36.31"
                height="32.5"
                transform="translate(234.59 836.91) rotate(-90)"
              />
            </clipPath>
            <clipPath id="clip-path-2" transform="translate(-487.26 -54.25)">
              <rect
                className="cls-1"
                x="507.91"
                y="273.14"
                width="22.33"
                height="48.75"
                transform="translate(816.59 -221.55) rotate(90)"
              />
            </clipPath>
            <clipPath id="clip-path-3" transform="translate(-487.26 -54.25)">
              <rect
                className="cls-1"
                x="608.59"
                y="268.91"
                width="36.31"
                height="32.5"
                transform="translate(1253.5 570.31) rotate(180)"
              />
            </clipPath>
            <clipPath id="clip-path-4" transform="translate(-487.26 -54.25)">
              <rect
                className="cls-1"
                x="611.95"
                y="277.46"
                width="22.33"
                height="48.75"
              />
            </clipPath>
            <clipPath id="clip-path-5" transform="translate(-487.26 -54.25)">
              <rect
                className="cls-1"
                x="608.59"
                y="219.91"
                width="36.31"
                height="32.5"
                transform="translate(1253.5 472.31) rotate(180)"
              />
            </clipPath>
            <clipPath id="clip-path-6" transform="translate(-487.26 -54.25)">
              <rect
                className="cls-1"
                x="611.95"
                y="228.46"
                width="22.33"
                height="48.75"
              />
            </clipPath>
            <clipPath id="clip-path-7" transform="translate(-487.26 -54.25)">
              <rect
                className="cls-1"
                x="608.59"
                y="115.91"
                width="36.31"
                height="31.09"
                transform="translate(1253.5 262.91) rotate(180)"
              />
            </clipPath>
            <clipPath id="clip-path-8" transform="translate(-487.26 -54.25)">
              <rect
                className="cls-1"
                x="611.95"
                y="124.09"
                width="22.33"
                height="46.64"
              />
            </clipPath>
            <clipPath id="clip-path-9" transform="translate(-487.26 -54.25)">
              <rect
                className="cls-1"
                x="513.59"
                y="115.91"
                width="36.31"
                height="32.5"
                transform="translate(663.91 -399.59) rotate(90)"
              />
            </clipPath>
            <clipPath id="clip-path-10" transform="translate(-487.26 -54.25)">
              <rect
                className="cls-1"
                x="537.26"
                y="111.42"
                width="22.33"
                height="48.75"
                transform="translate(412.64 684.22) rotate(-90)"
              />
            </clipPath>
            <clipPath id="clip-path-11" transform="translate(-487.26 -54.25)">
              <rect
                className="cls-1"
                x="502.44"
                y="203.75"
                width="38.62"
                height="32.5"
                transform="translate(741.75 -301.75) rotate(90)"
              />
            </clipPath>
            <clipPath id="clip-path-12" transform="translate(-487.26 -54.25)">
              <rect
                className="cls-1"
                x="493.2"
                y="199.49"
                width="23.75"
                height="48.75"
                transform="translate(281.2 728.94) rotate(-90)"
              />
            </clipPath>
            <clipPath id="clip-path-13" transform="translate(-487.26 -54.25)">
              <rect
                className="cls-1"
                x="503.59"
                y="228.91"
                width="36.31"
                height="32.5"
                transform="translate(276.59 766.91) rotate(-90)"
              />
            </clipPath>
            <clipPath id="clip-path-14" transform="translate(-487.26 -54.25)">
              <rect
                className="cls-1"
                x="493.91"
                y="217.14"
                width="22.33"
                height="48.75"
                transform="translate(746.59 -263.55) rotate(90)"
              />
            </clipPath>
          </defs>
          <title>mapa</title>
          <rect
            id="korytarz"
            className="cls-13"
            x="17.74"
            y="70.75"
            width="130"
            height="183"
          />
          <g
            id="room1"
            className={this.isdisabled(1) + " room-hover " + this.isSelected(1)}
            onClick={() => {
              this.props.callback(1);
            }}
          >
            <rect
              id="room1-rect"
              className="cls-13"
              x="17.74"
              y="0.82"
              width="130"
              height="70"
            />
            <path
              className="cls-15"
              d="M549.78,74.44v-8h3a2.34,2.34,0,1,1,0,4.68h-2.31v3.32Zm4.69-5.66a1.65,1.65,0,0,0-1.76-1.71h-2.24v3.43h2.24A1.66,1.66,0,0,0,554.47,68.77Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M556.14,71.53a2.79,2.79,0,1,1,2.77,3A2.8,2.8,0,0,1,556.14,71.53Zm4.89,0A2.14,2.14,0,1,0,558.91,74,2.24,2.24,0,0,0,561,71.53Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M567.33,74.44,565,71.68l-1.08,1v1.74h-.62v-8h.62V72l3.41-3.31h.84l-2.7,2.61,2.69,3.18Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M569.05,71.53a2.79,2.79,0,1,1,2.77,3A2.8,2.8,0,0,1,569.05,71.53Zm4.89,0A2.14,2.14,0,1,0,571.82,74,2.24,2.24,0,0,0,573.95,71.53Zm-2.29-3.77h-.53L573,66h.74Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M574.09,76.34l.28-.52a1.19,1.19,0,0,0,.85.4.94.94,0,0,0,1-1.06V68.64h.62v6.52a1.43,1.43,0,0,1-1.57,1.62A1.64,1.64,0,0,1,574.09,76.34Zm2-9.09a.48.48,0,0,1,.48-.47.47.47,0,0,1,.48.47.48.48,0,0,1-.48.48A.49.49,0,0,1,576.06,67.25Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M585.81,74.44V70.51c0-1.12-.56-1.45-1.4-1.45a2.48,2.48,0,0,0-1.88,1v4.38h-.62V68.64h.62v.88a2.93,2.93,0,0,1,2.09-1c1.18,0,1.82.58,1.82,1.88v4.05Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M588.38,74.44V68.64H589v1a2.49,2.49,0,0,1,2-1.12v.68a1.32,1.32,0,0,0-.31,0,2.21,2.21,0,0,0-1.64,1v4.22Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M570.11,90V82.78l-1.39,1.48-.65-.66,2.17-2.24h.95V90Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-16"
              d="M560.64,103.25a4,4,0,1,0-4.29,0,5.09,5.09,0,0,0-4.63,5.07v4.19l.28.09a23.16,23.16,0,0,0,6.92,1.12,14.21,14.21,0,0,0,6-1.13l.27-.13h0v-4.12A5.09,5.09,0,0,0,560.64,103.25Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-16"
              d="M583.64,103.25a4,4,0,1,0-4.29,0,5.09,5.09,0,0,0-4.63,5.07v4.19l.28.09a23.16,23.16,0,0,0,6.92,1.12,14.21,14.21,0,0,0,6-1.13l.27-.13h0v-4.12A5.09,5.09,0,0,0,583.64,103.25Z"
              transform="translate(-487.26 -54.25)"
            />
          </g>
          <g
            id="room2"
            className={this.isdisabled(2) + " room-hover " + this.isSelected(2)}
            onClick={() => {
              this.props.callback(2);
            }}
          >
            <rect
              id="room2-rect"
              className="cls-13"
              x="147.74"
              y="0.75"
              width="130"
              height="92"
            />
            <path
              className="cls-15"
              d="M679.78,78.5v-8h3a2.34,2.34,0,1,1,0,4.68h-2.31V78.5Zm4.69-5.66a1.65,1.65,0,0,0-1.76-1.71h-2.24v3.43h2.24A1.66,1.66,0,0,0,684.47,72.84Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M686.14,75.6a2.79,2.79,0,1,1,2.77,3A2.8,2.8,0,0,1,686.14,75.6Zm4.89,0a2.14,2.14,0,1,0-2.12,2.48A2.24,2.24,0,0,0,691,75.6Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M697.33,78.5,695,75.75l-1.08,1V78.5h-.62v-8h.62V76l3.41-3.31h.84l-2.7,2.61,2.69,3.18Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M699.05,75.6a2.79,2.79,0,1,1,2.77,3A2.8,2.8,0,0,1,699.05,75.6Zm4.89,0a2.14,2.14,0,1,0-2.12,2.48A2.24,2.24,0,0,0,703.95,75.6Zm-2.29-3.77h-.53L703,70.11h.74Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M704.09,80.41l.28-.52a1.19,1.19,0,0,0,.85.4.94.94,0,0,0,1-1.06V72.71h.62v6.52a1.43,1.43,0,0,1-1.57,1.62A1.64,1.64,0,0,1,704.09,80.41Zm2-9.09a.48.48,0,0,1,.48-.47.47.47,0,0,1,.48.47.48.48,0,0,1-.48.48A.49.49,0,0,1,706.06,71.32Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M715.81,78.5V74.58c0-1.12-.56-1.45-1.4-1.45a2.48,2.48,0,0,0-1.88,1V78.5h-.62V72.71h.62v.88a2.94,2.94,0,0,1,2.09-1,1.63,1.63,0,0,1,1.82,1.88V78.5Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M718.38,78.5V72.71H719v1a2.49,2.49,0,0,1,2-1.12v.68a1.32,1.32,0,0,0-.31,0,2.2,2.2,0,0,0-1.64,1V78.5Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M696.88,94.1v-.87c3.12-2.44,4.82-3.89,4.82-5.38a1.62,1.62,0,0,0-1.82-1.59,2.9,2.9,0,0,0-2.35,1.09l-.66-.69a3.72,3.72,0,0,1,3-1.37,2.64,2.64,0,0,1,2.91,2.55c0,1.77-1.79,3.38-4.21,5.29h4.25v1Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-16"
              d="M690.64,106.31a4,4,0,1,0-4.29,0,5.09,5.09,0,0,0-4.63,5.07v4.19l.28.09a23.16,23.16,0,0,0,6.92,1.12,14.21,14.21,0,0,0,6-1.13l.27-.13h0v-4.12A5.09,5.09,0,0,0,690.64,106.31Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-16"
              d="M713.64,106.31a4,4,0,1,0-4.29,0,5.09,5.09,0,0,0-4.63,5.07v4.19l.28.09a23.16,23.16,0,0,0,6.92,1.12,14.21,14.21,0,0,0,6-1.13l.27-.13h0v-4.12A5.09,5.09,0,0,0,713.64,106.31Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-16"
              d="M702.64,123.31a4,4,0,1,0-4.29,0,5.09,5.09,0,0,0-4.63,5.07v4.19l.28.09a23.16,23.16,0,0,0,6.92,1.12,14.21,14.21,0,0,0,6-1.13l.27-.13h0v-4.12A5.09,5.09,0,0,0,702.64,123.31Z"
              transform="translate(-487.26 -54.25)"
            />
          </g>
          <g
            id="room3"
            className={this.isdisabled(3) + " room-hover " + this.isSelected(3)}
            onClick={() => {
              this.props.callback(3);
            }}
          >
            <rect
              id="room3-rect"
              className="cls-14"
              x="147.74"
              y="92.75"
              width="130"
              height="121"
            />
            <path
              className="cls-15"
              d="M679.78,181.37v-8h3a2.34,2.34,0,1,1,0,4.68h-2.31v3.32Zm4.69-5.66a1.65,1.65,0,0,0-1.76-1.71h-2.24v3.43h2.24A1.66,1.66,0,0,0,684.47,175.71Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M686.14,178.47a2.79,2.79,0,1,1,2.77,3A2.8,2.8,0,0,1,686.14,178.47Zm4.89,0a2.14,2.14,0,1,0-2.12,2.48A2.24,2.24,0,0,0,691,178.47Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M697.33,181.37,695,178.61l-1.08,1v1.74h-.62v-8h.62v5.52l3.41-3.31h.84l-2.7,2.61,2.69,3.18Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M699.05,178.47a2.79,2.79,0,1,1,2.77,3A2.8,2.8,0,0,1,699.05,178.47Zm4.89,0a2.14,2.14,0,1,0-2.12,2.48A2.24,2.24,0,0,0,703.95,178.47Zm-2.29-3.77h-.53L703,173h.74Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M704.09,183.27l.28-.52a1.19,1.19,0,0,0,.85.4.94.94,0,0,0,1-1.06v-6.52h.62v6.52a1.43,1.43,0,0,1-1.57,1.62A1.64,1.64,0,0,1,704.09,183.27Zm2-9.09a.48.48,0,0,1,.48-.47.47.47,0,0,1,.48.47.48.48,0,0,1-.48.48A.49.49,0,0,1,706.06,174.18Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M715.81,181.37v-3.92c0-1.12-.56-1.45-1.4-1.45a2.48,2.48,0,0,0-1.88,1v4.38h-.62v-5.79h.62v.88a2.94,2.94,0,0,1,2.09-1,1.63,1.63,0,0,1,1.82,1.88v4.05Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M718.38,181.37v-5.79H719v1a2.49,2.49,0,0,1,2-1.12v.68a1.32,1.32,0,0,0-.31,0,2.2,2.2,0,0,0-1.64,1v4.22Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M696.76,195.69l.64-.68a3,3,0,0,0,2.42,1.14c1.26,0,2-.64,2-1.62S701,193,699.68,193c-.36,0-.77,0-.9,0v-1c.14,0,.54,0,.9,0,1.09,0,2-.43,2-1.43s-.88-1.48-1.94-1.48a2.94,2.94,0,0,0-2.29,1.05l-.6-.68a3.73,3.73,0,0,1,3-1.34c1.66,0,2.92.84,2.92,2.3a2.09,2.09,0,0,1-1.86,2,2.2,2.2,0,0,1,2,2.15c0,1.44-1.17,2.5-3.08,2.5A3.66,3.66,0,0,1,696.76,195.69Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-16"
              d="M690.64,210.18a4,4,0,1,0-4.29,0,5.09,5.09,0,0,0-4.63,5.07v4.19l.28.09a23.16,23.16,0,0,0,6.92,1.12,14.21,14.21,0,0,0,6-1.13l.27-.13h0v-4.12A5.09,5.09,0,0,0,690.64,210.18Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-16"
              d="M713.64,210.18a4,4,0,1,0-4.29,0,5.09,5.09,0,0,0-4.63,5.07v4.19l.28.09a23.16,23.16,0,0,0,6.92,1.12,14.21,14.21,0,0,0,6-1.13l.27-.13h0v-4.12A5.09,5.09,0,0,0,713.64,210.18Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-16"
              d="M690.64,231.18a4,4,0,1,0-4.29,0,5.09,5.09,0,0,0-4.63,5.07v4.19l.28.09a23.16,23.16,0,0,0,6.92,1.12,14.21,14.21,0,0,0,6-1.13l.27-.13h0v-4.12A5.09,5.09,0,0,0,690.64,231.18Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-16"
              d="M713.64,231.18a4,4,0,1,0-4.29,0,5.09,5.09,0,0,0-4.63,5.07v4.19l.28.09a23.16,23.16,0,0,0,6.92,1.12,14.21,14.21,0,0,0,6-1.13l.27-.13h0v-4.12A5.09,5.09,0,0,0,713.64,231.18Z"
              transform="translate(-487.26 -54.25)"
            />
          </g>
          <g
            id="room4"
            className={this.isdisabled(4) + " room-hover " + this.isSelected(4)}
            onClick={() => {
              this.props.callback(4);
            }}
          >
            <g id="room4-rect">
              <polyline
                className="cls-14"
                points="166.74 213.75 277.74 213.75 277.74 332.75 166.74 332.75 166.74 253.75"
              />
              <polyline
                className="cls-14"
                points="167.6 253.75 147.74 253.75 147.74 213.75 167.6 213.75"
              />
            </g>
            <path
              className="cls-15"
              d="M680.77,298.5v-8h3a2.34,2.34,0,1,1,0,4.68h-2.31v3.32Zm4.69-5.66a1.65,1.65,0,0,0-1.76-1.71h-2.24v3.43h2.24A1.66,1.66,0,0,0,685.46,292.84Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M687.13,295.6a2.79,2.79,0,1,1,2.77,3A2.8,2.8,0,0,1,687.13,295.6Zm4.89,0a2.14,2.14,0,1,0-2.12,2.48A2.24,2.24,0,0,0,692,295.6Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M698.32,298.5,696,295.75l-1.08,1v1.74h-.62v-8h.62V296l3.41-3.31h.84l-2.7,2.62,2.69,3.18Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M700,295.6a2.79,2.79,0,1,1,2.77,3A2.8,2.8,0,0,1,700,295.6Zm4.89,0a2.14,2.14,0,1,0-2.12,2.48A2.24,2.24,0,0,0,704.93,295.6Zm-2.29-3.77h-.53l1.85-1.73h.74Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M705.08,300.41l.28-.52a1.19,1.19,0,0,0,.85.4.94.94,0,0,0,1-1.06v-6.52h.62v6.52a1.43,1.43,0,0,1-1.57,1.62A1.64,1.64,0,0,1,705.08,300.41Zm2-9.09a.48.48,0,0,1,.48-.47.47.47,0,0,1,.48.47.48.48,0,0,1-.48.48A.49.49,0,0,1,707,291.32Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M716.8,298.5v-3.92c0-1.12-.56-1.45-1.4-1.45a2.48,2.48,0,0,0-1.88,1v4.38h-.62v-5.79h.62v.88a2.94,2.94,0,0,1,2.09-1c1.17,0,1.82.58,1.82,1.88v4.05Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M719.37,298.5v-5.79H720v1a2.48,2.48,0,0,1,2-1.12v.68a1.31,1.31,0,0,0-.31,0,2.2,2.2,0,0,0-1.64,1v4.22Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M701.9,314.1v-2.2h-4.12V311l3.72-5.58H703V311h1.22v.95H703v2.2Zm0-7.67-3,4.52h3Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-16"
              d="M691.63,326.31a4,4,0,1,0-4.29,0,5.09,5.09,0,0,0-4.63,5.07v4.19l.28.09a23.16,23.16,0,0,0,6.92,1.12,14.21,14.21,0,0,0,6-1.13l.27-.13h0v-4.12A5.09,5.09,0,0,0,691.63,326.31Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-16"
              d="M714.63,326.31a4,4,0,1,0-4.29,0,5.09,5.09,0,0,0-4.63,5.07v4.19l.28.09a23.16,23.16,0,0,0,6.92,1.12,14.21,14.21,0,0,0,6-1.13l.27-.13h0v-4.12A5.09,5.09,0,0,0,714.63,326.31Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-16"
              d="M703.63,343.31a4,4,0,1,0-4.29,0,5.09,5.09,0,0,0-4.63,5.07v4.19l.28.09a23.16,23.16,0,0,0,6.92,1.12,14.21,14.21,0,0,0,6-1.13l.27-.13h0v-4.12A5.09,5.09,0,0,0,703.63,343.31Z"
              transform="translate(-487.26 -54.25)"
            />
          </g>
          <g
            id="room5"
            className={this.isdisabled(5) + " room-hover " + this.isSelected(5)}
            onClick={() => {
              this.props.callback(5);
            }}
          >
            <g id="room5-rect">
              <polyline
                className="cls-13"
                points="165.49 253.75 166.74 253.75 166.74 332.75 17.74 332.75 17.74 253.75 165.49 253.75"
              />
            </g>
            <path
              className="cls-15"
              d="M559.28,330.5v-8h3a2.34,2.34,0,1,1,0,4.68H560v3.32Zm4.69-5.66a1.65,1.65,0,0,0-1.76-1.71H560v3.43h2.24A1.66,1.66,0,0,0,564,324.84Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M565.64,327.6a2.79,2.79,0,1,1,2.77,3A2.8,2.8,0,0,1,565.64,327.6Zm4.89,0a2.14,2.14,0,1,0-2.12,2.48A2.24,2.24,0,0,0,570.53,327.6Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M576.83,330.5l-2.32-2.76-1.08,1v1.74h-.62v-8h.62V328l3.41-3.31h.84l-2.7,2.62,2.69,3.18Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M578.55,327.6a2.79,2.79,0,1,1,2.77,3A2.8,2.8,0,0,1,578.55,327.6Zm4.89,0a2.14,2.14,0,1,0-2.12,2.48A2.24,2.24,0,0,0,583.45,327.6Zm-2.29-3.77h-.53l1.85-1.73h.74Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M583.59,332.41l.28-.52a1.19,1.19,0,0,0,.85.4.94.94,0,0,0,1-1.06v-6.52h.62v6.52a1.43,1.43,0,0,1-1.57,1.62A1.64,1.64,0,0,1,583.59,332.41Zm2-9.09a.48.48,0,0,1,.48-.47.47.47,0,0,1,.48.47.48.48,0,0,1-.48.48A.49.49,0,0,1,585.56,323.32Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M595.31,330.5v-3.92c0-1.12-.56-1.45-1.4-1.45a2.48,2.48,0,0,0-1.88,1v4.38h-.62v-5.79H592v.88a2.94,2.94,0,0,1,2.09-1c1.17,0,1.82.58,1.82,1.88v4.05Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M597.88,330.5v-5.79h.62v1a2.48,2.48,0,0,1,2-1.12v.68a1.29,1.29,0,0,0-.31,0,2.2,2.2,0,0,0-1.64,1v4.22Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-15"
              d="M576.52,344.87l.66-.73a2.85,2.85,0,0,0,2.39,1.16,1.87,1.87,0,0,0,2-1.86,1.83,1.83,0,0,0-2-1.87,2.78,2.78,0,0,0-2,.81l-.79-.27v-4.67h5.3v1h-4.22v3a3,3,0,0,1,2-.78,2.65,2.65,0,0,1,2.77,2.77,2.86,2.86,0,0,1-3.09,2.86A3.56,3.56,0,0,1,576.52,344.87Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-16"
              d="M570.14,359.31a4,4,0,1,0-4.29,0,5.09,5.09,0,0,0-4.63,5.07v4.19l.28.09a23.16,23.16,0,0,0,6.92,1.12,14.21,14.21,0,0,0,6-1.13l.27-.13h0v-4.12A5.09,5.09,0,0,0,570.14,359.31Z"
              transform="translate(-487.26 -54.25)"
            />
            <path
              className="cls-16"
              d="M593.14,359.31a4,4,0,1,0-4.29,0,5.09,5.09,0,0,0-4.63,5.07v4.19l.28.09a23.16,23.16,0,0,0,6.92,1.12,14.21,14.21,0,0,0,6-1.13l.27-.13h0v-4.12A5.09,5.09,0,0,0,593.14,359.31Z"
              transform="translate(-487.26 -54.25)"
            />
          </g>
          <g id="door">
            <g className="cls-2">
              <g className="cls-3">
                <ellipse
                  className="cls-4"
                  cx="33.22"
                  cy="255.89"
                  rx="19.22"
                  ry="19.9"
                />
              </g>
            </g>
            <g className="cls-5">
              <g className="cls-6">
                <ellipse
                  className="cls-4"
                  cx="148.47"
                  cy="246.18"
                  rx="19.9"
                  ry="19.22"
                />
              </g>
            </g>
            <g className="cls-7">
              <g className="cls-8">
                <ellipse
                  className="cls-4"
                  cx="148.47"
                  cy="197.18"
                  rx="19.9"
                  ry="19.22"
                />
              </g>
            </g>
            <g className="cls-9">
              <g className="cls-10">
                <ellipse
                  className="cls-4"
                  cx="148.47"
                  cy="91.81"
                  rx="19.9"
                  ry="18.39"
                />
              </g>
            </g>
            <g className="cls-11">
              <g className="cls-12">
                <ellipse
                  className="cls-4"
                  cx="59.76"
                  cy="68.92"
                  rx="19.22"
                  ry="19.9"
                />
              </g>
            </g>
          </g>
          <g id="enter">
            <g className="cls-17">
              <g className="cls-18">
                <ellipse
                  className="cls-4"
                  cx="19.22"
                  cy="154.89"
                  rx="19.22"
                  ry="19.86"
                />
              </g>
            </g>
            <g className="cls-19">
              <g className="cls-20">
                <ellipse
                  className="cls-4"
                  cx="19.22"
                  cy="199.89"
                  rx="19.22"
                  ry="19.9"
                />
              </g>
            </g>

            <line
              className="cls-13"
              x1="17.74"
              y1="157.75"
              x2="38.74"
              y2="157.75"
            />
            <line
              className="cls-13"
              x1="17.74"
              y1="197.75"
              x2="38.74"
              y2="197.75"
            />
          </g>
        </svg>
      </>
    );
  }
}
export default Map;
