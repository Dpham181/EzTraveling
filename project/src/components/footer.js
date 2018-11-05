import React from 'react';

import './css/footer.css';
import { Col, Container, Row, Footer } from "mdbreact";

const Footerpage = () =>
<Footer color="black" className="font-small pt-4 mt-4">
  <Container fluid className="text-center text-md-left">
    <Row>
      <Col md="6">
      <h5 className="title">About Us</h5>
      <p>Project Name:   EzTravling</p>
      <p>  Team Members:  </p>
      <p> Enrique Mendoza( emendoza.2@csu.fullerton.edu ) </p>
      <p>  Danh Pham ( danhpham312@gmail.com) </p>

      </Col>
      <Col md="6">
      <h5 className="title">Infor</h5>
      <ul>
        <li className="list-unstyled">
          <a href="https://www.southwest.com/">     https://www.southwest.com</a>
        </li>
        <li className="list-unstyled">
          <a href="https://www.expedia.com/Flights">https://www.expedia.com/Flights</a>
        </li>
        <li className="list-unstyled">
          <a href="https://www.hotwire.com/flights/">https://www.hotwire.com/flights</a>
        </li>

      </ul>
      </Col>
    </Row>
  </Container>
  <div className="footer-copyright text-center py-3">
    <Container fluid>

      <p>   &copy; {new Date().getFullYear()} Copyright:{" "} Eztravling Site </p>
    </Container>
  </div>
</Footer>

export default Footerpage;
