import axios from 'axios';
import { USER_SEARCH_REQUEST, USER_SEARCH_SUCCESS, USER_SEARCH_FAIL } from '../constants/userConstants';

const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

export const searchUser = (keyword) => async (dispatch) => {
    try {
        dispatch({
            type: USER_SEARCH_REQUEST
        });

        console.log(process.env)

        const { data } = await axios.get(
            ` https://api.github.com/search/users?q=${keyword}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
        );

        dispatch({
            type: USER_SEARCH_SUCCESS,
            payload: data,
        });

        console.log(data)

    } catch (error) {
        dispatch({
            type: USER_SEARCH_FAIL,
            payload:
                error.response && error.response.data.msg
                    ? error.response.data.msg
                    : error.msg,
        });
    }
};