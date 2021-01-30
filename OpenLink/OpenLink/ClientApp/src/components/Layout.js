import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  constructor(props) {
    super(props);

}

 
  
  render () {
    console.log("layout is loggedIn: "+this.props.isLoggedIn);
    return (
      <div>
        <NavMenu isLoggedIn={this.props.isLoggedIn} getName={this.props.getName}/>
        <Container >
                {this.props.children}

        </Container>
      </div>
    );
  }
}
