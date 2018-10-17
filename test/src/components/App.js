import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import HeaderPage from './Header';
import BodyPage from './Body';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import Contactpage from './Contact';
import Footerpage from './footer';

import * as routes from '../constant/routes';

const App = () =>
  <Router>
    <div>
      <HeaderPage />
      <hr/>
      <Route exact path={routes.BODY} component={BodyPage}/>
      <Route exact path={routes.CONTACT} component={Contactpage}/>
      <Route  exact path={routes.SIGN_UP} component={SignUpPage}/>
      <Route  exact path={routes.SIGN_IN}  component={SignInPage}/>
      <Route exact path={routes.PASSWORD_FORGET} component={PasswordForgetPage}/>

      <Footerpage />

</div>
</Router>

export default App;
