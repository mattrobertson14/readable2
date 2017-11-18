import React, { Component } from 'react';
import '../stylesheets/App.css';
import 'font-awesome/css/font-awesome.min.css'
import { connect } from 'react-redux';
import * as ReadableAPI from '../utils/ReadableAPI';
import Comment from './Comment.js';
import { addComments, editPost } from '../actions';
import { Link } from 'react-router-dom';

class PostDetails extends Component {

	componentDidMount() {
		if (this.props.post_id !== undefined){
			ReadableAPI.getPostComments(this.props.post_id).then(res => {
				this.props.dispatch(addComments(res, this.props.post_id))
			}).catch(error => {
				console.log("No comments were retrieved")
			})
		}
	}

	downVote(post) {
		ReadableAPI.changeVote(post.id, "downVote").then(res => {
			let new_post = this.props.postsById[post.id]
			new_post.voteScore--
			this.props.dispatch(editPost(post.id, new_post))
		}).catch(error => {
			console.log("Server could not be reached")
		})
	}

	upVote(post) {
		ReadableAPI.changeVote(post.id, "upVote").then(res => {
			let new_post = this.props.postsById[post.id]
			new_post.voteScore++
			this.props.dispatch(editPost(post.id, new_post))
		}).catch(error => {
			console.log("Server could not be reached")
		})	
	}

  render() {
  	let post = this.props.postsById[this.props.post_id]
  	let comments = (post && post.comments? post.comments : [])
    return (
      <div className="PostDetails">
      	<Link to="/">
  				<button type="back">
  					<i className="fa fa-arrow-left" /> Back To Main Page
  				</button>
      	</Link>
        <h2 className="PageTitle">Post Details</h2>
        {post && post.id?
        	<span>
	        <h3>Title: {post.title}</h3>
	        <h4>Author: {post.author}</h4>
	        <h4>Body: {post.body}</h4>
	        <h4>Category: {post.category? post.category.toUpperCase() : null}</h4>
	        <h4>
	        	Vote Score: 
	        	<button type="increment" onClick={()=>this.downVote(post)}>-</button>
	        	{post.voteScore}
						<button type="increment" onClick={()=>this.upVote(post)}>+</button>
					</h4>
	      	{comments.map(c => (
	      		<Comment comment={this.props.commentsById[c]} key={c}/>
	      	))}
	      	</span>
	      	:
	      	<h2 className="no-post-found">
	      		There is no post with id: {this.props.post_id}.<br/>
	      		Please navigate back to the home page.<br/>
	      		Thank you
	      	</h2>
	      }
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
