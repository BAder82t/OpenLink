import React, { Component } from 'react';
import { addNewComment,addNewReply,getComments, voteComment } from '../services/APIService';


import '../views/MainStyle.scss';
import { TextEdit } from './TextEdit';
import { DateService } from '../services/DateService';
import { ReplyComment } from './ReplyComment';


export class Comments extends Component {
   
  
    constructor(props) {
      super(props);
      this.state = {
         comment:'',
         comments:[],
         loading:true,
         replyText:'',
         replyComment:''
      }
     
      this.getComment = this.getComment.bind(this);
      this.cancelComment = this.cancelComment.bind(this);
      this.addThisComment = this.addThisComment.bind(this);
      this.getReturn =this.getReturn.bind(this);
      this.getAllComments = this.getAllComments.bind(this);
      this.vote = this.vote.bind(this);
      this.showtext = this.showtext.bind(this);
      this.showReplyText = this.showReplyText.bind(this);
      this.getReply = this.getReply.bind(this);
      this.replyThisComment = this.replyThisComment.bind(this);
      this.cancelReply = this.cancelReply.bind(this);
      this.stopLoading = this.stopLoading.bind(this);

      this.commentRef = React.createRef();
  
  }

 

  componentDidMount(){
      this.getAllComments();
  }
  getAllComments(){
    getComments(this.props.APIID,this.props.token,this.getReturn);
  }
  stopLoading(){
    this.setState({
       
        loading:false
    });
  }

  getComment(e){
    this.setState({
        comment:e
    });
  }
  getReply(e){
    this.setState({
        replyComment:e
    });
  }


  getReturn(data){
    //refresh Comments
    console.log("load Comments");
    if(data.valid){
        this.setState({
            comments:data.validObject,
            loading:false
    });
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
        addNewComment(self.state.comment,id,token,self.getAllComments);
        this.cancelComment(e);
    });
    
  }
  replyThisComment(e){
      
    e.preventDefault();
    var self =this;
    var id =this.props.APIID ;
    var token = this.props.token;
    this.setState({
        
        loading:true
    },()=>{
        addNewReply(self.state.replyComment,id,self.state.replyText,token,self.stopLoading);
        
        this.cancelReply(e);
    });
    
  }
  cancelComment(e){
      e.preventDefault();
      this.setState({comment:''});
  }
  cancelReply(e){
    e.preventDefault();
    this.setState({replyComment:''});
  }

  
  getDate(date){
      var ago = DateService.timeAgo(new Date(date));
      console.log("Date "+ago);
      return (<p className="comment_date">{ago}</p>);
  }
  vote(e,res,id){
      e.preventDefault();
      voteComment(res,id,this.props.token,this.getAllComments);
  }

  showReplyText(e,commentID){
    e.preventDefault();
    this.setState({replyText:commentID});
}
  showtext(){
    return(
        <div className="margin_80_left margin_80_bottom">
            <TextEdit
                value={this.state.replyComment}
                type="textarea"
                optional={true}
                hint="Add a Reply here"
                fontSize={12}
                getValue={this.getReply}/>

                {this.state.replyComment.length>0? 
                    <div className="comment_div">
                        <button className="cancel_button" onClick={this.cancelComment}>
                            CANCEL
                        </button>
                        <button className="comment_button" onClick={this.replyThisComment}>
                            REPLY
                        </button>
                    </div>
                :null}
        </div>
    );
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
                                
                                <div className=" api-wrapper">
                                    {myComment.vote==0?null:<p className="comment_voteNum">{myComment.vote}</p>}  
                                    <p className="comment_name">{myComment.name}</p>
                                    {this.getDate(myComment.realDate)}
                                </div> 
                                <div className={myComment.vote==0?null:"margin_80_left"}>
                                    <p className="comment_message">{myComment.messege}</p>
                                    {this.props.isLoggedIn? 
                                        myComment.didVote==0?
                                        <div className="api-wrapper">
                                            <p className= {"comment_vote"} onClick={(e) => {this.vote(e,true,myComment.id)}}>Agree</p>
                                            <p className= "comment_vote" onClick={(e) => {this.vote(e,false,myComment.id)}}>Disagree</p>
                                            {this.props.isLoggedIn ?<p className= "comment_vote" onClick={(e) => {this.showReplyText(e,myComment.id)}}>Reply</p>:null}
                                        
                                        </div>:
                                        myComment.didVote==1?
                                            <div className={"api-wrapper"}>
                                                <p className= "comment_voted"onClick={(e) => {this.vote(e,true,myComment.id)}}>Agreed</p>
                                                {this.props.isLoggedIn ?<p className= "comment_vote" onClick={(e) => {this.showReplyText(e,myComment.id)}}>Reply</p>:null}
                                        
                                            </div>:
                                            <div className={"api-wrapper"}>
                                                <p className= "comment_voted" onClick={(e) => {this.vote(e,false,myComment.id)}}>Disagreed</p>
                                                {this.props.isLoggedIn ?<p className= "comment_vote" onClick={(e) => {this.showReplyText(e,myComment.id)}}>Reply</p>:null}
                                        
                                            </div>
                                    :null}
                                     {this.state.replyText===myComment.id?this.showtext():null}
                                    <ReplyComment 
                                        APIID={this.props.APIID} 
                                        CommentID ={myComment.id} 
                                        replyNum ={myComment.replyNum}
                                        token={this.props.token}
                                        isLoggedIn={this.props.isLoggedIn}/>
                                </div>
                                
                                
                            </div>
                        </div>
                    
                        
                    ))
                :<h2>No comments</h2>}
            </div>
        );
    }
}