import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ReadableAPI from '../utils/ReadableAPI.js';
import { editComment } from '../actions';

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

  render() {
    return (
      <div className="Comment">
        <h4 className="body">
        	<span className="author">
        		{this.props.comment.author}: {this.props.comment.body}
        	</span>
        </h4>
        <h4 className="voteScore">
        	Vote Score: 
        	<button type="increment" onClick={()=>this.downVote(this.props.comment)}>-</button>
        	{this.props.comment.voteScore}
					<button type="increment" onClick={()=>this.upVote(this.props.comment)}>+</button>
				</h4>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    commentsById: state.commentsById,
    comment: ownProps.comment
  }
}

export default connect(mapStateToProps)(Comment);
