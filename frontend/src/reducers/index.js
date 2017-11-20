import {
  ADD_ALL_POSTS,
  ADD_COMMENTS,
  ADD_CATEGORIES,
  ADD_POST,
  ADD_COMMENT,
  EDIT_POST,
  EDIT_COMMENT,
  SHOW_POST_FORM,
  SHOW_COMMENT_FORM,
  CHANGE_POST_SORT,
  CHANGE_COMMENT_SORT,
  SHOW_EDIT_POST,
  SHOW_EDIT_COMMENT,
  DELETE_POST,
  DELETE_COMMENT
} from '../actions'

const initialState = {
  posts: [],
  postsById: {},
  commentsById: {},
  categories: [],
  showPostForm: false,
  showCommentForm: false,
  showCommentEdit: false,
  postSort: "voteScore",
  commentSort: "voteScore"
}

function reducer (state = initialState, action) {
  switch (action.type){
    case ADD_ALL_POSTS :
      let postsObject = state.postsById
      action.posts.map(post => {
        postsObject[post.id] = {
          ...postsObject[post.id],
          ...post,
          editing: false
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
        commentsObject[comment.id] = {
          ...comment,
          editing: false
        }
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
    case SHOW_POST_FORM :
      return {
        ...state,
        showPostForm: action.val
      }
    case SHOW_COMMENT_FORM :
      return {
        ...state,
        showCommentForm: action.val
      }
    case CHANGE_POST_SORT :
      return {
        ...state,
        postSort: action.sortBy
      }
    case CHANGE_COMMENT_SORT :
      return {
        ...state,
        commentSort: action.sortBy
      }
    case SHOW_EDIT_POST :
      return {
        ...state,
        postsById: {
          ...state.postsById,
          [action.post.id]: {
            ...state.postsById[action.post.id],
            editing: action.val
          }
        }
      }
    case SHOW_EDIT_COMMENT :
      return {
        ...state,
        commentsById: {
          ...state.commentsById,
          [action.comment.id]: {
            ...state.commentsById[action.comment.id],
            editing: action.val
          }
        }
      }
    case DELETE_POST :
      let updated_posts = state.posts.filter(post => post !== action.id)
      console.log(updated_posts)
      let updated_postsById = state.postsById
      delete updated_postsById[action.id]
      console.log(updated_postsById)
      return {
        ...state,
        posts: updated_posts,
        postsById: updated_postsById
      }
    case DELETE_COMMENT :
      let updated_commentsById = state.commentsById
      delete updated_commentsById[action.id]
      let updated_comments = state.postsById[action.pId].comments.filter(comment => comment !== action.id)
      return {
        ...state,
        postsById: {
          ...state.postsById,
          [action.pId]: {
            ...state.postsById[action.pId],
            comments: updated_comments
          }
        },
        commentsById: updated_commentsById,
      }
    default :
      return state
  }
}

export default reducer;
