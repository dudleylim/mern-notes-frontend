import React from "react";
import { useReducer } from "react";

const NoteContext = React.createContext();
export default NoteContext;

const noteReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTES':
            return {
                notes: action.payload
            }
        
        case 'CREATE_NOTE':
            console.log(action.payload);
            return {
                notes: [action.payload, ...state.notes]
            }

        case 'UPDATE_NOTE':
            // assuming payload is an object containing _id, title, content
            console.log(action.payload);
            const index = state.notes.findIndex((note) => note._id === action.payload._id);
            const tempNotes = state.notes;
            tempNotes[index] = action.payload;
            return {
                notes: tempNotes
            }

        case 'DELETE_NOTE':
            // assuming payload is a string containing id  of note being deleted
            const filteredNotes = state.notes.filter((note) => note._id !== action.payload)
            return {
                notes: filteredNotes
            }

        default:
            return state
    }
}

export const NoteContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(noteReducer, {
        notes: null
    })

    const contextData = {
        ...state,
        dispatch
    }
    
    return <NoteContext.Provider value={contextData}>
        {children}
    </NoteContext.Provider>
}