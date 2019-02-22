import React from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";

import "./css/Login.css";

class ClientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      name:  null,
      surname: null,
      email: null,
      phone: null,
      dateFrom: this.props.dateFrom,
      dateTo: this.props.dateTo,
      peopleAmount: Number(this.props.peopleAmount),
      roomsChose: this.props.roomsChose
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.dateFrom !== prevProps.dateFrom ||
      this.props.dateTo !== prevProps.dateTo ||
      this.props.peopleAmount !== prevProps.peopleAmount ||
      this.props.roomsChose !== prevProps.roomsChose
    ) {
      this.setState(this.getInitialState());
    }
  }

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
        try{
            const response = await fetch(`/reservations/reservation/${code}`, { method: "GET" });
            const check = await !response.json().length ? false : true;
            return check;
        }
        catch(err) {
            console.log("caught it!", err);
        }
       
    }
    let code;
    do {
      code = generateCode();
    } while (!checkCode(code).then(check => check));

    return code;
  }

  regexTestString(str) {
    return /^[a-zA-ZzżźćńółęąśŻŹĆĄŚĘŁÓŃ ]+$/.test(str);
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = () => {
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
      peopleAmount: this.state.peopleAmount
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
      .then(function(response) {
        clientPostId = response.insertId;
      })
      .then(() => {
        Object.assign(reservation, { clientId: clientPostId });
        for (let i of this.state.roomsChose) {
          Object.assign(reservation, { roomNr: i });
          fetch("/reservations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reservation)
          })
            .then(function(response) {
              if (response.status >= 400) {
                throw new Error("Bad response from server");
              }
              return response.json();
            })
        }
      })
      .catch(err => {
        console.log("caught it!", err);
      });
  }

  render() {
    return (
      <div>
        <Form method="post" className="Login" onSubmit={this.handleSubmit}>
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

          <Button onClick={this.handleSubmit}>Wyślij</Button>
        </Form>
      </div>
    );
  }
}
export default ClientForm;
