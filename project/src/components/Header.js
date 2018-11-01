import React, { Component } from 'react';
import { Navbar , NavItem, Nav, Glyphicon} from 'react-bootstrap';
import { auth } from './firebase/firebase';

import './css/header.css';


class Header extends Component{
  render() {
      return (
<div>
<header>
    {this.props.userlogging
      ? <Headeruser />
      : <Headernonuser/>
    }
</header>

</div>
);
}
}
class Headeruser extends Component{
  constructor(props) {
    super(props);
    this.state ={
      useremail:''
    };
  }
  componentDidMount() {
   auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          useremail: user.email
        })
        console.log(user.email)

      } else {
        this.setState({
          username: 'unknow'

        })


      }
    })
  }
  signout(){
  auth.signOut().then(function() {
    console.log('Signed Out');
  }, function(error) {
    console.error('Sign Out Error', error);
  });
  }
  render() {

      return (

        <div>
<Navbar inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
      <p >Welcome {this.state.useremail}</p>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav pullRight>
    <NavItem eventKey={1} href='/'onClick={this.signout}>
    Log Out
    </NavItem>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    </div>
);
}
}
class Headernonuser extends Component{

  render() {
      return (
        <div>
<Navbar inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="/"> <Glyphicon glyph="glyphicon glyphicon-home" /></a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav pullRight>
    <NavItem eventKey={1} href="/Register">
    Register
    </NavItem>
    <NavItem eventKey={2} href="/logining">
    Login
    </NavItem>
    <NavItem eventKey={3} href="/contact">
    Contact
    </NavItem>

    </Nav>
  </Navbar.Collapse>
</Navbar>
    </div>
);
}
}

export default Header;
