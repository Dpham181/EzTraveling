import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar , NavItem, Nav} from 'react-bootstrap';

import './css/header.css';
const Header = () =>
<header >
  <div className="flex-header">
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">EZ-Traveling</Link>
        </Navbar.Brand>
    </Navbar.Header>
    <Nav pullRight>


      <NavItem eventKey={1} >
      <Link to="/Register">Register</Link>

      </NavItem>

      <NavItem eventKey={2}  >
      <Link to="/Logining">Log In</Link>
      </NavItem>

      <NavItem eventKey={3}>
      <Link to="/contact">Contact</Link>

      </NavItem>

    </Nav>
  </Navbar>
  </div>
</header>


export default Header;
