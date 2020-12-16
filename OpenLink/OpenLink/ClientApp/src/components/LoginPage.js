import React, { Component } from 'react';







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
    

 

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div>
                <div>
                <input
                    type="text"
                      
                    autoComplete="new-password"
                    onChange={(event, newValue) => this.setState({ username: newValue })}
                />
                    <br />
                </div>
                    
                <br />
                <div style={{ marginTop: 10 }}>
                <input
                    type="password"
                    hintText="Enter your Password"
                    floatingLabelText="Password"
                    onChange={(event, newValue) => this.setState({ password: newValue })}
                />
                    <br />
                </div>
                <button >Login</button>
             
            </div>
        );
    }
}
function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}






