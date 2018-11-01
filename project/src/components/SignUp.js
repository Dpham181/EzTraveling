
import React, { Component } from 'react';
import { auth,realdb } from './firebase/firebase';
import {  Redirect } from 'react-router-dom';
import { Container, Row, Col, Input, Button } from 'mdbreact';
import './css/signup.css';


const SignUpPage = () =>

  <div>
    <div className="flex-signup">
    <div className="flex-in">
    <SignUpForm />
    </div>
    </div>
  </div>


class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      Confirmpassword: '',
      fullname:'',
      id:'',
      redirect:false,
      error: null
    };
    this.register = this.register.bind(this)
    this.onChange = this.onChange.bind(this)


  }


register(event)  {


  var email = this.state.email;
  var password = this.state.password;
  var cfpassword= this.state.Confirmpassword;
  var fullname= this.state.fullname;

  if(password !== cfpassword){
    alert("Pass not Match");
  }else {


  auth.createUserWithEmailAndPassword(email, password).then((result) => {
  var id = result.user.uid
    auth.signOut();
    this.setState({redirect:true });
    console.log('register');
    realdb.ref(`users/${id}`).set({
      id,
      email,
      fullname
});

    })
  .catch(error => {
    this.setState({error:error});
    alert(this.state.error);

  });
}
       event.preventDefault();
  }
  onChange(e){
    this.setState({[e.target.name]:e.target.value});
    console.log(this.state);

  }
  render() {

      if(this.state.redirect){
        return (<Redirect to={'/Logining'}/>)
      }

    return (

      <Container>
              <Row className="flex-container">
                <Col md="6">
                  <form >
                    <p className="h5 text-center mb-4">Sign up</p>
                    <div className="grey-text">
                      <Input label="Your name" required name="fullname"  onChange={this.onChange} icon="user" group type="text" validate error="wrong" success="right"/>
                      <Input label="Your email"   name="email"  onChange={this.onChange}  icon="envelope" group type="email" validate error="wrong" success="right"/>
                      <Input label="Your password"  name="password"  onChange={this.onChange}  icon="exclamation-triangle" group type="password" validate error="wrong" success="right"/>
                      <Input label="Confirm Your password" name="Confirmpassword"  onChange={this.onChange} required icon="lock" group type="password" validate/>
                    </div>
                    <div className="text-center">
                      <Button color="primary" onClick ={this.register} >Register</Button>
                    </div>
                  </form>
                </Col>
              </Row>
            </Container>

    );

  }
}
export default SignUpPage;
