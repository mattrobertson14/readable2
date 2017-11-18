import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PostDetails from './PostDetails.js';
import Home from './Home.js'
import '../stylesheets/App.css';
import * as ReadableAPI from '../utils/ReadableAPI.js'
import { connect } from 'react-redux';
import { addAllPosts, addCategories } from '../actions';
import Category from './Category.js';
import { showPostForm, addPost } from '../actions'
import { Form } from '../utils'
import uuidv4 from 'uuid/v4'

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

  closeForm = () => {
    let result = false
    this.props.dispatch(showPostForm(result))
  }

  openForm = () => {
    let result = true
    this.props.dispatch(showPostForm(result))
  }

  addPost = () => {
    let id = uuidv4()
    let timestamp = Date.now()
    let title = document.getElementById("postTitle").innerText
    let body = document.getElementById("postBody").innerText
    let author = document.getElementById("postAuthor").innerText
    let category = document.getElementById("postCategory-dropdown").value
    console.log(`id: ${id}\ntimestamp: ${timestamp}\ntitle: ${title}\nbody: ${body}\nauthor: ${author}\ncategory: ${category}`)
    ReadableAPI.submitPost(id, timestamp, title, body, author, category).then((res) => {
      let newpost = {id, timestamp, title, body, author, category, voteScore: 1, deleted: false}
      this.props.dispatch(addPost(newpost))
    }).catch(error => {
      console.log("new post not added")
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p className="App-title">Readable</p>
        </header>

        <div className="contentContainer">
          {this.props.showPostForm?
            <Form 
              name="post"
              submit={()=>this.addPost()}
              cancel={()=>this.closeForm()} 
              inputFields={["Title", "Author", "Body"]}
              dropDownFields={[{name: "Category", options: this.props.categories.map(c=>({...c, name: c.name.toUpperCase()}))}]}
            /> :
            <button onClick={()=>this.openForm()}>+ Add Post</button>
          }
          <Route path="/category/:name" render={(props) => (
            <Category alone={true} name={props.match.params.name} />
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

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    showPostForm: state.showPostForm
  }
}

export default connect(mapStateToProps)(App);
