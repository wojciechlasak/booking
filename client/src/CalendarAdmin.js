import React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import AuthHelperMethods from "./components/AuthHelperMethods";

import "./css/Calendar.css";
import "./css/Select.css";
import "./css/CheckCode.css";

const MONTHS = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień"
];
const WEEKDAYS_LONG = [
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota",
  "Niedziela"
];
const WEEKDAYS_SHORT = ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "N"];

class CalendarAdmin extends React.Component {
  static defaultProps = {
    numberOfMonths: 2
  };
  constructor(props) {
    super(props);
    this.state = {
      reservations: null,
      days: null,
      rooms: null,
      roomSelected: null,
      roomOpen: false,
      reservationChosen: null,
      isOpen: false
    };
  }

  Auth = new AuthHelperMethods();

  componentDidMount() {
    fetch("/rooms/", {
      method: "GET"
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(data => {
        this.setState({ rooms: data.length });
      })
      .catch(err => {
        console.log("caught it!", err);
      });
  }

  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  handleDayClick = day => {
    if (this.state.reservations !== null) {
      this.state.reservations.map(value => {
        if (
          Date.parse(day) <= Date.parse(value.dateTo) &&
          Date.parse(day) >= Date.parse(value.dateFrom)
        ) {
          this.setState({
            reservationChosen: value,
            isOpen: true
          });
        }
      });
    }
  };

  handleRoomChange = e => {
    this.setState(
      {
        roomSelected: Number(e.target.id.replace(/^\D+/g, ""))
      },
      () => {
        this.changeRooms();
      }
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

  closeLightbox = () => {
    this.setState({
      isOpen: false
    });
  };

  changeRooms() {
    console.log(this.state.roomSelected)
    this.Auth.fetch(`/reservations/room/${this.state.roomSelected}`, {
      method: "GET"
    })
      .then(data => {
        data.map(e => {
          e.dateFrom = new Date(e.dateFrom);
          e.dateTo = new Date(e.dateTo);
          return e;
        });
        this.setState({ reservations: data });
      })
      .catch(err => {
        console.log("caught it!", err);
      });
  }

  generateRooms() {
    var arr = [];

    if (this.state.rooms !== null) {
      for (let i = 0; i < this.state.rooms; i++) {
        arr.push(
          <>
            <input
              type="radio"
              name="room"
              key={i}
              id={`room${i + 1}`}
              onChange={this.handleRoomChange}
              checked={
                this.state.roomSelected !== null &&
                this.state.roomSelected === i + 1
              }
            />
            <label htmlFor={`room${i + 1}`}>{`Pokój nr ${i + 1}`}</label>
          </>
        );
      }
    }

    return arr;
  }

  generateInfo() {
    var arr = [];
    arr.push(
      <div>
        Kod rezerwacji {this.state.reservationChosen.reservation_id}
        <br />W terminie od {this.state.reservationChosen.dateFrom} do{" "}
        {this.state.reservationChosen.dateTo}
        <br />
        Do zapłacenia {this.state.reservationChosen.price}
        <br />
        Komentarz klienta: {this.state.reservationChosen.comments}
      </div>
    );
    return arr;
  }

  render() {
    return (
      <>
        <div
          className={`lightbox-container ${this.state.isOpen?"opened":" "}`}
        >
          <div className="lightbox-bg" onClick={this.closeLightbox} />
          <div className="lightbox-in">
            {this.state.isOpen ? (
              <div>
                Kod rezerwacji {this.state.reservationChosen.reservation_id}
                <br />W terminie od{" "}
                {this.state.reservationChosen.dateFrom
                  .toISOString()
                  .slice(0, 10)}{" "}
                do{" "}
                {this.state.reservationChosen.dateTo.toISOString().slice(0, 10)}
                <br />
                Do zapłacenia {this.state.reservationChosen.price} zł
                <br />
                Komentarz klienta: "{this.state.reservationChosen.comments}"
              </div>
            ) : null}

            <svg
              className="lightbox-close"
              onClick={this.closeLightbox}
              viewBox="0 0 100 100"
            >
              <path d="M10 10L90 90" />
              <path d="M90 10L10 90" />
            </svg>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="calendar-container col-md-9">
              <DayPicker
                className={"admin client"}
                numberOfMonths={this.props.numberOfMonths}
                onDayClick={this.handleDayClick}
                selectedDays={
                  this.state.reservations
                    ? this.state.reservations.map(value => {
                        return {
                          after: this.addDays(value.dateFrom, -1),
                          before: this.addDays(value.dateTo, 1)
                        };
                      })
                    : null
                }
                locale="pl"
                months={MONTHS}
                weekdaysLong={WEEKDAYS_LONG}
                weekdaysShort={WEEKDAYS_SHORT}
              />
            </div>
            <div
              onMouseLeave={this.handleRoomMouseLeave}
              className="col-md-3 mt-sm-5 d-flex flex-column"
            >
              <div className="client-select-title">Który pokój:</div>
              <div
                onClick={this.handleRoomClick}
                className="client-select-room d-flex flex-row flex-wrap justify-content-start pl-2 pt-2"
              >
                {this.state.roomSelected === null
                  ? ""
                  : `Pokój nr ${this.state.roomSelected}`}
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
        </div>
      </>
    );
  }
}

export default CalendarAdmin;
