import axios from "axios";
import {
    INSIGHT_LOADING,
    INSIGHT_LOADED,
    ANALYZEPOST_LOADING,
    ANALYZEPOST_LOADED,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const loadInsight = () => (dispatch, getState) => {
    dispatch({ type: INSIGHT_LOADING });
    axios
        .get(
            `https://backend.customfb.com/scb/website/scrapper/insight/totalAnalysis`,
            tokenConfig(getState)
        )
        .then((res) => {
            console.log("data received from insight", res.data);
            dispatch({
                type: INSIGHT_LOADED,
                payload: { ...res.data },
            });
        })
        .catch((err) => {
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

export const postAnalyse = (posturl) => (dispatch, getState) => {
    dispatch({ type: ANALYZEPOST_LOADING });

    const body = JSON.stringify({ posturl });
    console.log(body, "body functions");
    axios
        .post(
            `https://backend.customfb.com/scb/website/scrapper/insight/postAnalysis`,
            body,
            tokenConfig(getState)
        )
        .then((res) => {
            console.log(res.data, "post Analyse");
            dispatch({
                type: ANALYZEPOST_LOADED,
                payload: res.data,
            });
        })
        .catch((err) => {
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
