import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";

import {withAuthRedirect} from "../../hoc/AuthRedirect";

import {
    getUsers,
    follow,
    setCurrentPage,
    toggleFollowingProgress,
    unfollow
} from "../../redux/users-reducer";

import Users from "./Users";

import {
    getCurrentPageSelector,
    getFollowingInProgressSelector,
    getIsFetchingSelector,
    getPageSizeSelector,
    getTotalUsersCountSelector,
    getUsersSelector
} from "../../redux/users-selectors";


class UsersAPIComponent extends React.Component {
    // The purpose of this container component is to clean final Users component
    // from side-effects (final component just have to be responsible for JSX)
    // This method is one of so-called component life cycle methods and
    // designed for side-effects as well (like ajax e.g.)
    componentDidMount() {
        // This is THUNK that is returned by getUsersThunkCreator
        // as result of CONNECT mechanism (see at the bottom)
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);

        // this.props.setCurrentPage(pageNumber);
        // this.props.toggleIsFetching(true);
        //
        // getUsers(pageNumber, this.props.pageSize).then(data => {
        //     this.props.toggleIsFetching(false);
        //     this.props.setUsers(data.items);
        // });
    };

    render() {
        return <>
                  {this.props.isFetching ? <div>Waiting img here</div> : null}

                  <Users totalUsersCount={this.props.totalUsersCount}
                         pageSize={this.props.pageSize}
                         currentPage={this.props.currentPage}
                         onPageChanged={this.onPageChanged}
                         users={this.props.users}
                         unfollow={this.props.unfollow}
                         follow={this.props.follow}
                         followingInProgress={this.props.followingInProgress}
                  />
               </>
    }
}

// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// };

// Look above and see user-selectors for explanation
let mapStateToProps = (state) => {
    return {
        // usersFiltered: someTimeConsumingOperationSelector(state),
        users: getUsersSelector(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: getTotalUsersCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        isFetching: getIsFetchingSelector(state),
        followingInProgress: getFollowingInProgressSelector(state)
    }
};

// See explanation in ProfileContainer.js
export default compose(
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers}),
    //withAuthRedirect
)(UsersAPIComponent);
