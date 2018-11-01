
import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import{FormGroup, Col, FormControl, Form,ControlLabel, Checkbox, Button}  from 'react-bootstrap';
import { auth } from './firebase/firebase';
import './css/signin.css';

const SignInPage = () =>
  <div>
    <div className="flex-signin">
    <SignInForm />
    </div>
  </div>



class SignInForm extends Component {
  constructor(props) {
    super(props);

      this.state = {
        email:'',
        password:'',
        redirect:false,
        error:null
        }



     this.login= this.login.bind(this);
     this.onChange= this.onChange.bind(this);
  }



login(event){
  var email = this.state.email;
  var password = this.state.password;
auth.signInWithEmailAndPassword(email, password).then((result) => {

    this.setState({redirect:true });
    console.log('loggning');

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
      return (<Redirect to={'/User'}/>)
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

     <FormGroup controlId="formHorizontalPassword">
       <Col componentClass={ControlLabel} sm={2}>
         PassW
       </Col>
       <Col sm={10}>
         <FormControl type="password" name="password" required placeholder="Password" onChange={this.onChange} />
       </Col>
     </FormGroup>

     <FormGroup>
       <Col smOffset={2} sm={10}>
         <Checkbox>Remember me</Checkbox>
       </Col>
       <Col smOffset={2} sm={10}>
         <span className="psw">Forgot <a href="/PassForget">password?</a></span>
       </Col>

     </FormGroup>

     <FormGroup>
       <Col smOffset={2} sm={10}>
         <Button type="submit" className="button success" value="Login" onClick={this.login}>Sign in</Button>
       </Col>
     </FormGroup>
   </Form>
         </div>
    );
  }
}

export default withRouter(SignInPage);
