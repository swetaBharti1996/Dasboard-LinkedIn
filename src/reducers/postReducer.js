import { POST_LOADED, POST_LOADING, POST_UNLOADED } from "../actions/types";

const initialState = {
    isLoading: false,
    posts: []
};

export default function (state = initialState, action) {
    // console.log('called this', action.type, action.payload)
    switch (action.type) {
        case POST_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case POST_LOADED:
            // console.log('finally,', action.payload)
            return {
                isLoading: false,
                posts: [...action.payload]
            };
        case POST_UNLOADED:
            return {
                isLoading: false,
                posts: [],
            };
        default:
            return state;
    }
}
