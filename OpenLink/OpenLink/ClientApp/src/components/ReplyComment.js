import React, { Component } from 'react';
import '../views/MainStyle.scss';
import { TextEdit } from './TextEdit';
import { DateService } from '../services/DateService';
import { addNewReply, getReplies, voteComment } from '../services/APIService';

export class ReplyComment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comment:'',
            replies:[],
            loading:true,
            open:false,
            replyText:''
        }

        this.getReturn = this.getReturn.bind(this);
        this.GetAllComments = this.GetAllComments.bind(this);
        this.openReplies = this.openReplies.bind(this);
        this.closeReplies = this.closeReplies.bind(this);
        this.showRepliesList =this.showRepliesList.bind(this);
        this.getDate = this.getDate.bind(this);
        this.getComment = this.getComment.bind(this);
        this.addThisComment = this.addThisComment.bind(this);
        this.vote = this.vote.bind(this);
        this.cancelComment = this.cancelComment.bind(this);
        this.showtext = this.showtext.bind(this);


        
        this.commentRef = React.createRef();

    }

    GetAllComments(){
        getReplies(this.props.APIID,this.props.CommentID,this.props.token,this.getReturn)
    }
    

    getReturn(data){
        console.log(data);
        if(data.valid){
            this.setState({
                replies:data.validObject,
                loading:false
        });
        }
    }
    openReplies(e){
        e.preventDefault();
        this.setState({open:true},()=>{
            this.GetAllComments();
        });
    }
    closeReplies(e){
        e.preventDefault();
        this.setState({open:false});
    }

      
    getDate(date){
        var ago = DateService.timeAgo(new Date(date));
        console.log("Date "+ago);
        return (<p className="comment_date">{ago}</p>);
    }   

    getComment(e){
        this.setState({
            comment:e
        });
      }
      vote(e,res,id){
        e.preventDefault();
        voteComment(res,id,this.props.token,this.GetAllComments);
        
    }


      
    addThisComment(e){
        
        e.preventDefault();
        var self =this;
        var id =this.props.APIID ;
        var token = this.props.token;
        this.setState({
           
            loading:true
        },()=>{
            addNewReply(self.state.comment,id,self.state.replyText,token,self.GetAllComments);
            
            this.cancelComment(e);
        });
        
    }
    cancelComment(e){
        e.preventDefault();
        this.setState({comment:'',replyText:''});
    }
    showReplyText(e,commentID){
        e.preventDefault();
        this.setState({replyText:commentID});
    }

    showtext(){
        return(
            <div className="margin_80_left margin_80_bottom">
                <TextEdit
                    value={this.state.comment}
                    type="textarea"
                    optional={true}
                    ref={this.commentRef}
                    hint="Add a Reply here"
                    fontSize={12}
                    getValue={this.getComment}/>

                    {this.state.comment.length>0? 
                        <div className="comment_div">
                            <button className="cancel_button" onClick={this.cancelComment}>
                                CANCEL
                            </button>
                            <button className="comment_button" onClick={this.addThisComment}>
                                REPLY
                            </button>
                        </div>
                    :null}
            </div>
        );
    }

    showRepliesList(){
        const numRows = this.state.replies.length;
        
        return(
            <div>
               
                {this.state.loading?<p className="comment_message">Loading Comments ... </p>:
                
                numRows>0?
                    this.state.replies.map((myComment,i) => (
                       
                        <div  key={i} className="margin_80_left">
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
                                            <div className={"api-wrapper"} onClick={(e) => {this.vote(e,true,myComment.id)}}>
                                                <p className= "comment_voted">Agreed</p>
                                                {this.props.isLoggedIn ?<p className= "comment_vote" onClick={(e) => {this.showReplyText(e,myComment.id)}}>Reply</p>:null}
                                            </div>:
                                            <div className={"api-wrapper"} onClick={(e) => {this.vote(e,false,myComment.id)}}>
                                                <p className= "comment_voted" >Disagreed</p>
                                                {this.props.isLoggedIn ?<p className= "comment_vote" onClick={(e) => {this.showReplyText(e,myComment.id)}}>Reply</p>:null}
                                            </div>
                                    :null}
                                </div>
                                {this.state.replyText===myComment.id?this.showtext():null}
                                
                                
                            </div>
                            <ReplyComment 
                                        APIID={this.props.APIID} 
                                        CommentID ={myComment.id} 
                                        token={this.props.token}
                                        isLoggedIn={this.props.isLoggedIn}/>

                        </div>
                    
                        
                    ))
                :null}
               
            </div>
        );
    }

    render () {
       
        return(
            <div>
                {this.state.open?<p className="comment_name" onClick={this.closeReplies}>Close Replies</p>:
                <p className="comment_name" onClick={this.openReplies}>View Replies</p>}
                {
                    this.state.open? this.showRepliesList():null
                }

                
            </div>
        );
    }
}

