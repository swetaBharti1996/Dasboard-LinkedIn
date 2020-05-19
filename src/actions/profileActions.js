import axios from "axios";
import { PROFILE_LOADED, PROFILE_LOADING } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";


//api for profile
export const loadProfile = () => (dispatch, getState) => {
  dispatch({ type: PROFILE_LOADING });
  // console.log(loadProfile, 'load profile')

  axios
    .get(
      `http://localhost:8080/website/scrapper/profile/getprofiles`,
      tokenConfig(getState)
    )
    .then((res) => {
      // console.log('received data', res.data);
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