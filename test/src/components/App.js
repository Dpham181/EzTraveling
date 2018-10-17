import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import HeaderPage from './Header';
import BodyPage from './Body';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import Contactpage from './Contact';
import Footerpage from './footer';

const App = () =>
  <Router>
    <div>
      <HeaderPage />
      <Route exact path="/" component={BodyPage}/>
      <Route path="/contact" component={Contactpage}/>
      <Route path="/Register" component={SignUpPage}/>
      <Route path="/Logining"  component={SignInPage}/>

      <Footerpage />

</div>
</Router>

export default App;
