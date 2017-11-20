import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ReadableAPI from '../utils/ReadableAPI.js';
import { editComment, showEditComment, deleteCommentFromState } from '../actions';

class Comment extends Component {

	downVote(comment) {
		ReadableAPI.changeVoteComment(comment.id, "downVote").then(res => {
			let new_post = this.props.commentsById[comment.id]
			new_post.voteScore--
			this.props.dispatch(editComment(comment.id, new_post))
		}).catch(error => {
			console.log("Server could not be reached")
		})
	}

	upVote(comment) {
		ReadableAPI.changeVoteComment(comment.id, "upVote").then(res => {
			let new_post = this.props.commentsById[comment.id]
			new_post.voteScore++
			this.props.dispatch(editComment(comment.id, new_post))
		}).catch(error => {
			console.log("Server could not be reached")
		})
	}

	updateComment(comment){
  	let new_comment = comment
  	let timestamp = Date.now()
  	let new_body = document.getElementById("comBodyEdit").innerText
  	if (new_body !== comment.body && new_body !== ""){
  		new_comment.body = new_body
  		ReadableAPI.editComment(comment.id, timestamp, new_body).then(res => {
  			this.props.dispatch(editComment(comment.id, new_comment))
  			this.props.dispatch(showEditComment(false,comment))
  		}).catch(error => {
  			console.log("Server could not be reached")
  		})
  	}
  }

	deleteComment(comment){
  	ReadableAPI.deleteComment(comment.id).then(res => {
  		this.props.dispatch(deleteCommentFromState(comment.id, comment.parentId))
  	}).catch(error => {
  		console.log("Post could not be deleted")
  	})
  }

  render() {
    return (
      <div className="Comment">
      	{this.props.comment.editing?
      		<span>
      		<button type="increment" title="Save Comment" className="commentSave" onClick={()=>this.updateComment(this.props.comment)}>
      			<i className="fa fa-check"/>
      		</button>
      		<button type="increment" title="Cancel Edit" className="commentCancel" onClick={()=>this.props.dispatch(showEditComment(false,this.props.comment))}>
      			<i className="fa fa-times"/>
      		</button>
        	<h4>Body: </h4>
        	<h4 type="input"
						 contentEditable="true"
						 className="bodyEdit" 
						 id="comBodyEdit"
						 dangerouslySetInnerHTML={{ __html: this.props.comment.body }}
					/>
					</span>
					:
					<h4 className="body">
        	<span className="author">
        		<button title="Edit Comment" type="increment" onClick={()=>this.props.dispatch(showEditComment(true,this.props.comment))}>
        			<i className="fa fa-pencil"/>
        		</button>
        		{this.props.comment.author + ": "} 
        	</span>
        	{this.props.comment.body}
        	</h4>
      	}
        <h4 className="voteScore">
        	Vote Score: 
        	<button type="increment" onClick={()=>this.downVote(this.props.comment)}>-</button>
        	{this.props.comment.voteScore}
					<button type="increment" onClick={()=>this.upVote(this.props.comment)}>+</button>
				</h4>
				{this.props.comment.editing? <button type="cancel" onClick={()=>this.deleteComment(this.props.comment)}>Delete Comment</button> : null}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    commentsById: state.commentsById,
    showCommentEdit: state.showCommentEdit,
    comment: ownProps.comment
  }
}

export default connect(mapStateToProps)(Comment);
