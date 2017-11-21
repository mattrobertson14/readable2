import * as ReadableAPI from '../utils/ReadableAPI.js'

export const ADD_ALL_POSTS = 'ADD_ALL_POSTS'
export const ADD_COMMENTS = 'ADD_COMMENTS'
export const ADD_CATEGORIES = 'ADD_CATEGORIES'
export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_POST = 'EDIT_POST'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const SHOW_POST_FORM = 'SHOW_POST_FORM'
export const SHOW_COMMENT_FORM = 'SHOW_COMMENT_FORM'
export const CHANGE_POST_SORT = 'CHANGE_POST_SORT'
export const CHANGE_COMMENT_SORT = 'CHANGE_COMMENT_SORT'
export const SHOW_EDIT_POST = 'SHOW_EDIT_POST'
export const SHOW_EDIT_COMMENT = 'SHOW_EDIT_COMMENT'
export const DELETE_POST = 'DELETE_POST'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const getAllPosts = () => {
  return function (dispatch) {
    return ReadableAPI.getAllPosts().then(res => {
      res.filter(post => !post.deleted)
      dispatch(addAllPosts(res))
      res.map(post=>(
        ReadableAPI.getPostComments(post.id).then(res => {
          dispatch(addComments(res,post.id))
        })
      ))
    }).catch(error=>{
      console.log("No posts were retrieved")
    })
  }
}

export const getAllCategories = () => {
  return function (dispatch) {
    return ReadableAPI.getAllCategories().then(res => {
      dispatch(addCategories(res))
    }).catch(error => {
      console.log("No categories were retreived")
    })
  }
}

export const addAllPosts = posts => {
  return {
    type: ADD_ALL_POSTS,
    posts
  }
}

export const addComments = (comments, p_id) => {
  return {
    type: ADD_COMMENTS,
    comments,
    p_id
  }
}

export const addCategories = (categories) => {
  return {
    type: ADD_CATEGORIES,
    categories
  }
}

export const submitPost = post => {
  return function(dispatch){
    return ReadableAPI.submitPost(post.id, post.timestamp, post.title, post.body, post.author, post.category).then(res => {
      dispatch(addPost(post))
      dispatch(showPostForm(false))
    }).catch(error => {
      console.log("new post not added")
    })
  }
}

export const addPost = post => {
  return {
    type: ADD_POST,
    post
  }
}

export const addComment = (comment, p_id) => {
  return {
    type: ADD_COMMENT,
    comment,
    p_id
  }
}

export const changePostVote = (post, type) => {
  return function(dispatch){
    return ReadableAPI.changeVote(post.id, type).then(res => {
      let new_post = post
      if (type === "upVote") {new_post.voteScore++} else
        if (type === "downVote") {new_post.voteScore--}
      dispatch(editPost(post.id, new_post))
    }).catch(error => {
      console.log("Server could not be reached")
    })
  }
}

export const editPost = (id, edited_post) => {
  return {
    type: EDIT_POST,
    id,
    edited_post
  }
}

export const changeCommentVote = (comment, type) => {
  return function(dispatch){
    return ReadableAPI.changeVoteComment(comment.id, type).then(res => {
      let new_comment = comment
      if (type === "upVote") {new_comment.voteScore++} else
        if (type === "downVote") {new_comment.voteScore--}
      dispatch(editComment(comment.id, new_comment))
    }).catch(error => {
      console.log("Server could not be reached")
    })
  }
}

export const updateComment = (comment, details) => {
  return function(dispatch){
    return ReadableAPI.editComment(comment.id, details.timestamp, details.new_body).then(res => {
      dispatch(editComment(comment.id, details.new_comment))
      dispatch(showEditComment(false, comment))
    }).catch(error => {
      console.log("Server could not be reached")
    })
  }
}

export const deleteComment = (comment) => {
  return function(dispatch){
    return ReadableAPI.deleteComment(comment.id).then(res => {
      dispatch(deleteCommentFromState(comment.id, comment.parentId))
    }).catch(error => {
      console.log("Post could not be deleted")
    })
  }
}

export const editComment = (id, edited_comment) => {
  return {
    type: EDIT_COMMENT,
    id,
    edited_comment
  }
}

export const showPostForm = (val) => {
  return {
    type: SHOW_POST_FORM,
    val
  }
}

export const showCommentForm = (val) => {
  return {
    type: SHOW_COMMENT_FORM,
    val
  }
}

export const changePostSort = (sortBy) => {
  return {
    type: CHANGE_POST_SORT,
    sortBy
  }
}

export const changeCommentSort = (sortBy) => {
  return {
    type: CHANGE_COMMENT_SORT,
    sortBy
  }
}

export const showEditPost = (val, post) => {
  return {
    type: SHOW_EDIT_POST,
    val,
    post
  }
}

export const showEditComment = (val, comment) => {
  return {
    type: SHOW_EDIT_COMMENT,
    val,
    comment
  }
}

export const deletePostFromState = (id) => {
  return {
    type: DELETE_POST,
    id
  }
}

export const deleteCommentFromState = (id, pId) => {
  return {
    type: DELETE_COMMENT,
    id,
    pId
  }
}
