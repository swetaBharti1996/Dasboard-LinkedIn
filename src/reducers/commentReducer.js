import {
    COMMENT_LOADED,
    COMMENT_LOADING,
    COMMENT_UNLOADED
} from "../actions/types";


const initialState = {
    isLoading: false,
    comments: [],
    csvData: []
};

export default function (state = initialState, action) {

    switch (action.type) {
        case COMMENT_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case COMMENT_LOADED:
            console.log('this is state', state.comments, 'this is action', action.payload)
            return {
                ...state,
                isLoading: false,
                comments: [...action.payload],
            };
        case COMMENT_UNLOADED:
            return {
                ...state,
                isLoading: false,
                comments: [...action.payload]
            }
        default:
            return state;
    }
}
