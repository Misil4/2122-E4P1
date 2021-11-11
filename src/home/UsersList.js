import React, { Component } from 'react'
import { render } from 'react-dom';



class App extends Component {
    constructor() {
        super();
        this.state = {} 
            usersData: [],
            selectedUser: null
        };
    }

const selectedUser = this.state.usersData.find((user) => user.id === id)
    this.setState(() => ({ selectedUser }));

render() { 
    const userList = this.state.usersData.map(
        (user) => {
       return (
        <>
            <div className="userList">
                <h1>Listado de personas</h1>
                <ul>{userList}</ul>
            </div>
            <Details user={this.state.selectedUser} />
        <>
        );
     }
  }
  

  componentDidMount() {
      fetch('../src/compoUserList/details')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ usersData: data });
      })
      .catch((err) => this.setState({ error: err.message }));
  }
}
