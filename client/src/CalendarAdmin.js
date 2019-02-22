import React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import AuthHelperMethods from "./components/AuthHelperMethods";

import "./css/Calendar.css";

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
      days: null
    };
  }

  Auth = new AuthHelperMethods();

  componentDidMount() {
    this.Auth.fetch("/reservations/room/3", {
      method: "GET"
    })
      .then(data => {
        data.map(e => {
          e.dateFrom = new Date(e.dateFrom);
          e.dateTo = new Date(e.dateTo);
          return e;
        });
        this.setState({ reservations: data });
        console.log(data);
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

  render() {
    return (
      <div className="calendar-container">
        <DayPicker
          className={"client"}
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[
            new Date(2019, 2, 12),
            new Date(2019, 2, 2),
            this.state.reservations
              ? {
                  after: this.addDays(this.state.reservations[0].dateFrom, -1),
                  before: this.addDays(this.state.reservations[0].dateTo, 1)
                }
              : null,
            this.state.reservations
              ? {
                  after: this.addDays(this.state.reservations[1].dateFrom, -1),
                  before: this.addDays(this.state.reservations[1].dateTo, 1)
                }
              : null
          ]}
          locale="pl"
          months={MONTHS}
          weekdaysLong={WEEKDAYS_LONG}
          weekdaysShort={WEEKDAYS_SHORT}
        />
      </div>
    );
  }
}

export default CalendarAdmin;
