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
