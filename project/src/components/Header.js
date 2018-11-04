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
    this.state={
      useremail:[],

    }
  }

  componentDidMount(){
    var user = auth.currentUser;
    var userinfo=[];
    if (user != null) {
    userinfo.push(user.email);

  }
  console.log(userinfo);

  this.setState({useremail:userinfo});
  console.log(this.state.useremail);

  }
  
  signout(){

  auth.signOut().then(function() {
    console.log('Signed Out');
  }, function(error) {
    console.error('Sign Out Error', error);
  });
  }
  render() {
   const cunrrentuser = this.state.useremail.map((data,i)=> <p key={i}>Welcome !! {data}</p>);

      return (

        <div>
<Navbar inverse collapseOnSelect>
  <Navbar.Header>
{cunrrentuser}
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav pullRight>
    <NavItem eventKey={1}  href='/contact'>
    <Glyphicon  glyph="glyphicon glyphicon-phone-alt" />
     </NavItem>
    <NavItem eventKey={2} href='/'onClick={this.signout}>
    <Glyphicon glyph="glyphicon glyphicon-log-out" />
     </NavItem>
     <NavItem eventKey={3} href='/'onClick={this.signout}>
     <p> {this.state.usermail} </p>

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
