import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { profile } from '../services/APIService';
import '../views/MainStyle.scss';


export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state ={
            profileModel:null,
            loading:true,
            redirectToDashboard:false
        }
        this.getProfile = this.getProfile.bind(this);
        this.logout = this.logout.bind(this);
    }

    getProfile(response){
        const  data = response.validObject;
        console.log("profile getProfile"+ data.name);
        
        this.setState({
            profileModel:response.validObject,
            loading:false
        });

    }

    componentDidMount(){
        if(!this.state.redirectToDashboard){
            profile(this.props.token,this.getProfile);
            console.log("Load profiel");
        }
        
    }

    logout(e){
        console.log("logout clicked");
        
        e.preventDefault();
        this.setState({
            redirectToDashboard:true
        },() => {
            this.props.logout();
        });
        
    }


    render() {
        if(this.state.redirectToDashboard){
            return <Redirect to='/'/>
        }else{
            if(this.state.loading){
                return (
                    <div>
                    <h3>Loading...</h3>
                 </div>
                );
            }else{
                return( <div className="profile_form">

                <form className="container">
                    <div className="left-half">
                        <p className="profile_name">Hello, {this.state.profileModel.name}</p>
                        <p className="profile_username">Username: {this.state.profileModel.username}</p>
                    </div>
                    <div className ="right-half">
                        <button className="logout-button" onClick={this.logout}>Logout</button>
                    </div>
                    
                </form>

            </div>
            );
            }
        }
        
        
    }
}