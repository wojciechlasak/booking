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
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Stars</th>
              <th>Content</th>
              <th>Reservation ID</th>
            </tr>
          </thead>
          <tbody>
            {this.state.opinions.map(function(opinion) {
              return (
                <tr key={opinion.id}>
                  <td>{opinion.opinion_id}</td>
                  <td>{opinion.stars}</td>
                  <td>{opinion.content}</td>
                  <td>{opinion.reservation_id}</td>
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
