import React, { Component } from 'react';
import { APIList } from '../components/APIList';
import { searchAPIs } from '../services/APIService';
import { TextEdit } from '../components/TextEdit';
import ReactPaginate from 'react-paginate';


export class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apis:null,
            loading:true,
            search:'',
            typing: false,
            pageNum:0,
            typingTimeout: 0,
            maxNum:0
        }

        this.getAPIs = this.getAPIs.bind(this);
        this.getSearch = this.getSearch.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    getAPIs(apis){
        this.setState({
            apis:apis.validObject.list,
            maxNum:apis.validObject.obj,
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
            pageNum:0,
            typingTimeout: setTimeout(function () {
                searchAPIs(value,self.state.pageNum,self.getAPIs);
              }, 500),
            loading:true
            });
    }
    componentDidMount(){
        console.log(this.state.search);
        searchAPIs("",this.state.pageNum,this.getAPIs);
    }
    handlePageClick(data){
        var self = this;
        let selected =data.selected;
        console.log("clicked slected page")
        this.setState({pageNum:selected, loading:true}, () =>{
            searchAPIs(self.state.search,self.state.pageNum,self.getAPIs);
            console.log(this.state.pageNum);
        });
    }

    render() {
        console.log("render"+this.state.apis);
        return (
            <div className="scroll">
                 <div className="profile_form">
                    <TextEdit
                                value={this.state.search}
                                type="text"
                                optional={true}
                                hint="Search"
                                getValue ={this.getSearch}
                                fontSize={30}/>
                 </div>
                
                <div className="profile_form">
              
                    {this.state.loading? <h2>Getting APIs ...</h2>: <APIList sendApi ={this.props.sendApi} myApis={this.state.apis} />}
                </div>
                <div className="center-list">
                    <div className="react-paginate">
                        <ReactPaginate 
                            onPageChange={this.handlePageClick}
                            pageCount={this.state.maxNum}
                            pageRangeDisplayed={3} 
                            marginPagesDisplayed={1}
                            previousLabel={'PREVIOUS'}
                            nextLabel={'NEXT'}
                            breakLabel={'...'}
                            />
                    </div>
                    <br/>
                    <br/>
                </div>
                
                
               
             </div>

       );
    }
}