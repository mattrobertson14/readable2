import React, { Component } from 'react';
import '../stylesheets/App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ReadableAPI from '../utils/ReadableAPI';
import { editPost } from '../actions';

class Post extends Component {

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
    return (
      <div className="Post">
        <h2 className="title">{post.title}</h2>
        <h4 className="body"><span className="author">{post.author}: </span>
        	{post.body}
        </h4>
        <div className="voteScoreContainer">
        	<h4 className="voteScore">
        		Vote Score: 
        		<button type="increment" onClick={()=>this.downVote(post)}>-</button>
        			{post.voteScore}
        		<button type="increment" onClick={()=>this.upVote(post)}>+</button>
        	</h4>
        </div>
        <Link className="link" to={"/details/"+post.id}>Details</Link>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    postsById: state.postsById,
    post_id: ownProps.id
  }
}

export default connect(mapStateToProps)(Post);
