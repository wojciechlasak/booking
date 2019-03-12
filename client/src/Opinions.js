import React from "react";

import AuthHelperMethods from './components/AuthHelperMethods';

class Opinions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opinions: []
    };
  }

  Auth = new AuthHelperMethods();

  componentDidMount() {
    this.Auth.fetch("/opinions", {
      method: "GET"
    })
      .then(data => {
        this.setState({ opinions: data });
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
              <th>Gwiazdki</th>
              <th>Treść</th>
              <th>Kod rezerwacji</th>
            </tr>
          </thead>
          <tbody>
            {this.state.opinions.map(function(opinion) {
              return (
                <tr key={opinion.id}>
                  <td class="opinion-td">{opinion.opinion_id}</td>
                  <td class="opinion-td">{opinion.stars}</td>
                  <td class="opinion-td">{opinion.content}</td>
                  <td class="opinion-td">{opinion.reservation_id}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Opinions;
