
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import{FormGroup}  from 'react-bootstrap';

import { auth} from './firebase/firebase';

const SignInPage = ({ history }) =>
  <div>
    <div className="flex-signin">
    <h1>SignIn</h1>

    <SignInForm  />
    </div>
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;


    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });

      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
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

                value={password}
                onChange={event => this.setState(byPropKey('password', event.target.value))}
                type="password"
                placeholder="Password"
                />

            </FormGroup>
            <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default withRouter(SignInPage);
