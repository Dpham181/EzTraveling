import React, { Component } from 'react';
import { realdb } from './firebase/firebase';

const UserPage = () =>
  <div>
    <UserPageContext />
  </div>



class UserPageContext extends Component {
  constructor(props) {
    super(props);


  }




  render() {


    return (

          <div>

          <h1> User body page </h1>
         </div>
    );
  }
}

export default UserPage;
