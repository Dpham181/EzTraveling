import React, { Component } from 'react';
import './css/contact.css';
import { realdb } from './firebase/firebase';
import 'firebase/database';

const Contactpage = () =>
  <div>
    <h1>Contact</h1>
    <Test />
  </div>

  class Test extends Component {
    constructor(props) {
      super(props);

      this.state = {
        users:null,
      };
    }


    componentDidMount() {
      this.firebaseRef = realdb.ref("users");
      this.firebaseRef.once('value', (snapshot) => {
         this.setState({ users: snapshot.val() })

      });
    }
    render() {

            return (
              <div>

        <p>{JSON.stringify(this.state.users)}</p>

      </div>
    );

    }
  }




export default Contactpage;
