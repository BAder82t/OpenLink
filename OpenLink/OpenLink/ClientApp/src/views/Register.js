import React, { Component } from 'react';
import { TextEdit } from '../components/TextEdit';

export class Register extends Component {





    constructor(props) {
        super(props);
        this.state = {
            name:"",
            username:"",
            password:"",
            retypePassword:""

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
                        hint="Name"/>
                        <TextEdit
                        type="text"
                        hint="Username"/>
                        <TextEdit
                        type="password"
                        hint="Password"/>
                        <TextEdit
                        type="password"
                        hint="Retype your Password "/>

                    </div>
                    
            
                    
               
                    <button className="button button-block">Register</button>
                </form>
            </div>
        );
        
    }
}