import { axios } from 'axios';
import { COMPILE, LOADING } from "./types";
import { getServer } from "../util";
const server = getServer();

export const compileCode = (payload) => dispatch => {
    dispatch(loading());
    axios
        .post(`${server}/api/compile`, payload)
        .then(res =>
            dispatch({
                type: COMPILE,
                payload: res.data
            })
        ).catch(_ =>
            dispatch({
                type: COMPILE,
                payload: {}
            })
        );
};

export const loading = () => {
    return {
        type: LOADING
    };
}