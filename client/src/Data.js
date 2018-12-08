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
    fetch("/users", {
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
    console.log("Wazzzup")

    fetch("/users", {
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
      .then(function(data) {
        this.setState(prevState => ({
          users: [...prevState.arrayvar, data]
        }));
      })
      .catch(err => {
        console.log("caught it!", err);
      });
      this.componentDidMount();
  }

  render() {
    return (
      <div>
        <button onClick={() => this.getNewKlient()}>Add data</button>
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
            {this.state.users.map(function(user){
              return (
                <tr>
                    <td>{user.ID}</td>
                    <td>{user.imie}</td>
                    <td>{user.Nazwisko}</td>
                    <td>{user.email}</td>
                    <td>{user.telefon}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Data;
