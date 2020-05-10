import axios from "axios";
import { PROFILE_LOADED, PROFILE_LOADING } from "./types";
import { tokenConfig } from "./authActions";

import { returnErrors } from "./errorActions";

export const loadPosts = () => (dispatch, getState) => {
  dispatch({ type: PROFILE_LOADING });

  axios
    .get(
      `http://localhost:8090/website/scrapper/profile/getprofiles`,
      tokenConfig(getState)
    )
    .then(res => {
      // console.log("response in profile action", res.data);
      dispatch({
        type: PROFILE_LOADED,
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
