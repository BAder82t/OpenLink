import React, { Component } from 'react';

export class Register extends Component {





    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form">
                <form>
                    <div>
                        <h2>Register</h2>
                        
                        <input
                            type="text"

                            //onChange={this.updateUsername}
                            
                            />
                    </div>
                    
                    <br />
                    
                    <br/>
                    <button className="button button-block">Register</button>
                </form>
            </div>
        );
        
    }
}