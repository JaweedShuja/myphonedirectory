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
    componentDidMount() {
        const { match: { params } } = this.props;

        fetch(`http://myphonedirectoryapi.herokuapp.com/contacts/${params.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
        })
            .then(res => res.json())
            .then(
                result => {
                    this.setState({
                        Name: result.data.name,
                        Number: result.data.number,
                        Email: result.data.email
                    });
                },
                error => {
                    console.log(error);
                }
            );
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

        const { match: { params } } = this.props;
        const data = JSON.stringify({
            name: this.state.Name,
            number: this.state.Number,
            email: this.state.Email
        });
        fetch(`http://myphonedirectoryapi.herokuapp.com/contacts/update/${params.id}`, {
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
                    this.props.history.push('/')
                },
                error => {
                    console.log(error);
                }
            );

    }
    render() {
        return (
            <div className='container'>
                <h3>Update Contact</h3>
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
                        <input type='submit' value='Update' className='btn btn-primary' />
                    </div>
                </form>
            </div>
        );
    }
}
