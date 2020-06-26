import { INSIGHT_LOADED, INSIGHT_LOADING } from '../actions/types'

const initialState = {
    isLoading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case INSIGHT_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case INSIGHT_LOADED:
            console.log(action.payload, 'data load')
            return {
                ...state,
                isLoading: false,
                ...action.payload
            }
        default:
            return state;
    }
}
