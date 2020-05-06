import axios from "axios";
import { PROFILES_LOADED, PROFILES_LOADING } from "./types";
import { tokenConfig } from "./authActions";

import { returnErrors } from "./errorActions";

export const loadPosts = () => (dispatch, getState) => {
  dispatch({ type: PROFILES_LOADING });

  axios
    .get(
      `http://localhost:8080/website/scrapper/linkuser/getlinkedindata`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PROFILES_LOADED,
        payload: res.data.posts,
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
