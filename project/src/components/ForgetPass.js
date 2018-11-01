import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import{FormGroup, Col, FormControl, Form,ControlLabel, Button}  from 'react-bootstrap';
import './css/forgotpass.css';

import { auth } from './firebase/firebase';

const ForgetPasspage = () =>
<div>
<div className="forgot-bg">
<div className="forgot-flex">
<ForgetPassForm />
</div>
</div>
</div>

class ForgetPassForm extends Component {
  constructor(props) {
    super(props);

      this.state = {
        email:'',
        redirect:false,
        error:null
        }



     this.onChange= this.onChange.bind(this);
     this.sendpass= this.sendpass.bind(this);
  }



sendpass(event){
  var email = this.state.email;
  auth.sendPasswordResetEmail(email).then((result) => {

    this.setState({redirect:true });
    console.log('pass sent by email');

  })
  .catch(error => {
    this.setState({error:error});
    alert(this.state.error);

  });

event.preventDefault();
}
  onChange(e){
    this.setState({[e.target.name]:e.target.value});
    console.log(this.state);

  }

  render() {

    if(this.state.redirect){
      return (<Redirect to={'/logining'}/>)
    }

    return (

      <div>
         <Form horizontal>
     <FormGroup controlId="formHorizontalEmail">
       <Col componentClass={ControlLabel} sm={2}>
         Email
       </Col>
       <Col sm={10}>
         <FormControl type="text" name="email" required placeholder="Username" onChange={this.onChange} />
       </Col>
     </FormGroup>

     <FormGroup>
       <Col smOffset={2} sm={10}>
         <Button type="submit" className="button success" value="Login" onClick={this.sendpass}>Sent By Mail</Button>
       </Col>
     </FormGroup>
   </Form>
         </div>
    );
  }
}

export default withRouter(ForgetPasspage);
