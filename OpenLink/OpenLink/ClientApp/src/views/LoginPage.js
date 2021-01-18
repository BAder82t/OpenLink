import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { TextEdit } from '../components/TextEdit';
import './MainStyle.scss';


export class LoginPage extends Component {

   

    static displayName = LoginPage.name;

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submitted: false
        };
        this.login = this.login.bind(this);
        this.getPassword =this.getPassword.bind(this);
        this.getUsername = this.getUsername.bind(this);
    }


    login() {
        
        
    }
    getUsername(event){
        this.setState({username:event.target.value});
    }
    getPassword(event){
        this.setState({password:event.target.value});
    }
 

    render() {
        return (
            <div className="form">
                <form>
                    <div>
                        <h2>Sign in to OpenLink</h2>
                        <TextEdit
                        type="text"
                        getValue = {this.getUsername}
                        hint="Username"/>
                     
                    </div>
                    
          
                    <TextEdit
                        type="password"
                        getValue={this.getPassword}
                      
                        hint="Password" />
                   
                    
                    <button className="button button-block">Sign in
                    </button>
                    <br/>
                    <p className="whiteTextCenter">Don't have an account? <br/><Link to="/register">Create one here</Link> </p>
                    
                </form>
            </div>
        );
        
    }
}

