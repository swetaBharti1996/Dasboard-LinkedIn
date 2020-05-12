import axios from "axios";
import { POST_LOADED, POST_LOADING } from "./types";
import { tokenConfig } from "./authActions";

import { returnErrors } from "./errorActions";

export const loadPosts = (posturl) => (dispatch, getState) => {
  dispatch({ type: POST_LOADING });

  const body = JSON.stringify({ posturl });
  console.log(body)

  axios
    .get(
      `http://localhost:8080/website/scrapper/post/getComments`, body,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: POST_LOADED,
        payload: res.data.posts
      });
    })
    .catch(err => {
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
