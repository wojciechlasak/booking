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

  render() {
    return (
      <div className="container d-flex justify-content-center align-items-center">
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
                <tr key={user.client_id}>
                  <td class="client-td">{user.client_id}</td>
                  <td class="client-td">{user.name}</td>
                  <td class="client-td">{user.surname}</td>
                  <td class="client-td">{user.email}</td>
                  <td class="client-td">{user.phone}</td>
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
