import React from 'react';
import {Field, reduxForm} from "redux-form";

import Post from "./post/Post";
import {maxLength, required} from "../../../utils/validators";


let maxLength30 = maxLength(30);

const AddNewPostForm = (props) => {
    // HOC reduxForm provides handleSubmit in props as well as a lot of other stuff
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={'textarea'} name={'newPostText'} validate={[required, maxLength30]} />
            <button>ADD POST</button>
        </form>
    )
};

const AddNewPostReduxForm = reduxForm({form: 'add_post'})(AddNewPostForm);

// PureComponent под капотом заботиться о shouldComponentUpdate
// class MyPosts extends PureComponent {
//     // См. замысел этого метода в ProfileContainer.js
//     // Если возвращает false, то render() не вызывается
//     // shouldComponentUpdate(nextProps, nextState, nextContext) {
//     //     return nextProps != this.props || nextState != this.state;
//     // }
//
//     render() {
//         let postsElements = this.props.posts.map((el) => {
//             return <Post msg={el.msg} id={el.id} likesCount={el.likesCount}/>
//         });
//
//         let onAddPost = (formData) => {
//             this.props.addPost(formData.newPostText);
//         };
//
//         return (
//             <div>
//                 MY POSTS
//
//                 <AddNewPostReduxForm onSubmit={onAddPost}/>
//
//                 {postsElements}
//
//             </div>
//         );
//     }
// }

// См. объяснение React.memo in ProfileContainer.js
const MyPosts = React.memo(props => {
    let postsElements = props.posts.map((el) => {
        return <Post msg={el.msg} id={el.id} likesCount={el.likesCount}/>
    });

    let onAddPost = (formData) => {
        props.addPost(formData.newPostText);
    };

    return (
        <div>
            MY POSTS

            <AddNewPostReduxForm onSubmit={onAddPost}/>

            {postsElements}

        </div>
    );
});


export default MyPosts;