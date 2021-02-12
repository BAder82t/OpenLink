import React, { Component } from 'react';
import { APIList } from '../components/APIList';
import { searchAPIs } from '../services/APIService';


export class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apis:null,
            loading:true,
            search:""
        }

        this.getAPIs = this.getAPIs.bind(this);

    }
    getAPIs(apis){
        this.setState({
            apis:apis,
            loading:false
        })

    }
    componentDidMount(){
        console.log(this.state.search);
        searchAPIs("",this.getAPIs);
    }

    render() {
        return (
            <div>
            
                <h3>Dashboard</h3>
                {this.state.loading? <h2>Loading APIs ...</h2>: <APIList sendApi ={this.props.sendApi} myApis={this.state.apis} />}
             </div>

       );
    }
}