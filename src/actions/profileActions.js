import axios from "axios";
import { PROFILE_LOADED, PROFILE_LOADING } from "./types";
import { tokenConfig } from "./authActions";

import { returnErrors } from "./errorActions";

export const loadProfiles = () => (dispatch, getState) => {
    dispatch({ type: PROFILE_LOADING });

    axios
        .get(
            `http://localhost:8080/website/scrapper/linkuser/getlinkedindata`,
            tokenConfig(getState)
        )

        .then((res) => {
            dispatch({
                type: PROFILE_LOADED,
                payload: res.data.profiles,
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
