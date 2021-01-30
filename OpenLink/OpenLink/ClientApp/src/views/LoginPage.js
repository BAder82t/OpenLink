import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { TextEdit } from '../components/TextEdit';
import './MainStyle.scss';
import { Redirect } from 'react-router'
import { loginAPI } from '../services/APIService';



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


    redirect(valid, access,refresh){
        if(valid){
            this.setState({
                redirectDashboard:true
            },() =>{
                
                this.props.loggedIn(access,refresh);
            });
        }else{
            
                this.passwordRef.current.showErrorMessage(access);   
        }
      
        
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
         

            loginAPI(this.state.username,this.state.password,self.redirect);

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

