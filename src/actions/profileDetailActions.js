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
        payload: res.data,
      });
    })
    .catch((err) => {
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

// export const loadCSV = (postId) => (dispatch, getState) => {
//   dispatch({ type: CSV_LOADING });

//   const body = JSON.stringify({ postId })

//   axios.post(
//     'https://app.leadsharvester.com/backend/website/scrapper/facebook/getComments',
//     body,
//     tokenConfig(getState)
//   )
//     .then(res => {
//       dispatch({
//         type: CSV_LOADED,
//         payload: res.data.comments
//       })

//     })
//     .catch(err => {
//       if (err.response.data) {
//         dispatch(returnErrors(err.response.data.message, err.response.status, err.response.data.success))
//       }
//     })
// }
