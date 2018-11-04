import React, {
  Component
} from 'react';
import {
  realdb,auth
} from './firebase/firebase';
import './css/user.css';



class UserPage extends Component{
  render() {
      return (
        <div>
        <div className="user-page">
        <div className="flex-box">

        <div className="inner-boxa">
        <div> <p> Gold </p></div>
        </div>
        <div className="inner-boxb">

        <div> <p> Silver </p> </div>
          </div>



      </div>

          <div className="flex-user">

        <UserPageContexts />


        </div>
          </div>
        </div>
);
}
}
class UserPageContexts extends Component {
    constructor(props) {
      super(props);
      this.state={
        users:[],
      };
    }

componentDidMount() {


  var user = auth.currentUser;
  if(user){

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
 }else {
   console.log("not user");
 }
  }

    render() {

      const listofUsers = this.state.users.map((data,i) => <li key={i}>Users: {data}</li>);

            return (
              <div >

                {listofUsers}



              </div>


                   );

    }


  }


export default UserPage;
