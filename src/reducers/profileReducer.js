import {
  PROFILE_LOADED,
  PROFILE_LOADING,
  PROFILE_UNLOADED,
} from "../actions/types";

const initialState = {
  isLoading: false,
  profiles: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case PROFILE_LOADED:
      return {
        ...state,
        isLoading: false,
        profiles: [...action.payload],
      };
    case PROFILE_UNLOADED:
      return {
        isLoading: false,
        profiles: [],
      };
    default:
      return state;
  }
}
