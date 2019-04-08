import React from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";

import "./css/Login.css";
import AuthHelperMethods from "./components/AuthHelperMethods";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nick: "",
      password: ""
    };
  }

  Auth = new AuthHelperMethods();

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /*after submit post into login*/
  handleFormSubmit = e => {
    e.preventDefault();
    this.Auth.login(this.state.nick, this.state.password)
      .then(res => {
        this.props.history.replace("/admin");
      })
      .catch(err => {
        alert("Niepoprawne dane, spróbuj jeszcze raz");
      });
  };

  componentWillMount() {
    /* redirect if someone is logged in */
    if (this.Auth.loggedIn()) this.props.history.replace("/admin");
  }

  render() {
    return (
      <div id="login-container">
        <div className="Login">
          <Form onSubmit={this.handleFormSubmit}>
            <FormGroup>
              <Input
                autoFocus
                type="text"
                name="nick"
                placeholder="Nazwa użytkownika"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                name="password"
                type="password"
                placeholder="Hasło"
                onChange={this.onChange}
              />
            </FormGroup>
            <Button type="submit">Zaloguj się</Button>
          </Form>
        </div>
      </div>
    );
  }
}
export default Login;
