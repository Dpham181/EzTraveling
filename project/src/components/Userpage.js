import React, {
  Component
} from 'react';
import {
  realdb
} from './firebase/firebase';
import './css/user.css';


const UserPage = () =>
<div>
<div className="user-page">
  <div className="flex-user">
    <UserPageContexts />
</div>
  </div>
</div>

class UserPageContexts extends Component {
    constructor(props) {
      super(props);
      this.state={
        users:[],
      };

    }

componentDidMount() {
   const userref = realdb.ref().child('users');

   userref.once("value", snap => {
       // Handle state
       let listusers = []
       snap.forEach(child => {
         let user ={

           email:child.val().email,
           fullname:child.val().fullname,
           id: child.val().id

         }
           listusers.push(user.email);
       });
       this.setState({users: listusers})
   });
  }

    render() {
      const listofUsers = this.state.users.map(data => <li>Users: {data}</li>);

            return (
              <div >
            {listofUsers}
              </div>

                   );

    }


  }



export default UserPage;
