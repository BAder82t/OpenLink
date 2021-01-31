import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FetchData } from './components/FetchData';
import { FetchDataAxios } from './components/FetchDataAxios';

import './custom.css'
import { LoginPage } from './views/LoginPage';
import { Dashboard } from './views/Dashboard';
import { CreateAPI } from './views/CreateAPI'
import { Register } from './views/Register';
import { Account } from './views/Account';
import { profile } from './services/APIService';

export default class App extends Component {
  static displayName = App.name;

  constructor(props) {
    super(props);
    this.state={
      isLoggedIn:false,
      accessToken:'',
      refreshToken:'',
      name:''
    }
    this.loggedIn= this.loggedIn.bind(this);
    this.getProfile = this.getProfile.bind(this);
    

}

  getProfile(response){
    this.setState({
      isLoggedIn:true,
      name:response.validObject.name
      
    });
  }

  loggedIn(_accessToken,_refreshToken){
    console.log("login " +_accessToken);
      var self =this;
      this.setState({
        
        accessToken:_accessToken,
        refreshToken:_refreshToken
      },()=>{

        profile(_accessToken,this.getProfile);
        localStorage.setItem('accessToken', _accessToken);
        localStorage.setItem('refreshToken',_refreshToken);
       
      });
    
  }


  render () {
    const storedToken =localStorage.getItem('accessToken');


    if(!this.state.isLoggedIn && storedToken!=null){
      if(storedToken.length>0){
        this.setState({
          isLoggedIn:true,
          accessToken:localStorage.getItem('accessToken'),
          refreshToken:localStorage.getItem('refreshToken')
          
        }, ()=> {
          profile(this.state.accessToken,this.getProfile);
        });
      }
      

    }
   
    console.log("isLogged in  "+ this.state.isLoggedIn);

    return (
      <Layout isLoggedIn={this.state.isLoggedIn} getName={this.state.name}>
            <Route exact path='/' component={Dashboard} />
            
            
            <Route path="/createAPI" component={CreateAPI}/>
            <Route path='/account' component={()=><Account token={this.state.accessToken}/>}/>
            
            {
            this.isLoggedIn ? 
               null: 
              <Route path='/login' component={() => <LoginPage loggedIn={this.loggedIn} />} />
            }
            
            
            <Route path='/register' component={() => <Register loggedIn={this.loggedIn}/>} />
      </Layout>
    );
  }
}
