import axios from "axios";
import { PROFILEDETAIL_LOADED, PROFILEDETAIL_LOADING } from "./types";
import { tokenConfig } from "./authActions";

import { returnErrors } from "./errorActions";

export const loadComments = profileurl => (dispatch, getState) => {
  dispatch({ type: PROFILEDETAIL_LOADING });

  const body = JSON.stringify({ profileurl });

  axios
    .post(
      `http://localhost:8090/website/scrapper/profile/getprofiledata`,
      body,
      tokenConfig(getState)
    )
    .then(res => {
      console.log("PROFILEDETAILllllllllll", res);
      dispatch({
        type: PROFILEDETAIL_LOADED,
        payload: res.data.datas
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response, err.response, err.response));
    });
};
