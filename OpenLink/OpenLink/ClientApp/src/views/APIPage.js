import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './MainStyle.scss';


export class APIPage extends Component {
   

    constructor(props) {
        super(props);
        this.state ={
            api:this.props.getApi,
            redirectToDashboard : false
        }
        if(this.state.api !== undefined){

        }
  
        
    }
   
    render() {
        
        if(this.state.api !== null){
            console.log(this.state.api);
        
            return(
                <div className="scroll">
                    <div className="profile_form">
                        <h2 className="profile_name">{this.state.api.title}</h2>
                        <p className="profile_name">{this.state.api.description}</p>
                    </div>
                    
                    <h3>Links:</h3>
                    {this.state.api.links.map((link,i) => (
                               
                            <div className="profile_form" key={i}>
                                <p className="profile_name">Method:{link.method}</p>
                                <p className="profile_name">URL:{link.url}</p>
                                <p className="profile_name">Description:{link.description}</p>
                                <p className="profile_name">InputData:{link.inputData}</p>
                                <p className="profile_name">OutputData:{link.outputData}</p>
                                
                            </div>
                            
                            
                        ))}
                    <div className="profile_form">
                        <h2 className="profile_name">Reviews Coming Soon...</h2>
                    </div>
                    
                </div>
            );
        }else{
            return(
                <Redirect to='/'/>
            );
            
        }
        
        
    }
}