import React, { Component } from 'react';
import '../stylesheets/App.css';
import 'font-awesome/css/font-awesome.min.css'
import { connect } from 'react-redux';
import * as ReadableAPI from '../utils/ReadableAPI';
import Comment from './Comment.js';
import { addComments } from '../actions';
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
        <h3>Title: {post? post.title : null}</h3>
        <h4>Author: {post? post.author : null}</h4>
        <h4>Body: {post? post.body : null}</h4>
        <h4>Category: {post && post.category? post.category.toUpperCase() : null}</h4>
        <h4>Vote Score: {post? post.voteScore : null}</h4>
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
