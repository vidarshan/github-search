import axios from 'axios';
import { USER_SEARCH_REQUEST, USER_SEARCH_SUCCESS, USER_SEARCH_FAIL, USER_GET_REQUEST, USER_GET_SUCCESS, USER_GET_FAIL, USER_GET_REPOS_REQUEST, USER_GET_REPOS_SUCCESS, USER_GET_REPOS_FAIL, USER_GET_GISTS_REQUEST, USER_GET_GISTS_SUCCESS, USER_GET_GISTS_FAIL, USER_GET_STARRED_REQUEST, USER_GET_STARRED_SUCCESS, USER_GET_STARRED_FAIL } from '../constants/userConstants';

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

export const getUserInfo = (user) => async (dispatch) => {
    try {
        dispatch({
            type: USER_GET_REQUEST
        });

        console.log(process.env)


        const { data } = await axios.get(
            ` https://api.github.com/users/${user}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
        );

        dispatch({
            type: USER_GET_SUCCESS,
            payload: data,
        });

        console.log(data)

    } catch (error) {
        dispatch({
            type: USER_GET_FAIL,
            payload:
                error.response && error.response.data.msg
                    ? error.response.data.msg
                    : error.msg,
        });
    }
};


export const getUserRepos = (user) => async (dispatch) => {
    try {
        dispatch({
            type: USER_GET_REPOS_REQUEST
        });


        const { data } = await axios.get(
            `https://api.github.com/users/${user}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
        );

        dispatch({
            type: USER_GET_REPOS_SUCCESS,
            payload: data,
        });

        console.log(data)

    } catch (error) {
        dispatch({
            type: USER_GET_REPOS_FAIL,
            payload:
                error.response && error.response.data.msg
                    ? error.response.data.msg
                    : error.msg,
        });
    }
};

export const getUserGists = (user) => async (dispatch) => {
    try {
        dispatch({
            type: USER_GET_GISTS_REQUEST
        });


        const { data } = await axios.get(
            `https://api.github.com/users/${user}/gists?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
        );

        dispatch({
            type: USER_GET_GISTS_SUCCESS,
            payload: data,
        });

        console.log(data)

    } catch (error) {
        dispatch({
            type: USER_GET_GISTS_FAIL,
            payload:
                error.response && error.response.data.msg
                    ? error.response.data.msg
                    : error.msg,
        });
    }
};


export const getUserStarred = (user) => async (dispatch) => {
    try {
        dispatch({
            type: USER_GET_STARRED_REQUEST
        });

        const { data } = await axios.get(
            `https://api.github.com/users/${user}/starred?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
        );

        dispatch({
            type: USER_GET_STARRED_SUCCESS,
            payload: data,
        });

        console.log(data)

    } catch (error) {
        dispatch({
            type: USER_GET_STARRED_FAIL,
            payload:
                error.response && error.response.data.msg
                    ? error.response.data.msg
                    : error.msg,
        });
    }
};