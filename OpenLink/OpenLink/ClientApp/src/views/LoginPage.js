import React, { Component } from 'react';
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
    }


    login() {
        
        
    }
 

    render() {
        return (
            <div className="form">
                <form>
                    <div>
                        <h2>Login</h2>
                        <TextEdit
                       
                        type="text"
                        hint="Username"
                        
                        />
                     
                    </div>
                    
                    <br />
                    <TextEdit
                      
                        type="password"
                        hint="Password"
                       
                        />
                   
                    <br/>
                    <button className="button button-block">Login
                    </button>
                </form>
            </div>
        );
        
    }
}

