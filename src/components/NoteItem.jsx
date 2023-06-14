import React from 'react'

const NoteItem = ({ title, content, children }) => {
    return (
        <div>
            <h1 className='font-bold text-2xl'>{title}</h1>
            <p>{content}</p>
            {children}
        </div>
    )
}

export default NoteItem