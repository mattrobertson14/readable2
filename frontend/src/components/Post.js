import React, { Component } from 'react';
import '../stylesheets/App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changePostVote } from '../actions';

class Post extends Component {

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
        		<button type="increment" 
                    onClick={()=>this.props.dispatch(changePostVote(post, "downVote"))}>-</button>
        			{post.voteScore}
        		<button type="increment" 
                    onClick={()=>this.props.dispatch(changePostVote(post, "upVote"))}>+</button>
        	</h4>
        </div>
        <h4 className="commentCount">
          # of Comments: {post.comments?
                            post.comments.length : null}
        </h4>
        <Link className="link" to={"/"+post.category+"/"+post.id}>Details</Link>
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
