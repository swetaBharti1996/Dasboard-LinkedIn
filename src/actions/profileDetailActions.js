import axios from "axios";
import { PROFILEDETAIL_LOADED, PROFILEDETAIL_LOADING } from "./types";
import { tokenConfig } from "./authActions";

import { returnErrors } from "./errorActions";

export const loadComment = (profileurl) => (dispatch, getState) => {
  dispatch({ type: PROFILEDETAIL_LOADING });

  const body = JSON.stringify({ profileurl });

  axios
    .post(
      `http://localhost:8080/website/scrapper/profile/getprofiledata`,
      body,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("response deatilllllllllllllllllll", res.data);
      dispatch({
        type: PROFILEDETAIL_LOADED,
        payload: res.data.linkdata,
      });
    })
    .catch((err) => {
      console.log(" load  profileeeeeeeeeeee    detail  erorr in", err);
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
