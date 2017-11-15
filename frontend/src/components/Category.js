import React, { Component } from 'react';
import '../stylesheets/App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Post from './Post.js';

class Category extends Component {

  render() {
    return (
      <div className="Category">
        <h2 className="name">
        	{this.props.name.toUpperCase()}
        	<Link className="categoryLink" to={"/category/"+this.props.name}>View Only {this.props.name.toUpperCase()} -></Link>
        </h2>
        {this.props.posts.filter(p => this.props.postsById[p].category === this.props.name).map(post => (
        	<Post post={this.props.postsById[post]} key={post} />
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
    name: ownProps.name
  }
}

export default connect(mapStateToProps)(Category);
