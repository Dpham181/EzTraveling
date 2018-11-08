import React, { Component } from 'react';
import { Navbar , NavItem, Nav, Glyphicon} from 'react-bootstrap';
import { auth, realdb} from './firebase/firebase';

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
      cartBooking: [],
      userid:''
    }
    this.getbooking= this.getbooking.bind(this);
  }



getbooking(){
  var uid = this.state.userid;
  console.log(uid);
  const tempref = realdb.ref().child(`tempcartcheckout`);
  tempref.once("value", snap => {
      // Handle state
      let cartlist = []
      snap.forEach(child => {
        if (uid === child.val().uid){
          cartlist.push(
            {
            name:child.val().c,
            Stars:child.val().n,
            TicketStatus:child.val().p,
            Price:child.val().s


          }

          );
}

      });
      this.setState({cartBooking: cartlist})
      console.log( cartlist);
      console.log(this.state.cartBooking);

  });
}
  componentDidMount(){
    var user = auth.currentUser;
    var userinfo=[];
    let checkoutlist = [];
    if (user != null) {
    userinfo.push(user.email);
    this.setState({userid:user.uid});

  }
  this.setState({useremail:userinfo});


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
     <NavItem eventKey={3} onClick={this.getbooking}>
     <Glyphicon glyph="glyphicon glyphicon-shopping-cart" />
     <p> No of items </p>
      </NavItem>
     <NavItem eventKey={3} href='/'>
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
    <Glyphicon glyph="glyphicon glyphicon-pencil" /> Register
    </NavItem>
    <NavItem eventKey={2} href="/logining">
    <Glyphicon glyph="glyphicon glyphicon-user" /> Login
    </NavItem>
    <NavItem eventKey={3} href="/contact">
    <Glyphicon glyph="glyphicon glyphicon-envelope" /> Contact
    </NavItem>

    </Nav>
  </Navbar.Collapse>
</Navbar>
    </div>
);
}
}

export default Header;
