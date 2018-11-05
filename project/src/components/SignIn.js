
import React, { Component } from 'react';
import {Redirect,withRouter } from 'react-router-dom';
import { Container, Row, Col, Input, Button } from 'mdbreact';
import { auth } from './firebase/firebase';
import './css/signin.css';

const SignInPage = () =>
<div>
  <div className="signin-bg">
    <div className="flex-signin">
    <SignInForm />
    </div>
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
      <Container>
              <Row className="flex-container">
                <Col md="6">
                  <form >
                    <p className="h5 text-center mb-4">Sign In</p>
                    <div className="grey-text">
                      <Input label="Your email"   name="email"  onChange={this.onChange} required icon="envelope" group type="email" validate error="wrong" success="right"/>
                      <Input label="Your password"  name="password"  onChange={this.onChange} required icon="exclamation-triangle" group type="password" validate error="wrong" success="right"/>
                    </div>
                    <div className="text-center">
                      <Button color="primary" onClick ={this.login} >Login In</Button>
                    </div>
                    <p className="textp">Forgot? <a href="/PassForget">Pass</a></p>

                    <p className="textp">Not a member? <a href="/Register"> Sign Up</a></p>

                  </form>
                </Col>
              </Row>
            </Container>
    );
  }
}

export default withRouter(SignInPage);
