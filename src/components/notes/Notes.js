import React from "react";


export const Notes = ({ notes, onRemove }) => {
    return (
        <ul className='list-group'>
            {
                notes.map(note => (
                    <li className='list-group-item note'
                        key={note.id}
                    >
                        {note.title}
                        <button type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={ () => onRemove(note.id) }
                        >&times;</button>
                    </li>
                ))
            }
        </ul>
    )
};
