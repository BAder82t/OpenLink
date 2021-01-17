import React, { Component } from 'react';
import '../views/MainStyle.scss';




export class TextEdit extends Component {
    constructor(props) {
        super(props);
        this.state={
            isActive : false
        }
        this.update = this.update.bind(this);
        
    }

    update(event) {

        this.setState({ password: event.target.value }, function () { this.check(); });
        
    }
    check() {
        console.log("new password = " + this.state.password);
        if (this.state.password == "") {
            this.setState({ isActive: false })
        } else {
            this.setState({ isActive: true })

        }
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