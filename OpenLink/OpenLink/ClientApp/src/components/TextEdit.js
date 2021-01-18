import React, { Component } from 'react';
import '../views/MainStyle.scss';




export class TextEdit extends Component {
    constructor(props) {
        super(props);
        this.state={
            isActive : false,
            value:''
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
                        </div>
      </div>
    );
  }
}