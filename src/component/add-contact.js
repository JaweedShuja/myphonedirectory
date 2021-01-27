import React, { Component } from "react";

export default class AddContact extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      Name: "",
      Number: "",
      Email: ""
    };
  }

  onChangeName(e) {
    this.setState({
      Name: e.target.value
    });
  }
  onChangeNumber(e) {
    this.setState({
      Number: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      Email: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();

    if (this.state.name === "" || this.state.Number === "" || this.state.Email === "") {
      alert("Fields Cannot Be Empty!");
    } else {
      const data = JSON.stringify({
        name: this.state.Name,
        number: this.state.Number,
        email: this.state.Email
      });
      fetch("http://myphonedirectoryapi.herokuapp.com/contacts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: data
      })
        .then(res => res.json())
        .then(
          result => {
            alert(result.message);
            this.setState({
              Name: "",
              Number: "",
              Email: ""
            });
          },
          error => {
            console.log(error);
          }
        );
    }




  }
  render() {
    return (
      <div className='container'>
        <h3>Add New Contact</h3>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Name</label>
            <input
              type='text'
              require="true"
              className='form-control'
              value={this.state.Name}
              onChange={this.onChangeName}
            />

            <label>Number</label>
            <input
              type='text'
              require="true"
              className='form-control'
              value={this.state.Number}
              onChange={this.onChangeNumber}
            />

            <label>Email</label>
            <input
              type='text'
              require="true"
              className='form-control'
              value={this.state.Email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className='form-group'>
            <input type='submit' value='Add' className='btn btn-primary' />
          </div>
        </form>
      </div>
    );
  }
}
