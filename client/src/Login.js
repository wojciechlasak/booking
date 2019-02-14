import React from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";

import "./css/Login.css";
import AuthHelperMethods from './components/AuthHelperMethods';

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

  handleFormSubmit = (e) => {
    e.preventDefault();
    /* Here is where all the login logic will go. Upon clicking the login button, we would like to utilize a login method that will send our entered credentials over to the server for verification. Once verified, it should store your token and send you to the protected route. */
    this.Auth.login(this.state.nick, this.state.password)
        .then(res => {
            if (res === false) {
                return alert("Sorry those credentials don't exist!");
            }
            this.props.history.replace('/admin');
        })
        .catch(err => {
            alert(err);
        })
}

componentWillMount() {
    /* Here is a great place to redirect someone who is already logged in to the protected route */
    if (this.Auth.loggedIn())
        this.props.history.replace('/admin');
}

  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.handleFormSubmit}>
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
