import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
    const { user } = useContext(UserContext);
    const { logout } = useAuth();
    
    return (
        <nav className='py-3 px-8 flex flex-row justify-between bg-slate-200'>
            <h1>Logo</h1>
            <ul className='flex flex-row gap-4'>
                {user &&
                <>
                <li><p>{user.email}</p></li>
                <li><Link to='/'>Home</Link></li>
                <li><button onClick={logout}>Logout</button></li>
                </>
                }
                {!user &&
                <>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/signup'>Signup</Link></li>
                </>
                }
            </ul>
        </nav>
    )
}

export default Navbar