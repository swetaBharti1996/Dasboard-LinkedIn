import {
  PROFILEDETAIL_LOADED,
  PROFILEDETAIL_LOADING,
  CSV_LOADED,
  CSV_LOADING,
} from "../actions/types";

const initialState = {
  isLoading: false,
  datas: [],
  csvData: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILEDETAIL_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case PROFILEDETAIL_LOADED:
      return {
        ...state,
        isLoading: false,
        datas: [...action.payload],
      };
    default:
      return state;
  }
}
