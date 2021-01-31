import React, { Component } from 'react';
import { profile } from '../services/APIService';
import '../views/MainStyle.scss';


export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state ={
            profileModel:null,
            loading:true
        }
        this.getProfile = this.getProfile.bind(this);
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
        profile(this.props.token,this.getProfile);
    }

    static renderProfileComponent(profileModel){
        return(
            <div className="profile_form">

                <form className="container">
                    <div className="left-half">
                        <p className="profile_name">Hello, {profileModel.name}</p>
                        <p className="profile_username">Username: {profileModel.username}</p>
                    </div>
                    
                </form>

            </div>
        );
    }

    render() {
        if(this.state.loading){
            return (
                <div>
                <h3>Loading...</h3>
             </div>
            );
        }else{
            return Profile.renderProfileComponent(this.state.profileModel);
        }
        
    }
}