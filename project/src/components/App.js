import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import React, { Component } from 'react';

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      userlogging:false,
      cartBooking:[],
    };
    this.cartcheckout= this.cartcheckout.bind(this);
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
  cartcheckout(){
    
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
      <Route path="/User"  component={UserPage}/>

      <Footerpage />

</div>
</Router>
);
}
}

export default App;
