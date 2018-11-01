import React, { Component } from 'react';
import './css/contact.css';
import { realdb } from './firebase/firebase';
import { Container, Row, Col, Input, Buttonm ,Fa , Button} from 'mdbreact';

const Contactpage = () =>
<div>
  <div className="flex-contact">
  <Container>
         <Row>
           <Col md="6">
             <form>
               <p className="h5 text-center mb-4">Conact Us</p>
               <div className="grey-text">
                 <Input label="Your name" icon="user" group type="text" validate error="wrong" success="right"/>
                 <Input label="Your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
                 <Input label="Subject" icon="tag" group type="text" validate error="wrong" success="right"/>
                 <Input type="textarea" rows="2" label="Your message" icon="pencil"/>
               </div>
               <div className="text-center">
                 <Button outline color="secondary">Send <Fa icon="paper-plane-o" className="ml-1"/></Button>
               </div>
             </form>
           </Col>
         </Row>
   </Container>
   </div>
   </div>





export default Contactpage;
