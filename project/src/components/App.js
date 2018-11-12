import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import React, { Component } from 'react';
import { ModalContainer } from 'react-router-modal';
import HeaderPage from './Header';
import BodyPage from './Body';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import Contactpage from './Contact';
import Footerpage from './footer';
import ForgetPasspage from './ForgetPass';
import UserPage from './Userpage';

import "font-awesome/css/font-awesome.min.css";
import "mdbreact/dist/css/mdb.css";
import firebase from 'firebase/app';
import 'react-router-modal/css/react-router-modal.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      userlogging:false,
    };
  }
  componentDidMount() {
  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          userlogging: true,
        })

      } else {
        this.setState({
          userlogging: false

        })


      }
    })
  }

  render() {
      return (
   <Router >
    <div>
      <HeaderPage  userlogging={this.state.userlogging}/>


      <Route exact path="/" component={BodyPage}/>
      <Route path="/contact" component={Contactpage}/>
      <Route path="/Register"  component={SignUpPage}/>
      <Route path="/Logining"  component={SignInPage}/>
      <Route path="/PassForget"  component={ForgetPasspage}/>
      <Route path="/User" userlogging={this.state.userlogging} component={UserPage}/>

      <Footerpage />

      <ModalContainer />
    </div>

</Router>
);
}
}

export default App;
