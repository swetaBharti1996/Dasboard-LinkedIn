import axios from "axios";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";
import { returnErrors, clearErrors } from "./errorActions";

// Load user
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get(
      "http://localhost:8090/website/scrapper/auth/user/me",
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
      console.log("log in");
    })
    .catch(err => {
      dispatch(returnErrors(err.response, err.response, err.response));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Login user
export const login = ({ email, password }) => dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  axios
    .post("http://localhost:8090/website/scrapper/auth/login", body, config)
    .then(res => {
      let token = res.headers["x-auth"];
      console.log("Token", res);
      let payload = {
        ...res.data,
        token
      };
      console.log(res);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("errrr", err);
      dispatch(
        returnErrors(err.response, err.response, err.response, "LOGIN_ERROR")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

export const logout = () => (dispatch, getState) => {
  axios
    .delete(
      `http://localhost:8090/website/scrapper/auth/logout`,
      tokenConfig(getState)
    )
    .then(res => {
      // this.props.history.push('/login')
      dispatch({ type: LOGOUT_SUCCESS });
    })
    .catch(err => {
      if (err.response) {
        dispatch(
          returnErrors(
            err.response.data.message,
            err.response.status,
            err.response.data.success
          )
        );
        dispatch({
          type: AUTH_ERROR
        });
      }
    });
  // return dispatch => {
  //   // Your code here...
  //   history.push('/')
  // };
};

export const tokenConfig = getState => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  if (token) {
    config.headers["x-auth"] = token;
  }

  return config;
};
