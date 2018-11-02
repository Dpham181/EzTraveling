import React, {
  Component
} from 'react';
import {
  realdb
} from './firebase/firebase';
import './css/user.css';


  class UserPage extends Component {
    constructor(props) {
      super(props);
      this.state={
        users:[],
      };
      this.bindingdata= this.bindingdata.bind(this);

    }

    bindingdata(){
      let listusers =[];

      realdb.ref("users").once('value', function(snapshot){

          snapshot.forEach(function(data){
          let user ={

            email:data.val().email,
            fullname:data.val().fullname,
            id: data.val().id,

          }
           listusers.push(user);

         });

         console.log(listusers);
         for(var i = 0 ; i < listusers.size ; i++){
           this.setState({users:listusers[i]});

         }

        });


    }
    componentDidMount () {
      this.bindingdata();

  }


    render() {

            return (
              <div className="flex-user">
               <li> {this.state.users} </li>

            </div>

                   );

    }


  }



export default UserPage;
