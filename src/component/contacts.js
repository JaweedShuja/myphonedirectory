import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Link } from 'react-router-dom';

export default class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      showModal: false,
      showModalEdit: false,
      selectedContactId: "",

      Name: "",
      Number: "",
      Email: ""
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleDeleteContact = this.handleDeleteContact.bind(this);
  }
  handleOpenModal() {
    this.setState({
      showModal: true
    });
  }
  handleCloseModal() {
    this.setState({
      showModal: false
    });
  }
  handleDeleteContact() {
    fetch(
      "http://myphonedirectoryapi.herokuapp.com/contacts/" +
      this.state.selectedContactId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(
        result => {
          if (result.success) {
            alert(result.message);
          }
        },
        error => {
          console.log(error);
        }
      );
    var filtered = this.state.contacts.filter(el => {
      return el._id !== this.state.selectedContactId;
    });
    this.setState({
      showModal: false,
      contacts: filtered
    });
  }

  componentDidMount() {
    fetch("http://myphonedirectoryapi.herokuapp.com/contacts/", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            contacts: result.data
          });
        },
        error => {
          console.log(error);
        }
      );
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Number</th>
                  <th>Email</th>
                </tr>
              </thead>

              <tbody>
                {this.state.contacts.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.number}</td>
                    <td>{data.email}</td>
                    <td>
                      <Link className="edit-link" to={"/updatecontact/" + data._id}>
                        <button
                          className='btn btn-success text-decoration-none'
                        >

                          Edit
                      </button>
                      </Link>


                    </td>

                    <td>
                      <button
                        className='btn btn-danger'
                        onClick={() =>
                          this.setState({
                            selectedContactId: data._id,
                            showModal: true
                          })
                        }
                      >
                        Delete
                      </button>

                      <Modal
                        style={{ background: 'whitesmoke' }}
                        animation={false}
                        show={this.state.showModal}
                        onHide={this.handleCloseModal}

                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Delete Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          Are you sure you want to delete this contact?
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant='secondary'
                            onClick={this.handleCloseModal}
                          >
                            No
                          </Button>
                          <Button
                            variant='primary'
                            onClick={this.handleDeleteContact}
                          >
                            Yes
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
