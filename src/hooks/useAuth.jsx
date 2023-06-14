import { useContext } from "react";
import { useState } from "react"
import UserContext from "../context/UserContext";

// will handle
    // fetch request for login/signup
    // retrieval of jwt
    // updating user state in user context
    // storage of user state to local storage
export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { dispatch } = useContext(UserContext);

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/users/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await response.json();
        
        if (!response.ok) {
            setError(data);
            setIsLoading(false);
        }
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({
                type: 'LOGIN_USER',
                payload: data
            });
            setIsLoading(false);
        }
    }

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/users/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await response.json();
        
        if (!response.ok) {
            setError(data);
            setIsLoading(false);
        }
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({
                type: 'LOGIN_USER',
                payload: data
            });
            setIsLoading(false);
        }
    }

    const logout = () => {
        localStorage.removeItem('user');
        dispatch({
            type: 'LOGOUT_USER'
        });
    }

    return {
        signup,
        login,
        logout,
        isLoading,
        error
    }
}