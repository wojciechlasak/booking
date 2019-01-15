import React from "react";

import Calendar from './Calendar.js'
import ClientForm from './ClientForm.js'

class Client extends React.Component {
    constructor(){
        super();
        this.state= {
          from : "",
          to: "",
          hide:true
        }
      }
      getData(param1,param2) {
        this.setState({
          from : param1,
          to: param2,
          hide: false
        })
      }

    render() {
        return (
            <div>
                <Calendar callback={this.getData.bind(this)}/>
                {!this.state.hide?<ClientForm dateFrom={this.state.from} dateTo={this.state.to}/>:<h1>Wybierz datę</h1>}
            </div>
        );
    }
}
export default Client;
