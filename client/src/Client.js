import React from "react";

import Calendar from './Calendar.js'

class Client extends React.Component {

    reservationCode() {
        function generateRandom() {
            let num = Math.floor(Math.random() * (90 - 48 + 1)) + 48;
            return (num < 65 && num > 57) ? generateRandom() : num;
        }
        let code = "";
        for (let i = 0; i < 12; i++) {
            code += String.fromCharCode(generateRandom());
        }
        var check=false;
        fetch(`/reservations/${code}`, { method: "GET" })
        .then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then(function (response) {
            !response.length ? check=false:check=true;
            console.log(code);
            return check ? this.reservationCode() : code;
        })
        .catch(err => {
            console.log("caught it!", err);
        });
    }

    regexTestString(str) {
        return /^[a-zA-ZzżźćńółęąśŻŹĆĄŚĘŁÓŃ ]+$/.test(str);
    }

    render() {
      return (
          <div>
              <Calendar/>
              <button onClick={() => this.reservationCode()}>Generate reservation Code</button>
          </div>
      );
    }
  }
  export default Client;
  