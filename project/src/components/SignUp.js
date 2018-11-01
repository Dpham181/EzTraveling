
import React, { Component } from 'react';
import { auth,realdb } from './firebase/firebase';
import {  Redirect } from 'react-router-dom';
import{FormGroup}  from 'react-bootstrap';
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
        return (<Redirect to={'/'}/>)
      }

    return (


      <form horizontal="true" >

      <FormGroup controlId="formHorizontalEmail">
            <input
            id="formControlsEmail"
              name="fullname"
              onChange={this.onChange}
              type="text"
              required
              placeholder="Your Full Name"
              />
            </FormGroup>
        <FormGroup controlId="formHorizontalEmail">
              <input
              id="formControlsEmail"
                name="email"
                onChange={this.onChange}
                type="text"
                required

                placeholder="Email Address"
                />
              </FormGroup>
        <FormGroup controlId="formHorizontalPassword">

              <input
              id="formControlsText"
              name="password"
              required

                onChange={this.onChange}
                type="password"
                placeholder="Password"
                />

            </FormGroup>
        <FormGroup controlId="formHorizontalPassword">

              <input
              id="formControlsText"
                name="Confirmpassword"
                onChange={this.onChange}
                type="password"
                required
                placeholder="Confirm Password"

                />

                </FormGroup>
                <button  type="submit" onClick ={this.register}>
                Sign Up
              </button>


      </form>


    );

  }
}
export default SignUpPage;
