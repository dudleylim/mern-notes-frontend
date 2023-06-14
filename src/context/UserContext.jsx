import React from "react";
import { useReducer, useEffect } from "react";

const UserContext = React.createContext();

export default UserContext;

const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                user: action.payload
            }

        case 'LOGOUT_USER':
            return {
                user: null
            }
    
        default:
            return state
    }
}

// user context provides local state of user
export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, {
        user: null
    });

    // check for existing email in storage
    useEffect(() => {
        const existingUser = JSON.parse(localStorage.getItem('user'));
        if (existingUser) {
            dispatch({
                type: 'LOGIN_USER',
                payload: existingUser
            })
        }
        console.log(existingUser);
    }, []);

    const contextData = {
        ...state,
        dispatch
    }
    
    return <UserContext.Provider value={contextData}>
        {children}
    </UserContext.Provider>
}