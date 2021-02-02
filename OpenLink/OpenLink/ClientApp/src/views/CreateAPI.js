import React, { Component } from 'react';
import './MainStyle.scss';
import { TextEdit } from '../components/TextEdit';



export class CreateAPI extends Component {
    constructor(props) {
        super(props);

        this.titleRef = React.createRef();
        this.descriptionRef = React.createRef();


        this.state ={
            title:'',
            description:'',
            links:[]
        }
        this.getTitle = this.getTitle.bind(this);
        this.getDescription= this.getDescription.bind(this);
        this.addLink = this.addLink.bind(this);
        
    }

    getTitle(value){
        this.setState({title:value});
    }
    getDescription(value){
        this.setState({description:value});
    }

    addLink(e){
        console.log("link added");
        e.preventDefault();
        var link ={
            url:"http://test.jhjhjhjhjhjhjskjdskdjsksjdksdjkdsjkhjhjhjhcom",
            method:"GET"
        }

        this.setState(state => {
            const list = state.links.push(link);
       
            return {
              list
            };
          });
    }

   

    render() {
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
                        <h3 className="left-half">Links</h3> 
                        <div className="right-half">
                            <button className="add-link" onClick={this.addLink}>  Add Link </button>
                        </div>

                        
                    </div>
                    <div>
                        <ul className="tab-group ">
                            {this.state.links.map(link => (
                                <li className="wrapper">
                                    <p className="method">Method: {link.method}</p>
                                    <p className="url">URL: {link.url}</p>
                                    <p className="delete-link">Delete</p>
                                    <p className="edit-link">Edit</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    
                    <button className="button button-block" >Done</button>
                
                </div>
                
                
            </div>
       );
        
    }
}