import React, { Component } from 'react';
import { addNewComment,getComments } from '../services/APIService';
import Moment from 'react-moment';


import '../views/MainStyle.scss';
import { TextEdit } from './TextEdit';


export class Comments extends Component {
   
  
    constructor(props) {
      super(props);
      this.state = {
         comment:'',
         comments:[],
         loading:true
      }
     
      this.getComment = this.getComment.bind(this);
      this.cancelComment = this.cancelComment.bind(this);
      this.addThisComment = this.addThisComment.bind(this);
      this.getReturn =this.getReturn.bind(this);

      this.commentRef = React.createRef();
  
  }

 

  componentDidMount(){
      getComments(this.props.APIID,this.getReturn);
  }

  getComment(e){
    this.setState({
        comment:e
    });
  }

  getReturn(data){
    //refresh Comments
    if(data.valid){
        this.setState({
            comments:data.validObject,
            loading:false
    });
    }
  }

  
timeAgo(prevDate){

    const diff = Number(new Date()) - prevDate;
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;
    switch (true) {
        case diff < minute:
            const seconds = Math.round(diff / 1000);
             return `${seconds} ${seconds > 1 ? 'seconds' : 'second'} ago`
        case diff < hour:
            return Math.round(diff / minute) + ' minutes ago';
        case diff < day:
            return Math.round(diff / hour) + ' hours ago';
        case diff < month:
            return Math.round(diff / day) + ' days ago';
        case diff < year:
            return Math.round(diff / month) + ' months ago';
        case diff > year:
            return Math.round(diff / year) + ' years ago';
        default:
            return "";
    }
}


  addThisComment(e){
      
    e.preventDefault();
    var self =this;
    var id =this.props.APIID ;
    var token = this.props.token;
    this.setState({
        loading:true
    },()=>{
        addNewComment(self.state.comment,id,token,self.getReturn);
    })
    
  }
  cancelComment(e){
      e.preventDefault();
      this.setState({comment:''});
  }


  getDate(date){
      var ago = this.timeAgo(new Date(date));
      return (<p className="comment_date">{ago}</p>);
  }
   
    
    render () {
        console.log("comments "+this.state.comments);
        const numRows = this.state.comments.length;
        return(
            <div>
                {this.props.isLoggedIn ?
                
                  
                    <TextEdit
                    value={this.state.comment}
                    type="textarea"
                    optional={true}
                    ref={this.commentRef}
                    hint="Add a Comment here"
                    fontSize={16}
                    getValue={this.getComment}/>:null}
                {this.state.comment.length>0? 
                    <div className="comment_div">
                        <button className="cancel_button" onClick={this.cancelComment}>
                            CANCEL
                        </button>
                        <button className="comment_button" onClick={this.addThisComment}>
                            COMMENT
                        </button>
                    </div>
                :null}
                <br/>
                {this.state.loading?<h2>Loading Comments ... </h2>:
                
                numRows>0?
                    this.state.comments.map((myComment,i) => (
                            
                        <div  key={i}>
                            <div className="comment_list_div">
                                <div className="api-wrapper">
                                    <p className="comment_name">{myComment.name}</p>
                                    {this.getDate(myComment.date)}
                                </div>    
                                <p className="comment_message">{myComment.messege}</p>
                                
                            </div>
                            
                            
                        </div>
                    
                        
                    ))
                :<h2>No comments</h2>}
            </div>
        );
    }
}