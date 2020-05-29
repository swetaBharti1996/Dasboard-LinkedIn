import {
    POST_LOADED,
    POST_LOADING,
    POST_UNLOADED,
    SENDING_EMAIL,
    EMAIL_SENT,
    COLLECT_EMAILS,
} from "../actions/types";

const initialState = {
    isLoading: false,
    posts: [],
    csvData: [],
    emailCollection: [],
    isEmailSending: false,
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
                posts: [...action.payload],
            };
        case POST_UNLOADED:
            return {
                isLoading: false,
                posts: [],
            };
        case COLLECT_EMAILS:
            console.log(action.email, 'email')
            return {
                ...state,
                emailCollection: [...action.email],
            };
        case SENDING_EMAIL:
            return {
                ...state,
                isEmailSending: true,
            };
        case EMAIL_SENT:
            return {
                ...state,
                isEmailSending: false,
            };

        default:
            return state;
    }
}
