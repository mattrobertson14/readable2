import {
  ADD_ALL_POSTS,
  ADD_COMMENTS,
  ADD_CATEGORIES,
  ADD_POST,
  ADD_COMMENT,
  EDIT_POST,
  EDIT_COMMENT
} from '../actions'

const initialState = {
  posts: [],
  postsById: {},
  commentsById: {},
  categories: []
}

function reducer (state = initialState, action) {
  switch (action.type){
    case ADD_ALL_POSTS :
      let postsObject = state.postsById
      action.posts.map(post => {
        postsObject[post.id] = {
          ...postsObject[post.id],
          ...post
        }
        return post
      })
      return {
        ...state,
        posts: action.posts.map(post => post.id),
        postsById: postsObject
      }
    case ADD_COMMENTS :
      let commentsObject = state.commentsById
      action.comments.map(comment => {
        commentsObject[comment.id] = comment
        return comment
      })
      return {
        ...state,
        postsById: {
          ...state.postsById,
          [action.p_id]: {
            ...state.postsById[action.p_id],
            comments: action.comments.map(comment => comment.id)
          }
        },
        commentsById: commentsObject
      }
    case ADD_CATEGORIES :
      return {
        ...state,
        categories: action.categories
      }
    case ADD_POST :
      let new_posts = state.posts
      new_posts.push(action.post.id)
      return {
        ...state,
        posts: new_posts,
        postsById: {
          ...state.postsById,
          [action.post.id]: action.post
        }
      }
    case ADD_COMMENT:
      let new_comments = (state.postsById[action.p_id].comments? state.postsById[action.p_id].comments : [])
      new_comments.push(action.comment.id)
      return {
        ...state,
        postsById: {
          ...state.postsById,
          [action.p_id]: {
            ...state.postsById[action.p_id],
            comments: new_comments
          }
        },
        commentsById: {
          ...state.commentsById,
          [action.comment.id]: action.comment
        }
      }
    case EDIT_POST :
      return {
        ...state,
        postsById: {
          ...state.postsById,
          [action.id]: action.edited_post
        }
      }
    case EDIT_COMMENT :
      return {
        ...state,
        commentsById: {
          ...state.commentsById,
          [action.id]: action.edited_comment
        }
      }
    default :
      return state
  }
}

export default reducer;
