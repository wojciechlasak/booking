import React from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";

import "./css/CheckCode.css";


class CheckCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  getInitialState() {
    return {
      code:null,
      isOpen: false,
      isCorrectCode:false,
      reservation:null,
      error: null,
    };
  }

  generateInfo(){
    var arr = [];
    arr.push(<div key="0">Kod Twojej rezerwacji to: <b>{this.state.reservation[0].reservation_id}</b><br/>
      W terminie od {this.state.reservation[0].dateFrom.slice(0,10)} do {this.state.reservation[0].dateTo.slice(0,10)}<br/>
      Całkowity koszt pobytu {this.state.reservation[0].price} zł<br/></div>)
    arr.push("Numery pokoju/pokoi: ")
    for(let singleReservation of this.state.reservation){
        arr.push(<span>{singleReservation.room_nr} </span>)
      }
    
    return arr;
  }

  handleSubmit = () =>{
    if(this.state.code===null){
      this.setState({
        error: "Wprowadź kod"
      })
    } else if(this.state.code.length!==6){
      this.setState({
        error: "Kod powinien mieć 6 znaków"
      })
    }else {
    fetch(`/reservations/${this.state.code}`,{method:"GET"})
    .then(function(response) {
      if (response.status >= 400) {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
      return response.json();
    })
    .then(data => {
      if(data.length){
        this.setState({
          isCorrectCode:true,
          reservation:data,
        })
      }
      else{
        this.setState({
          error: "Nieprawidłowy kod, wpisz jeszcze raz"
        })
      }
    })
    .catch(err => {
      console.log("caught it!", err);
    });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };


  openLightbox = () =>{
    this.setState({
      isOpen: true,
    })
  }

  closeLightbox = () => {
    this.setState(this.getInitialState())
  }

  render() {
    return (
      <>
      <div
          className="code-nav-single d-flex align-items-center"
          onClick={this.openLightbox}
        >
          <span>Sprawdź rezerwację</span>
          <div className="code-nav-icon" />
      </div>
      <div className={`lightbox-container ${this.state.isOpen?"opened":" "}`}>
        <div className="lightbox-bg" onClick={this.closeLightbox}/>
        <div className="lightbox-in">
        {!this.state.isCorrectCode?<Form method="post" className="Login" onSubmit={this.handleSubmit}>
            <FormGroup>
              <Input
                autoFocus
                type="text"
                placeholder="Wpisz swój kod"
                id="code"
                value={this.state.code || ""}
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button onClick={this.handleSubmit}>Sprawdź</Button>
            {this.state.error?<div className="form-error-code">{this.state.error}</div>:null}
          </Form>:<div>{this.generateInfo()}</div>}
          <svg className="lightbox-close" onClick={this.closeLightbox} viewBox="0 0 100 100">
            <path d="M10 10L90 90" />
            <path d="M90 10L10 90" />
          </svg>
        </div>
      </div>
      </>
    );
  }
}
export default CheckCode;
