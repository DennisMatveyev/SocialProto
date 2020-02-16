import {usersAPI} from "../api/api";

// При диспатче стор будет отправлять экшены во все редюсеры, поэтому лучше
// обеспечить уникальность имен (например добавив имя редюсера)
const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_USERS_COUNT = 'users/SET_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOW_PROGRESS = 'users/TOGGLE_FOLLOW_PROGRESS';

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};
// !!! Редюсер, как и любая другая чистая функция (например последняя в цепочке функциональня компонента)
// не должен изменять приходящие аргументы, а возвращать копию стейта.
// (Чистая функция должна просто сформировать jsx на основе пришедших props.
const usersReducer = (state = initialState, action) => {
    // We cannot work with state object, we always have to create copy
    // and return copy if there is the case (if default -> return just state);
    // moreover !!! REMEMBER DEEP COPY !!!
    // One more thing - in every condition we ONLY copy attrs we are
    // going to change
    switch(action.type) {
        case SET_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_FOLLOW_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user
                })
            };
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user
                })
            };
        }
        default: {
            return state;
        }
    }
};
// ACTION CREATORS
export const followSuccess = (userId) => ({type: FOLLOW, userId});
export const unfollowSuccess = (userID) => ({type: UNFOLLOW, userID});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (c) => ({type: SET_USERS_COUNT, totalUsersCount: c});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_FOLLOW_PROGRESS, isFetching, userId});

// THUNK CREATORS
// return thunks, that in turn incapsulate API requests
// and dispatch action creators
export const getUsers = (page, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));

    let response = await usersAPI.getUsers(page, pageSize);

    dispatch(toggleIsFetching(false));
    dispatch(setCurrentPage(page));
    dispatch(setUsers(response.data.items));
    dispatch(setTotalUsersCount(response.data.totalCount));

};

export const follow = (userId) => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId));

    let response = await usersAPI.follow(userId);

    if (response.data.resultCode === 0) {
        dispatch(followSuccess(userId))
    }

    dispatch(toggleFollowingProgress(false, userId));
};

export const unfollow = (userId) => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId));

    let response = await usersAPI.unfollow(userId);

    if (response.data.resultCode === 0) {
        dispatch(unfollowSuccess(userId))
    }

    dispatch(toggleFollowingProgress(false, userId));
};


export default usersReducer;
