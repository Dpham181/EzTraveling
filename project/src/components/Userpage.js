import React, {
  Component
} from 'react';
import {
  realdb,auth
} from './firebase/firebase';
import './css/user.css';
import {Redirect } from 'react-router-dom';
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead  } from 'mdbreact';

class UserPage extends Component{
  constructor(props) {
    super(props);
    this.state={
        users:[],
        goldpackets:[],
        silverpackets:[
          {
            name:"",
            star:"",
          }
        ],

      gold:false,
      silver:false,
      redirect:false
    };
    this.GoldPackets= this.GoldPackets.bind(this);
    this.SilverPackets= this.SilverPackets.bind(this);

  }
  GoldPackets(){
    this.setState({gold:true});
    console.log("clicked");
    if(this.state.silver === true){
      this.setState({silver:false});
    }
  }
  SilverPackets(){
    this.setState({silver:true});
    if(this.state.gold === true){
      this.setState({gold:false});
    }
  }

  componentDidMount() {





    var user = auth.currentUser;
    if(user){

     const goldref = realdb.ref().child('Gold/Fight');
     goldref.once("value", snap => {
         // Handle state
         let listFight = []
         snap.forEach(child => {
           let tickets ={

             name:child.val().name,
             Stars:child.val().Stars,
             TicketStatus:child.val().TicketStatus,
             Price:child.val().Price,
             contacts:child.val().contacts,

             id: child.val().id

           }
             listFight.push(tickets.Stars);
         });
         this.setState({goldpackets: listFight})
     });

     const silverref = realdb.ref().child('Silver/Fight');
     silverref.once("value", snap => {
         // Handle state


         let listFightS = []
         snap.forEach(child => {
            class f{
              constructor(f,n,s){
                this.f= f;
                this.n= n;
                this.s=s;
              }
            }
           let ticketsS ={

             name:child.val().name,
             Stars:child.val().Stars,
             TicketStatus:child.val().TicketStatus,
             Price:child.val().Price,
             contacts:child.val().contacts,

             id: child.val().id

           }
             listFightS.push(ticketsS.name);
         });
         this.setState({silverpackets: listFightS})
     });

   }

   else {
     console.log("not user");
     this.setState({redirect:true});
   }
                }
  render() {
    const listofFight = this.state.goldpackets.map((data,i) => <tr key={i}>{data}</tr>);
    const listofFightS = this.state.silverpackets.map((data,i) => <tr key={i}>{data}</tr>);
    console.log(this.state.silverpackets);
    if(this.state.redirect){
      return (<Redirect to={'/Logining'}/>);
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
          {
            this.state.gold || this.state.silver
        ?(

          <table id="dtBasicExample" >
            <thead>
              <tr>
                <th className="th-bg">Tickets Name
                  <i className="fa fa-sort float-right" aria-hidden="true"></i>
                </th>

              </tr>
            </thead>

            {
              this.state.gold
              ?
              (<tbody>{listofFight}</tbody>)
              :null
            }
            {
              this.state.silver
              ?
              (<tbody>{listofFightS}</tbody>)
              :null
            }



            <tfoot>
              <tr>
                <th>Email
                </th>

              </tr>
            </tfoot>
          </table>
        )
        :null
}
        </div>
          </div>
        </div>

       )
    }


}


export default UserPage;
