import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../assets/logo512.png'

export default function Header() {

    const [user, setUser] = useState(false)

    useEffect(() => {
        const user = sessionStorage.getItem('Access_Token')
        if (user !== null) {
            setUser(true)
        } else {
            setUser(false)
        }
    }, [user])

    const navigate = useNavigate()
    const location = useLocation()

    return (
        <ul className='flex justify-center items-center
    bg-[#003f88] text-white space-x-2 shadow-sm'>
            <div className={`cursor-pointer font-semibold`}
                onClick={() => navigate('/')}><img src={logo} alt="Logo" className="h-8 mr-1" /></div>
            <li className={`${location.pathname === '/' ? 'border-b-4' : ''}
            cursor-pointer hover:bg-[#003b7e] p-3 
        transition duration-200 font-semibold ease-in-out`}
                onClick={() => navigate('/')}>Home</li>
            <li className={`${location.pathname === '/register' ? 'border-b-4' : ''}
            cursor-pointer hover:bg-[#003b7e] p-3 
        transition duration-200 font-semibold ease-in-out`}
                onClick={() => navigate('/register')}>Register</li>
            {user ? (
                <li className={`${location.pathname === '/login' ? 'border-b-4' : ''}
                                cursor-pointer hover:bg-[#003b7e] p-3 
                            transition duration-200 font-semibold ease-in-out`}
                    onClick={() => {sessionStorage.removeItem('Access_Token'); navigate('/login')}}>Logout</li>
            ) : (
                <li className={`${location.pathname === '/login' ? 'border-b-4' : ''}
                        cursor-pointer hover:bg-[#003b7e] p-3 
                    transition duration-200 font-semibold ease-in-out`}
                    onClick={() => navigate('/login')}>Login</li>
            )}
        </ul>
    )
}
