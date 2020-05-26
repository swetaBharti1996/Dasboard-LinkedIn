import axios from "axios";
import { COMMENT_LOADED, COMMENT_LOADING, COMMENT_REMOVE } from "./types";
import { tokenConfig } from "./authActions";

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
      dispatch({
        type: COMMENT_LOADED,
        payload: res.data,
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

export const deletePosts = (posturl) => (dispatch, getState) => {
  const body = JSON.stringify({ posturl });
  // console.log(deletePosts, 'data define')
  return (dispatch) => {
    console.log("bodynnnnnnnnnnnnnn", body);
    axios
      .post(
        `https://backend.customfb.com/scb/website/scrapper/post/delComments`,
        body,
        tokenConfig()
      )
      .then((res) => {
        console.log(res.data, "data deleted");
        dispatch({
          type: COMMENT_REMOVE,
          payload: res.database,
        });
      })
      .catch((err) => {
        console.log("data deleted errorrrrrrrrrrrrr");

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
};
