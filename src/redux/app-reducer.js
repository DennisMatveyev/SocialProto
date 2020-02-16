import {getAuthUserData} from "./auth-reducer";

// При диспатче стор будет отправлять экшены во все редюсеры, поэтому лучше
// обеспечить уникальность имен (например добавив имя редюсера)
const SET_INITIALIZED = 'app/SET_INITIALIZED';

let initialState = {
    initialized: false
};

// !!! Редюсер, как и любая другая чистая функция (например последняя в цепочке функциональня компонента)
// не должен изменять приходящие аргументы, а возвращать копию стейта.
// (Чистая функция должна просто сформировать jsx на основе пришедших props.
const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_INITIALIZED: {
            return {...state, initialized: true}
        }
        default: {
            return state;
        }
    }
};
// ACTION CREATORS
export const setInitialized = () => ({ type: SET_INITIALIZED });

// THUNK CREATORS
// return thunks, that in turn incapsulate API requests
// and dispatch action creators
export const initializeApp = () => {
    return (dispatch) => {
        // Usually we do not need the result of thunk because it is good practice
        // to dispatch thunk and forget. But in this case our setInitialized below
        // should be dispatched only when we have previous operations performed.
        let promise = dispatch(getAuthUserData());

        promise.then(() => {
            dispatch(setInitialized());
        });
    }
};


export default appReducer;