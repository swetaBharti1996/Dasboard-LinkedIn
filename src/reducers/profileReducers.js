import {
  PROFILE_LOADED,
  PROFILE_LOADING,
  PROFILE_UNLOADED
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
      return {
        ...state,
        isLoading: false,
        info: [...action.payload]
      };
    case PROFILE_UNLOADED:
      return {
        isLoading: false,
        info: []
      };
    default:
      return state;
  }
}
