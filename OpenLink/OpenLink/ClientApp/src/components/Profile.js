import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { profile } from '../services/APIService';
import '../views/MainStyle.scss';

var _isMounted = false;
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
        if(_isMounted){
            const  data = response.validObject;
            console.log("profile getProfile"+ data.name);
            
            this.setState({
                profileModel:response.validObject,
                loading:false
            });
        }

    }

    componentDidMount(){
        _isMounted=true;
        if(this.state.profileModel===null){
            if(!this.state.redirectToDashboard){
                if(this.props.token.length>0){
                    profile(this.props.token,this.getProfile);
                    console.log("Load profiel");
                }
                
            }
        }
        
    }
    componentWillUnmount(){
        _isMounted=false;
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