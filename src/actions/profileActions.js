import axios from "axios";
import { PROFILE_LOADED, PROFILE_LOADING, PROFILE_REMOVE } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

//api for profile
export const loadProfile = (data) => (dispatch, getState) => {
  dispatch({ type: PROFILE_LOADING });
  // console.log(loadProfile, 'load profile')

  axios
    .get(
      `https://backend.customfb.com/scb/website/scrapper/profile/getprofiles?${data}`,
      tokenConfig(getState)
    )
    .then((res) => {
      // console.log("received profile data", res.data);
      dispatch({
        type: PROFILE_LOADED,
        payload: res.data.data.slice(1),
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



export const deleteProfile = (profileurl) => (dispatch, getState) => {
  dispatch({ type: PROFILE_LOADING });

  const body = JSON.stringify({ profileurl });
  console.log(body, 'body generated')


  axios.post(`https://backend.customfb.com/scb/website/scrapper/profile/delprofile`, body, tokenConfig(getState))
    .then(res => {
      console.log(res.data.data, 'show data')
      dispatch({
        type: PROFILE_REMOVE,
        payload: getState().profile.info.filter(data => data.profileurl !== profileurl)
      })
    })
    .catch(err => {
      if (err.data) {
        dispatch(
          returnErrors(
            err.response.data.message,
            err.response.status,
            err.response.data.success
          ))
      }
    })

}


