import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeCommentVote, updateComment, showEditComment, deleteComment } from '../actions';

class Comment extends Component {

	updateComment(comment){
  	let new_comment = comment
  	let timestamp = Date.now()
  	let new_body = document.getElementById("comBodyEdit").innerText
  	if (new_body !== comment.body && new_body !== ""){
  		new_comment.body = new_body
      let details = { new_comment, timestamp, new_body }
  		this.props.dispatch(updateComment(comment, details))
  	}
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
        	<button type="increment" 
                  onClick={()=>this.props.dispatch(changeCommentVote(this.props.comment, "downVote"))}>-</button>
        	{this.props.comment.voteScore}
					<button type="increment" 
                  onClick={()=>this.props.dispatch(changeCommentVote(this.props.comment, "upVote"))}>+</button>
				</h4>
				{this.props.comment.editing? 
          <button type="cancel" 
                  onClick={()=>this.props.dispatch(deleteComment(this.props.comment))}>
                  Delete Comment</button> : null
        }
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
