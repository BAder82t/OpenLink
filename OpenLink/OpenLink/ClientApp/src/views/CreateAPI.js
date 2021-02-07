import React, { Component } from 'react';
import './MainStyle.scss';
import { TextEdit } from '../components/TextEdit';
import {AddLink} from '../components/AddLink'
import { createAPI } from '../services/APIService';
import { Redirect } from 'react-router'



export class CreateAPI extends Component {
    constructor(props) {
        super(props);

        this.titleRef = React.createRef();
        this.descriptionRef = React.createRef();


        this.state ={
            title:'',
            description:'',
            links:[],
            addNewLink:false,
            redirectProfile:false,
            isError:false,
            errorMessage:''
        }
        this.getTitle = this.getTitle.bind(this);
        this.getDescription= this.getDescription.bind(this);
        this.addLinkComponent = this.addLinkComponent.bind(this);
        this.addLinkToList =  this.addLinkToList.bind(this);
        this.done = this.done.bind(this);
        this.getAPIResponse = this.getAPIResponse.bind(this);
    }

    getTitle(value){
        this.setState({title:value});
    }
    getDescription(value){
        this.setState({description:value});
    }

    addLinkComponent(e){
        e.preventDefault();
        this.setState({
            addNewLink:true

        });
    }
    removeLinkComponent(){
        this.setState({
            addNewLink:false
        });
    }

    addLinkToList(link){
        console.log("link added");
        this.setState(state => {
            const list = state.links.push(link);
       
            return {
              list
            };
          },() =>{
              this.removeLinkComponent();
          });
    }
    done(e){
        e.preventDefault();
        console.log("DONE clicked");
        if(this.state.links && this.state.links.length > 0){
            console.log("links is not empty"+ this.state.links);
            var api = {
                title:this.state.title,
                description: this.state.description,
                links:this.state.links,
            }
            createAPI(this.props.token,api,this.getAPIResponse);
        }else{
           

            console.log("links is empty");
            
            this.setState({
                isError:true,
                errorMessage:"Please add at least one Link"
            });
        }
        
    }
    getAPIResponse(data){
        console.log("get response to redirect" + data.valid);
        if(data.valid === true){
            this.setState({
                redirectProfile:true
            });
        }else{
            this.setState({
                isError:true,
                errorMessage:"Something went wrong"
            });
        }
    }

   

    render() {
        console.log("redirect "+this.state.redirectProfile);
        if(this.state.redirectProfile){
          
            return <Redirect to='/'/>;
        }else{
            return(
                <div  className="scroll">
                    <div className="big-form">
                        <h2>Add you API Service</h2>
                        <TextEdit
                            type="text"
                            ref={this.titleRef}
                            hint="Title"
                            getValue ={this.getTitle}
                            fontSize={40}/>
                        <TextEdit
                            optional={true}
                            type="textarea"
                            ref={this.descriptionRef}
                            hint="Description"
                            getValue={this.getDescription}/>
                        <div className="container">
                            <h2 className="left-half">My Links</h2> 
                            <div className="right-half">
                            {this.state.addNewLink ? null :
                            <button className="add-link" onClick={this.addLinkComponent}>  Add Link </button>}
                            </div>
    
                            
                        </div>
                        <div>
                            <ul className="tab-group ">
                                {this.state.links.map((link,i) => (
                                    <li className="wrapper" key={i}>
                                        <p className="method">Method: {link.method}</p>
                                        <p className="url">URL: {link.url}</p>
                                        <p className="delete-link">Delete</p>
                                        <p className="edit-link">Edit</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {this.state.addNewLink ? <AddLink addLinkToList={this.addLinkToList}/> : null}
                        {this.state.isError ? <p className="errorMessage-main">{this.state.errorMessage}</p> : null}
                        <button className="button button-block" onClick={this.done}>Done</button>
                    
                    </div>
                    
                    
                </div>
            );
        }
        
    }
}