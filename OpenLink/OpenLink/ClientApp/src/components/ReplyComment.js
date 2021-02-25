import React, { Component } from 'react';
import '../views/MainStyle.scss';
import { TextEdit } from './TextEdit';
import { DateService } from '../services/DateService';
import { getComments, getReplies } from '../services/APIService';

export class ReplyComment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comment:'',
            replies:[],
            loading:true
        }

        this.getReturn = this.getReturn.bind(this);
        this.GetAllComments = this.GetAllComments.bind(this);
    }

    GetAllComments(e){
        e.preventDefault();
        getReplies(this.props.APIID,this.props.CommentID,this.props.token,this.getReturn)
    }

    getReturn(data){
        if(data.valid){
            this.setState({
                comments:data.validObject,
                loading:false
        });
        }
    }

    render () {
       
        return(
            <div>
                <p className="comment_name">View Comments</p>

            </div>
        );
    }
}

