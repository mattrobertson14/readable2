import React, { Component } from 'react';
import '../stylesheets/App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Post from './Post.js';

class Home extends Component {

  render() {
    return (
      <div className="Home">
        {this.props.categories.map(cat => (
          <span key={cat.name}>
            <Link className="categoryLink" to={"/"+cat.path}>
              View Only {cat.name.toUpperCase()} Posts  <i className="fa fa-arrow-right" />
            </Link>
            <br/><br/>
          </span>
        ))}
        {this.props.posts.sort((a,b) => {
            let first = this.props.postsById[a]
            let second = this.props.postsById[b]
            return parseInt(second[this.props.postSort],10)-parseInt(first[this.props.postSort],10)
          }).map(post => (
            <Post id={post} key={post} />
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    categories: state.categories,
    postsById: state.postsById,
    showPostForm: state.showPostForm,
    postSort: state.postSort
  }
}

export default connect(mapStateToProps)(Home);
