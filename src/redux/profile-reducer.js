import {profileAPI} from "../api/api";

// При диспатче стор будет отправлять экшены во все редюсеры, поэтому лучше
// обеспечить уникальность имен (например добавив имя редюсера)
const ADD_POST = 'profile/ADD_POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';


let initialState = {
    posts: [
        {id: 1, 'msg': 'hdfbvh', 'likesCount': 12}, {id: 2, 'msg': 'kfjbvd', 'likesCount': 10}
    ],
    profile: null,
    status: ''
};
// !!! Редюсер, как и любая другая чистая функция (например последняя в цепочке функциональня компонента)
// не должен изменять приходящие аргументы, а возвращать копию стейта.
// (Чистая функция должна просто сформировать jsx на основе пришедших props.
const profileReducer = (state = initialState, action) => {
    // We cannot work with state object, we always have to create copy
    // and return copy if there is the case (if default -> return just state);
    // moreover !!! REMEMBER DEEP COPY !!!
    // One more thing - in every condition we ONLY copy attrs we are
    // going to change
    switch(action.type) {
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case ADD_POST: {
            let newPost = { id: 5, message: action.text, likesCount: 0 };
            return {
                ...state,
                posts:[...state.posts, newPost]
            }
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        default: {
            return state;
        }
    }
};
// ACTION CREATORS
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const addPostActionCreator = (text) => ({type: ADD_POST, text});
export const setStatus = (status) => ({type: SET_STATUS, status});

// THUNK CREATORS
// return thunks, that in turn incapsulate API requests
// and dispatch action creators
export const getUserProfile = (userId) => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);

    dispatch(setUserProfile(response.data));
};

export const getUserProfileStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getProfileStatus(userId);

    dispatch(setStatus(response.status));
};

export const updateUserProfileStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateProfileStatus(status);

    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
};


export default profileReducer;
