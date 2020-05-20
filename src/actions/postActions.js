import axios from "axios";
import { POST_LOADED, POST_LOADING } from "./types";
import { tokenConfig } from "./authActions";

import { returnErrors } from "./errorActions";

//api for comments
export const loadPosts = (posturl) => (dispatch, getState) => {
  dispatch({ type: POST_LOADING });

  const body = JSON.stringify({ posturl });
  // console.log(dispatch, getState);

  axios
    .post(
      `http://localhost:8080/website/scrapper/post/getComments`,
      body,
      tokenConfig(getState)
    )
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: POST_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
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
