import React, {useReducer} from 'react';
import {FirebaseContext} from "./firebaseContext";
import {firebaseReducer} from "./firebaseReducer";
import {ADD_NOTE, FETCH_NOTES, REMOVE_NOTE, SHOW_LOADER} from "../types";
import {notesAPI} from "../../api/api";


export const FirebaseState = ({ children }) => {
    const initialState = {
        notes: [],
        loading: false
    };
    const [state, dispatch] = useReducer(firebaseReducer, initialState);

    const showLoader = () => dispatch({type: SHOW_LOADER});

    const fetchNotes = async () => {
        showLoader();
        const res = await notesAPI.fetchNotes();

        const payload = Object.keys(res.data).map(key => {
            return {
                ...res.data[key],
                id: key
            }
        });

        dispatch({type: FETCH_NOTES, payload});

    };

    const addNote = async (title) => {
        const res = await notesAPI.addNote(title);

        const payload = {title, id: res.data.name};
        dispatch({type: ADD_NOTE, payload});
    };

    const removeNote = async (id) => {
        await notesAPI.removeNote(id);

        dispatch({type: REMOVE_NOTE, payload: id});
    };

    return (
        <FirebaseContext.Provider value={ {showLoader,
                                           fetchNotes,
                                           addNote,
                                           removeNote,
                                           loading: state.loading,
                                           notes: state.notes
                                           }
                                         }
        >
            {children}
        </FirebaseContext.Provider>
    )
};
