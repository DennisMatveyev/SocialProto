import React, {useState, useContext} from 'react';
import {AlertContext} from "../../context/alert/alertContext";
import {FirebaseContext} from "../../context/firebase/firebaseContext";


export const NotesForm = () => {
    const [value, setValue] = useState('');

    const alert = useContext(AlertContext);
    const firebase = useContext(FirebaseContext);

    const submitHandler = async e => {
        e.preventDefault();

        if (value.trim()) {
            await firebase.addNote(value.trim());

            alert.show('New note created', 'success');

            setValue('');

        } else {
            alert.show('Input some text');
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <div className='form-group'>
                <input type='text'
                       className='form-control'
                       value={value}
                       onChange={e => setValue(e.target.value)}
                />
            </div>
        </form>
    )
};