import React from "react";

class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    let self = this;
    fetch("/clients", {
      method: "GET"
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        self.setState({ users: data });
        console.log(self.state.users);
      })
      .catch(err => {
        console.log("caught it!", err);
      });

  }

  getNewKlient() {
    var data = {
      name: "Jan",
      surname: "Nowak",
      mail: "jacek@o2.pl",
      phone: "877622918"
    };

    fetch("/clients", {
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
      .then(function() {
       console.log("success");
      })
      .catch(err => {
        console.log("caught it!", err);
      });
    this.componentDidMount();
  }

  updateKlient() {
    var data = {
      name: "Wojtek",
      surname: "Lasak",
      mail: "wojciechlasak@gmail.com",
      phone: "877622918"
    };

    fetch("/clients/1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
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
        <button onClick={() => this.getNewKlient()}>Add data</button>
        <div></div>
        <button onClick={() => this.updateKlient()}>Update first data</button>
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

export default Data;
