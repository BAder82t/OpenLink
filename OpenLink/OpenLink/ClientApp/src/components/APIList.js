import React, { Component } from 'react';



export class APIList extends Component {
   
  
    constructor(props) {
      super(props);
      this.state = {
          apis: this.props.myApis
      }
      console.log(this.props.myApis);
  
  }
  
   
    
    render () {
     
      return (
        <div>
            <div>
            
                <div className="api-wrapper">

                    {this.state.apis.validObject.map((api,i) => (
                        <div className="api-list-div" key={i}>
                            <h3 className="api-list-title">{api.title}</h3>
                            <p className="api-list-description">{api.description}</p>
                            
                        </div>
                    ))}

                </div>
            </div>
            
        </div>
      );
    }
  }