import {
  PROFILESDETAILS_LOADED,
  PROFILESDETAILS_LOADING,
  CSV_LOADED,
  CSV_LOADING,
} from "../actions/types";

const initialState = {
  isLoading: false,
  profilesDetailss: [],
  csvData: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILESDETAILS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case PROFILESDETAILS_LOADED:
      return {
        ...state,
        isLoading: false,
        profilesDetailss: [...action.payload],
      };
    default:
      return state;
  }
}
