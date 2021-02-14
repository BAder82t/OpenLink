import React, { Component } from 'react';
import { APIList } from '../components/APIList';
import { searchAPIs } from '../services/APIService';
import { TextEdit } from '../components/TextEdit';



export class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apis:null,
            loading:true,
            search:'',
            typing: false,
            typingTimeout: 0
        }

        this.getAPIs = this.getAPIs.bind(this);
        this.getSearch = this.getSearch.bind(this);
    }

    getAPIs(apis){
        this.setState({
            apis:apis,
            loading:false
        });
    }
    getSearch(value){
        const self = this;
        if (self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout);
         }
        self.setState({
            search:value,
            typing: false,
            typingTimeout: setTimeout(function () {
                searchAPIs(value,self.getAPIs);
              }, 500),
            loading:true
            });
    }
    componentDidMount(){
        console.log(this.state.search);
        searchAPIs("",this.getAPIs);
    }

    render() {
        return (
            <div className="scroll">
                <div className="profile_form">
                    <h3>Dashboard</h3>
                </div>
                <div className="profile_form">
                <TextEdit
                            value={this.state.search}
                            type="text"
                            optional={true}
                            hint="Search"
                            getValue ={this.getSearch}
                            fontSize={30}/>

                    {this.state.loading? <h2>Getting APIs ...</h2>: <APIList sendApi ={this.props.sendApi} myApis={this.state.apis} />}
                </div>
               
             </div>

       );
    }
}