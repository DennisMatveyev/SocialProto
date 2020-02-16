import { createSelector } from "reselect";

// SELECTORS are functions that serve for mapStateToProps and provide
// some data from the state.
export const getUsersSelector = (state) => {
    return state.usersPage.users
};

// There are complex selector functions that not just return some
// state attr a kind of - return state.some.attr but perform some time
// consuming operations before returning.
// RESELECT lib for this case:
export const someTimeConsumingOperationSelector = createSelector(
    getUsersSelector,
    // here second simple selector can go
    (users, resultOfSecondSimpleSelector) => { // here we receive return of getUsersSelector and some other selector
        // Some computing goes here, for example some filtering through millions of users
        return users.filter(u => true)
    }
);

export const getPageSizeSelector = (state) => {
    return state.usersPage.pageSize
};

export const getTotalUsersCountSelector = (state) => {
    return state.usersPage.totalUsersCount
};

export const getCurrentPageSelector = (state) => {
    return state.usersPage.currentPage
};

export const getIsFetchingSelector = (state) => {
    return state.usersPage.isFetching
};

export const getFollowingInProgressSelector = (state) => {
    return state.usersPage.followingInProgress
};
