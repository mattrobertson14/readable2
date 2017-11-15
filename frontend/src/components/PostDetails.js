import React, { Component } from 'react';
import '../stylesheets/App.css';
import { connect } from 'react-redux';
import * as ReadableAPI from '../utils/ReadableAPI';
import Comment from './Comment.js';
import { addComments } from '../actions';

class PostDetails extends Component {

	componentDidMount() {
		if (this.props.post_id != undefined){
			ReadableAPI.getPostComments(this.props.post_id).then(res => {
				this.props.dispatch(addComments(res, this.props.post_id))
			}).catch(error => {
				console.log("No comments were retrieved")
			})
		}
	}

  render() {
  	let post = this.props.postsById[this.props.post_id]
  	let comments = (post && post.comments? post.comments : [])
    return (
      <div className="PostDetails">
        <h2>Post Details</h2>
        <h3>Title: {post && post.title? post.title : null}</h3>
      	{comments.map(c => (
      		<Comment comment={this.props.commentsById[c]} key={c}/>
      	))}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts,
    postsById: state.postsById,
    commentsById: state.commentsById,
    post_id: ownProps.id
  }
}

export default connect(mapStateToProps)(PostDetails);
