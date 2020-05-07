import axios from "axios";
import { PROFILESDETAILS_LOADED, PROFILESDETAILS_LOADING } from "./types";
import { tokenConfig } from "./authActions";

import { returnErrors } from "./errorActions";

export const loadProfilesDetailss = (postUrl) => (dispatch, getState) => {
  dispatch({ type: PROFILESDETAILS_LOADING });

  const body = JSON.stringify({ postUrl });

  axios
    .post(
      `http://localhost:8080/website/scrapper/getlinkedinprofiledata`,
      body,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: PROFILESDETAILS_LOADED,
        payload: res.data.profilesDetailss,
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
