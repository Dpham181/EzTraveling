import React, {
  Component
} from 'react';
import {
  realdb,auth,storage
} from './firebase/firebase';
import './css/user.css';
import {Redirect } from 'react-router-dom';
import { Table, TableBody, TableHead , Button, Fa } from 'mdbreact';

class UserPage extends Component{
  constructor(props) {
    super(props);
    this.state={
        users:[],
        goldpackets:[],
        silverpackets:[],
        img:'',

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
  getvalue(){

  }
  onChange(e){
    this.setState({[e.target.name]:e.target.value});
    console.log(this.state);

  }
  componentDidMount() {
    var user = auth.currentUser;
    if(user){
     const goldref = realdb.ref().child('Gold/Fight');
     goldref.once("value", snap => {
         // Handle state
         let listFightG = []
         snap.forEach(child => {

             listFightG.push(
               {
               name:child.val().name,
               Stars:child.val().Stars,
               TicketStatus:child.val().TicketStatus,
               Price:child.val().Price,
               contacts:child.val().contacts,

               id: child.val().id

             }
             );
         });
         this.setState({goldpackets: listFightG})
     });

     const silverref = realdb.ref().child('Silver/Fight');
     silverref.once("value", snap => {
         // Handle state

         var pathReference = storage.ref('logo.jpg');
         var gsReference = storage.refFromURL('gs://eztraveling-feee0.appspot.com/logo.jpg')



         let listFightS = [];
         snap.forEach(child => {


           listFightS.push(
               {
                name:child.val().name,
                Stars:child.val().Stars,
                TicketStatus:child.val().TicketStatus,
                Price:child.val().Price,
                contacts:child.val().contacts,
                id: child.val().id

              }


        );
         });

         this.setState({silverpackets: listFightS});

     });

   }

   else {
     console.log("not user");
     this.setState({redirect:true});
   }
                }


  render() {
    const tableS = this.state.silverpackets.map((item,i) => (

   <tr>
        <td key={i+1}>{item.id}</td>

       <td key={i+2}>{item.name}</td>

       <td key={i+3}>{item.Stars}</td>
       <td key={i+4}>{item.TicketStatus}</td>
       <td key={i+5}>{item.Price}</td>
       <td key={i+6}>{item.contacts}</td>

      <td><Button name={item.name}  onClick={this.getvalue} floating gradient="purple"><Fa icon="plus" /></Button></td>



   </tr>

 ))
   const tableG = this.state.goldpackets.map((item,g=100) => (
  <tr>
       <td key={g +7}>{item.id}</td>

      <td key={g +8}>{item.name}</td>

      <td key={g +9}>{item.Stars}</td>
      <td key={g+10}>{item.TicketStatus}</td>
      <td key={g+11}>{item.Price}</td>
      <td key={g+12}>{item.contacts}</td>
      <td><Button  floating gradient="purple"><Fa icon="plus" /></Button></td>

  </tr>
))


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
        <div>
        <Table>
              <TableHead>
                <tr>
                  <th>#</th>
                  <th>Brand</th>
                  <th>Stars</th>
                  <th>TicketStatus</th>
                  <th>Price</th>
                  <th>Contacts</th>
                  <th>Action</th>

                </tr>
              </TableHead>
            {
              this.state.silver
              ?(<TableBody>{tableS}</TableBody>
)
              :null
            }
            {
              this.state.gold
              ?(<TableBody>{tableG}</TableBody>
)
              :null
            }
            </Table>
        </div>


        )
        :null
}
        </div>
          </div>
        </div>

      );
    }


}


export default UserPage;
