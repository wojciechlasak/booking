import React from "react";

import Calendar from './Calendar.js'
import ClientForm from './ClientForm.js'
import Select from './Select.js'
import RoomMap from './RoomMap.js'

import "./css/Client.css";

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
            <div id="client">
                <div id="top">
                    <Calendar callback={this.getData.bind(this)}/>
                    <Select dateFrom={this.state.from} dateTo={this.state.to}/>
                </div>
                <div id="map">
                    <RoomMap/>
                </div>
                {!this.state.hide?<ClientForm dateFrom={this.state.from} dateTo={this.state.to}/>:""}
            </div>
        );
    }
}
export default Client;
