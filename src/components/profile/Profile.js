import React from 'react';

import MyPostsContainer from "./my_posts/MyPostsContainer";
import ProfileInfo from "./profile_info/ProfileInfo";


const Profile = (props) => {
    return (
        <div className='content'>

            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateUserProfileStatus={props.updateUserProfileStatus}
            />

            <MyPostsContainer />

        </div>
    );
};


export default Profile;