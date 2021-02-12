import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';



export class APIList extends Component {
   
  
    constructor(props) {
      super(props);
      this.state = {
          apis: this.props.myApis,
          redirect:false,
          myApi:null
      }
     
      this.redirect = this.redirect.bind(this);
  
  }

    redirect(e,api){
        
       e.preventDefault();
        this.setState({
            redirect:true,
            myApi:api
        },()=>{
            this.props.sendApi(api);
        })
    }
  

   
    
    render () {
        if(this.state.redirect){
            return(
                <Redirect
                        to={{
                          pathname: "/api",
                          state: { api: this.state.myApi }
                        }}
                      />
            );
        }else{
            return (
                <div>
                    
                    
                    <div className="api-wrapper">
        
                        {this.state.apis.validObject.map((myApi,i) => (
                           
                            <div className="api-list-div" key={i} onClick={(e) => {this.redirect(e,myApi)}}>
                                <h3 className="api-list-title">{myApi.title}</h3>
                                <p className="api-list-description">{myApi.description}</p>
                                
                            </div>
                          
                            
                        ))}
        
                    </div>
                   
                    
                </div>
              );
        }
     
      
    }
  }