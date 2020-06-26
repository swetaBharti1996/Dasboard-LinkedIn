import { ANALYZEPOST_LOADING, ANALYZEPOST_LOADED } from "../actions/types";

const initialState = {
  isLoading: false,
  InsightData: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ANALYZEPOST_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ANALYZEPOST_LOADED:
      console.log(action.payload, "post load");
      return {
        ...state,
        isLoading: false,
        InsightData: [...action.payload],
      };
    default:
      return state;
  }
}
