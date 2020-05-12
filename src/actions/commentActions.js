import axios from 'axios';
import {
    COMMENT_LOADED,
    COMMENT_LOADING,
} from './types'
import { tokenConfig } from './authActions'

import { returnErrors } from './errorActions'

export const loadComments = () => (dispatch, getState) => {
    dispatch({ type: COMMENT_LOADING });

    axios
        .get(
            `http://localhost:8080/website/scrapper/post/getAllComments`,
            tokenConfig(getState)
        )
        .then(res => {
            // console.log("response in comment action", res.data);
            dispatch({
                type: COMMENT_LOADED,
                payload: res.data
            });
        })
        .catch(err => {
            // console.log(" load post erorr in", err);
            if (err.data) {
                dispatch(
                    returnErrors(
                        err.response.data.message,
                        err.response.status,
                        err.response.data.success
                    )
                );
            }
        });
};


