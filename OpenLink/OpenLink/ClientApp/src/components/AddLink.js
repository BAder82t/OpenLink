import React, { Component } from 'react';
import '../views/MainStyle.scss';
import { TextEdit } from './TextEdit';


export class AddLink extends Component {
    constructor(props) {
        super(props);


        
        this.descriptionRef = React.createRef();
        this.urlRef = React.createRef();
        this.inputModelRef = React.createRef();
        this.outputModelRef = React.createRef();

        
        if(this.props.link === undefined ){
            this.state ={
                url:'',
                method:"0",
                description:'',
                inputData:'',
                outputData:''
            }
        }else{
            this.state ={
                method:this.props.link.method,
                url:this.props.link.url,
                description:this.props.link.description,
                inputData:this.props.link.inputData,
                outputData:this.props.link.outputData
            }
    
            
        }
        
        this.getMethod=this.getMethod.bind(this);
        this.getURL = this.getURL.bind(this);
        this.getDescription =this.getDescription.bind(this);
        this.getOutput =this.getOutput.bind(this);
        this.getInput = this.getInput.bind(this);
        this.addLink = this.addLink.bind(this);


        


        }

    getMethod(e){
        this.setState({method:e.target.value});
    }
    getDescription(value){
        this.setState({description:value});
    }
    getURL(value){
        this.setState({url:value});
    }
    getInput(value){
        this.setState({inputData:value});
    }
    getOutput(value){
        this.setState({outputData:value});
    }

    addLink(e){
        e.preventDefault();

        this.urlRef.current.removeError();
        this.outputModelRef.current.removeError();
        this.inputModelRef.current.removeError();

        var isValid = true;
        console.log(this.state.method);
        if(this.state.method ==="0"){
            
            this.outputModelRef.current.showErrorMessage("Please select a method");
            isValid = false;
        }

        if(this.state.inputData ===''){
            this.inputModelRef.current.showErrorMessage("Please add the input Data");
            isValid = false;
        }
        if(this.state.outputData ===''){
            this.outputModelRef.current.showErrorMessage("Please add the output Data");
            isValid = false;
        }
        if(this.state.url ===''){
            this.urlRef.current.showErrorMessage("Please add the link url");
            isValid = false;
        }

        var link = {
            method:this.state.method,
            url: this.state.url,
            description: this.state.description,
            outputData:this.state.outputData,
            inputData:this.state.inputData
        }
        if(isValid){
            this.props.addLinkToList(link);
        }
        
    }
    
    render() {
       

        return( 
            <div>
                <div className="select-div-css"> 
                    <select className="select-css" onChange={this.getMethod} value={this.state.method}>
                        <option value="0">Select Link Method</option>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="PATCH">PATCH</option>
                        <option value="DELETE">DELETE</option>
                        <option value="COPY">COPY</option>
                        <option value="HEAD">HEAD</option>
                        <option value="OPTIONS">OPTIONS</option>
                        <option value="LINK">LINK</option>
                        <option value="UNLINK">UNLINK</option>
                        <option value="PURGE">PURGE</option>
                        <option value="LOCK">LOCK</option>
                        <option value="UNLOCK">UNLOCK</option>
                        <option value="PROPFIND">PROPFIND</option>
                        <option value="VIEW">VIEW</option>
                    </select>
                </div>
                

                <TextEdit
                    value={this.state.url}
                    type="text"
                    ref={this.urlRef}
                    hint="URL"
                    fontSize={16}
                    getValue={this.getURL}/>
                <TextEdit
                    value={this.state.description}
                    type="textarea"
                    ref={this.descriptionRef}
                    hint="Description"
                    getValue ={this.getDescription}
                    fontSize={16}/>
                <TextEdit
                    value={this.state.inputData}
                    type="textarea"
                    ref={this.inputModelRef}
                    hint="Input Model"
                    getValue={this.getInput}
                    fontSize={16}/>
                <TextEdit
                    value={this.state.outputData}
                    type="textarea"
                    ref={this.outputModelRef}
                    hint="Output Model"
                    getValue={this.getOutput}
                    fontSize={16}/>
                <button  className="add-link" onClick={this.addLink}>Add this Link</button>

            </div>
        );
            
        
        
        
    }
}