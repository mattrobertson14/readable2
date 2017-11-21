import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PostDetails from './PostDetails.js';
import Home from './Home.js'
import '../stylesheets/App.css';
import { connect } from 'react-redux';
import { getAllPosts, getAllCategories } from '../actions';
import Category from './Category.js';
import { showPostForm, submitPost, changePostSort } from '../actions'
import { Form } from '../utils'
import uuidv4 from 'uuid/v4'

class App extends Component {

  componentDidMount(){
    this.props.dispatch(getAllCategories())
    this.props.dispatch(getAllPosts())
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
    //console.log(`id: ${id}\ntimestamp: ${timestamp}\ntitle: ${title}\nbody: ${body}\nauthor: ${author}\ncategory: ${category}`)
     if (title !== "" && body !== "" && author !== ""){
      let newpost = {id, timestamp, title, body, author, category, voteScore: 1, deleted: false}
      this.props.dispatch(submitPost(newpost))
    }
  }

  changeSort = (event) => {
    this.props.dispatch(changePostSort(event.target.value))
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
            /> 
            :
            <span>
              <button onClick={()=>this.openForm()}>+ Add Post</button>
              <h3>
                Sort By: 
                <select className="postSort" id="postSort" value={this.props.postSort} onChange={this.changeSort}>
                    <option value="voteScore">Vote Score</option>
                    <option value="timestamp">Timestamp</option>
                  </select>
              </h3>
            </span>
          }
          <Route exact path="/:category" render={(props) => (
            <Category alone={true} name={props.match.params.category} />
          )} />
          <Route path="/:category/:id" render={(props) => (
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
    showPostForm: state.showPostForm,
    postSort: state.postSort
  }
}

export default connect(mapStateToProps)(App);
