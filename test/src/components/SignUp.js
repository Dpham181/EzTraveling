
import React, { Component } from 'react';
import { auth,realdb } from './firebase';

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
  const INITIAL_STATE = {
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

  const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };

  }

  onSubmit = (event) => {
    const {
         email,
         passwordOne,
       } = this.state;

       auth.doCreateUserWithEmailAndPassword(email, passwordOne)
         .then(authUser => {
           realdb.doCreateUser(authUser.user.uid,  email)
          .then(() => {
            this.setState({ ...INITIAL_STATE });
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });
         })
         .catch(error => {
           this.setState(byPropKey('error', error));
         });

       event.preventDefault();
  }

  render() {
    const {
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;
    const isInvalid =
          passwordOne !== passwordTwo ||
          passwordOne === '' ||
          email === '';
    return (


      <form horizontal onSubmit={this.onSubmit}>

        <FormGroup controlId="formHorizontalEmail">
              <input
              id="formControlsEmail"

                value={email}
                onChange={event => this.setState(byPropKey('email', event.target.value))}
                type="text"
                placeholder="Email Address"
                />
              </FormGroup>
        <FormGroup controlId="formHorizontalPassword">

              <input
              id="formControlsText"

                value={passwordOne}
                onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                type="password"
                placeholder="Password"
                />

            </FormGroup>
        <FormGroup controlId="formHorizontalPassword">

              <input
              id="formControlsText"

                value={passwordTwo}
                onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                type="password"
                placeholder="Confirm Password"
                />

                </FormGroup>
                <button disabled={isInvalid} type="submit">
                Sign Up
              </button>

              { error && <p>{error.message}</p> }

      </form>


    );

  }
}
export default SignUpPage;
