import React from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
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

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();

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
  handleDayClick = (day, { disabled }) => {
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
      } else { /*if both selected, change state and callback to parent*/
        this.setState(
          {
            to: day,
            enteredTo: day
          },
          () => {
            this.props.callback(
              this.state.from.toISOString(),
              this.state.to.toISOString(),
              true
            );
          }
        );
      }
    }
  }
  handleDayMouseEnter = day => {
    const { from, to } = this.state;
    if (!this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day
      });
    }
  }
  handleResetClick = () => {
    this.setState(this.getInitialState());
  }

  render() {
    const { from,enteredTo } = this.state;
    const modifiers = { start: from, end: enteredTo };
    const selectedDays = [from, { from, to: enteredTo }];
    const disabledDays = { before: new Date() };
    return (
      <div className="calendar-container">
        <DayPicker
          className={"client"}
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
          disabledDays={disabledDays}
        />
      </div>
    );
  }
}

export default Calendar;
