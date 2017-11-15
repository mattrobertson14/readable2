import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SingleCategory from './SingleCategory.js';
import PostDetails from './PostDetails.js';
import Home from './Home.js'
import '../stylesheets/App.css';
import * as ReadableAPI from '../utils/ReadableAPI.js'
import { connect } from 'react-redux';
import { addAllPosts, addCategories } from '../actions';
import Category from './Category.js';

class App extends Component {

  componentDidMount(){
    ReadableAPI.getAllCategories().then (res => {
      this.props.dispatch(addCategories(res))
    }).catch(error => {
      console.log("No categories were retrieved")
    })

    ReadableAPI.getAllPosts().then( res => {
      this.props.dispatch(addAllPosts(res))
    }).catch(error=>{
      console.log("No posts were retrieved")
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p className="App-title">Readable</p>
        </header>

        <div className="contentContainer">
          <Route path="/category/:name" render={(props) => (
            <Category name={props.match.params.name} />
          )} />
          <Route path="/details/:id" render={(props) => (
            <PostDetails id={props.match.params.id} />
          )}/>
          <Route exact path="/" component={Home} />
        </div>
      </div>
    );
  }
}

export default connect()(App);
