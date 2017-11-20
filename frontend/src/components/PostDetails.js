import React, { Component } from 'react';
import '../stylesheets/App.css';
import 'font-awesome/css/font-awesome.min.css'
import { connect } from 'react-redux';
import * as ReadableAPI from '../utils/ReadableAPI';
import Comment from './Comment.js';
import { addComments, editPost, showCommentForm, addComment, changeCommentSort,
					showEditPost, deletePostFromState } from '../actions';
import { Link, withRouter } from 'react-router-dom';
import { Form } from '../utils';
import uuidv4 from 'uuid/v4';

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

	openForm() {
		this.props.dispatch(showCommentForm(true))
	}

	closeForm() {
		this.props.dispatch(showCommentForm(false))
	}

	clearComment() {
		document.getElementById("commentBody").innerText = ""
    document.getElementById("commentAuthor").innerText = ""
	}

	addComment() {
		let id = uuidv4()
    let timestamp = Date.now()
    let body = document.getElementById("commentBody").innerText
    let author = document.getElementById("commentAuthor").innerText
    let parentId = this.props.post_id
    //console.log(`id: ${id}\ntimestamp: ${timestamp}\nbody: ${body}\nauthor: ${author}\n`)
    ReadableAPI.addComment(id, timestamp, body, author, parentId).then((res) => {
      let newcomment = {id, timestamp, body, author, parentId, voteScore: 1, deleted: false, parentDeleted: false}
      this.props.dispatch(addComment(newcomment, parentId))
      this.clearComment()
      this.props.dispatch(showCommentForm(false))
    }).catch(error => {
      console.log("new comment not added")
    })
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

	changeSort = (event) => {
    this.props.dispatch(changeCommentSort(event.target.value))
  }

  deletePost(post){
  	ReadableAPI.deletePost(post.id).then(res => {
  		this.props.dispatch(deletePostFromState(post.id))
  		this.props.history.push("/")
  	}).catch(error => {
  		console.log("Post could not be deleted")
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
        <h2 type="page-break" className="PageTitle">
					<button title="Edit Post" type="increment" onClick={()=>this.props.dispatch(showEditPost(true,post))}>
						<i className="fa fa-pencil"/>
					</button>
					Post Details
				</h2>
        {post && post.id?
        	<span>
        	{post.editing?
        		<span>
	        		<button type="submit">Save</button>
	        		<button type="cancel" onClick={()=>this.props.dispatch(showEditPost(false,post))}>Cancel</button>
	        		<h3>Title: </h3>
	        		<h4 type="input"
								 contentEditable="true"
								 className="titleEdit" 
								 id="titleEdit"
								 dangerouslySetInnerHTML={{ __html: post.title }}
							/>
		        	<h4>Body: </h4>
		        	<h4 type="input"
								 contentEditable="true"
								 className="bodyEdit" 
								 id="bodyEdit"
								 dangerouslySetInnerHTML={{ __html: post.body }}
							/>
	        	</span>
	        	:
	        	<span>
		        	<h3>Title: {post.title}</h3>
		        	<h4>Body: {post.body}</h4>
	        	</span>
        	}
	        <h4>Author: {post.author}</h4>
	        <h4>Category: {post.category? post.category.toUpperCase() : null}</h4>
	        <h4>Timestamp: {makeDateReadable(post.timestamp)}</h4>
	        <h4>
	        	Vote Score: 
	        	<button type="increment" onClick={()=>this.downVote(post)}>-</button>
	        	{post.voteScore}
						<button type="increment" onClick={()=>this.upVote(post)}>+</button>
					</h4>
					{post.editing? <button type="cancel" onClick={()=>this.deletePost(post)}>Delete Post</button> : null}
					<h2 type="page-break" className="CommentsTitle">Comments</h2>
					{this.props.showCommentForm?
          	<Form 
	            name="comment"
	            submit={()=>this.addComment()}
	            cancel={()=>this.closeForm()} 
	            inputFields={["Author", "Body"]}
	            dropDownFields={[]}
	          /> :
	          <span>
		          <button onClick={()=>this.openForm()}>+ Add Comment</button>
		          <h3>
	                Sort By: 
	                <select className="commentSort" id="commentSort" value={this.props.commentSort} onChange={this.changeSort}>
	                  <option value="voteScore">Vote Score</option>
	                  <option value="timestamp">Timestamp</option>
	                </select>
              </h3>
            </span>
	        }
	      	{comments.sort((a,b) => {
	      		let first = this.props.commentsById[a]
	      		let second = this.props.commentsById[b]
	      		return parseInt(second[this.props.commentSort],10)-parseInt(first[this.props.commentSort],10)
	      	}).map(c => (
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

function makeDateReadable(d){
  let date = new Date(d)
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  month = (month < 10 ? "0" : "") + month;
  day = (day < 10 ? "0" : "") + day;
  hour = (hour < 10 ? "0" : "") + hour;
  min = (min < 10 ? "0" : "") + min;
  sec = (sec < 10 ? "0" : "") + sec;

  let newDate = month + "-" + day + "-" + date.getFullYear() + " at " +  hour + ":" + min + ":" + sec;
  return newDate
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts,
    postsById: state.postsById,
    commentsById: state.commentsById,
    showCommentForm: state.showCommentForm,
    commentSort: state.commentSort,
    showPostEdit: state.showPostEdit,
    post_id: ownProps.id
  }
}

export default connect(mapStateToProps)(withRouter(PostDetails));
