import React from "react";

import AuthHelperMethods from './components/AuthHelperMethods';

class Clients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  Auth = new AuthHelperMethods();

  componentDidMount() {
    /*use helper function for autorization from AHM*/
    this.Auth.fetch("/clients", {
      method: "GET"
    })
      .then(data => {
        this.setState({ users: data });
      })
      .catch(err => {
        console.log("caught it!", err);
      });

  }

  updateKlient = () => {
    var data = {
      name: "Wojtek",
      surname: "Lasak",
      mail: "wojciechlasak@gmail.com",
      phone: "877622918"
    };

    this.Auth.fetch("/clients/1", {
      method: "PATCH",
      body: JSON.stringify(data)
    })
      .then(function() {
        console.log("success");
      })
      .catch(function(err) {
        console.log(err);
      });
    this.componentDidMount();
  }

  render() {
    return (
      <div>
        <button onClick={this.updateKlient}>Update first data</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Imię</th>
              <th>Nazwisko</th>
              <th>Mail</th>
              <th>Telefon</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(function(user) {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Clients;
