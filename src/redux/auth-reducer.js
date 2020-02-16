import {stopSubmit} from "redux-form";
import {authAPI} from "../api/api";

// При диспатче стор будет отправлять экшены во все редюсеры, поэтому лучше
// обеспечить уникальность имен (например добавив имя редюсера)
const SET_USER_DATA = 'auth/SET_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};
// !!! Редюсер, как и любая другая чистая функция (например последняя в цепочке функциональня компонента)
// не должен изменять приходящие аргументы, а возвращать копию стейта.
// (Чистая функция должна просто сформировать jsx на основе пришедших props.
const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA: {
            return {...state, ...action.data}
        }
        default: {
            return state;
        }
    }
};
// ACTION CREATORS
export const setAuthUserData = (userId, email, password, isAuth) => {
    return {
        type: SET_USER_DATA,
        data: {userId, email, password, isAuth}
    }
};
// THUNK CREATORS
// return thunks, that in turn incapsulate API requests
// and dispatch action creators
export const getAuthUserData = () => async (dispatch) => {
    // Usually we do not need RETURN in thunks because it is good practice
    // to dispatch thunk and forget. But sometimes we need the result, as
    // in case with initializeApp - see app-reducer
    let response = await authAPI.authenticate();

    if (response.data.resultCode === 0) {
        let {id, email, password} = response.data;
        dispatch(setAuthUserData(id, email, password, true));
    }
};

export const login = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe);

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        dispatch(stopSubmit('login', {_error: 'invalid'}));
    }
};

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};


export default authReducer;
