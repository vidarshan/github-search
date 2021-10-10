import { USER_SEARCH_SUCCESS, USER_SEARCH_FAIL, USER_SEARCH_REQUEST, USER_GET_REQUEST, USER_GET_SUCCESS, USER_GET_FAIL } from '../constants/userConstants';

export const userSearchReducer = (
    state = { userSearch: [] },
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
