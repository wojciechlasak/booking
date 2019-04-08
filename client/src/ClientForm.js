import React from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";

import "./css/Login.css";
import "./css/ClientForm.css";

class ClientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      name: null,
      surname: null,
      email: null,
      phone: null,
      comments: null,
      booked: false,
      dateFrom: this.props.dateFrom,
      dateTo: this.props.dateTo,
      roomsChosen: this.props.roomsChosen,
      highSeason: this.props.highSeason,
      bookingCost: null,
      formError: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.dateFrom !== prevProps.dateFrom ||
      this.props.dateTo !== prevProps.dateTo ||
      this.props.roomsChosen !== prevProps.roomsChosen
    ) {
      this.setState(this.getInitialState());
    }
  }

  componentDidMount() {
    this.countPrice();
  }

  countPrice = () => {
    let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let diffDays = Math.round(
      Math.abs(
        (new Date(this.state.dateFrom).getTime() -
          new Date(this.state.dateTo).getTime()) /
          oneDay
      )
    );

    let getPrice = room_nr => {
      return fetch(`/rooms/${room_nr}`, {
        method: "GET"
      })
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then(response => {
          const price = this.state.highSeason
            ? response[0].price
            : response[0].priceHigh;
          return price;
        })
        .catch(err => {
          console.log("caught it!", err);
        });
    };

    for (let room of this.state.roomsChosen) {
      getPrice(room).then(price => {
        this.setState(prevState => ({
          bookingCost: prevState.bookingCost+(price*diffDays),
        }));
      });
    }

  };

  reservationCode() {
    function generateRandomNumber() {
      let num = Math.floor(Math.random() * (90 - 48 + 1)) + 48;
      return num < 65 && num > 57 ? generateRandomNumber() : num;
    }
    function generateCode() {
      let code = "";
      for (let i = 0; i < 6; i++) {
        code += String.fromCharCode(generateRandomNumber());
      }
      return code;
    }
    async function checkCode(code) {
      try {
        const response = await fetch(`/reservations/${code}`, {
          method: "GET"
        });
        const check = (await !response.json().length) ? false : true;
        return check;
      } catch (err) {
        console.log("caught it!", err);
      }
    }
    let code;
    do {
      code = generateCode();
    } while (!checkCode(code).then(check => check));

    return code;
  }

  checkFormCorretion(){
    function regexTestPhone(phone) {
      return /^\d{9}$/
          .test(phone);
    }
    function regexTestString(str) {
      return /^[a-zA-ZzżźćńółęąśŻŹĆĄŚĘŁÓŃ ]+$/.test(str);
    }
    function regexTestEmail(email) {
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          .test(String(email).toLowerCase());
    }
;
    let whichFormIncorrect = null;
    if(!regexTestString(this.state.name) || this.state.name===null) {whichFormIncorrect="imię"}
    else if(!regexTestString(this.state.surname) || this.state.surname===null){ whichFormIncorrect="nazwisko"}
    else if(!regexTestEmail(this.state.email)) {whichFormIncorrect="email"}
    else if(!regexTestPhone(this.state.phone)){ whichFormIncorrect="telefon"}

    return whichFormIncorrect;
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    }
    );
  };

  handleSubmit = () => { 
    let form = this.checkFormCorretion()
    if(form!==null){
      this.setState({
        formError: form
      })
    }
    else if (!this.state.booked) {
      this.setState({
        booked: true
      });
      var client = {
        name: this.state.name,
        surname: this.state.surname,
        mail: this.state.email,
        phone: this.state.phone
      };

      var reservation = {
        id: this.reservationCode(),
        dateFrom: this.state.dateFrom,
        dateTo: this.state.dateTo,
        price: this.state.bookingCost,
        comments: this.state.comments
      };

      var clientPostId;

      fetch("/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client)
      })
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then(response => {
          clientPostId = response.insertId;
        })
        .then(() => {
          Object.assign(reservation, { clientId: clientPostId });
          for (let i of this.state.roomsChosen) {
            Object.assign(reservation, { roomNr: i });
            fetch("/reservations", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(reservation)
            }).then(function(response) {
              if (response.status >= 400) {
                throw new Error("Bad response from server");
              }
              return response.status;
            });
          }
        })
        .then(() => {
          fetch("/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([client, reservation])
          }).then(response => {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return this.props.callback();
          });
        })
        .catch(err => {
          console.log("caught it!", err);
        });
    }
  };

  render() {
    return (
      <div className=" row justify-content-sm-center">
        <div className="reservation-summary-conatiner col-sm-8 col-lg-4 mr-lg-5">
          {`Chcesz dokonać rezerwacji w terminie od ${this.state.dateFrom} do ${this.state.dateTo}`}
          <br /><br />
          {`Zarezerwowałeś pokój numer: ${this.state.roomsChosen.join(", ")}`}
          <br /><br />
          {`Całkowity koszt pobytu wynosi ${this.state.bookingCost} zł`}
        </div>
        <div className="col-sm-8 col-lg-4 mr-lg-5 mb-sm-5">
          <Form className="Login" onSubmit={this.handleSubmit}>
            <FormGroup>
              <Input
                autoFocus
                type="text"
                placeholder="Imię"
                id="name"
                value={this.state.name || ""}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                placeholder="Nazwisko"
                id="surname"
                value={this.state.surname || ""}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="email"
                placeholder="Email"
                id="email"
                value={this.state.email || ""}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                placeholder="Telefon"
                id="phone"
                value={this.state.phone || ""}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="textarea"
                placeholder="Komentarz"
                id="comments"
                value={this.state.comments || ""}
                onChange={this.handleChange}
              />
            </FormGroup>

            <Button disabled={this.state.booked} onClick={this.handleSubmit}>
              Wyślij
            </Button>
            {this.state.formError?<div className="form-error">{`Wypełnij lub popraw ${this.state.formError}`}</div>:null}
          </Form>
        </div>
      </div>
    );
  }
}
export default ClientForm;
