import React, { Component } from 'react';
import '../views/MainStyle.scss';




export class TextEdit extends Component {
    constructor(props) {
        super(props);
        
       

        this.state={
            isActive : false,
            value:'',
            errorMessage:'',
            isError:false
        }
        this.update = this.update.bind(this);

        
    }

    update(event) {

        this.setState({ value:event.target.value }, function () { 
            if (this.state.value == "") {
                this.setState({ isActive: false })
            } else {
                this.setState({ isActive: true })
    
            }
            this.props.getValue(this.state.value);
            
        });
        
    }
    
    showErrorMessage(message){
        this.setState({
            isError:true,
            errorMessage:message
        })
        
    }
    removeError(){
        this.setState({
            isError:false,
            errorMessage:''
        })
    }
    
    
    
        

  render () {
    return (
      <div>
          <div className="field-wrap">
                {
                    this.state.isActive ?
                        null : <label> {this.props.hint}<span className="req">*</span> </label>
                }
            
                <input
                    type={this.props.type}
                    
                    onChange={this.update}
                    />
                <div>
                    {this.state.isError ? <p className="errorMessage">{this.state.errorMessage}</p> : null}
                </div>
            </div>
            
      </div>
     

    );
  }
}