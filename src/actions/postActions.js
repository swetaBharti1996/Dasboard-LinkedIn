import axios from "axios";
import {
  POST_LOADED,
  POST_LOADING,
  COLLECT_EMAILS,
  SENDING_EMAIL,
  EMAIL_SENT,
} from "./types";
import { tokenConfig } from "./authActions";

import { returnErrors } from "./errorActions";

//api for comments
export const loadPosts = (posturl) => (dispatch, getState) => {
  dispatch({ type: POST_LOADING });
  // console.log(dispatch, getState)

  const body = JSON.stringify({ posturl });
  // console.log(body)

  axios
    .post(
      `https://backend.customfb.com/scb/website/scrapper/post/getComments`,
      body,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("data received", res.data);
      dispatch({
        type: POST_LOADED,
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

export const collectEmails = (email) => (dispatch, getState) => {
  if (email) {
    dispatch({
      type: COLLECT_EMAILS,
      email,
    });
  }
};

export const bulkEmailSend = (template) => (dispatch, getState) => {
  const emails = getState().comment.emailCollection;
  console.log(emails, 'get emails')
  const body = JSON.stringify({
    emails,
    template,
  });
  dispatch({ type: SENDING_EMAIL });
  axios
    .post(
      `https://backend.customfb.com/scb/website/scrapper/post/sendBulkEmails`,
      body,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: EMAIL_SENT,
        payload: res.post.commentsarray.email
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
