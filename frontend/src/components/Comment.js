import React, { Component } from 'react';
import '../stylesheets/App.css';

class Comment extends Component {

  render() {
    return (
      <div className="Comment">
        <h2 className="author">Author: {this.props.comment.author}</h2>
        <p className="body">Body: {this.props.comment.body} </p>
      </div>
    );
  }
}

export default Comment;
