import React, { Component } from 'react';
import '../stylesheets/App.css';
import { connect } from 'react-redux';
import Category from './Category.js';

class Home extends Component {

  render() {
    return (
      <div className="Home">
        {this.props.categories.map(cat => (
          <Category name={cat.name} key={cat.name}/>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    categories: state.categories,
    postsById: state.postsById,
    showPostForm: state.showPostForm
  }
}

export default connect(mapStateToProps)(Home);
