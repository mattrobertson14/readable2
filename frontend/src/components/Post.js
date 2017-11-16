import React, { Component } from 'react';
import '../stylesheets/App.css';
import { Link } from 'react-router-dom';

class Post extends Component {

  render() {
    return (
      <div className="Post">
        <h2 className="title">{this.props.post.title}</h2>
        <h4 className="body"><span className="author">{this.props.post.author}: </span>
        	{this.props.post.body}
        </h4>
        <Link to={"/details/"+this.props.post.id}>Details</Link>
      </div>
    );
  }
}

export default Post;
