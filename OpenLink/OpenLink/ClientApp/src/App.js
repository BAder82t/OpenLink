import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './views/Home';
import { FetchData } from './components/FetchData';
import { FetchDataAxios } from './components/FetchDataAxios';

import './custom.css'
import { LoginPage } from './views/LoginPage';
import { Dashboard } from './views/Dashboard';
import { Register } from './views/Register';

export default class App extends Component {
  static displayName = App.name;

  constructor(props) {
    super(props);
    this.state={
      isLoggedIn:false,
      accessToken:'',
      refreshToken:''
    }
    this.loggedIn= this.loggedIn.bind(this);

}

  loggedIn(_accessToken,_refreshToken){

   
      this.setState({
        isLoggedIn:true,
        accessToken:_accessToken,
        refreshToken:_refreshToken
      },()=>{
        console.log("IsLoggedIn Tru");
      });
    
  }

  render () {
    console.log("App render");
    return (
      <Layout isLoggedIn={this.state.isLoggedIn}>
            <Route exact path='/' component={Dashboard} />
            <Route path='/fetch-data' component={FetchData} />
            <Route path='/fetch-data-axios' component={FetchDataAxios} />
            {this.isLoggedIn ? null: <Route path='/login' component={() => <LoginPage loggedIn={this.loggedIn} />} />}
            
            <Route path='/home' component={Home} />
            <Route path='/register' component={Register} />
      </Layout>
    );
  }
}
