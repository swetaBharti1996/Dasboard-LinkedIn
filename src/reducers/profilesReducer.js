import {
  PROFILES_LOADED,
  PROFILES_LOADING,
  PROFILES_UNLOADED,
} from "../actions/types";

const initialState = {
  isLoading: false,
  profiless: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILES_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case PROFILES_LOADED:
      return {
        ...state,
        isLoading: false,
        profiless: [...action.payload],
      };
    case PROFILES_UNLOADED:
      return {
        isLoading: false,
        profiless: [],
      };
    default:
      return state;
  }
}
