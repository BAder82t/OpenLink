import React, { Component } from 'react';
import './Login.scss';






export class LoginPage extends Component {

   

    static displayName = LoginPage.name;

   

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.login = this.login.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }
    
    
    updateUsername(event) {

        this.setState({ username: event.target.value });
        console.log("new username = " + this.state.username); 
    }
    updatePassword(event) {

        this.setState({ password: event.target.value });
        console.log("new password = " + this.state.password);
    }

    login() {
        console.log("Button clicked password = " + this.state.password + " username =" + this.state.username);
        
    }
 

    render() {
        

        
        return (
            <div className="login_div">
                <form>
                    <div>
                        <h2>Username</h2>
                    <input
                            type="text"

                            onChange={this.updateUsername}
                    />
                        <br />
                    </div>
                    
                    <br />
                    <div style={{ marginTop: 10 }}>
                        <h2>Password</h2>
                    <input
                            type="password"
                            onChange={this.updatePassword}
                    />
                        <br />
                    </div>
                    <br/>
                    <button className="button button-block"
                        onClick={this.login}>Login
                    </button>
                </form>
            </div>
        );
        
    }
}









