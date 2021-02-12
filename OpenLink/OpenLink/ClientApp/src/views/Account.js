import React, { Component } from 'react';
import { Profile } from '../components/Profile';
import './MainStyle.scss';
import { Redirect } from 'react-router'
import { getMyAPIs } from '../services/APIService';
import { APIList } from '../components/APIList';

var _isMounted = false;
export class Account extends Component {
   

    constructor(props) {
        super(props);
        this.state ={
            creatAPI:false,
            loadApis:true,
            myApis:null
        }
       
        this.getAPIs = this.getAPIs.bind(this);
    }

    getAPIs(apis){
        if(_isMounted){
            if(apis.valid){
           
                this.setState({
                    loadApis:false,
                    myApis:apis
                });
            }
        }

    }

    componentDidMount(){
       _isMounted=true;

        if(this.state.myApis===null){
            getMyAPIs(this.props.token,this.getAPIs); 
        }
       
    }
    componentWillUnmount(){
        _isMounted=false;
    }

    createPage = () => {
       
        this.setState({
            creatAPI: true
        });
    }

    render() {
        console.log("load Apis  "+this.state.loadApis);
        if (this.state.creatAPI) {
            return <Redirect to='/createAPI' />
        }else{
            return(
                    <div className="scroll">
                        
                    
                        <Profile token ={this.props.token} logout={this.props.logout} />
                        <div className="profile_form">
                            <div className="button-block">
                                    <button 
                                        className="profile_center" 
                                        onClick={this.createPage}> 
                                    Share an API service</button>
                            </div>
                            <br/>
                            <br/>
                            {
                                this.state.loadApis ? <h2>Loading APIs ...</h2> :  <APIList sendApi ={this.props.sendApi} myApis={this.state.myApis}/>
                            }
                        </div>
                        
                    </div>
            );
        }
        
    }

}