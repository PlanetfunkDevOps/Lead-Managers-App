import axios from 'axios';
import { returnErrors } from './messsages';

import { USER_LOADED, USER_LOADING, AUTH_ERROR } from './types';

/* CHECK TOKEN && LOAD USER */
export const loadUser = () => (dispatch, getState) => {
    /* User Loading */
    dispatch({ type: USER_LOADING });

    /* Get token from state */
    const token = getState().auth.token;

    /* Headers */
    const config = {
        Headers: {
            'Content-Type': 'application/json'
        }
    }

    /* If token add to headers config */
    if (token) {
        config.Headers['Authorization'] = `Token ${token}`;
    }

    axios.get('/api/auth/user', config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: red.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
}