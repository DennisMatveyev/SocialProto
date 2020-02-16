import React from 'react';

import ProfileStatusWithHooks from "./ProfileStatusWithHooks";


const ProfileInfo = (props) => {
    if (!props.profile) {
        return <div>SOME PRELOADER HERE</div>
    }
    /* See just ProfileStatus.js for comparing WithHooks and without ones */
    return (
        <div>
            <ProfileStatusWithHooks status={props.status}
                                    updateUserProfileStatus={props.updateUserProfileStatus}
            />

            THIS IS PROFILE INFO
            <img src={props.profile.photos.small} />
        </div>
    );
};


export default ProfileInfo;