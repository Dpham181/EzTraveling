import React, {
  Component
} from 'react';
import {
  realdb
} from './firebase/firebase';
import './css/user.css';

const UserPage = () =>
  <div>
  <div className ="flex-user" >
  <UserPageContext / >
  </div>
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

class UserPageContext extends Component {
  constructor(props) {
    super(props);

    }

  render() {
  return (
    <div>
      <h1> User body page < /h1>
    </div>
    );
  }
}

export default UserPage;
