import React, { Component } from 'react';
import { Navbar , NavItem, Nav, Glyphicon} from 'react-bootstrap';
import { auth, realdb} from './firebase/firebase';
import { Modal } from 'react-router-modal';
import { Container, Button, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

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
      userid:'',
      modal: false


    }

  }


  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }


  componentDidMount(){
    var user = auth.currentUser;
    var userinfo=[];
    if (user != null) {
    userinfo.push(user.email);
    this.setState({userid:user.uid});
    const tempref = realdb.ref().child(`tempcartcheckout/${user.uid}`);
    tempref.once("value", snap => {
        // Handle state
        let cartlist = []
        snap.forEach(child => {

            cartlist.push(
              {
              name:child.val().n,
              Stars:child.val().s,
              TicketStatus:child.val().c,
              Price:child.val().p


            }

            );


        });
        this.setState({cartBooking: cartlist})
        console.log( cartlist);
        console.log(this.state.cartBooking);

    });
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
   const cartviewtable = this.state.cartBooking.map((item,i) => (

  <tr key={i}>
      <td key={i+1}> {i+1}  </td>
       <td key={i+2}>{item.name}</td>
      <td key={i+3}>{item.Stars}</td>
      <td key={i+4}>{item.TicketStatus}</td>
      <td key={i+5}>{item.Price}</td>


  </tr>));

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
     <NavItem eventKey={3}  onClick={this.toggle}>
     <Glyphicon  className ="shake" glyph="glyphicon glyphicon-shopping-cart" />

     <p>  {this.state.cartBooking.length} Items in Cart</p>

      </NavItem>

    </Nav>
  </Navbar.Collapse>
</Navbar>
<div>
{this.state.modal
  ?(
    <Container>
          <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
          <ModalHeader toggle={() => this.toggle(4)}>Your Cart</ModalHeader>
          <ModalBody>
          <table>
          <thead>
          <tr >
          <td>#</td>

               <td>Brand</td>
              <td>Start</td>
              <td >Conact</td>
              <td >Price</td>


          </tr>
          </thead>
          <tbody>
           {cartviewtable}
          </tbody>
          </table>
          </ModalBody>

          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggle(4)}>Close</Button>
            <Button color="primary">Booking Now</Button>
          </ModalFooter>
        </Modal>
    </Container>)
    :null
  }
  </div>

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
