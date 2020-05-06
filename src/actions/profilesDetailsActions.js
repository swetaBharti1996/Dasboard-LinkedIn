import axios from "axios";
import { COMMENT_LOADED, COMMENT_LOADING } from "./types";
import { tokenConfig } from "./authActions";

import { returnErrors } from "./errorActions";

export const loadComments = (postUrl) => (dispatch, getState) => {
  dispatch({ type: COMMENT_LOADING });

  const body = JSON.stringify({ postUrl });

  axios
    .post(
      `http://localhost:8080/website/scrapper/getlinkedinprofiledata`,
      body,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: COMMENT_LOADED,
        payload: res.data.comments,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data.message,
          err.response.status,
          err.response.data.success
        )
      );
    });
};

