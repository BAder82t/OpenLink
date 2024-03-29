import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Comments } from '../components/Comments';
import './MainStyle.scss';


export class APIPage extends Component {
   

    constructor(props) {
        super(props);
        this.state ={
            api:this.props.getApi,
            redirectToDashboard : false
        }
        this.NewlineText = this.NewlineText.bind(this);
  
        
    }
    NewlineText(props) {
        const text = props.text;
        return text.split('\n').map(str => <p className="profile_name">{str}</p>);
      }
      
   
    render() {
        
        if(this.state.api !== null){
            console.log(this.state.api);
        
            return(
                <div className="scroll">
                    <div className="profile_form">
                        <h2 className="profile_name">{this.state.api.title}</h2>
                        <p className="profile_name">{"By: "+this.state.api.name}</p>
                        <p className="profile_name">{this.state.api.description}</p>
                    </div>

                    
                    
                    {this.state.api.links.map((link,i) => (
                               
                            <div className="profile_form" key={i}>
                                <this.NewlineText text={"Method: \n"+link.method}/>
                                <br/>
                                <this.NewlineText text={"URL: \n"+link.url}></this.NewlineText>
                                <br/>
                                <this.NewlineText text={"Description: \n"+link.description}></this.NewlineText>
                                <br/>
                                <this.NewlineText text={"Input Data: \n"+link.inputData}/>
                                <br/>
                                <this.NewlineText text={"Output Data: \n"+link.outputData}/>
                                
                            </div>
                            
                            
                        ))}
                    <div className="profile_form">
                        <h2 className="profile_name">Comments</h2>
                        <Comments token={this.props.token} isLoggedIn={this.props.isLoggedIn} APIID ={this.state.api.id}/>
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