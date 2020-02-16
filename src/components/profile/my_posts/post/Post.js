import React from 'react';


const Post = (props) => {
    return (
        <div>
            {props.msg}
            <div>
                <span>Like</span>{props.likesCount}
            </div>
        </div>
    );
};


export default Post;