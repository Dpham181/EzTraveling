import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar , NavItem, Nav} from 'react-bootstrap';

import * as routes from '../constant/routes';
import './css/header.css';
const Header = () =>
<header >
  <div class="flex-header">
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#home">EZ-Traveling</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>


      <NavItem eventKey={2} >
 <Link style={{ textDecoration: 'none' }}to={routes.SIGN_UP}><b>Register</b> </Link>
      </NavItem>

      <NavItem eventKey={3} >
 <Link style={{ textDecoration: 'none' }}to={routes.SIGN_IN}><b>Log In</b></Link>
      </NavItem>

      <NavItem eventKey={4}>
 <Link style={{ textDecoration: 'none' }}to={routes.CONTACT}><b>Contact</b></Link>
      </NavItem>

    </Nav>
  </Navbar>
  </div>
</header>


export default Header;
