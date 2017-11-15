import axios from 'axios'

/*const serverAddress = 'http://ischyros.byu.edu:3001';*/
const serverAddress = 'http://localhost:3001';

export const getAllPosts = () => {
  return new Promise((resolve, reject)=>{
    axios.get(serverAddress + '/posts', {
      headers: {'Authorization': 'something'},
      withCredentials: true
    }).then(response=>{
      resolve(response.data)
    }).catch(reject)
  })
}

export const getAllCategories = () => {
  return new Promise ((resolve, reject) => {
    axios.get(serverAddress + '/categories', {
      headers: {'Authorization' : 'something'},
      withCredentials: true
    }).then(response => {
      resolve(response.data.categories)
    }).catch(reject)
  })
}

export const getPost = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(serverAddress + '/posts/' + id, {
      headers: {'Authorization' : 'something'},
      withCredentials: true
    }).then(response => {
      resolve(response.data)
    }).catch(reject)
  })
}

export const getPostComments = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(serverAddress + '/posts/' + id + '/comments', {
      headers: {'Authorization' : 'something'},
      withCredentials: true
    }).then(response => {
      resolve(response.data)
    }).catch(reject)
  })
}

export const submitPost = (id, timestamp, title, body, author, category) => {
  return axios.post(serverAddress + '/posts', {
    id,
    timestamp,
    title,
    body,
    author,
    category
  }, {
    headers: {'Authorization' : 'something'},
    withCredentials: true
  }).then((response) => {
    console.log(response)
  }).catch((error) => {
    console.log(error)
  })
}

export const changeVote = (id, option) => {
  return axios.post(`${serverAddress}/posts/${id}`, {
    option
  }, {
    headers: {'Authorization' : 'something'},
    withCredentials: true
  }).then((response) => {
    console.log(response)
  }).catch((error) => {
    console.log(error)
  })
}

export const addComment = (id, timestamp, body, author, parentId) => {
  return axios.post(`${serverAddress}/comments`, {
    id,
    timestamp,
    body,
    author,
    parentId
  }, {
    headers: {'Authorization' : 'something'},
    withCredentials: true
  }).then((response) => {
    console.log(response)
  }).catch((error) => {
    console.log(error)
  })
}

export const changeVoteComment = (id, option) => {
  return axios.post(`${serverAddress}/comments/${id}`, {
    option
  }, {
    headers: {'Authorization' : 'something'},
    withCredentials: true
  }).then((response) => {
    console.log(response)
  }).catch((error) => {
    console.log(error)
  })
}

export const editPost = (id, title, body) => {
  return axios.put(`${serverAddress}/posts/${id}`, {
    title,
    body
  }, {
    headers: {'Authorization' : 'something'},
    withCredentials: true
  }).then((response) => {
    console.log(response)
  }).catch((error) => {
    console.log(error)
  })
}

export const editComment = (id, timestamp, body) => {
  return axios.put(`${serverAddress}/comments/${id}`, {
    timestamp,
    body
  }, {
    headers: {'Authorization' : 'something'},
    withCredentials: true
  }).then((response) => {
    console.log(response)
  }).catch((error) => {
    console.log(error)
  })
}


/* TEMPLATE FOR NEW API CALL:

return new Promise((resolve, reject) => {
  axios.get(serverAddress + URL HERE, {
    headers: {'Authorization' : 'something'},
    withCredentials: true
  }).then(response => {
    resolve(response.data)
  }).catch(reject)
})

*/
