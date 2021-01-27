import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./component/navbar.component";
import Contacts from "./component/contacts";
import AddContact from "./component/add-contact";
import UpdateContact from './component/update-contact'

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <br />
          <Route path='/' exact component={Contacts} />
          <Route path='/addcontacts' component={AddContact} />
          <Route path='/updatecontact/:id' component={UpdateContact} />
        </div>
      </Router>
    );
  }
}
