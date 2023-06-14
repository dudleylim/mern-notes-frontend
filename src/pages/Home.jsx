import React from 'react'
import { useState, useEffect, useContext } from 'react';
import NoteItem from '../components/NoteItem';
import NoteContext from '../context/NoteContext'
import UserContext from '../context/UserContext';
import { BsFillTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'

const Home = () => {
    const { notes, dispatch } = useContext(NoteContext);
    const { user } = useContext(UserContext);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const emptyForm = {
        _id: '',
        title: '',
        content: ''
    }
    const [formDetails, setFormDetails] = useState(emptyForm);

    // set notes state using dispatch
    useEffect(() => {
        const fetchNotes = async () => {
            const response = await fetch('/api/notes', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await response.json();

            dispatch({
                type: 'SET_NOTES',
                payload: data
            })
        }

        if (user) {
            fetchNotes();
        }
    }, [dispatch, user]);

    // auto close error message
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!user) {
            setError("You must be logged in");
            setIsLoading(false);
            return;
        }

        const { _id, title, content } = formDetails;
        const newNote = {
            _id,
            title,
            content
        }

        if (isUpdating) {
            // make patch request
            const response = await fetch('/api/notes/' + _id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    title,
                    content
                })
            });

            const data = await response.json();

            if (response.ok) {
                dispatch({
                    type: 'UPDATE_NOTE',
                    payload: newNote
                });
            } else {
                setError(data.error.message);
            }

            cancelUpdate();
        } else {
            // make post request
            const response = await fetch('/api/notes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    title,
                    content
                })
            });

            const data = await response.json();

            if (response.ok) {
                dispatch({
                    type: 'CREATE_NOTE',
                    payload: {
                        _id: data._id,
                        title,
                        content
                    }
                });
            } else {
                setError(data.error.message);
            }
        }
        setFormDetails(emptyForm);
        setIsLoading(false);
    }

    const handleDelete = async (_id) => {
        setIsLoading(true);

        if (!user) {
            setError("You must be logged in");
            setIsLoading(false);
            return;
        }

        const response = await fetch('/api/notes/' + _id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        
        if (response.ok) {
            dispatch({
                type: 'DELETE_NOTE',
                payload: _id
            })
        }
        setIsLoading(false);
    }

    const enableUpdate = ({ _id, title, content }) => {
        setIsUpdating(true);
        setFormDetails({
            _id,
            title,
            content
        });
    }

    const cancelUpdate = () => {
        setIsUpdating(false);
        setFormDetails(emptyForm);
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
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" className='rounded-md p-1.5' value={formDetails.title} onChange={(e) => {setFormDetails({...formDetails, title: e.target.value})}} />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="content">Content</label>
                    <textarea name="content" cols="30" rows="10"className='rounded-md p-1.5' value={formDetails.content} onChange={(e) => {setFormDetails({...formDetails, content: e.target.value})}}></textarea>
                </div>

                <div className="flex flex-row gap-4">
                    <button disabled={isLoading} type="submit" className='bg-green-500 p-1.5 rounded-md'>Submit</button>
                    {isUpdating && <button disabled={isLoading} onClick={cancelUpdate} className='bg-red-800 p-1.5 rounded-md text-white'>Cancel</button>}
                </div>
            </form>
            <div className='flex flex-col gap-2'>
                {notes && notes.map((note) => {
                    return (
                        <NoteItem key={note._id} title={note.title} content={note.content}>
                            <button disabled={isLoading} onClick={() => handleDelete(note._id)}><BsFillTrashFill /></button>
                            <button disabled={isLoading} onClick={() => enableUpdate(note)}><AiFillEdit /></button>
                        </NoteItem>
                    )
                })}
            </div>
        </>
    )
}

export default Home