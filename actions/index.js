import fetch from 'isomorphic-fetch'

export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVE_DATA = 'RECEIVE_DATA'
export const SELECT_NETWORK = 'SELECT_NETWORK'
export const SELECT_WEEK = 'SELECT_WEEK'

export function selectNetwork(net){
  return{
    type: SELECT_NETWORK,
    selectedNetwork: net
  }
}

export function selectWeek(wk){
  return {
    type: SELECT_WEEK,
    selectedWeek: wk
  }
}

/*
function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}
*/


export function fetchAPIData(url, treeparent){
  return dispatch => {
    //fetch url data
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveAPIData(treeparent, json)))
    //then hit the callback
  }
}

function receiveAPIData(treeparent, indata){
  return{
    type: RECEIVE_DATA,
    treeparent,
    data: indata
  }
}


/*
function shouldFetchPosts(state, reddit) {
  const posts = state.postsByReddit[reddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}
*/
/*
export function fetchPostsIfNeeded(reddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit))
    }
  }
}*/
