import React, {
  Component
} from 'react';
import {
  realdb,auth
} from './firebase/firebase';
import './css/user.css';
import {Redirect } from 'react-router-dom';
import { Table, TableBody, TableHead , Button, Fa } from 'mdbreact';
import StarRatings from 'react-star-ratings';

class UserPage extends Component{
  constructor(props) {
    super(props);
    this.state={
        uid:'',
        goldpackets:[],
        goldpacketscar:[],
        goldpacketshotel:[],
        silverpackets:[],
        silverpacketscar:[],
        silverpacketshotel:[],
        choose:'',
        quanity:'1',
        img:'',
        Booking:[],
        
        redirect:false,
      gold:false,
      silver:false,
    };
    this.GoldPackets= this.GoldPackets.bind(this);
    this.SilverPackets= this.SilverPackets.bind(this);
    this.addToCart= this.addToCart.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangequanity = this.onChangequanity.bind(this);

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
  onChange(e){
    this.setState({choose: e.target.value});

    console.log(this.state);

  }
  onChangequanity(e){
    this.setState({quanity: e.target.value});

    console.log(this.state);

  }

  componentDidMount() {
    var user = auth.currentUser;
    if(user){
      this.setState({uid:user.uid});


  /*
  __________________________*********************************__________________________
                          list of all gold packets from firebase

    */

     const goldref = realdb.ref().child('Gold/Fight');
     goldref.once("value", snap => {
         // Handle state
         let listFightG = []
         snap.forEach(child => {

             listFightG.push(
               {
               name:child.val().name,
               Stars:parseInt(child.val().Stars),
               TicketStatus:child.val().TicketStatus,
               Price:child.val().Price,
               contacts:child.val().contacts,

               id: child.val().id

             }
             );
         });
         this.setState({goldpackets: listFightG})
     });

     const goldrefcar = realdb.ref().child('Gold/Car');
     goldrefcar.once("value", snap => {
         // Handle state
         let listcarG = []
         snap.forEach(child => {

             listcarG.push(
               {
               name:child.val().name,
               Stars:parseInt(child.val().Stars),
               TicketStatus:child.val().Status,
               Price:child.val().Price,
               contacts:child.val().contacts,

               id: child.val().id

             }
             );
         });
         this.setState({goldpacketscar: listcarG})
     });

     const goldrefhotel = realdb.ref().child('Gold/Hotel');
     goldrefhotel.once("value", snap => {
         // Handle state
         let listhotelG = []
         snap.forEach(child => {

             listhotelG.push(
               {
               name:child.val().name,
               Stars:parseInt(child.val().Stars),
               TicketStatus:child.val().Status,
               Price:child.val().Price,
               contacts:child.val().contacts,

               id: child.val().id

             }
             );
         });
         this.setState({goldpacketshotel: listhotelG})
     });

// end of gold packets

/*
__________________________*********************************__________________________
                             list of all silver packets

*/
     const silverref = realdb.ref().child('Silver/Fight'); // flight tickets query
     silverref.once("value", snap => {
         // Handle state

    //     var pathReference = storage.ref('logo.jpg');
    //     var gsReference = storage.refFromURL('gs://eztraveling-feee0.appspot.com/logo.jpg')
         let listFightS = [];
         snap.forEach(child => {


           listFightS.push(
               {
                name:child.val().name,
                Stars:parseInt(child.val().Stars),
                TicketStatus:child.val().TicketStatus,
                Price:child.val().Price,
                contacts:child.val().contacts,
                id: child.val().id

              }


        );
         });

         this.setState({silverpackets: listFightS});

     });

     const silverrefcar = realdb.ref().child('Silver/Car');
     silverrefcar.once("value", snap => {
         // Handle state
         let listcarS = []
         snap.forEach(child => {

             listcarS.push(
               {
               name:child.val().name,
               Stars:parseInt(child.val().Stars),
               TicketStatus:child.val().Status,
               Price:child.val().Price,
               contacts:child.val().contacts,

               id: child.val().id

             }
             );
         });
         this.setState({silverpacketscar: listcarS})
     });
     const silverrefhotel= realdb.ref().child('Silver/Hotel');
     silverrefhotel.once("value", snap => {
         // Handle state
         let listhotelS = []
         snap.forEach(child => {

             listhotelS.push(
               {
               name:child.val().name,
               Stars: parseInt(child.val().Stars),
               TicketStatus:child.val().Status,
               Price:child.val().Price,
               contacts:child.val().contacts,

               id: child.val().id

             }
             );
         });
         this.setState({silverpacketshotel: listhotelS})
     });

   }
// end of silver packet
   else {
     console.log("not user");
     this.setState({redirect:true});
   }
                }

  addToCart(i,q, n, s, c, p ) {
                  console.log("add to card working");
                  this.setState(
                    {
                      Booking: {
                        name: n,
                        quanity:q,
                        Stars: s,
                        Contact: c,
                        Pirce: p
                              }
                    }
                  );
                    var uid = this.state.uid;
                    var inum = Math.floor((Math.random() * 100) + 1);
                  realdb.ref(`tempcartcheckout/${uid}/${inum}`).set({
                    inum,
                    q,
                    n,
                    s,
                    c,
                    p
                });
                i++;
                  console.log(this.state.Booking);
                  }

  render() {
// mapping object with array for render gold packet unique key need for each child

    const tableS = this.state.silverpackets.map((item,i=200) => (

   <tr key={i}>
        <td key={i+1}>{item.id}</td>

       <td key={i+2}>{item.name}</td>

       <td key={i+3}>

       <StarRatings
         rating={item.Stars}
         starRatedColor="yellow"
         starDimension='10px'
         numberOfStars={5}
         name='rating'
       />




       </td>
       <td key={i+4}>{item.TicketStatus}</td>
       <td key={i+5}>{item.Price}</td>
       <td key={i+20}><input type="date" id="start" name="trip-start" min="2018-01-01" max="2020-12-31"></input></td>

       <td key={i+6}>{item.contacts}</td>
      <td key={i+7}>
          <select value={this.state.quanity} onChange={this.onChangequanity} >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="9">10</option>

            </select>
          </td>
    <td><Button  className ="b" onClick={this.addToCart.bind(this,
            item.id,
            this.state.quanity,
            item.name,
            item.Stars,
            item.contacts,
            item.Price)
          } floating gradient="blue"><Fa icon="shopping-cart" /></Button></td>



   </tr>

 ));

 const tableShotel = this.state.silverpacketshotel.map((item,i=2000) => (

<tr key={i}>
     <td key={i+1}>{item.id}</td>

    <td key={i+2}>{item.name}</td>

    <td key={i+3}>
    <StarRatings
         rating={item.Stars}
         starRatedColor="yellow"
         starDimension='10px'
         numberOfStars={5}
         name='rating'
       />
</td>
    <td key={i+5}>{item.Price}</td>
    <td key={i+20}><input type="date" id="start" value="date" name="trip-start" min="2018-01-01" max="2020-12-31"></input></td>

    <td key={i+6}>{item.contacts}</td>
    <td key={i+7}>
        <select value={this.state.quanity} onChange={this.onChangequanity} >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="9">10</option>

          </select>
        </td>
 <td><Button   className ="b" onClick={this.addToCart.bind(this,
         item.id,
         this.state.quanity,
         item.name,
         item.Stars,
         item.contacts,
         item.Price)
       } floating gradient="blue"><Fa icon="shopping-cart" /></Button></td>



</tr>

));
const tableScar = this.state.silverpacketscar.map((item,i) => (

<tr key={i}>
    <td key={i+1}>{item.id}</td>

   <td key={i+2}>{item.name}</td>

   <td key={i+3}>
    <StarRatings
        rating={item.Stars}
        starRatedColor="yellow"
        starDimension='10px'
        numberOfStars={5}
        name='rating'
      />
</td>
   <td key={i+4}>{item.TicketStatus}</td>
   <td key={i+5}>{item.Price}</td>
   <td key={i+20}><input type="date" id="start" name="trip-start" min="2018-01-01" max="2020-12-31"></input></td>

   <td key={i+6}>{item.contacts}</td>
   <td key={i+7}>
       <select value={this.state.quanity} onChange={this.onChangequanity} >
           <option value="1">1</option>
           <option value="2">2</option>
           <option value="3">3</option>
           <option value="4">4</option>
           <option value="5">5</option>
           <option value="6">6</option>
           <option value="7">7</option>
           <option value="8">8</option>
           <option value="9">9</option>
           <option value="9">10</option>

         </select>
       </td>
<td><Button  className ="b" onClick={this.addToCart.bind(this,
        item.id,
        this.state.quanity,
        item.name,
        item.Stars,
        item.contacts,
        item.Price)
      } floating gradient="blue"><Fa icon="shopping-cart" /></Button></td>



</tr>

));
 // mapping object with array for render gold packet unique key need for each child
   const tableG = this.state.goldpackets.map((item,g=100) => (
  <tr key={g}>
       <td key={g +7}>{item.id}</td>

      <td key={g +8}>{item.name}</td>

      <td key={g +9}>
      <StarRatings
           rating={item.Stars}
           starRatedColor="yellow"
           starDimension='10px'
           numberOfStars={5}
           name='rating'
         />
</td>
      <td key={g+10}>{item.TicketStatus}</td>
      <td key={g+11}>{item.Price}</td>
      <td key={g+20}><input type="date" id="start" name="trip-start" min="2018-01-01" max="2020-12-31"></input></td>

      <td key={g+12}>{item.contacts}</td>
      <td key={g+13}>
          <select value={this.state.quanity} onChange={this.onChangequanity} >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="9">10</option>

            </select>
          </td>
      <td><Button  className ="b"  onClick={this.addToCart.bind(this,
              item.id,
              this.state.quanity,
              item.name,
              item.Stars,
              item.contacts,
              item.Price)
            } floating gradient="blue"><Fa icon="shopping-cart" /></Button></td>


  </tr>
));
const tableGcar = this.state.goldpacketscar.map((item,g=1000) => (
<tr key={g}>
    <td key={g +7}>{item.id}</td>

   <td key={g +8}>{item.name}</td>

   <td key={g +9}>
   <StarRatings
     rating={item.Stars}
     starRatedColor="yellow"
     starDimension='10px'
     numberOfStars={5}
     name='rating'
   />

   </td>
   <td key={g+10}>{item.TicketStatus}</td>
   <td key={g+11}>{item.Price}</td>
   <td key={g+20}><input type="date" id="start" name="trip-start" min="2018-01-01" max="2020-12-31"></input></td>

   <td key={g+12}>{item.contacts}</td>
   <td key={g+13}>
       <select value={this.state.quanity} onChange={this.onChangequanity} >
           <option value="1">1</option>
           <option value="2">2</option>
           <option value="3">3</option>
           <option value="4">4</option>
           <option value="5">5</option>
           <option value="6">6</option>
           <option value="7">7</option>
           <option value="8">8</option>
           <option value="9">9</option>
           <option value="9">10</option>

         </select>
       </td>
   <td><Button   className ="b" onClick={this.addToCart.bind(this,
           item.id,
           this.state.quanity,
           item.name,
           item.Stars,
           item.contacts,
           item.Price)
         } floating gradient="blue"><Fa icon="shopping-cart" /></Button></td>


</tr>
));
const tableGhotel = this.state.goldpacketshotel.map((item,g=10000) => (
<tr key={g}>
    <td key={g +7}>{item.id}</td>

   <td key={g +8}>{item.name}</td>

   <td key={g +9}>


   <StarRatings
     rating={item.Stars}
     starRatedColor="yellow"
     starDimension='10px'
     numberOfStars={5}
     name='rating'
   />




   </td>
   <td key={g+11}>{item.Price}</td>
   <td key={g+20}><input type="date" id="start" name="trip-start" min="2018-01-01" max="2020-12-31"></input></td>
   <td key={g+12}>{item.contacts}</td>
   <td key={g+13}>
       <select value={this.state.quanity} onChange={this.onChangequanity} >
           <option value="1">1</option>
           <option value="2">2</option>
           <option value="3">3</option>
           <option value="4">4</option>
           <option value="5">5</option>
           <option value="6">6</option>
           <option value="7">7</option>
           <option value="8">8</option>
           <option value="9">9</option>
           <option value="9">10</option>

         </select>
       </td>
   <td><Button   className ="b" onClick={this.addToCart.bind(this,
           item.id,
           this.state.quanity,
           item.name,
           item.Stars,
           item.contacts,
           item.Price)
         } floating gradient="blue"><Fa icon="shopping-cart" /></Button></td>


</tr>
));
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
            this.state.gold|| this.state.silver
          ?(
          <div className="flex-selected">
          <p> Please choose category </p>
          <p>
      <select value={this.state.choose} onChange={this.onChange} >
        <option defaultValue>Choose an Option</option>
        <option value="Flight">Fight Tickets</option>
        <option value="Car">Car Rental</option>
        <option value="Hotel">Hotel Booking</option>

      </select>
        </p>
  </div>
):null
}


          {
            this.state.choose === "Flight"
        ?(
        <div>
        <Table>
              <TableHead  color="primary-color" >
                <tr>
                  <th>#</th>
                  <th>Brand</th>
                  <th>Stars</th>
                  <th>TicketStatus</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Contacts</th>
                  <th>Quanity</th>

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





{
  this.state.choose === "Car"
?(
<div>
<Table>
    <TableHead  color="primary-color" >
      <tr>
        <th>#</th>
        <th>Brand</th>
        <th>Stars</th>
        <th>TicketStatus</th>
        <th>Price</th>
        <th>Date</th>
        <th>Contacts</th>
        <th>Quanity</th>

        <th>Action</th>

      </tr>
    </TableHead>
  {
    this.state.silver
    ?(<TableBody>{tableScar}</TableBody>
)
    :null
  }
  {
    this.state.gold
    ?(<TableBody>{tableGcar}</TableBody>
)
    :null
  }
  </Table>
</div>


)
:null
}


{
  this.state.choose === "Hotel"
?(
<div>
<Table>
    <TableHead  color="primary-color" >
      <tr>
        <th>#</th>
        <th>Brand</th>
        <th>Stars</th>
        <th>Price</th>
        <th>Date</th>
        <th>Contacts</th>
        <th>Quanity</th>

        <th>Action</th>

      </tr>
    </TableHead>
  {
    this.state.silver
    ?(<TableBody>{tableShotel}</TableBody>
)
    :null
  }
  {
    this.state.gold
    ?(<TableBody>{tableGhotel}</TableBody>
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
