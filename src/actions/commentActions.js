import axios from 'axios';
import {
  COMMENT_LOADED,
  COMMENT_LOADING,
  COMMENT_REMOVE
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
        payload: res.data.splice(1),
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


export const deletePosts = (posturl) => (dispatch, getState) => {
  dispatch({ type: COMMENT_LOADING });

  const body = JSON.stringify({ posturl });


  axios.post(`https://backend.customfb.com/scb/website/scrapper/post/delComments`, body, tokenConfig(getState))
    .then(res => {
      console.log(res.data, 'show data')
      dispatch({
        type: COMMENT_REMOVE,
        payload: getState().comment.comments.filter(data => data.url !== posturl)
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






