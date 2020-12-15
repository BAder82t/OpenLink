import React, { Component } from 'react';

export class LoginPage extends Component {

    static displayName = LoginPage.name;

    constructor(props) {
        super(props);
    }

    render(){

        return (
            <div>
                <h1 id="tabelLabel" >Login</h1>
                <p>here we login.</p>
            </div>
        );
    }
}


