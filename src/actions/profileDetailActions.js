import axios from "axios";
import { PROFILEDETAIL_LOADED, PROFILEDETAIL_LOADING } from "./types";
import { tokenConfig } from "./authActions";

import { returnErrors } from "./errorActions";

export const loadComment = (profileurl) => (dispatch, getState) => {
  dispatch({ type: PROFILEDETAIL_LOADING });

  const body = JSON.stringify({ profileurl });
  console.log("sala-0", dispatch, getState);
  axios
    .post(
      `https://backend.customfb.com/scb/website/scrapper/profile/getprofiledata`,
      body,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("response deatil", res.data);
      dispatch({
        type: PROFILEDETAIL_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(" load  profile detail  erorr in", err);
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
