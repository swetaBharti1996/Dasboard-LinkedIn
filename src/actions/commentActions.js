import axios from 'axios';
import {
  COMMENT_LOADED,
  COMMENT_LOADING,
  COMMENT_UNLOADED
} from './types'
import { tokenConfig } from './authActions'

import { returnErrors } from "./errorActions";

//api for post
export const loadComments = () => (dispatch, getState) => {
  dispatch({ type: COMMENT_LOADING });


  axios
    .get(
      `https://backend.customfb.com/scb/website/scrapper/post/getAllComments`,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res.data, 'getting data')
      dispatch({
        type: COMMENT_LOADED,
        payload: res.data.splice(1),
      });
    })
    .catch((err) => {
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


  axios.post(`https://backend.customfb.com/scb/website/scrapper/post/delComments`, body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: COMMENT_UNLOADED,
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






