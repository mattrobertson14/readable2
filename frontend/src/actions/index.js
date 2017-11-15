export const ADD_ALL_POSTS = 'ADD_ALL_POSTS'
export const ADD_COMMENTS = 'ADD_COMMENTS'
export const ADD_CATEGORIES = 'ADD_CATEGORIES'
export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_POST = 'EDIT_POST'
export const EDIT_COMMENT = 'EDIT_COMMENT'

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

export const editPost = (id, edited_post) => {
  return {
    type: EDIT_POST,
    id,
    edited_post
  }
}

export const editComment = (id, edited_comment) => {
  return {
    type: EDIT_COMMENT,
    id,
    edited_comment
  }
}
