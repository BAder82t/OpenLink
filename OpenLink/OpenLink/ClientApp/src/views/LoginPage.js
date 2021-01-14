import React, { Component } from 'react';
import './Login.scss';


export class LoginPage extends Component {

   

    static displayName = LoginPage.name;

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            usernameActive:false,
            passwordActive:false,
            submitted: false
        };

        
        this.updateUsername = this.updateUsername.bind(this);
        this.login = this.login.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
    }

    
    
    
    updateUsername(event) {
       

        this.setState({ username: event.target.value }, function () { this.checkUsername(); });
        
    }

    checkUsername()
    {
        console.log("new username = " + this.state.username);
        if (this.state.username == "") {
            this.setState({ usernameActive: false })
        } else {
            this.setState({ usernameActive: true })

        }
    }


    updatePassword(event) {

        this.setState({ password: event.target.value }, function () { this.checkPassword(); });
        
    }
    checkPassword() {
        console.log("new password = " + this.state.password);
        if (this.state.password == "") {
            this.setState({ passwordActive: false })
        } else {
            this.setState({ passwordActive: true })

        }
    }


    login() {
        
        
    }
 

    render() {
        return (
            <div className="form">
                <form>
                    <div>
                        <h2>Login</h2>
                        <div className="field-wrap">
                            {
                                this.state.usernameActive ?
                                    null : <label> UserName<span className="req">*</span> </label>
                            }
                        
                        <input
                            type="text"

                            onChange={this.updateUsername}
                            />
                        </div>
                     
                    </div>
                    
                    <br />
                    <div style={{ marginTop: 10 }}>
                        <div className="field-wrap">
                            {
                                this.state.passwordActive ?
                                    null :<label> Password<span className="req">*</span> </label>
                            }
                            <input
                                type="password"
                                onChange={this.updatePassword}
                            />
                               
                        </div>
                    </div>
                    <br/>
                    <button className="button button-block">Login
                    </button>
                </form>
            </div>
        );
        
    }
}

