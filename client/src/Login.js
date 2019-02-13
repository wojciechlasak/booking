import React from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";

import PropTypes from "prop-types";

import "./css/Login.css";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nick: "",
      password: ""
    };
    this.protoTypes = {
      callback: PropTypes.func
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      nick: this.state.nick,
      password: this.state.password
    };

    fetch(`/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(response => {
        if (response === "ok") {
          this.props.callback(true);
        } else {
          this.props.callback(false);
        }
      })
      .catch(err => {
        console.log("caught it!", err);
      });
  };

  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.onSubmit}>
          <FormGroup bsSize="large">
            <Input
              autoFocus
              type="text"
              name="nick"
              placeholder="Nick"
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup bsSize="large">
            <Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.onChange}
            />
          </FormGroup>
          <Button type="submit">Login</Button>
        </Form>
      </div>
    );
  }
}
export default Login;
