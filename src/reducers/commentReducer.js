import {
  COMMENT_LOADED,
  COMMENT_LOADING,
  COMMENT_REMOVE,
} from "../actions/types";

const initialState = {
  isLoading: false,
  comments: [],
  csvData: [],
  database: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMMENT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case COMMENT_LOADED:
      return {
        ...state,
        isLoading: false,
        comments: [...action.payload],
      };
    case COMMENT_REMOVE:
      return {
        ...state,
        database: [state.filter((data, i) => i !== action.posturl)],
      };
    default:
      return state;
  }
}
