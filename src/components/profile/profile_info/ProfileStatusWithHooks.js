import React, { useState, useEffect } from 'react';


// See just ProfileStatus.js for comparing
const ProfileStatusWithHooks = (props) => {
    // HOOK useState returns array with 2 elements:
    // 0 - argument we have put into useState()
    // 1 - function that change the value of 0 element
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    // HOOK useEffect gets a function as argument, and this function will be
    // called after component rendering (it is a kind of analogue of class based
    // component's ComponentDidMount/Update)
    // Second argument [] says that callback should be called only one time
    // ( a kind of only ComponentDidMount )
    // Если мы кладем что-либо в список, то мы говорим хуку отслеживать этот
    // аттрибут и если его значение меняется, то опять вызывать коолбэк
    // ( a kind of like ComponentDidUpdate )
    useEffect( () => {
        setStatus(props.status);
    }, [props.status] );

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserProfileStatus(status)
    };

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <div>
            { !editMode &&
              <div>
                <span onDoubleClick={ activateEditMode }>
                    { props.status }
                </span>
              </div>
            }
            { editMode &&
              <div>
                <input autoFocus={ true }
                       onBlur={ deactivateEditMode }
                       onChange={ onStatusChange }
                       value={ status }
                />
              </div>
            }
        </div>
    );
};


export default ProfileStatusWithHooks;