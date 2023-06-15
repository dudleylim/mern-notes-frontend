import React from 'react'
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const UserForm = ({ type }) => {
    const { signup, login, isLoading, error } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (type === 'LOGIN') {
            login(email, password);
            setEmail('');
            setPassword('');
        }

        if (type === 'SIGNUP'){
            signup(email, password);
            setEmail('');
            setPassword('');
        }
    }

    return (
        <>
        {error && 
        <div className='p-2 my-4 border border-red-500 rounded-md'>
            <p>{error}</p>
        </div>
        }
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 bg-blue-100 p-6 rounded-lg'>
            <div className='flex flex-col'>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" value={email} onChange={(e) => {setEmail(e.target.value)}} className='rounded-md p-1.5' />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}} className='rounded-md p-1.5' />
            </div>
            <div>
                <button disabled={isLoading} type="submit" className='bg-green-500 p-1.5 rounded-md'>Submit</button>
            </div>
        </form>
        </>
    )
}

export default UserForm