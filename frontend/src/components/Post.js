import React, { Component } from 'react';
import '../stylesheets/App.css';
import { Link } from 'react-router-dom';

class Post extends Component {

  render() {
    return (
      <div className="Post">
        <h2 className="title">Title: {this.props.post.title}</h2>
        <Link to={"/details/"+this.props.post.id}>Details</Link>
      </div>
    );
  }
}

export default Post;
