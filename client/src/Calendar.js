import React from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import "./css/Calendar.css";

import PropTypes from 'prop-types';


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


class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
    this.protoTypes = {
      callback: PropTypes.func,
    }
  }
  getInitialState() {
    return {
      from: null,
      to: null,
      enteredTo: null // Keep track of the last day for mouseEnter.
    };
  }
  isSelectingFirstDay(from, to, day) {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    return !from || isBeforeFirstDay || isRangeSelected;
  }
  handleDayClick(day, { disabled }) {
    if (!disabled) {
      const { from, to } = this.state;
      if (from && to && day >= from && day <= to) {
        this.handleResetClick();
        return;
      }
      if (this.isSelectingFirstDay(from, to, day)) {
        this.setState({
          from: day,
          to: null,
          enteredTo: null
        });
      } else {
        this.setState({
          to: day,
          enteredTo: day
        });
      }
    }
  }
  handleDayMouseEnter(day) {
    const { from, to } = this.state;
    if (!this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day
      });
    }
  }
  handleResetClick() {
    this.setState(this.getInitialState());
  }
  handleSendClick() {
   this.props.callback(this.state.from.toISOString(), this.state.to.toISOString())
  }

  render() {
    const { from, to, enteredTo } = this.state;
    const modifiers = { start: from, end: enteredTo };
    const selectedDays = [from, { from, to: enteredTo }];
    const disabledDays = { before: new Date() }
    return (
      <div className="calendar-container">
        <DayPicker
          className={("MyStyle")}
          numberOfMonths={2}
          fromMonth={from}
          selectedDays={selectedDays}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
          onDayMouseEnter={this.handleDayMouseEnter}
          locale="pl"
          months={MONTHS}
          weekdaysLong={WEEKDAYS_LONG}
          weekdaysShort={WEEKDAYS_SHORT}
          //showOutsideDays
          disabledDays={disabledDays}
        ></DayPicker>
        <div className="DayPicker-text">
          {!from && !to && "Wybierz pierwszy dzień pobytu."}
          {from && !to && "Wybierz ostatni dzień pobytu."}
          {from &&
            to &&
            `Wybrane od ${from.toLocaleDateString()} do
                ${to.toLocaleDateString()}`}{" "}
          {from &&
            to && (
              <>
                <button className="link" onClick={this.handleResetClick}>
                  Resetuj
              </button>
                <button className="link" onClick={this.handleSendClick.bind(this)}>
                  Wyślij
            </button>
              </>
            )}
        </div>
      </div>
    );
  }
  
}



export default Calendar;

