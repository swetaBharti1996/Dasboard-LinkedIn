import axios from "axios";
import { PROFILE_LOADED, PROFILE_LOADING } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const loadProfile = () => (dispatch, getState) => {
  // console.log('hello friends', getState, dispatch)
  dispatch({ type: PROFILE_LOADING });
  // console.log(loadProfile, 'load profile')

  axios
    .get(
      `https://backend.customfb.com/scb/website/scrapper/profile/getprofiles`,
      tokenConfig(getState)
    )
    .then((res) => {
      // console.log("received profile data", res.data);
      dispatch({
        type: PROFILE_LOADED,
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
