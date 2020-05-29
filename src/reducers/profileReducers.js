import {
  PROFILE_LOADED,
  PROFILE_LOADING,
  PROFILE_REMOVE
} from "../actions/types";

const initialState = {
  isLoading: false,
  info: []

};

export default function (state = initialState, action) {
  // console.log("action in profile", action);
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case PROFILE_LOADED:
      console.log("action in profile", action.payload)
      return {
        ...state,
        isLoading: false,
        info: [...action.payload]
      };
    case PROFILE_REMOVE:
      return {
        ...state,
        isLoading: false,
        info: [...action.payload]
      };
    default:
      return state;
  }
}
