import axios from 'axios';
import {
  COMMENT_LOADED,
  COMMENT_LOADING,
} from './types'
import { tokenConfig } from './authActions'

import { returnErrors } from "./errorActions";

//api for post 
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
