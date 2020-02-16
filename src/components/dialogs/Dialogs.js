import React from 'react';
import {Field, reduxForm} from "redux-form";

import s from './Dialogs.module.css';
import DialogItem from "./dialog_item/DialogItem";
import Message from "./message/Message";


const AddMessageForm = (props) => {
    // HOC reduxForm provides handleSubmit in props as well as a lot of other stuff
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={'textarea'} name={'newMessage'} placeholder={'Enter your message'} />
            </div>
            <div>
                <button>SEND MESSAGE</button>
            </div>
        </form>
    )
};

const AddMessageReduxForm = reduxForm({form: 'dialog_add_message'})(AddMessageForm);

const Dialogs = (props) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map((el) => {
        return <DialogItem name={el.name} id={el.id} />
    });

    let messagesElements = state.messages.map((el) => {
        return <Message msg={el.msg} id={el.id} />
    });

    let addNewMessage = (formData) => {
        props.sendMessage(formData.newMessage)
    };

    return (
        <div className={s.dialogs}>

            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                <div>{messagesElements}</div>

                <AddMessageReduxForm onSubmit={addNewMessage}/>
            </div>

        </div>
    );
};


export default Dialogs;