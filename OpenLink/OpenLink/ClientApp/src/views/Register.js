import axios from 'axios';
import React, { Component } from 'react';
import { TextEdit } from '../components/TextEdit';
import {CONSTANTS} from '../services/constants'

export class Register extends Component {





    constructor(props) {
        super(props);
        this.state = {
            name:'',
            username:'',
            password:'',
            retypePassword:''

        }
        this.getName = this.getName.bind(this);
        this.getRetryPassword = this.getRetryPassword.bind(this);
        this.getUsername = this.getUsername.bind(this);
        this.getPassword = this.getPassword.bind(this);
        this.sendData =this.sendData.bind(this);

    }




    getPassword(e){
        this.setState({password:e});
    }
    getRetryPassword(e){
        this.setState({retypePassword:e});
    }
    getUsername(e){
        this.setState({username:e});
    }
    getName(e){
        this.setState({name:e});
    }
    sendData(e){
        e.preventDefault();
       
        const endPoint = CONSTANTS.MAINURL+'/profile/register';

        var bodyData =JSON.stringify({ 
            username: this.state.username,
            name: this.state.name,
            password:this.state.password
         });
       
        axios({
            method:'POST',
            url:endPoint,
            data:bodyData,
            headers: {
                
                'Content-Type': 'application/json'
              }
           
        }).then(function (response){
             //handle success
        console.log(response);
        }).catch(function (response) {
            //handle error
            console.log(response);
        });
    }
   

    render() {
        return (
            <div className="form">
                <form>
                    <div>
                        <h2>Create your account</h2>
                        
                        <TextEdit
                        type="text"
                        hint="Name"
                        getValue ={this.getName}/>
                        <TextEdit
                        type="text"
                        hint="Username"
                        getValue={this.getUsername}/>
                        <TextEdit
                        type="password"
                        hint="Password"
                        getValue={this.getPassword}/>
                        <TextEdit
                        type="password"
                        hint="Retype your Password "
                        getValue={this.getRetryPassword}/>

                    </div>
                    
            
                    
               
                    <button className="button button-block" onClick={this.sendData}>Register</button>
                </form>
            </div>
        );
        
    }
}