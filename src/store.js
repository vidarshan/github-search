import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userSearchReducer, getUserReducer } from './reducers/userReducers';

const reducer = combineReducers({
    userSearch: userSearchReducer,
    getUser: getUserReducer
});

const initialState = {};

const middlware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlware))
);

export default store;