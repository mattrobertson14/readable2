import React, { Component } from 'react';
import '../stylesheets/App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Post from './Post.js';
import { showPostForm } from '../actions';

class Category extends Component {

	componentWillUnmount() {
		let result = false
		this.props.dispatch(showPostForm(result))
	}

  render() {
    return (
      <div className="Category">
      	{this.props.alone? 
      		<Link to="/">
    				<button type="back"><i className="fa fa-arrow-left" /> Back To All</button>
    			</Link>
    			: null
      	}
        <h2 className="name">
        	{this.props.name.toUpperCase()}
        	{!this.props.alone?
        		<Link className="categoryLink" to={"/category/"+this.props.name}>
        			View Only {this.props.name.toUpperCase()} <i className="fa fa-arrow-right" />
        		</Link>
        		: null
        	}
        </h2>
        {this.props.posts.filter(p => this.props.postsById[p].category === this.props.name).map(post => (
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
    name: ownProps.name,
    alone: ownProps.alone
  }
}

export default connect(mapStateToProps)(Category);
