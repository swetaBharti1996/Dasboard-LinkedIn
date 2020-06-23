import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";
import insightReducer from "./insightReducer";
import commentReducer from "./commentReducer";
import { DESTROY_SESSION } from "../actions/types";
// import { history } from '../routes/AppRouter'
// import { pushPath } from "redux-simple-router";
import profileReducers from "./profileReducers";
import profileDetailReducers from "./profileDetailReducer";

const appReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  post: postReducer,
  insight: insightReducer,
  comment: commentReducer,
  profile: profileReducers,
  profileDetail: profileDetailReducers
});

const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === DESTROY_SESSION) {
    localStorage.removeItem("fbstoken");
    state = undefined;
  }

  return appReducer(state, action);
};
export default rootReducer;
