import {
    USER_SEARCH_SUCCESS,
    USER_SEARCH_FAIL,
    USER_SEARCH_REQUEST,
    USER_GET_REQUEST,
    USER_GET_SUCCESS,
    USER_GET_FAIL,
    USER_GET_REPOS_REQUEST,
    USER_GET_REPOS_SUCCESS,
    USER_GET_REPOS_FAIL,
    USER_GET_GISTS_REQUEST,
    USER_GET_GISTS_SUCCESS,
    USER_GET_GISTS_FAIL,
    USER_GET_STARRED_REQUEST,
    USER_GET_STARRED_SUCCESS,
    USER_GET_STARRED_FAIL
} from '../constants/userConstants';

export const userSearchReducer = (
    state = { userSearch: {} },
    action
) => {
    switch (action.type) {
        case USER_SEARCH_REQUEST:
            return { ...state, loading: true };
        case USER_SEARCH_SUCCESS:
            return { ...state, loading: false, userSearch: action.payload };
        case USER_SEARCH_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const getUserReducer = (state = { getUser: {} }, action) => {
    switch (action.type) {
        case USER_GET_REQUEST:
            return { ...state, loading: true };
        case USER_GET_SUCCESS:
            return { ...state, loading: false, getUser: action.payload };
        case USER_GET_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

export const getUserRepos = (state = { userRepos: [] }, action) => {
    switch (action.type) {
        case USER_GET_REPOS_REQUEST:
            return { ...state, loading: true };
        case USER_GET_REPOS_SUCCESS:
            return { ...state, loading: false, userRepos: action.payload };
        case USER_GET_REPOS_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

export const getUserGists = (state = { userGists: [] }, action) => {
    switch (action.type) {
        case USER_GET_GISTS_REQUEST:
            return { ...state, loading: true };
        case USER_GET_GISTS_SUCCESS:
            return { ...state, loading: false, userGists: action.payload };
        case USER_GET_GISTS_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

export const getUserStarred = (state = { userStarred: [] }, action) => {
    switch (action.type) {
        case USER_GET_STARRED_REQUEST:
            return { ...state, loading: true };
        case USER_GET_STARRED_SUCCESS:
            return { ...state, loading: false, userStarred: action.payload };
        case USER_GET_STARRED_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}