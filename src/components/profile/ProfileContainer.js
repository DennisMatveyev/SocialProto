import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

import Profile from "./Profile";
import {getUserProfile, getUserProfileStatus, updateUserProfileStatus} from "../../redux/profile-reducer";
import {withAuthRedirect} from "../../hoc/AuthRedirect";


class ProfileContainer extends React.Component{

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            // костыль - как правило следует редиректить через компоненту Редирект
            if (!userId) {
                this.props.history.push('/login');
            }
        }

        this.props.getUserProfile(userId);
        this.props.getUserProfileStatus(userId);
    }

    render() {
        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateUserProfileStatus={this.props.updateUserProfileStatus}
            />
        );
    }
}

// !!! ProfileContainer будет перерисовываться каждый раз когда будет что-либо
// меняться в стейте возвращаемого ниже объекта. Соответственно будет ререндериться
// Profile, а он в свою очередь содержит ProfileInfo и MyPostsContainer.
// Т.е. например при изменении стейта ПрофайлИнфо будет перерисовываться и
// MyPostsContainer, что не очень хорошо. Для избежания этого в классовой компоненте
// реализован shouldComponentUpdate и PureComponent, для функций компонент также
// есть примочка HOC React.memo() (см. MyPosts.js)
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

// Here we have pipe with opposite direction:
// withAuthRedirect receives ProfileContainer and returns new object
// withRouter receives new object and returns one more
// and eventually connect receives final object
export default compose(
    connect(mapStateToProps, { getUserProfile, getUserProfileStatus, updateUserProfileStatus }),
    withRouter,
    //withAuthRedirect
)(ProfileContainer);
