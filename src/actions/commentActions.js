import axios from 'axios';
import {
  COMMENT_LOADED,
  COMMENT_LOADING,
  COMMENT_UNLOADED
} from './types'
import { tokenConfig } from './authActions'

import { returnErrors } from './errorActions'

export const loadComments = () => (dispatch, getState) => {
  // console.log(dispatch, getState)
  dispatch({ type: COMMENT_LOADING });


  axios
    .get(
      `https://backend.customfb.com/scb/website/scrapper/post/getAllComments`,
      tokenConfig(getState)
    )
    .then(res => {
      // console.log("response in comment action", res.data);
      dispatch({
        type: COMMENT_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      // console.log(" load post erorr in", err);
      if (err.data) {
        dispatch(
          returnErrors(
            err.response.data.message,
            err.response.status,
            err.response.data.success
          )
        );
      }
    });
};


// //delete Posts
export const deletePosts = (posturl) => (dispatch, getState) => {
  dispatch({ type: COMMENT_LOADING });

  const body = JSON.stringify({ posturl });
  console.log(body, 'body')
  console.log(deletePosts, 'data define')

  axios.post(`https://backend.customfb.com/scb/website/scrapper/post/delComments`, body, tokenConfig(getState))
    .then(res => {
      console.log(res.posturl, 'data deleted')
      dispatch({
        type: COMMENT_UNLOADED,
        payload: res.posturl
      })
    })
    .catch(err => {
      if (err.data) {
        dispatch(
          returnErrors(
            err.response.data.message,
            err.response.status,
            err.response.data.success
          ))
      }
    })

}






