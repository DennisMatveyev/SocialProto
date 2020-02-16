import React from 'react';
import {NavLink} from "react-router-dom";

// Here unpacking props is being applied
const User = ({u, followingInProgress, unfollow, follow}) => {
    return (
        <div key={u.id}>

            <NavLink to={'/profile/' + u.id}>
                <div>{u.name}</div>
            </NavLink>

            {
             u.followed
             ? <button disabled={followingInProgress.some(id => id === u.id)}
                       onClick={() => { unfollow(u.id) }}
               >
                 Unfollow
               </button>

             : <button disabled={followingInProgress.some(id => id === u.id)}
                       onClick={() => { follow(u.id) }}
               >
                 Follow
               </button>
             }

        </div>
    )
};


export default User;
