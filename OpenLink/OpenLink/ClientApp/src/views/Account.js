import React, { Component } from 'react';
import { Profile } from '../components/Profile';
import './MainStyle.scss';
import { Redirect } from 'react-router'


export class Account extends Component {
    constructor(props) {
        super(props);
        this.state ={
            creatAPI:false
        }
        
        
    }

    

    createPage = () => {
        console.log("goto craeet aPI"+ this.state.creatAPI);
        this.setState({
            creatAPI: true
        });
    }

    render() {
        if (this.state.creatAPI) {
            return <Redirect to='/createAPI' />
        }else{
            return(
                    <div>
                    
                        <Profile token ={this.props.token} />
                        <div className="button-block">
                                <button 
                                    className="profile_center" 
                                    onClick={this.createPage}> 
                                Share an API service</button>
                        </div>
                    </div>
            );
        }
        
    }

}