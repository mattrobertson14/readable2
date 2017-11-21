import React, { Component } from 'react';
import '../stylesheets/App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Post from './Post.js';

class Category extends Component {

  render() {
    return (
      <div className="Category">
    		<Link to="/">
  				<button type="back"><i className="fa fa-arrow-left" /> Back To All</button>
  			</Link>
        <h2 className="name">
        	{this.props.name.toUpperCase()}
        </h2>
        {this.props.posts.filter(p => (
        		this.props.postsById[p].category === this.props.name
        	)).sort((a,b) => {
	      		let first = this.props.postsById[a]
	      		let second = this.props.postsById[b]
	      		return parseInt(second[this.props.postSort],10)-parseInt(first[this.props.postSort],10)
	      	}).map(post => (
        		<Post id={post} key={post} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts,
    categories: state.categories,
    postsById: state.postsById,
    postSort: state.postSort,
    name: ownProps.name,
    alone: ownProps.alone
  }
}

export default connect(mapStateToProps)(Category);
