import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  { Carousel } from 'react-bootstrap';


import './css/body.css';

const BodyPage = () =>
<div>
  <BODY />
</div>
 class BODY extends Component {
    constructor(props, context) {
      super(props, context);

      this.handleSelect = this.handleSelect.bind(this);

      this.state = {
        index: 0,
        direction: null
      };
    }

    handleSelect(selectedIndex, e) {
      alert(`selected=${selectedIndex}, direction=${e.direction}`);
      this.setState({
        index: selectedIndex,
        direction: e.direction
      });
    }

    render() {
      const { index, direction } = this.state;

      return (
      <body>
      <div class="flex-body">
        <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
        >
          <Carousel.Item>
            <img width={900} height={500} alt="900x500"   src={require('./img/1.jpg')} />

          </Carousel.Item>
          <Carousel.Item>
            <img width={958} height={500}  alt="900x500"  src={require('./img/2.jpg')} />

          </Carousel.Item>
          <Carousel.Item>
            <img width={958} height={500}  alt="900x500"  src={require('./img/3.jpg')} />

          </Carousel.Item>

        </Carousel>
        </div>
      </body>
      );
    }


}
export default BodyPage;
