import axios from 'axios';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { TextEdit } from '../components/TextEdit';
import './MainStyle.scss';
import {CONSTANTS} from '../services/constants';
import { Redirect } from 'react-router'



export class LoginPage extends Component {

   

    static displayName = LoginPage.name;

   

    constructor(props) {
        super(props);

        this.passwordRef = React.createRef();
        this.usernameRef = React.createRef();

        


        this.state = {
            username: '',
            password: '',
            submitted: false,
            redirectDashboard:false
        };
        this.login = this.login.bind(this);
        this.getPassword =this.getPassword.bind(this);
        this.getUsername = this.getUsername.bind(this);
        this.redirect=this.redirect.bind(this);
    }
    redirect(){
      
        this.setState({
            redirectDashboard:true
        },() =>{
            this.props.loggedIn(true);
        });
    }

    


    login(e) {
        e.preventDefault();
        var self = this;
        this.passwordRef.current.removeError();
        this.usernameRef.current.removeError();

        let passwordLength = this.state.password.length;

        var validUsername=true;
        var validPassword= true;

        if(this.state.username===''){
            validUsername=false;
            this.usernameRef.current.showErrorMessage("Please add your Username");
        }
        if(this.state.password==''){
            validPassword=false;
            this.passwordRef.current.showErrorMessage("Please add your password");
        }else if(passwordLength<7){
            validPassword=false;
            this.passwordRef.current.showErrorMessage("Your password should contain more than 7 characters");  
        }
        if(validPassword && validUsername){
            const endPoint = CONSTANTS.MAINURL+'/auth/login';

            var bodyData =JSON.stringify({ 
                username: this.state.username,
                password:this.state.password
            });
            axios({
                method:'POST',
                url: endPoint,
                data:bodyData,
                headers: {
                    
                    'Content-Type': 'application/json'
                }
            }).then(function (response){
                //handle success
                if(response.data.validObject!=null){
                    var accessToken = (response.data.validObject.accessToken);
                    console.log("accesstoken :"+accessToken);
                    var refreshToken = (response.data.validObject.refreshToken);
                    console.log("refreshToken :"+refreshToken);

                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken',refreshToken);
                }

            console.log(response);
            
            self.redirect();
            
            }).catch(function (error) {
                //handle error
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                  } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                  } else if(error.message){
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                  }
            });;
        }
        
    }
    getUsername(event){
        this.setState({username:event});
    }
    getPassword(event){
        this.setState({password:event});
    }

 

    render() {
        if(this.state.redirectDashboard){
          
            return <Redirect to='/'/>;
        }
        return (
            <div className="form">
                <form>
                    <div>
                        <h2>Sign in to OpenLink</h2>
                        <TextEdit
                        type="text"
                        ref={this.usernameRef}
                        getValue = {this.getUsername}
                        hint="Username"/>
                     
                    </div>
                    
          
                    <TextEdit
                        type="password"
                        getValue={this.getPassword}
                        ref={this.passwordRef}
                        hint="Password" />
                   
                    
                    <button className="button button-block" onClick={this.login}>Sign in
                    </button>
                    <br/>
                    <p className="whiteTextCenter">Don't have an account? <br/><Link to="/register">Create one here</Link> </p>
                    
                </form>
            </div>
        );
        
    }
}

