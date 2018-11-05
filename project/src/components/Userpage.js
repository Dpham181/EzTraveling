import React, {
  Component
} from 'react';
import {
  realdb,auth
} from './firebase/firebase';
import './css/user.css';
import {Redirect } from 'react-router-dom';



class UserPage extends Component{
  constructor(props) {
    super(props);
    this.state={
        users:[],
      gold:false,
      silver:false
    };
    this.GoldPackets= this.GoldPackets.bind(this);
    this.SilverPackets= this.SilverPackets.bind(this);

  }
  GoldPackets(){
    this.setState({gold:true});
    console.log("clicked");
  }
  SilverPackets(){
    this.setState({silver:true});

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

   }

   else {
     console.log("not user");
     this.setState({redirect:true});
   }
                }
  render() {
    const listofUsers = this.state.users.map((data,i) => <li key={i}>Users: {data}</li>);

    if(this.state.gold){
      return (
        <div >
        {listofUsers}
        </div>

       )
    }
      return (

        <div>
        <div className="user-page">
        <div className="flex-box">

        <div className="inner-boxa">
        <div>
        <p> Gold </p>

        <li> Contains:  </li>
        <li> Business Flight Tickets </li>
        <li> Four Stars Hotel Up </li>
        <li> Premium Car Rental </li>

        <div className="inner-a" >
        <button  onClick={this.GoldPackets}> Get Gold Packets </button>
        </div>
        </div>
        </div>
        <div className="inner-boxb">

        <div>
        <p> Silver </p>

        <li> Contains:  </li>
        <li> Economy Flight Tickets </li>
        <li> Four Stars Hotel Down </li>
        <li> Regular Car Rental </li>

        <div className="inner-b" >
        <button onClick={this.SilverPackets} > Get Silver Packets </button>
        </div>
        </div>
          </div>



      </div>

          <div className="flex-user">



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
        redirect:false
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

 }

 else {
   console.log("not user");
   this.setState({redirect:true});
 }
              }

    render() {
      if(this.state.redirect){
        return (<Redirect to={'/Logining'}/>)
      }
      const listofUsers = this.state.users.map((data,i) => <li key={i}>Users: {data}</li>);

            return (
              <div >

                {listofUsers}



              </div>


                   );

    }


  }


export default UserPage;
