import React from 'react';
import s from '../Dialogs.module.css';


const Message = (props) => {
    return (
        <div className={s.message}>
            {props.msg}
        </div>
    );
};

export default Message;
