import axios from 'axios';
import { USER_SEARCH_REQUEST, USER_SEARCH_SUCCESS, USER_SEARCH_FAIL, USER_GET_REQUEST, USER_GET_SUCCESS, USER_GET_FAIL, USER_GET_REPOS_REQUEST, USER_GET_REPOS_SUCCESS, USER_GET_REPOS_FAIL, USER_GET_GISTS_REQUEST, USER_GET_GISTS_SUCCESS, USER_GET_GISTS_FAIL, USER_GET_STARRED_REQUEST, USER_GET_STARRED_SUCCESS, USER_GET_STARRED_FAIL, GET_RATE_LIMIT_REQUEST, GET_RATE_LIMIT_SUCCESS, GET_RATE_LIMIT_FAIL } from '../constants/userConstants';

const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

export const searchUser = (keyword) => async (dispatch) => {
    try {
        dispatch({
            type: USER_SEARCH_REQUEST
        });

        const { data } = await axios.get(
            `https://api.github.com/users/${keyword}?accept=true&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
        );

        dispatch({
            type: USER_SEARCH_SUCCESS,
            payload: data,
        });


    } catch (error) {
        dispatch({
            type: USER_SEARCH_FAIL,
            payload: error.response ? `${error.response.data.message} - ${error.response.status}` : 'An error occurred - 503'
        });
    }
};

export const getUserInfo = (user) => async (dispatch) => {
    try {
        dispatch({
            type: USER_GET_REQUEST
        });

        const { data } = await axios.get(
            ` https://api.github.com/users/${user}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
        );

        dispatch({
            type: USER_GET_SUCCESS,
            payload: data,
        });


    } catch (error) {
        dispatch({
            type: USER_GET_FAIL,
            payload: 'An error occurred'
        });
    }
};


export const getUserRepos = (user, page) => async (dispatch) => {
    try {
        dispatch({
            type: USER_GET_REPOS_REQUEST
        });


        const { data } = await axios.get(
            `https://api.github.com/users/${user}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}?per_page=100&page=${page}`
        );

        dispatch({
            type: USER_GET_REPOS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: USER_GET_REPOS_FAIL,
            payload: 'An error occurred'
        });
    }
};

export const getUserGists = (user, page) => async (dispatch) => {
    try {
        dispatch({
            type: USER_GET_GISTS_REQUEST
        });


        const { data } = await axios.get(
            `https://api.github.com/users/${user}/gists?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}?per_page=100&page=${page}`
        );

        dispatch({
            type: USER_GET_GISTS_SUCCESS,
            payload: data,
        });


    } catch (error) {
        dispatch({
            type: USER_GET_GISTS_FAIL,
            payload: 'An error occurred'
        });
    }
};


export const getUserStarred = (user, page) => async (dispatch) => {
    try {
        dispatch({
            type: USER_GET_STARRED_REQUEST
        });

        const { data } = await axios.get(
            `https://api.github.com/users/${user}/starred?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}?per_page=100&page=${page}`
        );

        dispatch({
            type: USER_GET_STARRED_SUCCESS,
            payload: data,
        });


    } catch (error) {
        dispatch({
            type: USER_GET_STARRED_FAIL,
            payload: 'An error occurred'
        });
    }
};

export const getRate = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_RATE_LIMIT_REQUEST
        });

        const { data } = await axios.get(
            `https://api.github.com/rate_limit`
        );

        dispatch({
            type: GET_RATE_LIMIT_SUCCESS,
            payload: data,
        });


    } catch (error) {
        dispatch({
            type: GET_RATE_LIMIT_FAIL,
            payload: 'An error occurred'
        });
    }
};