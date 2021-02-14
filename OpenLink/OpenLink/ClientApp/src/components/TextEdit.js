import React, { Component } from 'react';
import '../views/MainStyle.scss';




export class TextEdit extends Component {
    
    constructor(props) {
        
        super(props);

        this.value ='';
        if(this.props.value!==null){
            this.value=this.props.value;
        }

        var hasValue;
        if(this.props.value ===""){
            hasValue=false;
        }else{
            hasValue=true;
        }
       

        this.state={
            isActive : hasValue,
            errorMessage:'',
            isError:false
        }
        this.update = this.update.bind(this);

        
    }

    update(event) {

        this.value=event.target.value
        if( this.value== "") {
            this.setState({ isActive: false })
        } else {
            this.setState({ isActive: true })
        }
        this.props.getValue(this.value);
    
        
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
    var isTextarea=false;
    if(this.props.type==="textarea"){
        isTextarea=true;
    }
    var addFontSize =20;
    if(this.props.fontSize!=null){
        addFontSize=this.props.fontSize;               
    }
    var req ="*";
    if(this.props.optional===true){
        req="";
    }
    var myValue ='';
    if(this.props.value!==null){
        myValue=this.props.value;
    }
    return (
      <div>
          <div className="field-wrap">
                {
                    this.state.isActive ?
                        null : <label style={ {fontSize:addFontSize} }>
                             {this.props.hint}<span className="req">{req}</span> 
                             </label>
                }
                {isTextarea ? 
                <textarea 
                    value={myValue}
                    onChange={this.update}
                    style={ {fontSize:addFontSize} }/> : 
                <input
                    value={myValue}
                    style={ {fontSize:addFontSize} }
                    type={this.props.type}
                    onChange={this.update}/>
                }
                <div>
                
                    {this.state.isError ? <p className="errorMessage">{this.state.errorMessage}</p> : null}
                </div>
            </div>
            
      </div>
     

    );
  }
}