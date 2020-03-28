import React, {Fragment, useContext, useEffect} from "react";
import {NotesForm} from "./NotesForm";
import {Notes} from "./Notes";
import {FirebaseContext} from "../../context/firebase/firebaseContext";


const NotesPage = () => {
    const {loading, notes, fetchNotes, removeNote} = useContext(FirebaseContext);

    // This HOOK emulates ComponentDidMount if second arg deps is []
    useEffect(() => {
        fetchNotes()
    }, []);

    /* if loading then some PreLoader before Notes */
    return (
        <Fragment>
            <NotesForm />
            <hr/>

            <Notes notes={notes} onRemove={removeNote} />
        </Fragment>
    )
};


export default NotesPage;
