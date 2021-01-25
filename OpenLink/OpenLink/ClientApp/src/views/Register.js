import axios from 'axios';
import React, { Component } from 'react';
import { TextEdit } from '../components/TextEdit';
import {CONSTANTS} from '../services/constants'

export class Register extends Component {




    constructor(props) {
        super(props);
        this.retypePasswordRef = React.createRef();
        this.nameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.usernameRef = React.createRef();



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
        this.nameRef.current.removeError();
        this.passwordRef.current.removeError();
        this.retypePasswordRef.current.removeError();
        this.usernameRef.current.removeError();

        let passwordLength = this.state.password.length
        if(this.state.name===''){
            this.nameRef.current.showErrorMessage("Please enter your name");  
        }else if(this.state.username===''){
            this.usernameRef.current.showErrorMessage("Please enter your username");  
        }else if(passwordLength<7){
            this.passwordRef.current.showErrorMessage("Your password should contain more than 7 characters");  
        }else if(this.state.password=== this.state.retypePassword){
           
        
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
        }else{
                this.retypePasswordRef.current.showErrorMessage("This does not match your password");
        }
    }
    

   

    render() {
        
        return (
            <div className="form">
                <form>
                    <div>
                        <h2>Create your account</h2>
                        
                        <TextEdit
                        type="text"
                        ref={this.nameRef}
                        hint="Name"
                        getValue ={this.getName}/>
                        <TextEdit
                        type="text"
                        ref={this.usernameRef}
                        hint="Username"
                        getValue={this.getUsername}/>
                        <TextEdit
                        ref={this.passwordRef}
                        type="password"
                        hint="Password"
                        getValue={this.getPassword}/>
                        <TextEdit
                        ref={this.retypePasswordRef}
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